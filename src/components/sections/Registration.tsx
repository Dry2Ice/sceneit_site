"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#07070a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.06)_0%,_transparent_50%)]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-500/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500/60">Join</span>
              <div className="w-8 h-px bg-amber-500/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Be Among the First
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-md mx-auto">
              Early members get exclusive access to beta features, founding member badges,
              and a permanent place in SceneIt history.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {submitted ? (
            <div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-amber-500/20">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6 ring-1 ring-amber-500/20">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Scene</h3>
              <p className="text-neutral-400 text-sm">
                Check your inbox — confirmation sent to{" "}
                <span className="text-amber-400">{email}</span>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.02] rounded-2xl p-8 sm:p-10 border border-neutral-800/50 backdrop-blur-sm"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-neutral-400 mb-2 tracking-wider uppercase">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-400 mb-2 tracking-wider uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-neutral-400 mb-2 tracking-wider uppercase">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full mt-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,168,83,0.3)] hover:scale-[1.02]"
              >
                <span className="relative z-10 text-sm tracking-wide">Create Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <p className="text-center text-neutral-600 text-xs mt-5">
                By signing up, you agree to our{" "}
                <a href="#" className="text-amber-500/60 hover:text-amber-400 transition-colors">Terms</a>
                {" "}&{" "}
                <a href="#" className="text-amber-500/60 hover:text-amber-400 transition-colors">Privacy</a>
              </p>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
