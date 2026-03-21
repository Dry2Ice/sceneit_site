import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Binge Buddy — SceneIt Quizzes",
  description: "Test your film IQ. Frame-by-frame challenges, genre master quizzes, and weekly tournaments.",
};

export default function QuizzesPage() {
  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#451a03] via-[#2a1501] to-[#0d0b1a]" />

      {/* Ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-20"
        style={{ background: "rgba(251, 191, 36, 0.3)", left: "30%", top: "15%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-15"
        style={{ background: "rgba(251, 191, 36, 0.2)", right: "15%", bottom: "25%" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Back link */}
        <Link
          href="/"
          className="absolute top-24 left-6 sm:left-10 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-amber-400 transition-colors duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        {/* Logo */}
        <div className="w-full max-w-2xl mb-10 flex justify-center" style={{ animation: "fadeInUp 1s ease-out both" }}>
          <svg
            viewBox="0 0 1761.72 516.42"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 40px rgba(251, 191, 36, 0.3))", height: "190px", width: "auto" }}
          >
            <defs>
              <style>
                {`.cls-1-quizzes { font-family: 'Square721 BT', sans-serif; font-size: 303.16px; font-weight: 700; }`}
              </style>
            </defs>
            <text className="cls-1-quizzes" fill="#fbbf24" transform="translate(828.8 353.35)">
              <tspan x="0" y="0">Buddy</tspan>
            </text>
            <text className="cls-1-quizzes" fill="#fbbf24" transform="translate(851.81 353.35) rotate(-180) scale(1 -1)">
              <tspan x="0" y="0">Binge</tspan>
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, #fbbf24, transparent)",
            animation: "fadeInUp 1s 0.2s ease-out both",
          }}
        />

        {/* Tagline */}
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "#fbbf24", opacity: 0.6, animation: "fadeInUp 1s 0.3s ease-out both" }}
        >
          Test Your Film IQ
        </p>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center"
          style={{ animation: "fadeInUp 1s 0.4s ease-out both" }}
        >
          Quizzes
        </h1>

        {/* Description */}
        <p
          className="text-neutral-400 text-sm sm:text-base max-w-xl text-center leading-relaxed mb-12"
          style={{ animation: "fadeInUp 1s 0.5s ease-out both" }}
        >
          The ultimate playground for movie trivia fanatics. From frame-guessing challenges
          to deep-cut director quizzes, prove your cinematic knowledge.
        </p>

        {/* Coming soon badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/[0.03] backdrop-blur-sm"
          style={{
            borderColor: "rgba(251, 191, 36, 0.15)",
            animation: "fadeInUp 1s 0.6s ease-out both",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">Coming Soon</span>
        </div>
      </div>
    </main>
  );
}
