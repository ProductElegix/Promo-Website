import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { POLICY_VERSION } from "@/lib/content";
import { PRIVACY_POLICY, WEBSITE_SECTION } from "@/lib/legal";

export const metadata: Metadata = { title: "Privacy policy · Elegix" };

export default function Privacy() {
  return <LegalPage doc={PRIVACY_POLICY} version={POLICY_VERSION} extra={[WEBSITE_SECTION]} />;
}
