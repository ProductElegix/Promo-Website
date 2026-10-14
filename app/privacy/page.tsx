import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { LEGAL_ENTITY, POLICY_VERSION } from "@/lib/content";
import { PRIVACY_POLICY, websiteSection } from "@/lib/legal";

export const metadata: Metadata = { title: "Privacy policy · Elegix" };

export default function Privacy() {
  return <LegalPage doc={PRIVACY_POLICY} version={POLICY_VERSION} extra={[websiteSection(LEGAL_ENTITY)]} />;
}
