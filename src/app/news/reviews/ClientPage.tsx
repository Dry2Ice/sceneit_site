"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { reviews, formatDate, formatRating } from "@/data/flickfeed";
import type { Review } from "@/data/flickfeed";

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
    highestRated?: string;
    resultsCount: string;
  };
}

type SortKey = "popular" | "newest" | "highest-rated";
const genres = [...new Set(reviews.map((r) => r.genre))];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating / 2);
  const hasHalf = rating % 2 >= 1;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < full ? "text-rose-400" : i === full && hasHalf ? "text-rose-400/50" : "text-neutral-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-[10px] text-neutral-500 ml-1.5">{formatRating(rating)}/10</span>
    </div>
  );
}

export function ReviewsPage({ t }: PageProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [genre, setGenre] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Review[] = [...reviews];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.film.toLowerCase().includes(q) ||
          r.preview.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q)
      );
    }

    if (genre) {
      list = list.filter((r) => r.genre === genre);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "highest-rated":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [search, sort, genre]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1528] via-[#2d0f1a] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 113, 133, 0.3)", left: "-10%", bottom: "5%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fb7185 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-rose-400 transition-colors">{t.home}</Link>
          <span className="opacity-30">/</span>
          <Link href="/news" className="hover:text-rose-400 transition-colors">{t.section}</Link>
          <span className="opacity-30">/</span>
          <span className="text-rose-400/70">{t.title}</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#fb7185", opacity: 0.6 }}>{t.section}</p>
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
          {([{ key: "newest" as SortKey, label: t.newest }, { key: "popular" as SortKey, label: t.popular }, { key: "highest-rated" as SortKey, label: t.highestRated ?? "Highest Rated" }]).map((tab) => (
            <button key={tab.key} onClick={() => setSort(tab.key)} className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${sort === tab.key ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 hover:text-neutral-300 border border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setGenre(null)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${genre === null ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{t.all}</button>
          {genres.map((g) => (
            <button key={g} onClick={() => setGenre(g === genre ? null : g)} className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${genre === g ? "bg-rose-500/15 text-rose-300 border border-rose-500/20" : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"}`}>{g}</button>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">{filtered.length} {t.resultsCount}</p>

        <div className="space-y-3">
          {filtered.map((r, i) => (
            <div key={r.id} className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-rose-500/15" style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}>
              {r.hot && <HotBadge />}
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-rose-400/50">{r.genre}</span>
                    <span className="text-[9px] text-neutral-700">·</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-500">{r.film} ({r.year})</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-rose-300 transition-colors">{r.title}</h3>
                  <div className="mb-2"><StarRating rating={r.rating} /></div>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">{r.preview}</p>
                  <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                    <span>{r.author}</span>
                    <span className="opacity-30">·</span>
                    <span>{formatDate(r.date)}</span>
                    <span className="opacity-30">·</span>
                    <span>{r.likes} {t.likes ?? "likes"}</span>
                    <span className="opacity-30">·</span>
                    <span>{r.comments} {t.comments ?? "comments"}</span>
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
