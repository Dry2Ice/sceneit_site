export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-bold text-white tracking-tight">
              Кино<span className="text-amber-500">Мир</span>
            </span>
            <p className="text-neutral-500 text-sm mt-1">
              Сообщество настоящих ценителей кино
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#sections" className="hover:text-white transition-colors">Разделы</a>
            <a href="#founders" className="hover:text-white transition-colors">О нас</a>
            <a href="#register" className="hover:text-white transition-colors">Регистрация</a>
          </div>

          <p className="text-neutral-600 text-xs">
            &copy; 2026 КиноМир. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
