import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/ui/LegalPage";
import { TERMS } from "@/lib/legal";
import { UK_TERMS } from "@/lib/uk/legal";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import type { Lang } from "@/lib/i18n";

const DESCRIPTION: Record<Lang, string> = {
  en: "The terms that apply when you use the Elegix website, join the waitlist or use the app: your account, acceptable use and our liability.",
  uk: "Умови, що діють, коли ти користуєшся сайтом Elegix, приєднуєшся до списку очікування чи користуєшся застосунком: твій акаунт, допустиме використання й наша відповідальність.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return pageMeta(lang, "/terms", { title: (lang === "uk" ? UK_TERMS : TERMS).title, description: DESCRIPTION[lang] });
}

export default async function Terms() {
  const lang = await getLang();
  const doc = lang === "uk" ? UK_TERMS : TERMS;
  return (
    <>
      <Breadcrumbs name={doc.title} path={langMeta(lang, "/terms").url} />
      <LegalPage doc={doc} />
    </>
  );
}
