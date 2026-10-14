import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { LegalPage } from "@/components/ui/LegalPage";
import { LEGAL_ENTITY, POLICY_VERSION } from "@/lib/content";
import { PRIVACY_POLICY, websiteSection } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Elegix collects, uses and protects your personal data on the website, the waitlist and the app.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy policy · Elegix", description: "How Elegix collects, uses and protects your personal data on the website, the waitlist and the app.", url: "/privacy", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
};

export default function Privacy() {
  return <LegalPage doc={PRIVACY_POLICY} version={POLICY_VERSION} extra={[websiteSection(LEGAL_ENTITY)]} />;
}
