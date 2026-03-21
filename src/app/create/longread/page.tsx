import { CreateForm } from "@/components/ui/CreateForm";
import { createLongread } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateLongreadPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Longread"
      section="Flick Feed"
      color="#fb7185"
      action={createLongread}
      redirectPath="/news/longreads"
      fields={[
        { name: "title", label: "Title", placeholder: "e.g. The complete oral history of A24" },
        { name: "category", label: "Category", options: ["Oral History", "Technology", "Essay", "Retrospective"] },
        { name: "readTime", label: "Read Time (minutes)", type: "number", placeholder: "15", min: "5", max: "60" },
        { name: "preview", label: "Synopsis", textarea: true, placeholder: "Describe what this longread covers..." },
      ]}
    />
  );
}
