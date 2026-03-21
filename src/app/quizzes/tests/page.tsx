import { TestsPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <TestsPage
      t={{
        home: t.nav.home,
        section: t.quizzes.tests,
        title: t.quizzes.tests,
        description: "Personality quizzes and knowledge tests for every kind of film fan.",
        searchPlaceholder: t.quizzes.searchTests,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        played: t.quizzes.played,
        questions: t.quizzes.questions,
        results: t.quizzes.results,
        more: t.quizzes.more,
        mostQuestions: t.quizzes.mostQuestions,
        resultsCount: t.quizzes.tests.toLowerCase(),
      }}
    />
  );
}
