"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { likeContent, deleteContent } from "@/actions/content";
import { EditModal } from "@/components/ui/EditModal";
import { formatDate } from "@/data/forums";

interface ClientDiscussionProps {
  discussion: {
    id: number;
    title: string;
    preview: string;
    category: string;
    authorId: number;
    likes: number;
    replies: number;
    createdAt: Date | null;
  };
  authorName: string;
  authorAvatar: string;
  isAdmin: boolean;
  currentUserId?: number;
  lang: string;
}

export function ClientDiscussion({ discussion, authorName, authorAvatar, isAdmin, currentUserId, lang }: ClientDiscussionProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(discussion.likes);
  const [liked, setLiked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLike = useCallback(async () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);
    await likeContent("discussions", discussion.id);
  }, [liked, discussion.id]);

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this discussion?")) return;
    setDeleting(true);
    await deleteContent("discussions", discussion.id);
    router.push("/forums/discussions");
  }, [discussion.id, router]);

  const dateStr = discussion.createdAt instanceof Date
    ? discussion.createdAt.toISOString()
    : new Date(discussion.createdAt ?? 0).toISOString();

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

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-violet-400 transition-colors">
            {lang === "ru" ? "Главная" : "Home"}
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/forums" className="hover:text-violet-400 transition-colors">Riot Reel</Link>
          <span className="opacity-30">/</span>
          <Link href="/forums/discussions" className="hover:text-violet-400 transition-colors">
            {lang === "ru" ? "Дискуссии" : "Discussions"}
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-violet-400/70 truncate max-w-[200px]">{discussion.title}</span>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400/70">
            {discussion.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{discussion.title}</h1>

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

        {isAdmin && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-800/30">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
            <EditModal type="discussions" id={discussion.id} accentColor="#a78bfa" fields={[
              { name: "title", label: "Title", type: "text", value: discussion.title },
              { name: "category", label: "Category", type: "text", value: discussion.category },
              { name: "preview", label: "Description", type: "textarea", value: discussion.preview },
            ]} />
            <button onClick={handleDelete} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
          </div>
        )}

        {/* Body */}
        <div className="bg-white/[0.02] border border-neutral-800/30 rounded-xl p-6 sm:p-8 mb-8">
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {discussion.preview}
          </p>
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

          {/* Replies count */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-neutral-800/50 text-sm text-neutral-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            {discussion.replies} {lang === "ru" ? "ответов" : "replies"}
          </div>
        </div>
      </div>
    </main>
  );
}
