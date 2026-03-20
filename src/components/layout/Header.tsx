"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Logo } from "@/components/ui/Logo";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoRect, setLogoRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const anchorRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const rect = node.getBoundingClientRect();
      setLogoRect({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const raw = Math.min(1, Math.max(0, window.scrollY / (vh * 0.45)));
      setScrollProgress(easeInOutCubic(raw));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const p = scrollProgress;

  const showHeader = p > 0.01;
  const headerBg = Math.min(1, p * 1.5);
  const logoOpacity = Math.min(1, p * 3);

  let logoStyle: React.CSSProperties = {};
  if (logoRect) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const tx = cx + (logoRect.x + logoRect.width / 2 - cx) * p;
    const ty = cy + (logoRect.y + logoRect.height / 2 - cy) * p;
    const s = 1 + (logoRect.height / 60 - 1) * p;

    logoStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      transform: `translate(${tx}px, ${ty}px) translate(-50%, -50%) scale(${s})`,
      opacity: logoOpacity,
      pointerEvents: p > 0.5 ? "auto" : "none",
      zIndex: 60,
      willChange: "transform, opacity",
    };
  }

  return (
    <>
      {/* Floating animated logo */}
      {logoRect && (
        <a href="#hero" style={logoStyle} className="text-white hover:text-amber-400 transition-colors duration-300">
          <Logo className="w-28 sm:w-32 h-auto" />
        </a>
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `rgba(7, 7, 10, ${headerBg * 0.9})`,
          backdropFilter: headerBg > 0.1 ? `blur(${headerBg * 24}px)` : undefined,
          borderBottom: `1px solid rgba(38, 38, 38, ${headerBg * 0.2})`,
          transition: "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Invisible anchor — measures where logo should land */}
          <div ref={anchorRef} className="flex items-center opacity-0 pointer-events-none" aria-hidden="true">
            <Logo className="w-28 sm:w-32 h-auto" />
          </div>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            style={{ opacity: showHeader ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <a href="#sections" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
              Sections
            </a>
            <a href="#founders" className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 hover:text-white transition-colors duration-300">
              Team
            </a>
            <a
              href="#register"
              className="px-5 py-2 border text-[10px] tracking-[0.25em] uppercase font-medium rounded-lg transition-all duration-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 hover:border-amber-500/40"
            >
              Join
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-neutral-400 hover:text-white transition-colors"
            aria-label="Menu"
            style={{ opacity: showHeader ? 1 : 0, transition: "opacity 0.5s ease" }}
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
    </>
  );
}
