import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { en, ru } from "@/i18n";
import type { Lang } from "@/i18n";

export function Footer({ lang = "en" }: { lang?: Lang }) {
  const t = lang === "ru" ? ru : en;

  return (
    <footer className="relative bg-[#050507] border-t border-neutral-800/30 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="group text-neutral-600 cursor-pointer transition-colors duration-300">
            <Logo className="w-32 h-auto" />
          </div>

          <div className="flex items-center gap-8">
            <Link href="/#sections" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.sections}
            </Link>
            <Link href="/forums" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.forums}
            </Link>
            <Link href="/publications" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.news}
            </Link>
            <Link href="/quizzes" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.quizzes}
            </Link>
            <Link href="/#founders" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.team}
            </Link>
            <Link href="/#register" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              {t.nav.join}
            </Link>
          </div>

          <div className="w-16 h-px bg-neutral-800/50" />

          <p className="text-neutral-700 text-xs">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
