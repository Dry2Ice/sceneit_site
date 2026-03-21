import type { Metadata } from "next";
import Link from "next/link";
import { getThisWeekArticles, getThisWeekReviews, getThisWeekLongreads, formatDate, formatRating } from "@/data/flickfeed";

export const metadata: Metadata = {
  title: "Flick Feed — SceneIt News",
  description: "Your cinema intelligence. Expert deep reviews, breaking film news, and festival coverage.",
};

export default function NewsPage() {
  const weekArticles = getThisWeekArticles();
  const weekReviews = getThisWeekReviews();
  const weekLongreads = getThisWeekLongreads();

  const popularArticles = [...weekArticles].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const newestArticles = [...weekArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularReviews = [...weekReviews].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const newestReviews = [...weekReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularLongreads = [...weekLongreads].sort((a, b) => b.likes - a.likes).slice(0, 4);
  const newestLongreads = [...weekLongreads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1528] via-[#2d0f1a] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20" style={{ background: "rgba(251, 113, 133, 0.3)", right: "20%", top: "10%" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-15" style={{ background: "rgba(251, 113, 133, 0.2)", left: "10%", bottom: "20%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fb7185 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-rose-400 transition-colors duration-300 mb-10">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Back
        </Link>

        {/* Hero logo */}
        <div className="w-full max-w-2xl mx-auto mb-10 flex justify-center" style={{ animation: "fadeInUp 1s ease-out both" }}>
          <div className="relative w-full" style={{ height: "190px", overflow: "hidden" }}>
            <svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 40px rgba(251, 113, 133, 0.3))", position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) translateY(-188px) scale(2.01)", transformOrigin: "bottom center" }}>
              <defs><style>{`.st1-feed { font-family: 'Geometr706 BlkCn BT', sans-serif; font-size: 461.59px; font-weight: 800; }`}</style></defs>
              <text className="st1-feed" fill="#fb7185" transform="translate(940.99 688.9)"><tspan x="0" y="0">Feed</tspan></text>
              <text className="st1-feed" fill="#fb7185" transform="translate(976.08 688.9) rotate(-180) scale(1 -1)"><tspan x="0" y="0">Flick</tspan></text>
            </svg>
          </div>
        </div>

        <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #fb7185, transparent)" }} />

        <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fb7185", opacity: 0.6 }}>Your Cinema Intelligence</p>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16" style={{ animation: "fadeInUp 1s 0.3s ease-out both" }}>
          <Link href="/news/articles" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-rose-500/20">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-rose-500/20">
              <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-rose-300 transition-colors">News</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekArticles.length} articles this week</p>
          </Link>

          <Link href="/news/reviews" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-rose-500/20">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-rose-500/20">
              <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-rose-300 transition-colors">Reviews</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekReviews.length} reviews this week</p>
          </Link>

          <Link href="/news/longreads" className="group relative bg-white/[0.03] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-rose-500/20">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center mb-3 transition-colors group-hover:bg-rose-500/20">
              <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-rose-300 transition-colors">Longreads</h3>
            <p className="text-[11px] text-neutral-500 mt-1">{weekLongreads.length} essays this week</p>
          </Link>
        </div>

        {/* Popular News */}
        <SectionHeader title="Popular News This Week" href="/news/articles" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularArticles.map((a) => (
            <div key={a.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40 block mb-1.5">{a.category}</span>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{a.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{a.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{a.author}</span><span className="opacity-30">·</span><span>{formatDate(a.date)}</span><span className="opacity-30">·</span><span>{a.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newest News */}
        <SectionHeader title="Newest News This Week" href="/news/articles" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestArticles.map((a) => (
            <div key={a.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40 block mb-1.5">{a.category}</span>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{a.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{a.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{a.author}</span><span className="opacity-30">·</span><span>{formatDate(a.date)}</span><span className="opacity-30">·</span><span>{a.comments} comments</span>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Reviews */}
        <SectionHeader title="Popular Reviews This Week" href="/news/reviews" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularReviews.map((r) => (
            <div key={r.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40">{r.genre}</span>
                <span className="text-[9px] text-neutral-700">·</span>
                <span className="text-[9px] text-neutral-500">{r.film} ({r.year})</span>
              </div>
              <h4 className="text-sm font-semibold text-white/90 mb-1.5 line-clamp-2">{r.title}</h4>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(r.rating / 2) ? "text-rose-400" : "text-neutral-700"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[10px] text-neutral-500 ml-1">{formatRating(r.rating)}</span>
              </div>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{r.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{r.author}</span><span className="opacity-30">·</span><span>{formatDate(r.date)}</span><span className="opacity-30">·</span><span>{r.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newest Reviews */}
        <SectionHeader title="Newest Reviews This Week" href="/news/reviews" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestReviews.map((r) => (
            <div key={r.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40">{r.genre}</span>
                <span className="text-[9px] text-neutral-700">·</span>
                <span className="text-[9px] text-neutral-500">{r.film} ({r.year})</span>
              </div>
              <h4 className="text-sm font-semibold text-white/90 mb-1.5 line-clamp-2">{r.title}</h4>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(r.rating / 2) ? "text-rose-400" : "text-neutral-700"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[10px] text-neutral-500 ml-1">{formatRating(r.rating)}</span>
              </div>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{r.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{r.author}</span><span className="opacity-30">·</span><span>{formatDate(r.date)}</span><span className="opacity-30">·</span><span>{r.comments} comments</span>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Longreads */}
        <SectionHeader title="Popular Longreads This Week" href="/news/longreads" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {popularLongreads.map((l) => (
            <div key={l.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40">{l.category}</span>
                <span className="text-[9px] text-neutral-700">·</span>
                <span className="text-[9px] text-neutral-500">{l.readTime} min read</span>
              </div>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{l.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{l.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{l.author}</span><span className="opacity-30">·</span><span>{formatDate(l.date)}</span><span className="opacity-30">·</span><span>{l.likes} likes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newest Longreads */}
        <SectionHeader title="Newest Longreads This Week" href="/news/longreads" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {newestLongreads.map((l) => (
            <div key={l.id} className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/40">{l.category}</span>
                <span className="text-[9px] text-neutral-700">·</span>
                <span className="text-[9px] text-neutral-500">{l.readTime} min read</span>
              </div>
              <h4 className="text-sm font-semibold text-white/90 mb-2 line-clamp-2">{l.title}</h4>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{l.preview}</p>
              <div className="flex items-center gap-3 text-[10px] text-neutral-600">
                <span>{l.author}</span><span className="opacity-30">·</span><span>{formatDate(l.date)}</span><span className="opacity-30">·</span><span>{l.comments} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-rose-500/40" />
        <h2 className="text-sm sm:text-base font-semibold text-white/80">{title}</h2>
      </div>
      <Link href={href} className="text-[10px] tracking-[0.15em] uppercase text-rose-400/50 hover:text-rose-400 transition-colors flex items-center gap-1.5">
        View all
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </Link>
    </div>
  );
}
