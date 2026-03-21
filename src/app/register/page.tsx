import { RegisterForm } from "@/components/ui/RegisterForm";
import { getLang, en, ru } from "@/i18n";

export default async function RegisterPage() {
  const lang = await getLang();
  const t = lang === "ru" ? ru : en;

  return (
    <RegisterForm t={{
      createAccount: t.auth.createAccount,
      joinSceneIt: t.auth.joinSceneIt,
      username: t.auth.username,
      email: t.auth.email,
      password: t.auth.password,
      minChars: t.auth.minChars,
      register: t.auth.register,
      creating: t.auth.creating,
      alreadyAccount: t.auth.alreadyAccount,
      signInLink: t.auth.signInLink,
      back: t.nav.back,
    }} />
  );
}
