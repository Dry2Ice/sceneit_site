import { db } from "@/db";
import { trivias } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientTrivia } from "./ClientTrivia";
import { getCurrentUser } from "@/actions/auth";

export default async function TriviaPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [trivia, user] = await Promise.all([
    db.select().from(trivias).where(eq(trivias.id, parseInt(id))).get(),
    getCurrentUser(),
  ]);
  if (!trivia) notFound();

  const isAdmin = !!user?.isAdmin;

  return <ClientTrivia title={trivia.title} category={trivia.category} totalQuestions={trivia.questionsCount} triviaId={trivia.id} isAdmin={isAdmin} />;
}
