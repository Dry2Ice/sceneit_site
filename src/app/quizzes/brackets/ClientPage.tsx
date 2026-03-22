"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { brackets, formatDate } from "@/data/buddy";
import type { Bracket } from "@/data/buddy";

interface PageProps {
  t: {
    home: string;
    section: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    popular: string;
    newest: string;
    all: string;
    hot: string;
    noResults: string;
    played: string;
    entries?: string;
    mostEntries?: string;
    resultsCount: string;
  };
}

type SortKey = "popular" | "newest" | "participants";
const categories = [...new Set(brackets.map((b) => b.category))];

export function BracketsPage({ t }: PageProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Bracket[] = [...brackets];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.preview.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((b) => b.category === category);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.totalPlayed - a.totalPlayed);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "participants":
        list.sort((a, b) => b.participants - a.participants);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 191, 36, 0.3)", right: "-10%", top: "5%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">{t.home}</Link>
          <span className="opacity-30">/</span>
          <Link href="/quizzes" className="hover:text-amber-400 transition-colors">{t.section}</Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-400/70">{t.title}</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fbbf24", opacity: 0.6 }}>{t.title}</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{t.title}</h1>
          <p className="text-neutral-500 text-sm">{t.description}</p>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder={t.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/30 transition-colors" />
        </div>

        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([{ key: "popular" as SortKey, label: t.popular }, { key: "newest" as SortKey, label: t.newest }, { key: "participants" as SortKey, label: t.mostEntries }]).map((tab) => (
            <button key={tab.key} onClick={() => setSort(tab.key)} className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${sort === tab.key ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 hover:text-neutral-300 border border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setCategory(null)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === null ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{t.all}</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat === category ? null : cat)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === cat ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{cat}</button>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">{filtered.length} {t.resultsCount}</p>

        <div className="space-y-3">
          {filtered.map((b, i) => (
            <div key={b.id} className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-amber-500/15" style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}>
              {b.hot && <HotBadge />}
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-3.77 1.522m0 0a6.003 6.003 0 01-3.77-1.522" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400/50">{b.category}</span>
                    <span className="text-[9px] text-neutral-700">·</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-500">{b.participants} {t.entries}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-amber-300 transition-colors">{b.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{b.preview}</p>
                  <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                    <span>{formatDate(b.date)}</span>
                    <span className="opacity-30">·</span>
                    <span>{b.totalPlayed.toLocaleString()} {t.played}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-20"><p className="text-neutral-600 text-sm">{t.noResults}</p></div>}
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
