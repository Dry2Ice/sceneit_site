import { CreateForm } from "@/components/ui/CreateForm";
import { createReview } from "@/actions/content";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function CreateReviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <CreateForm
      title="Review"
      section="Flick Feed"
      color="#fb7185"
      action={createReview}
      redirectPath="/news/reviews"
      fields={[
        { name: "title", label: "Review Title", placeholder: "e.g. A visceral masterpiece that redefines the genre" },
        { name: "film", label: "Film Title", placeholder: "e.g. Nosferatu" },
        { name: "year", label: "Year", type: "number", placeholder: "2024", min: "1888", max: "2030" },
        { name: "rating", label: "Rating (0-10)", type: "number", placeholder: "8.5", min: "0", max: "10", step: "0.1" },
        { name: "genre", label: "Genre", options: ["Horror", "Drama", "Action", "Thriller", "Comedy-Drama", "Sci-Fi", "Romance", "Animation"] },
        { name: "preview", label: "Review", textarea: true, placeholder: "Share your thoughts on the film..." },
      ]}
    />
  );
}
