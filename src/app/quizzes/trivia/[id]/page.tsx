import { db } from "@/db";
import { trivias } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientTrivia } from "./ClientTrivia";

export default async function TriviaPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trivia = await db.select().from(trivias).where(eq(trivias.id, parseInt(id))).get();
  if (!trivia) notFound();

  return <ClientTrivia title={trivia.title} category={trivia.category} totalQuestions={trivia.questionsCount} />;
}
