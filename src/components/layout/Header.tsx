"use client";

import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          Кино<span className="text-amber-500">Мир</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#sections" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Разделы
          </a>
          <a href="#founders" className="text-sm text-neutral-400 hover:text-white transition-colors">
            О нас
          </a>
          <a
            href="#register"
            className="text-sm px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold rounded-lg transition-colors"
          >
            Регистрация
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-neutral-400 hover:text-white"
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800/50 px-6 py-4 space-y-3">
          <a
            href="#sections"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Разделы
          </a>
          <a
            href="#founders"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            О нас
          </a>
          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-center px-5 py-2 bg-amber-500 text-neutral-900 font-semibold rounded-lg"
          >
            Регистрация
          </a>
        </div>
      )}
    </header>
  );
}
