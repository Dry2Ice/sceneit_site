import { LongreadsPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <LongreadsPage
      t={{
        home: t.nav.home,
        section: t.news.longreads,
        title: t.news.longreads,
        description: "Deep dives and long-form essays that illuminate cinema history.",
        searchPlaceholder: t.news.searchLongreads,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        likes: t.forums.likes,
        comments: t.forums.comments,
        longest: t.news.longest,
        minRead: t.news.minRead,
        resultsCount: t.news.longreads.toLowerCase(),
      }}
    />
  );
}
