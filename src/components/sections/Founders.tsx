"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const founders = [
  {
    name: "Alexei Petrov",
    role: "Founder & Creative Director",
    bio: "Film scholar with 15 years in the industry. VGIK graduate and contributor to Sight & Sound. Believes cinema is the mirror of the human soul.",
    details: "Alexei has programmed film festivals across Eastern Europe, curated retrospectives at the Moscow Museum of Cinema, and written extensively on Soviet and post-Soviet cinema. His passion lies in bridging the gap between academic film theory and everyday moviegoing.",
    gradient: "from-amber-600 via-yellow-500 to-amber-700",
    accent: "#f59e0b",
    initials: "AP",
  },
  {
    name: "Maria Sokolova",
    role: "Co-Founder & Head of Content",
    bio: "Award-winning critic and festival curator. Specializes in arthouse and independent cinema. Winner of the White Elephant Award for criticism.",
    details: "Maria has reviewed for major publications including Iskusstvo Kino and Seance Magazine. She has served on juries at Karlovy Vary, Rotterdam, and Locarno film festivals. Her expertise spans global arthouse cinema, with particular focus on East Asian and Latin American filmmakers.",
    gradient: "from-rose-600 via-pink-500 to-rose-700",
    accent: "#f43f5e",
    initials: "MS",
  },
];

export function Founders({ t = { heading: "The Founders", subtitle: "The minds behind the screen" } }: { t?: { heading: string; subtitle: string } }) {
  const [activeFounder, setActiveFounder] = useState<number | null>(null);

  const handleFounderClick = (index: number) => {
    setActiveFounder(activeFounder === index ? null : index);
  };

  return (
    <section id="founders" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080810]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.03)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-6 h-px bg-amber-500/20" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-amber-500/50">{t.heading}</span>
              <div className="w-6 h-px bg-amber-500/20" />
            </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {t.heading}
              </h2>
              <p className="text-neutral-600 max-w-md mx-auto text-sm">
                {t.subtitle}
              </p>
          </div>
        </AnimatedSection>

        {/* Founder cards — two large photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((founder, index) => {
            const isActive = activeFounder === index;
            const isOtherActive = activeFounder !== null && activeFounder !== index;

            return (
              <AnimatedSection key={index} delay={index * 200}>
                <div
                  onClick={() => handleFounderClick(index)}
                  className={`group cursor-pointer relative rounded-2xl border overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOtherActive
                      ? "opacity-50 scale-[0.97] border-neutral-800/30"
                      : "opacity-100 scale-100 border-neutral-800/50 hover:border-neutral-700/50"
                  }`}
                >
                  {/* Photo area */}
                  <div className={`relative overflow-hidden transition-all duration-700 ${
                    isActive ? "h-[200px] sm:h-[220px]" : "h-[300px] sm:h-[380px] md:h-[420px]"
                  }`}>
                    {/* Gradient placeholder for photo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-80`} />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_100%)]" />

                    {/* Initials overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[80px] sm:text-[100px] font-black text-white/10 select-none">
                        {founder.initials}
                      </span>
                    </div>

                    {/* Bottom info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{founder.name}</h3>
                      <p className="text-xs tracking-wider uppercase" style={{ color: founder.accent, opacity: 0.9 }}>
                        {founder.role}
                      </p>
                    </div>

                    {/* Click hint */}
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isActive ? "bg-white/10 rotate-180" : "bg-black/20 group-hover:bg-white/10"
                    }`}
                      style={{ borderColor: `${founder.accent}40` }}
                    >
                      <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-[#0c0c14] ${
                      isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      {/* Accent line */}
                      <div className="h-px w-full mb-6" style={{ background: `linear-gradient(90deg, transparent, ${founder.accent}30, transparent)` }} />

                      <p className="text-neutral-300 text-sm leading-relaxed mb-4">{founder.bio}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{founder.details}</p>

                      {/* Stats or links */}
                      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-neutral-800/50">
                        <div>
                          <p className="text-lg font-bold" style={{ color: founder.accent }}>15+</p>
                          <p className="text-[9px] tracking-wider uppercase text-neutral-600">Years</p>
                        </div>
                        <div className="w-px h-8 bg-neutral-800/50" />
                        <div>
                          <p className="text-lg font-bold" style={{ color: founder.accent }}>200+</p>
                          <p className="text-[9px] tracking-wider uppercase text-neutral-600">Articles</p>
                        </div>
                        <div className="w-px h-8 bg-neutral-800/50" />
                        <div>
                          <p className="text-lg font-bold" style={{ color: founder.accent }}>50+</p>
                          <p className="text-[9px] tracking-wider uppercase text-neutral-600">Festivals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
