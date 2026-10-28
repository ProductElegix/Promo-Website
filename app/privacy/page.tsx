import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/ui/LegalPage";
import { LEGAL_ENTITY, POLICY_VERSION } from "@/lib/content";
import { PRIVACY_POLICY, websiteSection } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Elegix collects, uses and protects your personal data on the website, the waitlist and the app, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy policy · Elegix", description: "How Elegix collects, uses and protects your personal data on the website, the waitlist and the app, and the rights you have over it.", url: "/privacy", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
};

export default function Privacy() {
  return (
    <>
      <Breadcrumbs name="Privacy policy" path="/privacy" />
      <LegalPage doc={PRIVACY_POLICY} version={POLICY_VERSION} extra={[websiteSection(LEGAL_ENTITY)]} />
    </>
  );
}
