export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.08)_0%,_transparent_70%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)`
        }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-amber-500/80 text-sm tracking-[0.3em] uppercase font-medium">
            Добро пожаловать в
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          Кино<span className="text-amber-500">Мир</span>
        </h1>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />

        <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-6 leading-relaxed">
          Сообщество настоящих ценителей киноискусства. Обсуждайте, голосуйте,
          исследуйте и проверяйте свои знания в мире кино.
        </p>

        <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto mb-12">
          Форумы и голосования &bull; Рецензии и новости &bull; Квизы и тесты
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#sections"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]"
          >
            Исследовать
          </a>
          <a
            href="#register"
            className="px-8 py-3.5 border border-neutral-700 hover:border-amber-500/50 text-neutral-300 hover:text-white rounded-lg transition-all duration-300"
          >
            Присоединиться
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
