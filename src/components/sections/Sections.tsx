const sections = [
  {
    title: "Форум и Голосования",
    subtitle: "Общайся и решай",
    description:
      "Присоединяйтесь к обсуждениям лучших фильмов, режиссёров и тенденций киноиндустрии. Участвуйте в голосованиях за лучшие фильмы года, десятилетия и всех времён. Ваши мнения формируют рейтинги сообщества.",
    features: ["Тематические обсуждения", "Голосования за лучшие фильмы", "Споры о классике и новинках", "Рейтинги сообщества"],
    color: "from-indigo-600 to-indigo-800",
    accent: "bg-indigo-500",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Рецензии и Новости",
    subtitle: "Читай и узнавай",
    description:
      "Читайте глубокие рецензии от экспертов и любителей кино. Будьте в курсе последних новостей киноиндустрии: анонсы премьер, трейлеры, интервью с режиссёрами и актёрами. Всё самое важное из мира кино — в одном месте.",
    features: ["Экспертные рецензии", "Новости индустрии", "Анонсы премьер", "Ретроспективы классики"],
    color: "from-red-700 to-rose-900",
    accent: "bg-red-500",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    title: "Квизы и Тесты",
    subtitle: "Проверь себя",
    description:
      "Испытайте свои знания кино в увлекательных квизах и тестах. Отгадывайте фильмы по кадрам, проверяйте знание актёров и режиссёров, соревнуйтесь с другими участниками и поднимайтесь в таблице лидеров.",
    features: ["Квизы по жанрам и эпохам", "Угадай фильм по кадру", "Таблица лидеров", "Еженедельные челленджи"],
    color: "from-amber-600 to-yellow-700",
    accent: "bg-amber-500",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export function Sections() {
  return (
    <section id="sections" className="py-20 bg-neutral-950">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Наши Разделы</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Три направления для настоящих киноманов — обсуждай, читай, проверяй себя
        </p>
      </div>

      <div className="space-y-0">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`relative overflow-hidden bg-gradient-to-r ${section.color}`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${section.accent} p-3 rounded-xl text-white/90 bg-white/10`}>
                      {section.icon}
                    </div>
                    <div>
                      <span className="text-white/60 text-xs tracking-widest uppercase">
                        {section.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed text-base sm:text-lg mb-6">
                    {section.description}
                  </p>

                  <a
                    href="#register"
                    className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all duration-300 group"
                  >
                    Узнать больше
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {section.features.map((feature, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-white/70 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/90 text-sm font-medium">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
