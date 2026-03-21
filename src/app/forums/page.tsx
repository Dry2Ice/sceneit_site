import type { Metadata } from "next";
import Link from "next/link";
import { getThisWeekDiscussions, getThisWeekPolls, formatDate } from "@/data/forums";

export const metadata: Metadata = {
  title: "Riot Reel — SceneIt Forums",
  description: "Where opinions collide. Join heated film debates, community polls, and director showdowns.",
};

export default function ForumsPage() {
  const weekDiscussions = getThisWeekDiscussions();
  const weekPolls = getThisWeekPolls();

  const popularDiscussions = [...weekDiscussions].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const newestDiscussions = [...weekDiscussions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularPolls = [...weekPolls].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 4);
  const newestPolls = [...weekPolls].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20"
        style={{ background: "rgba(167, 139, 250, 0.3)", left: "20%", top: "10%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-15"
        style={{ background: "rgba(167, 139, 250, 0.2)", right: "10%", bottom: "20%" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-violet-400 transition-colors duration-300 mb-10"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        {/* Hero logo */}
        <div className="w-full max-w-2xl mx-auto mb-10 flex justify-center" style={{ animation: "fadeInUp 1s ease-out both" }}>
          <svg
            viewBox="0 0 1761.72 516.42"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 40px rgba(167, 139, 250, 0.3))", height: "190px", width: "auto" }}
          >
            <defs>
              <style>{`.cls-1-forums { font-family: Molot, sans-serif; font-size: 428.75px; }`}</style>
            </defs>
            <text className="cls-1-forums" fill="#a78bfa" transform="translate(900.37 397.55)">
              <tspan x="0" y="0">Riot</tspan>
            </text>
            <text className="cls-1-forums" fill="#a78bfa" transform="translate(917.52 397.55) rotate(-180) scale(1 -1)">
              <tspan x="0" y="0">Reel</tspan>
            </text>
          </svg>
        </div>

        <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }} />

        <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#a78bfa", opacity: 0.6 }}>
          Where Opinions Collide
        </p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16" style={{ animation: "fadeInUp 1s 0.3s ease-out both" }}>
          <Link
            href="/forums/discussions"
            className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-violet-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center transition-colors group-hover:bg-violet-500/20">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white/90 group-hover:text-violet-300 transition-colors">Discussions</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{weekDiscussions.length} active this week</p>
              </div>
              <svg className="w-4 h-4 ml-auto text-neutral-600 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>

          <Link
            href="/forums/votes"
            className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-violet-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center transition-colors group-hover:bg-violet-500/20">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white/90 group-hover:text-violet-300 transition-colors">Votes & Polls</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{weekPolls.length} polls this week</p>
              </div>
              <svg className="w-4 h-4 ml-auto text-neutral-600 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Weekly: Popular Discussions */}
        <SectionHeader title="Popular Discussions This Week" href="/forums/discussions" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularDiscussions.map((d) => (
            <div
              key={d.id}
              className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
            >
              <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/40 block mb-1.5">{d.category}</span>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{d.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{d.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{d.author}</span>
                <span className="opacity-30">·</span>
                <span>{formatDate(d.date)}</span>
                <span className="opacity-30">·</span>
                <span>{d.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly: Newest Discussions */}
        <SectionHeader title="Newest Discussions This Week" href="/forums/discussions" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestDiscussions.map((d) => (
            <div
              key={d.id}
              className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
            >
              <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/40 block mb-1.5">{d.category}</span>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{d.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{d.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{d.author}</span>
                <span className="opacity-30">·</span>
                <span>{formatDate(d.date)}</span>
                <span className="opacity-30">·</span>
                <span>{d.replies} replies</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly: Popular Polls */}
        <SectionHeader title="Popular Polls This Week" href="/forums/votes" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularPolls.map((p) => {
            const top = p.options.reduce((a, b) => (a.votes > b.votes ? a : b));
            return (
              <div
                key={p.id}
                className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
              >
                <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/40 block mb-1.5">{p.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2">{p.title}</h4>
                <div className="space-y-1.5 mb-3">
                  {p.options.slice(0, 3).map((opt, j) => {
                    const pct = Math.round((opt.votes / p.totalVotes) * 100);
                    return (
                      <div key={j}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] text-neutral-400">{opt.label}</span>
                          <span className="text-[10px] text-neutral-600">{pct}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-violet-500/40" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{p.totalVotes.toLocaleString()} votes</span>
                  <span className="opacity-30">·</span>
                  <span>Leading: {top.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly: Newest Polls */}
        <SectionHeader title="Newest Polls This Week" href="/forums/votes" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestPolls.map((p) => {
            const top = p.options.reduce((a, b) => (a.votes > b.votes ? a : b));
            return (
              <div
                key={p.id}
                className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
              >
                <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/40 block mb-1.5">{p.category}</span>
                <h4 className="text-sm font-semibold text-white/90 mb-2">{p.title}</h4>
                <div className="space-y-1.5 mb-3">
                  {p.options.slice(0, 3).map((opt, j) => {
                    const pct = Math.round((opt.votes / p.totalVotes) * 100);
                    return (
                      <div key={j}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] text-neutral-400">{opt.label}</span>
                          <span className="text-[10px] text-neutral-600">{pct}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-violet-500/40" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                  <span>{p.totalVotes.toLocaleString()} votes</span>
                  <span className="opacity-30">·</span>
                  <span>Leading: {top.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-violet-500/40" />
        <h2 className="text-sm sm:text-base font-semibold text-white/80">{title}</h2>
      </div>
      <Link
        href={href}
        className="text-[10px] tracking-[0.15em] uppercase text-violet-400/50 hover:text-violet-400 transition-colors flex items-center gap-1.5"
      >
        View all
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  );
}
