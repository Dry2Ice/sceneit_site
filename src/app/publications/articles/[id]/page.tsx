import { db } from "@/db";
import { articles, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import { ClientArticle } from "./ClientArticle";
import { notFound } from "next/navigation";
import { articles as mockArticles } from "@/data/flickfeed";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockItem = mockArticles.find(a => a.id === id);
  if (mockItem) {
    return (
      <ClientArticle
        article={mockItem}
        author={{ username: mockItem.author, avatar: mockItem.avatar }}
        currentUser={null}
        t={{ lang: "en", home: "Home", section: "Flick Feed", title: "Articles", likes: "likes", comments: "comments" }}
      />
    );
  }

  const articleId = parseInt(id);
  if (isNaN(articleId)) notFound();

  const article = await db.select().from(articles).where(eq(articles.id, articleId)).get();
  if (!article) notFound();

  const author = await db.select().from(users).where(eq(users.id, article.authorId)).get();
  const currentUser = await getCurrentUser();
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <ClientArticle
      article={article}
      author={author ? { username: author.username, avatar: author.avatar } : { username: "Unknown", avatar: "??" }}
      currentUser={currentUser}
      t={{ lang, home: t.nav.home, section: "Flick Feed", title: t.news.news, likes: t.forums.likes, comments: t.forums.comments }}
    />
  );
}
