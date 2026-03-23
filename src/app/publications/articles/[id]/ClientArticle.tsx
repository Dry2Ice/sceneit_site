"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/data/flickfeed";
import { likeContent, deleteContent } from "@/actions/content";
import { EditModal } from "@/components/ui/EditModal";
import { useTransition } from "react";

interface ArticleData {
  id: number;
  title: string;
  preview: string;
  category: string;
  authorId: number;
  likes: number;
  comments: number;
  createdAt: Date | null;
}

interface AuthorData {
  username: string;
  avatar: string;
}

interface PageProps {
  article: ArticleData;
  author: AuthorData;
  currentUser: { id: number; isAdmin: boolean } | null;
  t: {
    lang: string;
    home: string;
    section: string;
    title: string;
    likes: string;
    comments: string;
  };
}

export function ClientArticle({ article, author, currentUser, t }: PageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    startTransition(async () => {
      await likeContent("articles", article.id);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteContent("articles", article.id);
      router.push("/publications/articles");
    });
  }

  const dateStr = article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString();

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1528] via-[#2d0f1a] to-[#0d0b1a]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(251, 113, 133, 0.3)", right: "-10%", top: "5%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fb7185 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        <Link href="/publications/articles" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-rose-400 transition-colors mb-10">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to {t.title}
        </Link>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase bg-rose-500/15 text-rose-300 border border-rose-500/20 mb-4">{article.category}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6">{article.title}</h1>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-rose-300">{author.avatar.slice(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm text-white/80">{author.username}</p>
            <p className="text-[10px] text-neutral-600">{formatDate(dateStr, t.lang)}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-10">
          <p className="text-neutral-300 text-base leading-relaxed whitespace-pre-wrap">{article.preview}</p>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-neutral-800/50">
          <button onClick={handleLike} disabled={isPending} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-neutral-800/50 text-sm text-neutral-400 hover:text-rose-300 hover:border-rose-500/30 transition-all disabled:opacity-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {article.likes} {t.likes}
          </button>

          <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            {article.comments} {t.comments}
          </span>
        </div>

        {currentUser?.isAdmin && (
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-neutral-800/30">
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600">Admin</span>
            <EditModal type="articles" id={article.id} accentColor="#fb7185" fields={[
              { name: "title", label: "Title", type: "text", value: article.title },
              { name: "category", label: "Category", type: "text", value: article.category },
              { name: "preview", label: "Preview", type: "textarea", value: article.preview },
            ]} />
            <button onClick={handleDelete} className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
          </div>
        )}
      </div>
    </main>
  );
}
