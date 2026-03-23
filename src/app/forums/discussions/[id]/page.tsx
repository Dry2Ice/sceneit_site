import { db } from "@/db";
import { discussions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientDiscussion } from "./ClientDiscussion";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";

export default async function DiscussionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [discussion, user, lang] = await Promise.all([
    db.select().from(discussions).where(eq(discussions.id, parseInt(id))).get(),
    getCurrentUser(),
    getLang(),
  ]);
  if (!discussion) notFound();
  const author = await db.select().from(users).where(eq(users.id, discussion.authorId)).get();
  const isAdmin = !!user?.isAdmin;
  const t = lang === "ru" ? ru : en;
  return <ClientDiscussion discussion={discussion} authorName={author?.username || "Unknown"} authorAvatar={author?.avatar || "??"} isAdmin={isAdmin} currentUserId={user?.id} lang={lang} />;
}
