"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tests, formatDate } from "@/data/buddy";
import type { Test } from "@/data/buddy";

type SortKey = "popular" | "newest" | "most-questions";
const categories = [...new Set(tests.map((t) => t.category))];

export default function TestsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Test[] = [...tests];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.preview.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((t) => t.category === category);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.totalPlayed - a.totalPlayed);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "most-questions":
        list.sort((a, b) => b.questionsCount - a.questionsCount);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 191, 36, 0.3)", left: "-10%", bottom: "5%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/quizzes" className="hover:text-amber-400 transition-colors">Binge Buddy</Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-400/70">Tests</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fbbf24", opacity: 0.6 }}>Binge Buddy</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Tests</h1>
          <p className="text-neutral-500 text-sm">Answer questions, discover your result. Which character are you? What should you watch tonight?</p>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search tests..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/30 transition-colors" />
        </div>

        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([{ key: "popular" as SortKey, label: "Popular" }, { key: "newest" as SortKey, label: "Newest" }, { key: "most-questions" as SortKey, label: "Most Questions" }]).map((tab) => (
            <button key={tab.key} onClick={() => setSort(tab.key)} className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${sort === tab.key ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 hover:text-neutral-300 border border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setCategory(null)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === null ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>All</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat === category ? null : cat)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === cat ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{cat}</button>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">{filtered.length} test{filtered.length !== 1 ? "s" : ""}</p>

        <div className="space-y-3">
          {filtered.map((t, i) => (
            <div key={t.id} className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15" style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}>
              {t.hot && <HotBadge />}
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/50">{t.category}</span>
                    <span className="text-[9px] text-neutral-700">·</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-500">{t.questionsCount} questions</span>
                    <span className="text-[9px] text-neutral-700">·</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-500">{t.resultsCount} results</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-amber-300 transition-colors">{t.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{t.preview}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {t.results.slice(0, 4).map((r, j) => (
                      <span key={j} className="px-2 py-0.5 rounded-full text-[9px] tracking-[0.05em] bg-amber-500/5 border border-amber-500/10 text-neutral-400">{r}</span>
                    ))}
                    {t.results.length > 4 && <span className="px-2 py-0.5 text-[9px] text-neutral-600">+{t.results.length - 4} more</span>}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                    <span>{formatDate(t.date)}</span>
                    <span className="opacity-30">·</span>
                    <span>{t.totalPlayed.toLocaleString()} played</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-20"><p className="text-neutral-600 text-sm">No tests found.</p></div>}
      </div>
    </main>
  );
}

function HotBadge() {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
      <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
      <span className="text-[8px] tracking-[0.15em] uppercase text-orange-400">Hot</span>
    </div>
  );
}
