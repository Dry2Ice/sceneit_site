import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative bg-[#050507] border-t border-neutral-800/30 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-8">
          <Logo className="w-32 h-auto text-neutral-700" />

          <div className="flex items-center gap-8">
            <a href="#sections" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              Sections
            </a>
            <a href="#founders" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              Team
            </a>
            <a href="#register" className="text-xs tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors">
              Join
            </a>
          </div>

          <div className="w-16 h-px bg-neutral-800/50" />

          <p className="text-neutral-700 text-xs">
            &copy; 2026 SceneIt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
