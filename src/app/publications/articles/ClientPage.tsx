"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { articles, formatDate } from "@/data/flickfeed";
import type { Article } from "@/data/flickfeed";

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
    likes?: string;
    comments?: string;
    mostDiscussed?: string;
    resultsCount: string;
  };
}

type SortKey = "popular" | "newest" | "most-discussed";
const categories = [...new Set(articles.map((a) => a.category))];

export function ArticlesPage({ t }: PageProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Article[] = [...articles];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.preview.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((a) => a.category === category);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "most-discussed":
        list.sort((a, b) => b.comments - a.comments);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1528] via-[#2d0f1a] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 113, 133, 0.3)", right: "-10%", top: "5%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fb7185 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-rose-400 transition-colors">{t.home}</Link>
          <span className="opacity-30">/</span>
          <Link href="/publications" className="hover:text-rose-400 transition-colors">{t.section}</Link>
          <span className="opacity-30">/</span>
          <span className="text-rose-400/70">News</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fb7185", opacity: 0.6 }}>{t.title}</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{t.title}</h1>
          <p className="text-neutral-500 text-sm">{t.description}</p>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder={t.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/30 transition-colors" />
        </div>

        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([{ key: "newest" as SortKey, label: t.newest }, { key: "popular" as SortKey, label: t.popular }, { key: "most-discussed" as SortKey, label: t.mostDiscussed ?? "Most Discussed" }]).map((tab) => (
            <button key={tab.key} onClick={() => setSort(tab.key)} className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${sort === tab.key ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 hover:text-neutral-300 border border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setCategory(null)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === null ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{t.all}</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat === category ? null : cat)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${category === cat ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{cat}</button>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">{filtered.length} {t.resultsCount}</p>

        <div className="space-y-3">
          {filtered.map((a, i) => (
            <div key={a.id} className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15" style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}>
              {a.hot && <HotBadge />}
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/50 mb-1 block">{a.category}</span>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-rose-300 transition-colors">{a.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{a.preview}</p>
                  <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                    <span>{a.author}</span>
                    <span className="opacity-30">·</span>
                    <span>{formatDate(a.date)}</span>
                    <span className="opacity-30">·</span>
                    <span>{a.likes} {t.likes ?? "likes"}</span>
                    <span className="opacity-30">·</span>
                    <span>{a.comments} {t.comments ?? "comments"}</span>
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
