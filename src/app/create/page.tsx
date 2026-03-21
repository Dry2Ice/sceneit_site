import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const [user, lang] = await Promise.all([getCurrentUser(), getLang()]);
  const t = lang === "ru" ? ru : en;
  if (!user) redirect("/login");

  const contentTypes = [
    { name: "Discussion", href: "/create/discussion", section: "Riot Reel", color: "#a78bfa", desc: t.create.startDebate },
    { name: "Poll", href: "/create/poll", section: "Riot Reel", color: "#a78bfa", desc: t.create.createVote },
    { name: "News Article", href: "/create/article", section: "Flick Feed", color: "#fb7185", desc: t.create.shareNews },
    { name: "Review", href: "/create/review", section: "Flick Feed", color: "#fb7185", desc: t.create.rateFilm },
    { name: "Longread", href: "/create/longread", section: "Flick Feed", color: "#fb7185", desc: t.create.writeEssay },
    { name: "Bracket", href: "/create/bracket", section: "Binge Buddy", color: "#fbbf24", desc: t.create.buildTournament },
    { name: "Test", href: "/create/test", section: "Binge Buddy", color: "#fbbf24", desc: t.create.createPersonality },
    { name: "Trivia", href: "/create/trivia", section: "Binge Buddy", color: "#fbbf24", desc: t.create.writeQuiz },
  ];

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#0d0b1a] to-[#451a03]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors mb-10">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          {t.nav.back}
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-neutral-800/30 flex items-center justify-center">
            <span className="text-[10px] font-bold text-neutral-400">{user.avatar}</span>
          </div>
          <span className="text-sm text-neutral-400">{t.create.creatingAs} <span className="text-white font-medium">{user.username}</span></span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{t.create.title}</h1>
        <p className="text-neutral-500 text-sm mb-10">{t.create.chooseWhat}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contentTypes.map((ct) => (
            <Link
              key={ct.href}
              href={ct.href}
              className="group bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-neutral-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: ct.color, opacity: 0.5 }}>{ct.section}</span>
                <svg className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{ct.name}</h3>
              <p className="text-[11px] text-neutral-600 mt-0.5">{ct.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
