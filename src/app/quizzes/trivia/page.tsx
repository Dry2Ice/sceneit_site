"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { trivias, formatDate } from "@/data/buddy";
import type { Trivia } from "@/data/buddy";

type SortKey = "popular" | "newest" | "hardest";
const categories = [...new Set(trivias.map((t) => t.category))];

export default function TriviaPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Trivia[] = [...trivias];

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
      case "hardest":
        list.sort((a, b) => a.avgScore - b.avgScore);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 191, 36, 0.3)", right: "10%", bottom: "10%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/quizzes" className="hover:text-amber-400 transition-colors">Binge Buddy</Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-400/70">Trivia</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fbbf24", opacity: 0.6 }}>Binge Buddy</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Trivia</h1>
          <p className="text-neutral-500 text-sm">Test your knowledge. Correct answers, final scores, and bragging rights.</p>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search trivia..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/30 transition-colors" />
        </div>

        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([{ key: "popular" as SortKey, label: "Popular" }, { key: "newest" as SortKey, label: "Newest" }, { key: "hardest" as SortKey, label: "Hardest" }]).map((tab) => (
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

        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">{filtered.length} trivia quiz{filtered.length !== 1 ? "zes" : ""}</p>

        <div className="space-y-3">
          {filtered.map((t, i) => (
            <div key={t.id} className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15" style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}>
              {t.hot && <HotBadge />}
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/50">{t.category}</span>
                    <span className="text-[9px] text-neutral-700">·</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-500">{t.questionsCount} questions</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-amber-300 transition-colors">{t.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{t.preview}</p>

                  {/* Score bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] text-neutral-500">Avg score</span>
                    <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden max-w-[120px]">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400/60" style={{ width: `${t.avgScore}%` }} />
                    </div>
                    <span className="text-[10px] text-amber-400/60">{t.avgScore}%</span>
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

        {filtered.length === 0 && <div className="text-center py-20"><p className="text-neutral-600 text-sm">No trivia found.</p></div>}
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
