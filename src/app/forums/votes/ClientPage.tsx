"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { polls, formatDate } from "@/data/forums";
import type { Poll } from "@/data/forums";

interface VotesPageProps {
  t: {
    lang: string;
    home: string;
    tagline: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    popular: string;
    newest: string;
    all: string;
    votes: string;
    leading: string;
    hot: string;
    noResults: string;
    mostVoted: string;
    resultsCount: string;
  };
}

type SortKey = "popular" | "newest" | "most-voted";
const categories = [...new Set(polls.map((p) => p.category))];

function PollBar({ option, total }: { option: { label: string; votes: number }; total: number }) {
  const pct = Math.round((option.votes / total) * 100);
  return (
    <div className="group/bar">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-neutral-300">{option.label}</span>
        <span className="text-[10px] text-neutral-500">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400/60 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function VotesPage({ t }: VotesPageProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Poll[] = [...polls];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.options.some((o) => o.label.toLowerCase().includes(q))
      );
    }

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.totalVotes - a.totalVotes);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "most-voted":
        list.sort((a, b) => b.totalVotes - a.totalVotes);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
        style={{ background: "rgba(167, 139, 250, 0.3)", left: "-10%", bottom: "5%" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-violet-400 transition-colors">{t.home}</Link>
          <span className="opacity-30">/</span>
          <Link href="/forums" className="hover:text-violet-400 transition-colors">Riot Reel</Link>
          <span className="opacity-30">/</span>
          <span className="text-violet-400/70">{t.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#a78bfa", opacity: 0.6 }}>
            Riot Reel
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{t.title}</h1>
          <p className="text-neutral-500 text-sm">{t.description}</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/30 transition-colors"
          />
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([
            { key: "popular" as SortKey, label: t.popular },
            { key: "newest" as SortKey, label: t.newest },
            { key: "most-voted" as SortKey, label: t.mostVoted },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSort(tab.key)}
              className={`px-4 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                sort === tab.key
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-neutral-500 hover:text-neutral-300 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategory(null)}
            className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${
              category === null
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"
            }`}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === category ? null : cat)}
              className={`px-3 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase transition-all duration-300 ${
                category === cat
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-6">
          {filtered.length} {t.resultsCount}
        </p>

        {/* Poll list */}
        <div className="space-y-3">
          {filtered.map((p, i) => {
            const topOption = p.options.reduce((a, b) => (a.votes > b.votes ? a : b));
            return (
              <Link key={p.id} href={`/forums/votes/${p.id}`} className="block">
                <div
                  className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
                  style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}
                >
                  {/* Hot badge */}
                  {p.hot && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                      <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-[8px] tracking-[0.15em] uppercase text-orange-400">{t.hot}</span>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Category */}
                      <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/50 mb-1 block">
                        {p.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1 group-hover:text-violet-300 transition-colors">
                        {p.title}
                      </h3>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-[10px] text-neutral-600 mb-4">
                        <span>{p.author}</span>
                        <span className="opacity-30">·</span>
                        <span>{formatDate(p.date, t.lang)}</span>
                        <span className="opacity-30">·</span>
                        <span>{p.totalVotes.toLocaleString()} {t.votes}</span>
                      </div>

                      {/* Poll bars */}
                      <div className="space-y-2.5">
                        {p.options.map((opt, j) => (
                          <PollBar key={j} option={opt} total={p.totalVotes} />
                        ))}
                      </div>

                      {/* Winner indicator */}
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-violet-400/60">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-3.77 1.522m0 0a6.003 6.003 0 01-3.77-1.522" />
                        </svg>
                        {t.leading}: {topOption.label} ({Math.round((topOption.votes / p.totalVotes) * 100)}%)
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-sm">{t.noResults}</p>
          </div>
        )}
      </div>
    </main>
  );
}
