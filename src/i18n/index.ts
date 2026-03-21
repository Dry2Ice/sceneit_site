import { cookies } from "next/headers";
import { en } from "./en";
import { ru } from "./ru";
import type { Translations } from "./en";

export type Lang = "en" | "ru";

const translations: Record<Lang, Translations> = { en, ru };

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  return lang === "ru" ? "ru" : "en";
}

export async function setLang(lang: Lang) {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 365 * 24 * 60 * 60, sameSite: "lax" });
}

export async function t(): Promise<Translations> {
  const lang = await getLang();
  return translations[lang];
}

export { en, ru };
export type { Translations };
