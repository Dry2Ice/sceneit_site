"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const heroFade = Math.max(0, 1 - scrollY / (window.innerHeight * 0.2));

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#07070a]" />

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-15 blur-[140px] transition-transform duration-[3000ms] ease-out"
        style={{
          background: "radial-gradient(circle, #d4a853 0%, #8b6914 30%, transparent 70%)",
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          left: "5%",
          top: "-25%",
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-10 blur-[120px] transition-transform duration-[3000ms] ease-out"
        style={{
          background: "radial-gradient(circle, #1a1a2e 0%, #16213e 40%, transparent 70%)",
          transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`,
          right: "0%",
          bottom: "-15%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px] transition-transform duration-[3000ms] ease-out"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          transform: `translate(${mousePos.x}px, ${mousePos.y * -1}px)`,
          right: "20%",
          top: "10%",
        }}
      />

      {/* Film strip borders */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-r from-[#07070a] via-[#07070a] to-transparent z-10">
        <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-2.5 sm:left-4 w-1.5 h-2.5 bg-amber-500/8 rounded-sm"
            style={{ top: `${i * 5 + 2}%` }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-[#07070a] via-[#07070a] to-transparent z-10">
        <div className="absolute right-3 sm:right-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute right-2.5 sm:right-4 w-1.5 h-2.5 bg-amber-500/8 rounded-sm"
            style={{ top: `${i * 5 + 2}%` }}
          />
        ))}
      </div>

      {/* Scan lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="hero-entrance mb-10 opacity-0" style={{ animationDelay: "0.2s" }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400/70 text-[10px] tracking-[0.3em] uppercase font-medium">
            <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
            Coming Soon
          </span>
        </div>

        {/* Large Logo — fades out as Header logo takes over */}
        <div className="hero-entrance mb-8 opacity-0" style={{ animationDelay: "0.5s" }}>
          <div style={{ opacity: heroFade, transition: "opacity 0.1s linear" }}>
            <Logo className="w-64 sm:w-80 md:w-[420px] h-auto mx-auto text-white drop-shadow-[0_0_60px_rgba(212,168,83,0.25)]" />
          </div>
        </div>

        {/* Divider */}
        <div className="hero-entrance-scale flex items-center justify-center gap-4 mb-10 opacity-0" style={{ animationDelay: "0.8s" }}>
          <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-amber-500/30" />
          <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/30" />
          <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-amber-500/30" />
        </div>

        {/* Description */}
        <div className="hero-entrance mb-5 opacity-0" style={{ animationDelay: "1s" }}>
          <h2 className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light tracking-wide max-w-2xl mx-auto">
            Every Frame Tells a Story
          </h2>
        </div>

        <div className="hero-entrance mb-4 opacity-0" style={{ animationDelay: "1.15s" }}>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            A community-driven platform built for true cinephiles. Dive into three immersive worlds:
            fierce debates in <span className="text-violet-400 font-medium">Riot Reel</span>,
            curated reviews and breaking news in <span className="text-rose-400 font-medium">Flick Feed</span>,
            and cinematic trivia challenges in <span className="text-amber-400 font-medium">Binge Buddy</span>.
          </p>
        </div>

        <div className="hero-entrance opacity-0" style={{ animationDelay: "1.3s" }}>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Discuss, discover, and test your knowledge — all in one place.
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#07070a] to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="hero-entrance absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0" style={{ animationDelay: "2s" }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] text-neutral-700 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-neutral-800 flex justify-center pt-2">
            <div className="w-0.5 h-2 rounded-full bg-amber-500/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
