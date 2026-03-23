import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import { ClientReview } from "./ClientReview";
import { notFound } from "next/navigation";
import { reviews as mockReviews } from "@/data/flickfeed";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockItem = mockReviews.find(r => r.id === id);
  if (mockItem) {
    const dbRating = Math.round(mockItem.rating * 10);
    return (
      <ClientReview
        review={{ ...mockItem, id: mockItem.id, rating: dbRating }}
        author={{ username: mockItem.author, avatar: mockItem.avatar }}
        currentUser={null}
        t={{ lang: "en", home: "Home", section: "Flick Feed", title: "Reviews", likes: "likes", comments: "comments" }}
      />
    );
  }

  const reviewId = parseInt(id);
  if (isNaN(reviewId)) notFound();

  const review = await db.select().from(reviews).where(eq(reviews.id, reviewId)).get();
  if (!review) notFound();

  const author = await db.select().from(users).where(eq(users.id, review.authorId)).get();
  const currentUser = await getCurrentUser();
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <ClientReview
      review={review}
      author={author ? { username: author.username, avatar: author.avatar } : { username: "Unknown", avatar: "??" }}
      currentUser={currentUser}
      t={{ lang, home: t.nav.home, section: "Flick Feed", title: t.news.reviews ?? "Reviews", likes: t.forums.likes, comments: t.forums.comments }}
    />
  );
}
