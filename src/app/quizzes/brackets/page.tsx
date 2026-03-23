import { BracketsPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <BracketsPage
      t={{
        lang,
        home: t.nav.home,
        section: t.quizzes.brackets,
        title: t.quizzes.brackets,
        description: "Head-to-head cinematic showdowns. Pick your favorites and crown the champion.",
        searchPlaceholder: t.quizzes.searchBrackets,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        played: t.quizzes.played,
        entries: t.quizzes.entries,
        mostEntries: t.quizzes.mostEntries,
        resultsCount: t.quizzes.brackets.toLowerCase(),
      }}
    />
  );
}
