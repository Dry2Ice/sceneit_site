import { db } from "@/db";
import { brackets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientBracket } from "./ClientBracket";
import { getCurrentUser } from "@/actions/auth";

export default async function BracketPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [bracket, user] = await Promise.all([
    db.select().from(brackets).where(eq(brackets.id, parseInt(id))).get(),
    getCurrentUser(),
  ]);
  if (!bracket) notFound();

  const items: string[] = JSON.parse(bracket.items);
  const isAdmin = !!user?.isAdmin;

  return <ClientBracket items={items} title={bracket.title} bracketId={bracket.id} isAdmin={isAdmin} />;
}
