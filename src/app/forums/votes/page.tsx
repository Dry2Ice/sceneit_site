import { VotesPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <VotesPage
      t={{
        lang,
        home: t.nav.home,
        tagline: t.forums.tagline,
        title: t.forums.votesPolls,
        description: "Cast your vote. See where the community stands on cinema's biggest questions.",
        searchPlaceholder: t.forums.searchPollsPlaceholder,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        votes: t.forums.votes,
        leading: t.forums.leading,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        mostVoted: t.forums.mostVoted,
        resultsCount: t.forums.votesPolls.toLowerCase(),
      }}
    />
  );
}
