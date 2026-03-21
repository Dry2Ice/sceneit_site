import { Hero } from "@/components/sections/Hero";
import { Sections } from "@/components/sections/Sections";
import { Founders } from "@/components/sections/Founders";
import { Registration } from "@/components/sections/Registration";
import { t } from "@/i18n";

export default async function Home() {
  const tr = await t();

  return (
    <main className="bg-[#07070a] text-white">
      <Hero
        badge={tr.hero.badge}
        tagline={tr.hero.tagline}
        description={
          <>
            {tr.hero.description.split("{riot}")[0]}
            <span className="text-violet-400 font-medium">{tr.hero.riotReel}</span>
            {tr.hero.description.split("{riot}")[1]?.split("{flick}")[0]}
            <span className="text-rose-400 font-medium">{tr.hero.flickFeed}</span>
            {tr.hero.description.split("{flick}")[1]?.split("{binge}")[0]}
            <span className="text-amber-400 font-medium">{tr.hero.bingeBuddy}</span>
            {tr.hero.description.split("{binge}")[1]}
          </>
        }
        subdescription={tr.hero.subdescription}
        scroll={tr.hero.scroll}
      />
      <Sections />
      <Founders />
      <Registration />
    </main>
  );
}
