"use client";

import { register } from "@/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  t: {
    createAccount: string;
    joinSceneIt: string;
    username: string;
    email: string;
    password: string;
    minChars: string;
    register: string;
    creating: string;
    alreadyAccount: string;
    signInLink: string;
    back: string;
  };
}

export function RegisterForm({ t }: RegisterFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const result = await register(
      form.get("username") as string,
      form.get("email") as string,
      form.get("password") as string
    );
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]" />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[200px] opacity-15" style={{ background: "rgba(167, 139, 250, 0.3)", left: "30%", top: "20%" }} />

      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-violet-400 transition-colors mb-8">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          {t.back}
        </Link>

        <h1 className="text-2xl font-bold tracking-tight mb-2">{t.createAccount}</h1>
        <p className="text-neutral-500 text-sm mb-8">{t.joinSceneIt}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-1.5">{t.username}</label>
            <input name="username" required minLength={3} maxLength={20} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/30 transition-colors" placeholder="yourname" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-1.5">{t.email}</label>
            <input name="email" type="email" required className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/30 transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-1.5">{t.password}</label>
            <input name="password" type="password" required minLength={6} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/30 transition-colors" placeholder={t.minChars} />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button type="submit" disabled={loading} className="w-full py-2.5 bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 border border-violet-500/20 rounded-lg text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50">
            {loading ? t.creating : t.register}
          </button>
        </form>

        <p className="text-neutral-600 text-xs mt-6 text-center">
          {t.alreadyAccount}{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">{t.signInLink}</Link>
        </p>
      </div>
    </main>
  );
}
