import { TriviaPage } from "./ClientPage";
import { getLang, en, ru } from "@/i18n";

export default async function Page() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <TriviaPage
      t={{
        lang,
        home: t.nav.home,
        section: "Binge Buddy",
        title: t.quizzes.trivia,
        description: "Test your cinema knowledge with challenging trivia questions.",
        searchPlaceholder: t.quizzes.searchTrivia,
        popular: t.forums.popular,
        newest: t.forums.newest,
        all: t.forums.all,
        hot: t.forums.hot,
        noResults: t.filters.noResults,
        played: t.quizzes.played,
        questions: t.quizzes.questions,
        hardest: t.quizzes.hardest,
        avgScore: t.quizzes.avgScore,
        resultsCount: t.quizzes.trivia.toLowerCase(),
      }}
    />
  );
}
