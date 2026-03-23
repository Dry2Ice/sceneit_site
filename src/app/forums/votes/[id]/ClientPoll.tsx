"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { likeContent, deleteContent } from "@/actions/content";
import { formatDate } from "@/data/forums";

interface ClientPollProps {
  poll: {
    id: number;
    title: string;
    category: string;
    authorId: number;
    totalVotes: number;
    createdAt: Date | null;
    options: { label: string; votes: number }[];
  };
  authorName: string;
  authorAvatar: string;
  isAdmin: boolean;
  currentUserId?: number;
  lang: string;
}

export function ClientPoll({ poll, authorName, authorAvatar, isAdmin, currentUserId, lang }: ClientPollProps) {
  const router = useRouter();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [options, setOptions] = useState(poll.options);
  const [totalVotes, setTotalVotes] = useState(poll.totalVotes);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleVote = useCallback(
    (index: number) => {
      if (hasVoted) return;
      setHasVoted(true);
      setSelectedOption(index);
      const updated = options.map((opt, i) =>
        i === index ? { ...opt, votes: opt.votes + 1 } : opt
      );
      setOptions(updated);
      setTotalVotes((prev) => prev + 1);
    },
    [hasVoted, options]
  );

  const handleLike = useCallback(async () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);
    await likeContent("polls", poll.id);
  }, [liked, poll.id]);

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this poll?")) return;
    setDeleting(true);
    await deleteContent("polls", poll.id);
    router.push("/forums/votes");
  }, [poll.id, router]);

  const dateStr = poll.createdAt instanceof Date
    ? poll.createdAt.toISOString()
    : new Date(poll.createdAt ?? 0).toISOString();

  const leadingOption = options.reduce((a, b) => (a.votes > b.votes ? a : b));

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

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-violet-400 transition-colors">
            {lang === "ru" ? "Главная" : "Home"}
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/forums" className="hover:text-violet-400 transition-colors">Riot Reel</Link>
          <span className="opacity-30">/</span>
          <Link href="/forums/votes" className="hover:text-violet-400 transition-colors">
            {lang === "ru" ? "Голосования" : "Votes & Polls"}
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-violet-400/70 truncate max-w-[200px]">{poll.title}</span>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400/70">
            {poll.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{poll.title}</h1>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-8">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
            <span className="text-[10px] font-bold text-violet-400">{authorAvatar}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">{authorName}</p>
            <p className="text-[10px] text-neutral-500">{formatDate(dateStr, lang)}</p>
          </div>
        </div>

        {/* Voting UI */}
        <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-6 sm:p-8 mb-8">
          <div className="space-y-3">
            {options.map((option, i) => {
              const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              const isSelected = selectedOption === i;
              const showResults = hasVoted;

              return (
                <button
                  key={i}
                  onClick={() => handleVote(i)}
                  disabled={hasVoted}
                  className={`w-full text-left rounded-xl p-4 transition-all duration-300 ${
                    showResults
                      ? isSelected
                        ? "bg-violet-500/15 border-2 border-violet-500/40"
                        : "bg-white/[0.02] border border-neutral-800/30"
                      : "bg-white/[0.03] border border-neutral-800/50 hover:bg-violet-500/10 hover:border-violet-500/20 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isSelected ? "text-violet-300" : "text-white/80"}`}>
                      {option.label}
                    </span>
                    {showResults && (
                      <span className={`text-xs font-medium ${isSelected ? "text-violet-300" : "text-neutral-500"}`}>
                        {pct}%
                      </span>
                    )}
                  </div>
                  {showResults && (
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isSelected
                            ? "bg-gradient-to-r from-violet-500 to-violet-400/60"
                            : "bg-gradient-to-r from-neutral-600 to-neutral-500/40"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Total votes */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              {totalVotes.toLocaleString()} {lang === "ru" ? "голосов" : "total votes"}
            </p>
            {hasVoted && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-violet-400/60">
                {lang === "ru" ? "Лидирует" : "Leading"}: {leadingOption.label} ({totalVotes > 0 ? Math.round((leadingOption.votes / totalVotes) * 100) : 0}%)
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={liked}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              liked
                ? "bg-violet-500/15 border border-violet-500/25 text-violet-300"
                : "bg-white/[0.03] border border-neutral-800/50 text-neutral-400 hover:bg-violet-500/10 hover:border-violet-500/20 hover:text-violet-300 cursor-pointer"
            }`}
          >
            <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {likes}
          </button>

          {/* Delete button (admin only) */}
          {isAdmin && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 ml-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              {deleting ? (lang === "ru" ? "Удаление..." : "Deleting...") : (lang === "ru" ? "Удалить" : "Delete")}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
