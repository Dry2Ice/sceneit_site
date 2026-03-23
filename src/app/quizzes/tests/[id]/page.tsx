import { db } from "@/db";
import { tests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientTest } from "./ClientTest";

export default async function TestPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = await db.select().from(tests).where(eq(tests.id, parseInt(id))).get();
  if (!test) notFound();

  const results = JSON.parse(test.results) as string[];

  return <ClientTest title={test.title} category={test.category} results={results} />;
}
