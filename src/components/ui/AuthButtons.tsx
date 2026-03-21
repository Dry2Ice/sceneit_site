"use client";

import Link from "next/link";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  user: { id: number; username: string; avatar: string } | null;
  mobile?: boolean;
  t: { signIn: string; join: string; create: string; signOut: string };
}

export function AuthButtons({ user, mobile, t }: AuthButtonsProps) {
  const router = useRouter();

  if (user) {
    if (mobile) {
      return (
        <>
          <Link onClick={() => {}} href="/create" className="block text-center px-5 py-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg">
            {t.create}
          </Link>
          <button onClick={async () => { await logout(); router.refresh(); }} className="block w-full text-center text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors">
            {t.signOut}
          </button>
        </>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link href="/create" className="px-4 py-1.5 border text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg transition-all duration-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 hover:border-amber-500/40">
          {t.create}
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-neutral-800/30 flex items-center justify-center">
            <span className="text-[9px] font-bold text-neutral-400">{user.avatar}</span>
          </div>
          <button onClick={async () => { await logout(); router.refresh(); }} className="text-[10px] tracking-[0.15em] uppercase text-neutral-600 hover:text-white transition-colors">
            {t.signOut}
          </button>
        </div>
      </div>
    );
  }

  if (mobile) {
    return (
      <>
        <Link href="/login" className="block text-center px-5 py-2.5 text-neutral-500 text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg border border-neutral-800/50">
          {t.signIn}
        </Link>
        <Link href="/register" className="block text-center px-5 py-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg">
          {t.join}
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
        {t.signIn}
      </Link>
      <Link href="/register" className="px-5 py-2 border text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg transition-all duration-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 hover:border-amber-500/40">
        {t.join}
      </Link>
    </div>
  );
}
