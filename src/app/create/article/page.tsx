import { CreateForm } from "@/components/ui/CreateForm";
import { createArticle } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateArticlePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="News Article"
      section="Flick Feed"
      color="#fb7185"
      action={createArticle}
      redirectPath="/news/articles"
      fields={[
        { name: "title", label: "Headline", placeholder: "e.g. Nolan signs exclusive IMAX deal" },
        { name: "category", label: "Category", options: ["Festival Coverage", "Industry", "Production News", "Trends", "Awards"] },
        { name: "preview", label: "Article Summary", textarea: true, placeholder: "Summarize the news in 2-3 sentences..." },
      ]}
    />
  );
}
