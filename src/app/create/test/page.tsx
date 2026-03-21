import { CreateForm } from "@/components/ui/CreateForm";
import { createTest } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateTestPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Test"
      section="Binge Buddy"
      color="#fbbf24"
      action={createTest}
      redirectPath="/quizzes/tests"
      fields={[
        { name: "title", label: "Title", placeholder: "e.g. Which Tarantino Character Are You?" },
        { name: "category", label: "Category", options: ["Personality", "Recommendation", "Creative"] },
        { name: "questionsCount", label: "Number of Questions", type: "number", placeholder: "10", min: "3", max: "30" },
        { name: "results", label: "Possible Results (one per line)", textarea: true, placeholder: "Jules Winnfield\nBeatrix Kiddo\nVincent Vega" },
        { name: "preview", label: "Description", textarea: true, placeholder: "Describe the quiz..." },
      ]}
    />
  );
}
