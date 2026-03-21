"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface HeaderProps {
  authSlot?: React.ReactNode;
  langSlot?: React.ReactNode;
  nav: {
    sections: string;
    forums: string;
    news: string;
    quizzes: string;
  };
}

export function Header({ authSlot, langSlot, nav }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(7, 7, 10, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : undefined,
        borderBottom: scrolled ? "1px solid rgba(38, 38, 38, 0.2)" : "1px solid transparent",
        transition: "background-color 0.5s ease, backdrop-filter 0.5s ease, border-bottom 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/#hero" className="group text-neutral-500 transition-colors duration-300">
          <Logo className="w-16 sm:w-20 h-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#sections" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
            {nav.sections}
          </Link>
          <Link href="/forums" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-violet-400 transition-colors duration-300">
            {nav.forums}
          </Link>
          <Link href="/news" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-rose-400 transition-colors duration-300">
            {nav.news}
          </Link>
          <Link href="/quizzes" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-amber-400 transition-colors duration-300">
            {nav.quizzes}
          </Link>
          <div className="w-px h-4 bg-neutral-800/50" />
          {langSlot}
          {authSlot}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-neutral-400 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#07070a]/95 backdrop-blur-xl border-t border-neutral-800/30 px-6 py-6 space-y-4">
          <Link onClick={() => setMenuOpen(false)} href="/#sections" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors">
            {nav.sections}
          </Link>
          <Link onClick={() => setMenuOpen(false)} href="/forums" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-violet-400 transition-colors">
            {nav.forums}
          </Link>
          <Link onClick={() => setMenuOpen(false)} href="/news" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-rose-400 transition-colors">
            {nav.news}
          </Link>
          <Link onClick={() => setMenuOpen(false)} href="/quizzes" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-amber-400 transition-colors">
            {nav.quizzes}
          </Link>
          <div className="flex items-center gap-3 pt-2">
            {langSlot}
          </div>
          <div onClick={() => setMenuOpen(false)}>
            {authSlot}
          </div>
        </div>
      )}
    </header>
  );
}
