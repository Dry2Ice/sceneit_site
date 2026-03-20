"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-[#07070a]/90 backdrop-blur-xl border-b border-neutral-800/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — slides in from center to top-left */}
        <a
          href="#hero"
          className={`flex items-center gap-2 transition-all duration-700 ease-out ${
            scrolled
              ? "opacity-100 translate-x-0 translate-y-0"
              : "opacity-0 -translate-x-[calc(50vw-3rem)] translate-y-[calc(50vh-2rem)] scale-150 pointer-events-none"
          }`}
        >
          <Logo className="w-24 h-auto text-white hover:text-amber-400 transition-colors duration-300" />
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#sections" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
            Sections
          </a>
          <a href="#founders" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
            Team
          </a>
          <a
            href="#register"
            className={`px-5 py-2 border text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg transition-all duration-300 ${
              scrolled
                ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 hover:border-amber-500/40"
                : "bg-white/[0.03] text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
            }`}
          >
            Join
          </a>
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
          <a onClick={() => setMenuOpen(false)} href="#sections" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors">
            Sections
          </a>
          <a onClick={() => setMenuOpen(false)} href="#founders" className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors">
            Team
          </a>
          <a onClick={() => setMenuOpen(false)} href="#register" className="block text-center px-5 py-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg">
            Join
          </a>
        </div>
      )}
    </header>
  );
}
