import { DiscussionsPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <DiscussionsPage
      t={{
        lang,
        home: t.nav.home,
        tagline: t.forums.tagline,
        title: t.forums.discussions,
        description: "Join the conversation. Debate, discuss, and dissect cinema.",
        searchPlaceholder: t.forums.searchPlaceholder,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        likes: t.forums.likes,
        comments: t.forums.comments,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        mostDiscussed: t.forums.mostDiscussed,
        resultsCount: t.forums.discussions.toLowerCase(),
      }}
    />
  );
}
