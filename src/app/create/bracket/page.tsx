import { CreateForm } from "@/components/ui/CreateForm";
import { createBracket } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateBracketPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Bracket"
      section="Binge Buddy"
      color="#fbbf24"
      action={createBracket}
      redirectPath="/quizzes/brackets"
      fields={[
        { name: "title", label: "Title", placeholder: "e.g. Greatest Film Director of All Time" },
        { name: "category", label: "Category", options: ["Directors", "Films", "Characters", "Music", "Craft"] },
        { name: "participants", label: "Number of Entries", type: "number", placeholder: "16", min: "2", max: "128" },
        { name: "items", label: "Participants (one per line)", textarea: true, placeholder: "Kubrick\nHitchcock\nSpielberg\nScorsese" },
        { name: "preview", label: "Description", textarea: true, placeholder: "Describe the tournament..." },
      ]}
    />
  );
}
