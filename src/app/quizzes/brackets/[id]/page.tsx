import { db } from "@/db";
import { brackets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientBracket } from "./ClientBracket";

export default async function BracketPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bracket = await db.select().from(brackets).where(eq(brackets.id, parseInt(id))).get();
  if (!bracket) notFound();

  const items: string[] = JSON.parse(bracket.items);

  return <ClientBracket items={items} title={bracket.title} />;
}
