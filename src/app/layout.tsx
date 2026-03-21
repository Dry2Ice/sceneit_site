import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { AuthButtons } from "@/components/ui/AuthButtons";
import { LangSwitcher } from "@/components/ui/LangSwitcher";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser } from "@/actions/auth";
import { getLang, en, ru } from "@/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SceneIt — Every Frame Tells a Story",
  description:
    "The ultimate platform for cinephiles. Discuss, discover, and dive deep into the world of cinema.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, lang] = await Promise.all([getCurrentUser(), getLang()]);
  const t = lang === "ru" ? ru : en;
  const userForClient = user ? { id: user.id, username: user.username, avatar: user.avatar } : null;

  return (
    <html lang={lang} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#07070a] text-white`}
      >
        <Header
          nav={{ sections: t.nav.sections, forums: t.nav.forums, news: t.nav.news, quizzes: t.nav.quizzes }}
          langSlot={<LangSwitcher currentLang={lang} />}
          authSlot={<AuthButtons user={userForClient} t={{ signIn: t.nav.signIn, join: t.nav.join, create: t.nav.create, signOut: t.nav.signOut }} />}
        />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
