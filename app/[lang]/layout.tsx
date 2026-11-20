import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { Header } from "@/components/sections/Header";
import { Attribution } from "@/components/ui/Attribution";
import { Motion } from "@/components/ui/Motion";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { HashScroll } from "@/components/ui/HashScroll";
import { Clarity } from "@/components/ui/Clarity";
import { CloudflareAnalytics } from "@/components/ui/CloudflareAnalytics";
import { AhrefsAnalytics } from "@/components/ui/AhrefsAnalytics";
import { GoogleAnalytics } from "@/components/ui/GoogleAnalytics";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { LangProvider } from "@/components/ui/Lang";
import { LanguageSuggest } from "@/components/ui/LanguageSuggest";
import { contentOf } from "@/lib/l10n";
import { LANGS, OG_LOCALE, isLang, type Lang } from "@/lib/i18n";
import { langMeta } from "@/lib/meta";
import { FOUNDER_ID, INDEXABLE, SITE_URL, founderPerson } from "@/lib/site";
import "../globals.css";

const sans = Inter_Tight({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

const langOf = async (params: Props["params"]): Promise<Lang> => { const { lang } = await params; return isLang(lang) ? lang : "en"; };

export async function generateMetadata({ params }: { params: Props["params"] }): Promise<Metadata> {
  const lang = await langOf(params);
  const { META } = contentOf(lang);
  const lm = langMeta(lang, "/");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: META.title, template: "%s · Elegix" },
    description: META.description,
    keywords: META.keywords,
    applicationName: "Elegix",
    authors: [{ name: "Elegix", url: SITE_URL }],
    creator: "Elegix",
    category: "lifestyle",
    alternates: lm.alternates,
    robots: lm.robots ?? (INDEXABLE ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } : { index: false, follow: false }),
    openGraph: { title: META.title, description: META.description, url: lm.url, siteName: "Elegix", type: "website", locale: OG_LOCALE[lang] },
    twitter: { card: "summary_large_image", title: META.title, description: META.description, site: "@elegixofficial", creator: "@elegixofficial" },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
  };
}

function organization(lang: Lang) {
  const { BRAND, META, SOCIALS } = contentOf(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Elegix",
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon.png`,
        email: "hello@elegix.net",
        description: META.description,
        slogan: BRAND.slogan,
        disambiguatingDescription: BRAND.nameMeaning,
        sameAs: SOCIALS.map((s) => s.href),
        founder: { "@id": FOUNDER_ID },
      },
      founderPerson(contentOf("en").TRUST.founder),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Elegix",
        url: SITE_URL,
        inLanguage: lang,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export const viewport: Viewport = { themeColor: "#2a2a2a", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children, params }: Props) {
  const lang = await langOf(params);
  return (
    <html lang={lang} data-scroll-behavior="smooth" className={sans.variable}>
      <body>
        <LangProvider lang={lang}>
        <JsonLd data={organization(lang)} />
        <Attribution />
        <Motion />
        <ScrollToTop />
        <HashScroll />
        <Clarity />
        <CloudflareAnalytics />
        <AhrefsAnalytics />
        <GoogleAnalytics />
        <Header />
        <div className="page">{children}</div>
        <Footer />
        <LanguageSuggest />
        </LangProvider>
      </body>
    </html>
  );
}
