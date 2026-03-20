import { AnimatedSection } from "@/components/ui/AnimatedSection";

const founders = [
  {
    name: "Alexei Petrov",
    role: "Founder & Creative Director",
    bio: "Film scholar with 15 years in the industry. VGIK graduate and contributor to Sight & Sound. Believes cinema is the mirror of the human soul.",
    gradient: "from-amber-500 to-yellow-600",
    accent: "#f59e0b",
  },
  {
    name: "Maria Sokolova",
    role: "Co-Founder & Head of Content",
    bio: "Award-winning critic and festival curator. Specializes in arthouse and independent cinema. Winner of the White Elephant Award for criticism.",
    gradient: "from-rose-500 to-pink-600",
    accent: "#f43f5e",
  },
  {
    name: "Dmitri Volkov",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer and lifelong cinephile. Former Yandex engineer building the platform that brings this community to life.",
    gradient: "from-violet-500 to-indigo-600",
    accent: "#8b5cf6",
  },
];

export function Founders() {
  return (
    <section id="founders" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-500/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/60">The Team</span>
              <div className="w-8 h-px bg-amber-500/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Built by Cinephiles
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-sm sm:text-base">
              Three passionate minds united by a shared obsession — creating the definitive
              home for cinema lovers worldwide.
            </p>
          </div>
        </AnimatedSection>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {founders.map((founder, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full bg-white/[0.02] rounded-2xl border border-neutral-800/50 p-8 overflow-hidden transition-all duration-700 hover:border-neutral-700/50 hover:bg-white/[0.04]">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${founder.accent}60, transparent)`,
                    }}
                  />

                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${founder.gradient} mb-6 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <svg className="w-7 h-7 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-white mb-1">{founder.name}</h3>
                  <p className="text-xs tracking-wider uppercase mb-4" style={{ color: founder.accent, opacity: 0.8 }}>
                    {founder.role}
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{founder.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
