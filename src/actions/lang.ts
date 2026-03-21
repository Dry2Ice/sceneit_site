"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function switchLang(lang: "en" | "ru") {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 365 * 24 * 60 * 60, sameSite: "lax" });
  revalidatePath("/");
}
