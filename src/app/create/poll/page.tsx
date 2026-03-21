import { CreateForm } from "@/components/ui/CreateForm";
import { createPoll } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreatePollPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Poll"
      section="Riot Reel"
      color="#a78bfa"
      action={createPoll}
      redirectPath="/forums/votes"
      fields={[
        { name: "title", label: "Question", placeholder: "e.g. Greatest cinematographer of all time?" },
        { name: "category", label: "Category", options: ["Rankings", "Director Showdown", "Hot Takes", "Industry", "Discussions"] },
        { name: "options", label: "Options (one per line)", textarea: true, placeholder: "Option 1\nOption 2\nOption 3\nOption 4" },
      ]}
    />
  );
}
