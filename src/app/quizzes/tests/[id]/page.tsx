import { db } from "@/db";
import { tests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientTest } from "./ClientTest";
import { getCurrentUser } from "@/actions/auth";

export default async function TestPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [test, user] = await Promise.all([
    db.select().from(tests).where(eq(tests.id, parseInt(id))).get(),
    getCurrentUser(),
  ]);
  if (!test) notFound();

  const results = JSON.parse(test.results) as string[];
  const isAdmin = !!user?.isAdmin;

  return <ClientTest title={test.title} category={test.category} results={results} testId={test.id} isAdmin={isAdmin} />;
}
