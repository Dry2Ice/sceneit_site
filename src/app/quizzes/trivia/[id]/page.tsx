import { db } from "@/db";
import { trivias } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientTrivia } from "./ClientTrivia";
import { getCurrentUser } from "@/actions/auth";
import { trivias as mockTrivias } from "@/data/buddy";

export default async function TriviaPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockItem = mockTrivias.find(t => t.id === id);
  if (mockItem) {
    return <ClientTrivia title={mockItem.title} category={mockItem.category} totalQuestions={mockItem.questionsCount} triviaId={mockItem.id} isAdmin={false} />;
  }

  const [trivia, user] = await Promise.all([
    db.select().from(trivias).where(eq(trivias.id, parseInt(id))).get(),
    getCurrentUser(),
  ]);
  if (!trivia) notFound();

  const isAdmin = !!user?.isAdmin;

  return <ClientTrivia title={trivia.title} category={trivia.category} totalQuestions={trivia.questionsCount} triviaId={trivia.id} isAdmin={isAdmin} />;
}
