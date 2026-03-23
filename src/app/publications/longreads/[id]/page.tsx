import { db } from "@/db";
import { longreads, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import { ClientLongread } from "./ClientLongread";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const longreadId = parseInt(id);
  if (isNaN(longreadId)) notFound();

  const longread = await db.select().from(longreads).where(eq(longreads.id, longreadId)).get();
  if (!longread) notFound();

  const author = await db.select().from(users).where(eq(users.id, longread.authorId)).get();
  const currentUser = await getCurrentUser();
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <ClientLongread
      longread={longread}
      author={author ? { username: author.username, avatar: author.avatar } : { username: "Unknown", avatar: "??" }}
      currentUser={currentUser}
      t={{ lang, home: t.nav.home, section: "Flick Feed", title: t.news.longreads ?? "Longreads", likes: t.forums.likes, comments: t.forums.comments, minRead: "min read" }}
    />
  );
}
