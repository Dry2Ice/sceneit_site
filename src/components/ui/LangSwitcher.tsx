"use client";

import { switchLang } from "@/actions/lang";
import { useRouter } from "next/navigation";

export function LangSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();

  async function handleSwitch(lang: "en" | "ru") {
    await switchLang(lang);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-white/[0.03] rounded-md border border-neutral-800/30">
      <button
        onClick={() => handleSwitch("en")}
        className={`px-2 py-0.5 rounded text-[9px] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
          currentLang === "en"
            ? "bg-white/[0.08] text-white"
            : "text-neutral-600 hover:text-neutral-400"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleSwitch("ru")}
        className={`px-2 py-0.5 rounded text-[9px] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
          currentLang === "ru"
            ? "bg-white/[0.08] text-white"
            : "text-neutral-600 hover:text-neutral-400"
        }`}
      >
        RU
      </button>
    </div>
  );
}
