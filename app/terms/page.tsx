import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/ui/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the Elegix website, join the waitlist or use the app.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Service · Elegix", description: "The terms that apply when you use the Elegix website, join the waitlist or use the app.", url: "/terms", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
};

export default function Terms() {
  return (
    <>
      <Breadcrumbs name="Terms of Service" path="/terms" />
      <LegalPage doc={TERMS} />
    </>
  );
}
