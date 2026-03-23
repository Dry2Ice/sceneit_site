import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  avatar: text("avatar").notNull().default(""),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const discussions = sqliteTable("discussions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  preview: text("preview").notNull(),
  category: text("category").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  likes: integer("likes").notNull().default(0),
  replies: integer("replies").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const polls = sqliteTable("polls", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  options: text("options").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  totalVotes: integer("total_votes").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  preview: text("preview").notNull(),
  category: text("category").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  film: text("film").notNull(),
  year: integer("year").notNull(),
  rating: integer("rating").notNull(),
  preview: text("preview").notNull(),
  genre: text("genre").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const longreads = sqliteTable("longreads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  preview: text("preview").notNull(),
  category: text("category").notNull(),
  readTime: integer("read_time").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const brackets = sqliteTable("brackets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  participants: integer("participants").notNull(),
  preview: text("preview").notNull(),
  items: text("items").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  totalPlayed: integer("total_played").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const tests = sqliteTable("tests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  preview: text("preview").notNull(),
  questionsCount: integer("questions_count").notNull(),
  results: text("results").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  totalPlayed: integer("total_played").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const trivias = sqliteTable("trivias", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  preview: text("preview").notNull(),
  questionsCount: integer("questions_count").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  totalPlayed: integer("total_played").notNull().default(0),
  avgScore: integer("avg_score").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
