import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/ui/LegalPage";
import { POLICY_VERSION } from "@/lib/content";
import { contentOf } from "@/lib/l10n";
import { PRIVACY_POLICY, websiteSection } from "@/lib/legal";
import { UK_PRIVACY_POLICY, ukWebsiteSection } from "@/lib/uk/legal";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import type { Lang } from "@/lib/i18n";

const DESCRIPTION: Record<Lang, string> = {
  en: "How Elegix collects, uses and protects your personal data on the website, the waitlist and the app, and the rights you have over it.",
  uk: "Як Elegix збирає, використовує й захищає твої персональні дані на сайті, у списку очікування та в застосунку, і які права ти на них маєш.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return pageMeta(lang, "/privacy", { title: lang === "uk" ? UK_PRIVACY_POLICY.title : "Privacy policy", description: DESCRIPTION[lang] });
}

export default async function Privacy() {
  const lang = await getLang();
  const doc = lang === "uk" ? UK_PRIVACY_POLICY : PRIVACY_POLICY;
  const section = (lang === "uk" ? ukWebsiteSection : websiteSection)(contentOf(lang).LEGAL_ENTITY);
  return (
    <>
      <Breadcrumbs name={lang === "uk" ? doc.title : "Privacy policy"} path={langMeta(lang, "/privacy").url} />
      <LegalPage doc={doc} version={POLICY_VERSION} extra={[section]} />
    </>
  );
}
