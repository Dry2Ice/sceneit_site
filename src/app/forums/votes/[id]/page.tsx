import { db } from "@/db";
import { polls, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientPoll } from "./ClientPoll";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import { polls as mockPolls } from "@/data/forums";

export default async function PollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockItem = mockPolls.find(p => p.id === id);
  if (mockItem) {
    return <ClientPoll poll={mockItem} authorName={mockItem.author} authorAvatar={mockItem.avatar} isAdmin={false} currentUserId={undefined} lang="en" />;
  }

  const [poll, user, lang] = await Promise.all([
    db.select().from(polls).where(eq(polls.id, parseInt(id))).get(),
    getCurrentUser(),
    getLang(),
  ]);
  if (!poll) notFound();
  const author = await db.select().from(users).where(eq(users.id, poll.authorId)).get();
  const isAdmin = !!user?.isAdmin;
  const t = lang === "ru" ? ru : en;
  const options = JSON.parse(poll.options) as { label: string; votes: number }[];
  return <ClientPoll poll={{ ...poll, options }} authorName={author?.username || "Unknown"} authorAvatar={author?.avatar || "??"} isAdmin={isAdmin} currentUserId={user?.id} lang={lang} />;
}
