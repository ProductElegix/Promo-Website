import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Header } from "@/components/sections/Header";
import { Attribution } from "@/components/ui/Attribution";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { META, SOCIALS } from "@/lib/content";
import { INDEXABLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: META.title, template: "%s · Elegix" },
  description: META.description,
  keywords: META.keywords,
  applicationName: "Elegix",
  authors: [{ name: "Elegix", url: SITE_URL }],
  creator: "Elegix",
  category: "lifestyle",
  alternates: { canonical: "/" },
  robots: INDEXABLE ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } : { index: false, follow: false },
  openGraph: { title: META.title, description: META.description, url: "/", siteName: "Elegix", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: META.title, description: META.description, site: "@elegixofficial", creator: "@elegixofficial" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

const ORGANIZATION = {
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
      sameAs: SOCIALS.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Elegix",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#f6f5ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={ORGANIZATION} />
        <Attribution />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
