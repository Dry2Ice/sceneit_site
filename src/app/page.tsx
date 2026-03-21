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
      <Sections
        t={{
          heading: tr.sections.heading,
          enter: tr.sections.riotReel.enter.split(" Riot Reel")[0] || "Enter",
          sections: [
            {
              tagline: tr.sections.riotReel.tagline,
              description: tr.sections.riotReel.description,
              expandedDescription: tr.sections.riotReel.description,
              features: tr.sections.riotReel.features,
            },
            {
              tagline: tr.sections.flickFeed.tagline,
              description: tr.sections.flickFeed.description,
              expandedDescription: tr.sections.flickFeed.description,
              features: tr.sections.flickFeed.features,
            },
            {
              tagline: tr.sections.bingeBuddy.tagline,
              description: tr.sections.bingeBuddy.description,
              expandedDescription: tr.sections.bingeBuddy.description,
              features: tr.sections.bingeBuddy.features,
            },
          ],
        }}
      />
      <Founders t={{ heading: tr.founders.heading, subtitle: tr.founders.subtitle }} />
      <Registration t={{ heading: tr.registration.heading, subtitle: tr.registration.subtitle, name: tr.registration.name, namePlaceholder: tr.registration.namePlaceholder, email: tr.registration.email, password: tr.registration.password, passwordPlaceholder: tr.registration.passwordPlaceholder, createAccount: tr.registration.createAccount, join: tr.registration.join, successTitle: tr.registration.successTitle, successMsg: tr.registration.successMsg }} />
    </main>
  );
}
