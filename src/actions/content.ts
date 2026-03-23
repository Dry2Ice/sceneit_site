"use server";

import { db } from "@/db";
import { discussions, polls, articles, reviews, longreads, brackets, tests, trivias } from "@/db/schema";
import { getCurrentUser, requireAdmin } from "./auth";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

// Discussions
export async function createDiscussion(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const preview = formData.get("preview") as string;
  const category = formData.get("category") as string;

  await db.insert(discussions).values({ title, preview, category, authorId: user.id });
  revalidatePath("/forums/discussions");
  revalidatePath("/forums");
  return { success: true };
}

export async function getDiscussions() {
  return db.select().from(discussions).orderBy(desc(discussions.createdAt)).all();
}

// Polls
export async function createPoll(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const optionsRaw = formData.get("options") as string;
  const options = optionsRaw.split("\n").filter((o) => o.trim()).map((o) => ({ label: o.trim(), votes: 0 }));
  const itemsJson = JSON.stringify(options);

  await db.insert(polls).values({ title, category, options: itemsJson, authorId: user.id });
  revalidatePath("/forums/votes");
  revalidatePath("/forums");
  return { success: true };
}

export async function getPolls() {
  return db.select().from(polls).orderBy(desc(polls.createdAt)).all();
}

// Articles
export async function createArticle(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const preview = formData.get("preview") as string;
  const category = formData.get("category") as string;

  await db.insert(articles).values({ title, preview, category, authorId: user.id });
  revalidatePath("/publications/articles");
  revalidatePath("/publications");
  return { success: true };
}

export async function getArticles() {
  return db.select().from(articles).orderBy(desc(articles.createdAt)).all();
}

// Reviews
export async function createReview(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const film = formData.get("film") as string;
  const year = parseInt(formData.get("year") as string);
  const rating = Math.round(parseFloat(formData.get("rating") as string) * 10);
  const preview = formData.get("preview") as string;
  const genre = formData.get("genre") as string;

  await db.insert(reviews).values({ title, film, year, rating, preview, genre, authorId: user.id });
  revalidatePath("/publications/reviews");
  revalidatePath("/publications");
  return { success: true };
}

export async function getReviews() {
  return db.select().from(reviews).orderBy(desc(reviews.createdAt)).all();
}

// Longreads
export async function createLongread(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const preview = formData.get("preview") as string;
  const category = formData.get("category") as string;
  const readTime = parseInt(formData.get("readTime") as string);

  await db.insert(longreads).values({ title, preview, category, readTime, authorId: user.id });
  revalidatePath("/publications/longreads");
  revalidatePath("/publications");
  return { success: true };
}

export async function getLongreads() {
  return db.select().from(longreads).orderBy(desc(longreads.createdAt)).all();
}

// Brackets
export async function createBracket(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const preview = formData.get("preview") as string;
  const participants = parseInt(formData.get("participants") as string);
  const itemsRaw = formData.get("items") as string;
  const items = itemsRaw.split("\n").filter((i) => i.trim()).map((i) => i.trim());

  await db.insert(brackets).values({ title, category, preview, participants, items: JSON.stringify(items), authorId: user.id });
  revalidatePath("/quizzes/brackets");
  revalidatePath("/quizzes");
  return { success: true };
}

export async function getBrackets() {
  return db.select().from(brackets).orderBy(desc(brackets.createdAt)).all();
}

// Tests
export async function createTest(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const preview = formData.get("preview") as string;
  const questionsCount = parseInt(formData.get("questionsCount") as string);
  const resultsRaw = formData.get("results") as string;
  const results = resultsRaw.split("\n").filter((r) => r.trim()).map((r) => r.trim());

  await db.insert(tests).values({ title, category, preview, questionsCount, results: JSON.stringify(results), authorId: user.id });
  revalidatePath("/quizzes/tests");
  revalidatePath("/quizzes");
  return { success: true };
}

export async function getTests() {
  return db.select().from(tests).orderBy(desc(tests.createdAt)).all();
}

// Trivia
export async function createTrivia(formData: FormData) {
  const user = await requireAuth();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const preview = formData.get("preview") as string;
  const questionsCount = parseInt(formData.get("questionsCount") as string);

  await db.insert(trivias).values({ title, category, preview, questionsCount, authorId: user.id });
  revalidatePath("/quizzes/trivia");
  revalidatePath("/quizzes");
  return { success: true };
}

export async function getTrivias() {
  return db.select().from(trivias).orderBy(desc(trivias.createdAt)).all();
}

type AnyTable = any;

// Admin delete
export async function deleteContent(type: string, id: number) {
  await requireAdmin();
  const tableMap: Record<string, AnyTable> = { discussions, polls, articles, reviews, longreads, brackets, tests, trivias };
  const table = tableMap[type];
  if (!table) throw new Error("Invalid type");
  await db.delete(table).where(eq(table.id, id));
  revalidatePath("/");
  return { success: true };
}

// Like action
export async function likeContent(type: string, id: number) {
  await requireAuth();
  const tableMap: Record<string, AnyTable> = { discussions, polls, articles, reviews, longreads, brackets, tests, trivias };
  const table = tableMap[type];
  if (!table) throw new Error("Invalid type");
  const item = await db.select().from(table).where(eq(table.id, id)).get();
  if (item && "likes" in item) {
    await db.update(table).set({ likes: item.likes + 1 }).where(eq(table.id, id));
  }
  revalidatePath("/");
  return { success: true };
}
