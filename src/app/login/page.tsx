import { LoginForm } from "@/components/ui/LoginForm";
import { getLang, en, ru } from "@/i18n";

export default async function LoginPage() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <LoginForm t={{
      welcomeBack: t.auth.welcomeBack,
      email: t.auth.email,
      password: t.auth.password,
      yourPassword: t.auth.yourPassword,
      signInLink: t.auth.signInLink,
      signingIn: t.auth.signingIn,
      noAccount: t.auth.noAccount,
      createOne: t.auth.createOne,
      back: t.nav.back,
    }} />
  );
}
