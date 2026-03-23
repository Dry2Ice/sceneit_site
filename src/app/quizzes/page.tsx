import type { Metadata } from "next";
import Link from "next/link";
import { getThisWeekBrackets, getThisWeekTests, getThisWeekTrivias, formatDate } from "@/data/buddy";
import { getLang, en, ru } from "@/i18n";

export const metadata: Metadata = {
  title: "Binge Buddy — SceneIt Quizzes",
  description: "Test your film IQ. Frame-by-frame challenges, genre master quizzes, and weekly tournaments.",
};

export default async function QuizzesPage() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;
  const weekBrackets = getThisWeekBrackets();
  const weekTests = getThisWeekTests();
  const weekTrivias = getThisWeekTrivias();

  const popularBrackets = [...weekBrackets].sort((a, b) => b.totalPlayed - a.totalPlayed).slice(0, 4);
  const newestBrackets = [...weekBrackets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularTests = [...weekTests].sort((a, b) => b.totalPlayed - a.totalPlayed).slice(0, 4);
  const newestTests = [...weekTests].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularTrivias = [...weekTrivias].sort((a, b) => b.totalPlayed - a.totalPlayed).slice(0, 4);
  const newestTrivias = [...weekTrivias].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20" style={{ background: "rgba(251, 191, 36, 0.3)", left: "30%", top: "15%" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-15" style={{ background: "rgba(251, 191, 36, 0.2)", right: "15%", bottom: "25%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-amber-400 transition-colors duration-300 mb-10">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          {t.nav.back}
        </Link>

        {/* Hero logo */}
        <div className="w-full max-w-2xl mx-auto mb-10" style={{ animation: "fadeInUp 1s ease-out both" }}>
          <svg viewBox="0 0 1761.72 516.42" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ filter: "drop-shadow(0 0 40px rgba(251, 191, 36, 0.3))" }}>
            <defs><style>{`.cls-1-quizzes { font-family: 'Square721 BT', sans-serif; font-size: 303.16px; font-weight: 700; }`}</style></defs>
            <text className="cls-1-quizzes" fill="#fbbf24" transform="translate(828.8 353.35)"><tspan x="0" y="0">Buddy</tspan></text>
            <text className="cls-1-quizzes" fill="#fbbf24" transform="translate(851.81 353.35) rotate(-180) scale(1 -1)"><tspan x="0" y="0">Binge</tspan></text>
          </svg>
        </div>

        <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }} />

        <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-10" style={{ color: "#fbbf24", opacity: 0.6 }}>{t.quizzes.tagline}</p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16" style={{ animation: "fadeInUp 1s 0.3s ease-out both" }}>
          <Link href="/quizzes/brackets" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-amber-500/20">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-amber-500/20">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-3.77 1.522m0 0a6.003 6.003 0 01-3.77-1.522" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-amber-300 transition-colors">{t.quizzes.brackets}</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekBrackets.length} {t.quizzes.activeThisWeek}</p>
          </Link>

          <Link href="/quizzes/tests" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-amber-500/20">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-amber-500/20">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-amber-300 transition-colors">{t.quizzes.tests}</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekTests.length} {t.quizzes.newThisWeek}</p>
          </Link>

          <Link href="/quizzes/trivia" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-amber-500/20">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-amber-500/20">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-amber-300 transition-colors">{t.quizzes.trivia}</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekTrivias.length} {t.quizzes.quizzesThisWeek}</p>
          </Link>
        </div>

        {/* Popular Brackets */}
        <SectionHeader title={t.quizzes.popularBrackets} href="/quizzes/brackets" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularBrackets.map((b) => (
            <Link key={b.id} href={`/quizzes/brackets/${b.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{b.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{b.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{b.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{b.participants} {t.quizzes.entries}</span><span className="opacity-30">·</span><span>{b.totalPlayed.toLocaleString()} {t.quizzes.played}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newest Brackets */}
        <SectionHeader title={t.quizzes.newestBrackets} href="/quizzes/brackets" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestBrackets.map((b) => (
            <Link key={b.id} href={`/quizzes/brackets/${b.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{b.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{b.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{b.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{formatDate(b.date, lang)}</span><span className="opacity-30">·</span><span>{b.totalPlayed.toLocaleString()} {t.quizzes.played}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Tests */}
        <SectionHeader title={t.quizzes.popularTests} href="/quizzes/tests" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularTests.map((item) => (
            <Link key={item.id} href={`/quizzes/tests/${item.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{item.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{item.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{item.questionsCount} {t.quizzes.questions}</span><span className="opacity-30">·</span><span>{item.totalPlayed.toLocaleString()} {t.quizzes.played}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newest Tests */}
        <SectionHeader title={t.quizzes.newestTests} href="/quizzes/tests" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestTests.map((item) => (
            <Link key={item.id} href={`/quizzes/tests/${item.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{item.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{item.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{formatDate(item.date, lang)}</span><span className="opacity-30">·</span><span>{item.totalPlayed.toLocaleString()} {t.quizzes.played}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Trivia */}
        <SectionHeader title={t.quizzes.popularTrivia} href="/quizzes/trivia" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularTrivias.map((item) => (
            <Link key={item.id} href={`/quizzes/trivia/${item.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{item.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{item.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{item.questionsCount} {t.quizzes.questions}</span><span className="opacity-30">·</span><span>{`${t.quizzes.avgScore}:`}{item.avgScore}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newest Trivia */}
        <SectionHeader title={t.quizzes.newestTrivia} href="/quizzes/trivia" viewAll={t.nav.viewAll} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestTrivias.map((item) => (
            <Link key={item.id} href={`/quizzes/trivia/${item.id}`} className="block">
              <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/40 block mb-1.5">{item.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{item.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{formatDate(item.date, lang)}</span><span className="opacity-30">·</span><span>{item.totalPlayed.toLocaleString()} {t.quizzes.played}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function SectionHeader({ title, href, viewAll = "View all" }: { title: string; href: string; viewAll?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-amber-500/40" />
        <h2 className="text-sm sm:text-base font-semibold text-white/80">{title}</h2>
      </div>
      <Link href={href} className="text-[10px] tracking-[0.15em] uppercase text-amber-400/50 hover:text-amber-400 transition-colors flex items-center gap-1.5">
        {viewAll}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </Link>
    </div>
  );
}
