import type { Metadata } from "next";
import { BalanceCheck } from "@/components/sections/BalanceCheck";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { CHECK_PAGE as P } from "@/lib/content";
import { OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: P.meta.title,
  description: P.meta.description,
  alternates: { canonical: "/life-balance-check" },
  openGraph: { title: `${P.meta.title} · Elegix`, description: P.meta.description, url: "/life-balance-check", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${P.meta.title} · Elegix`, description: P.meta.description, images: [OG_IMAGE] },
};

export default function LifeBalanceCheck() {
  return (
    <main>
      <Breadcrumbs name="Life Balance Check" path="/life-balance-check" />
      <BalanceCheck standalone />
      <Faq />
    </main>
  );
}
