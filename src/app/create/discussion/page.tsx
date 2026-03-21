import { CreateForm } from "@/components/ui/CreateForm";
import { createDiscussion } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateDiscussionPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Discussion"
      section="Riot Reel"
      color="#a78bfa"
      action={createDiscussion}
      redirectPath="/forums/discussions"
      fields={[
        { name: "title", label: "Title", placeholder: "e.g. Is Blade Runner 2049 better than the original?" },
        { name: "category", label: "Category", options: ["Director Showdown", "Rankings", "Cult Classics", "Hot Takes", "Industry", "Adaptations", "Discussions"] },
        { name: "preview", label: "Description", textarea: true, placeholder: "Start the debate. What's your take?" },
      ]}
    />
  );
}
