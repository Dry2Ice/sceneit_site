"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { discussions, formatDate } from "@/data/forums";
import type { Discussion } from "@/data/forums";

type SortKey = "popular" | "newest" | "discussed";
const categories = [...new Set(discussions.map((d) => d.category))];

export default function DiscussionsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list: Discussion[] = [...discussions];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.preview.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((d) => d.category === category);
    }

    switch (sort) {
      case "popular":
        list.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "discussed":
        list.sort((a, b) => b.replies - a.replies);
        break;
    }

    return list;
  }, [search, sort, category]);

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]" />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
        style={{ background: "rgba(167, 139, 250, 0.3)", right: "-10%", top: "5%" }}
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
          <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/forums" className="hover:text-violet-400 transition-colors">Riot Reel</Link>
          <span className="opacity-30">/</span>
          <span className="text-violet-400/70">Discussions</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#a78bfa", opacity: 0.6 }}>
            Riot Reel
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Discussions</h1>
          <p className="text-neutral-500 text-sm">Join the conversation. Debate, discuss, and dissect cinema.</p>
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
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/30 transition-colors"
          />
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.02] rounded-lg w-fit">
          {([
            { key: "popular" as SortKey, label: "Popular" },
            { key: "newest" as SortKey, label: "Newest" },
            { key: "discussed" as SortKey, label: "Most Discussed" },
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
            All
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
          {filtered.length} discussion{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Discussion list */}
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <div
              key={d.id}
              className="group relative bg-white/[0.02] border border-neutral-800/30 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/15"
              style={{ animation: `fadeInUp 0.5s ${i * 0.05}s ease-out both` }}
            >
              {/* Hot badge */}
              {d.hot && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[8px] tracking-[0.15em] uppercase text-orange-400">Hot</span>
                </div>
              )}

              <div className="flex gap-4">
                {/* Avatar */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-violet-400">{d.avatar}</span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <span className="text-[9px] tracking-[0.2em] uppercase text-violet-400/50 mb-1 block">
                    {d.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 group-hover:text-violet-300 transition-colors">
                    {d.title}
                  </h3>

                  {/* Preview */}
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                    {d.preview}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-[10px] text-neutral-600">
                    <span>{d.author}</span>
                    <span className="opacity-30">·</span>
                    <span>{formatDate(d.date)}</span>
                    <span className="opacity-30">·</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                      {d.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                      </svg>
                      {d.replies}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-sm">No discussions found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
