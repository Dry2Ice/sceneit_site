import { AnimatedSection } from "@/components/ui/AnimatedSection";

const sections = [
  {
    name: "Riot Reel",
    tagline: "Where Opinions Collide",
    description:
      "A battleground for cinephile discourse. Debate the greatest directors, argue over controversial rankings, and cast your vote in polls that shape the community canon. Every voice matters, every opinion sparks a new conversation.",
    features: ["Heated Film Debates", "Community Polls & Rankings", "Director Showdowns", "Cult Classic Revivals"],
    gradient: "from-[#2d1b69] via-[#1a1145] to-[#0d0b1a]",
    accentColor: "#a78bfa",
    accentGlow: "rgba(167, 139, 250, 0.15)",
    borderGlow: "border-violet-500/20",
    number: "01",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
      </svg>
    ),
  },
  {
    name: "Flick Feed",
    tagline: "Your Cinema Intelligence",
    description:
      "A curated stream of cinematic knowledge. Deep-dive reviews from seasoned critics, breaking industry news, exclusive interviews, and retrospectives that illuminate cinema history. Stay informed, stay inspired.",
    features: ["Expert Deep Reviews", "Breaking Film News", "Festival Coverage", "Retrospective Archives"],
    gradient: "from-[#4a1528] via-[#2d0f1a] to-[#0d0b1a]",
    accentColor: "#fb7185",
    accentGlow: "rgba(251, 113, 133, 0.15)",
    borderGlow: "border-rose-500/20",
    number: "02",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    name: "Binge Buddy",
    tagline: "Test Your Film IQ",
    description:
      "The ultimate playground for movie trivia fanatics. From frame-guessing challenges to deep-cut director quizzes, prove your cinematic knowledge against thousands of players. Climb the leaderboards and earn your title.",
    features: ["Frame-by-Frame Challenges", "Genre Master Quizzes", "Weekly Tournaments", "Global Leaderboards"],
    gradient: "from-[#451a03] via-[#2a1501] to-[#0d0b1a]",
    accentColor: "#fbbf24",
    accentGlow: "rgba(251, 191, 36, 0.15)",
    borderGlow: "border-amber-500/20",
    number: "03",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export function Sections() {
  return (
    <section id="sections" className="relative">
      {/* Section divider */}
      <div className="relative h-32 bg-[#07070a]">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-neutral-700" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-600">Sections</span>
            <div className="w-8 h-px bg-neutral-700" />
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {sections.map((section, index) => (
          <div key={index} className="relative overflow-hidden">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient}`} />

            {/* Ambient glow */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
              style={{
                background: section.accentGlow,
                right: index % 2 === 0 ? "-10%" : "auto",
                left: index % 2 === 0 ? "auto" : "-10%",
                top: "20%",
              }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, ${section.accentColor} 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:py-36">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                {/* Left content */}
                <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                  <AnimatedSection delay={100}>
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="text-5xl sm:text-6xl font-black tracking-tight"
                        style={{ color: section.accentColor, opacity: 0.15 }}
                      >
                        {section.number}
                      </span>
                      <div className="h-12 w-px" style={{ background: section.accentColor, opacity: 0.3 }} />
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: section.accentColor, opacity: 0.7 }}>
                          {section.tagline}
                        </p>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                          {section.name}
                        </h3>
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={300}>
                    <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                      {section.description}
                    </p>
                  </AnimatedSection>

                  <AnimatedSection delay={500}>
                    <a
                      href="#register"
                      className="group inline-flex items-center gap-3 text-sm font-medium transition-all duration-300 hover:gap-4"
                      style={{ color: section.accentColor }}
                    >
                      <span className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-white/5"
                        style={{ borderColor: `${section.accentColor}40` }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      Enter {section.name}
                    </a>
                  </AnimatedSection>
                </div>

                {/* Right feature cards */}
                <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                  <AnimatedSection delay={200} direction="right">
                    <div className="grid grid-cols-2 gap-3">
                      {section.features.map((feature, i) => (
                        <div
                          key={i}
                          className="group relative bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-1"
                          style={{ borderColor: `${section.accentColor}15` }}
                        >
                          <div
                            className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: `linear-gradient(90deg, transparent, ${section.accentColor}40, transparent)` }}
                          />
                          <div className="mb-3 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: section.accentColor }}>
                            {section.icon}
                          </div>
                          <span className="text-white/80 text-sm font-medium leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>

            {/* Bottom divider */}
            <div className="relative h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
