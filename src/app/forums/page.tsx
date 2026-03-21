import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Riot Reel — SceneIt Forums",
  description: "Where opinions collide. Join heated film debates, community polls, and director showdowns.",
};

export default function ForumsPage() {
  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]" />

      {/* Ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20"
        style={{ background: "rgba(167, 139, 250, 0.3)", left: "20%", top: "10%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-15"
        style={{ background: "rgba(167, 139, 250, 0.2)", right: "10%", bottom: "20%" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Back link */}
        <Link
          href="/"
          className="absolute top-24 left-6 sm:left-10 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-violet-400 transition-colors duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        {/* Logo */}
        <div className="w-full max-w-3xl mb-10" style={{ animation: "fadeInUp 1s ease-out both" }}>
          <svg
            viewBox="0 0 1761.72 516.42"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 0 40px rgba(167, 139, 250, 0.3))" }}
          >
            <defs>
              <style>
                {`.cls-1-forums { font-family: Molot, sans-serif; font-size: 428.75px; }`}
              </style>
            </defs>
            <text className="cls-1-forums" fill="#a78bfa" transform="translate(900.37 397.55)">
              <tspan x="0" y="0">Riot</tspan>
            </text>
            <text className="cls-1-forums" fill="#a78bfa" transform="translate(917.52 397.55) rotate(-180) scale(1 -1)">
              <tspan x="0" y="0">Reel</tspan>
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, #a78bfa, transparent)",
            animation: "fadeInUp 1s 0.2s ease-out both",
          }}
        />

        {/* Tagline */}
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "#a78bfa", opacity: 0.6, animation: "fadeInUp 1s 0.3s ease-out both" }}
        >
          Where Opinions Collide
        </p>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center"
          style={{ animation: "fadeInUp 1s 0.4s ease-out both" }}
        >
          Forums
        </h1>

        {/* Description */}
        <p
          className="text-neutral-400 text-sm sm:text-base max-w-xl text-center leading-relaxed mb-12"
          style={{ animation: "fadeInUp 1s 0.5s ease-out both" }}
        >
          A battleground for cinephile discourse. Debate the greatest directors, argue over
          controversial rankings, and cast your vote in polls that shape the community canon.
        </p>

        {/* Coming soon badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/[0.03] backdrop-blur-sm"
          style={{
            borderColor: "rgba(167, 139, 250, 0.15)",
            animation: "fadeInUp 1s 0.6s ease-out both",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">Coming Soon</span>
        </div>
      </div>
    </main>
  );
}
