"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep background layers */}
      <div className="absolute inset-0 bg-[#07070a]" />

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] transition-transform duration-[2000ms] ease-out"
        style={{
          background: "radial-gradient(circle, #d4a853 0%, #8b6914 30%, transparent 70%)",
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          left: "10%",
          top: "-20%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px] transition-transform duration-[2000ms] ease-out"
        style={{
          background: "radial-gradient(circle, #1a1a2e 0%, #16213e 40%, transparent 70%)",
          transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`,
          right: "5%",
          bottom: "-10%",
        }}
      />

      {/* Film strip borders */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#07070a] via-[#07070a] to-transparent z-10">
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-3 sm:left-5 w-1.5 h-3 bg-amber-500/10 rounded-sm"
            style={{ top: `${i * 5 + 2}%` }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#07070a] via-[#07070a] to-transparent z-10">
        <div className="absolute right-2 sm:right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute right-3 sm:right-5 w-1.5 h-3 bg-amber-500/10 rounded-sm"
            style={{ top: `${i * 5 + 2}%` }}
          />
        ))}
      </div>

      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Top badge */}
        <div className="hero-entrance mb-8 opacity-0" style={{ animationDelay: "0.2s" }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400/80 text-xs tracking-[0.25em] uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Coming Soon
          </span>
        </div>

        {/* Logo */}
        <div className="hero-entrance mb-6 opacity-0" style={{ animationDelay: "0.4s" }}>
          <Logo className="w-48 sm:w-64 md:w-80 h-auto mx-auto text-white drop-shadow-[0_0_40px_rgba(212,168,83,0.3)]" />
        </div>

        {/* Divider line */}
        <div className="hero-entrance-scale flex items-center justify-center gap-4 mb-8 opacity-0" style={{ animationDelay: "0.7s" }}>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/40" />
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        {/* Tagline */}
        <div className="hero-entrance mb-4 opacity-0" style={{ animationDelay: "0.9s" }}>
          <h2 className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light tracking-wide">
            Every Frame Tells a Story
          </h2>
        </div>

        <div className="hero-entrance mb-12 opacity-0" style={{ animationDelay: "1.1s" }}>
          <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for cinephiles. Discuss, discover, and dive deep
            into the world of cinema with a community that lives and breathes film.
          </p>
        </div>

        {/* Feature pills */}
        <div className="hero-entrance flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 opacity-0" style={{ animationDelay: "1.3s" }}>
          {[
            { label: "Riot Reel", color: "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-300" },
            { label: "Flick Feed", color: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300" },
            { label: "Binge Buddy", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300" },
          ].map((pill) => (
            <span
              key={pill.label}
              className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${pill.color} border text-xs sm:text-sm tracking-wider uppercase font-medium`}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="hero-entrance flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" style={{ animationDelay: "1.5s" }}>
          <a
            href="#register"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,168,83,0.4)] hover:scale-105"
          >
            <span className="relative z-10">Join the Scene</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#sections"
            className="px-8 py-3.5 border border-neutral-700/50 hover:border-amber-500/30 text-neutral-400 hover:text-white rounded-lg transition-all duration-500 hover:bg-white/[0.02]"
          >
            Explore
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07070a] to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="hero-entrance absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0" style={{ animationDelay: "2s" }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-neutral-600 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-neutral-700 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-amber-500/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
