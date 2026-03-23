import { ArticlesPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <ArticlesPage
      t={{
        lang,
        home: t.nav.home,
        section: "Flick Feed",
        title: t.news.news,
        description: "Breaking stories and industry updates from the world of cinema.",
        searchPlaceholder: t.news.searchNews,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        likes: t.forums.likes,
        comments: t.forums.comments,
        mostDiscussed: t.news.mostDiscussed,
        resultsCount: t.news.news.toLowerCase(),
      }}
    />
  );
}
