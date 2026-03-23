import { ReviewsPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <ReviewsPage
      t={{
        lang,
        home: t.nav.home,
        section: t.news.reviews,
        title: t.news.reviews,
        description: "In-depth critiques from seasoned cinephiles and critics.",
        searchPlaceholder: t.news.searchReviews,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        likes: t.forums.likes,
        comments: t.forums.comments,
        highestRated: t.news.highestRated,
        resultsCount: t.news.reviews.toLowerCase(),
      }}
    />
  );
}
