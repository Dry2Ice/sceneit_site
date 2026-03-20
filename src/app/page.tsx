import { Hero } from "@/components/sections/Hero";
import { Sections } from "@/components/sections/Sections";
import { Founders } from "@/components/sections/Founders";
import { Registration } from "@/components/sections/Registration";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <Sections />
      <Founders />
      <Registration />
    </main>
  );
}
