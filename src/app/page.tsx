import { Hero } from "@/components/sections/Hero";
import { Sections } from "@/components/sections/Sections";
import { Founders } from "@/components/sections/Founders";
import { Registration } from "@/components/sections/Registration";

export default function Home() {
  return (
    <main className="bg-[#07070a] text-white">
      <Hero />
      <Sections />
      <Founders />
      <Registration />
    </main>
  );
}
