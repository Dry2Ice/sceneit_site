"use client";

import { useState } from "react";

export function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(234,179,8,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-amber-500/80 text-sm tracking-[0.2em] uppercase font-medium">
            Присоединяйся
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Стань частью КиноМира
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto">
            Зарегистрируйтесь, чтобы участвовать в обсуждениях, голосованиях, квизах
            и получать персональные рекомендации
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 bg-neutral-900/50 rounded-2xl border border-amber-500/20">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Добро пожаловать!</h3>
            <p className="text-neutral-400">
              Проверьте почту — мы отправили ссылку для подтверждения на <span className="text-amber-500">{email}</span>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-900/50 rounded-2xl p-8 sm:p-10 border border-neutral-800 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Имя
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут?"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Минимум 8 символов"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]"
            >
              Зарегистрироваться
            </button>

            <p className="text-center text-neutral-500 text-xs">
              Регистрируясь, вы соглашаетесь с{" "}
              <a href="#" className="text-amber-500/70 hover:text-amber-400">условиями использования</a>
              {" "}и{" "}
              <a href="#" className="text-amber-500/70 hover:text-amber-400">политикой конфиденциальности</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
