import { CreateForm } from "@/components/ui/CreateForm";
import { createTrivia } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateTriviaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Trivia"
      section="Binge Buddy"
      color="#fbbf24"
      action={createTrivia}
      redirectPath="/quizzes/trivia"
      fields={[
        { name: "title", label: "Title", placeholder: "e.g. Oscar Best Picture Winners Quiz" },
        { name: "category", label: "Category", options: ["Awards", "Visual", "Directors", "Quotes", "Music", "World Cinema", "Industry", "Horror"] },
        { name: "questionsCount", label: "Number of Questions", type: "number", placeholder: "15", min: "5", max: "50" },
        { name: "preview", label: "Description", textarea: true, placeholder: "Describe what this trivia quiz covers..." },
      ]}
    />
  );
}
