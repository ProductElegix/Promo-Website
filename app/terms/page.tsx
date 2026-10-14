import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = { title: "Terms of Service · Elegix" };

export default function Terms() {
  return <LegalPage doc={TERMS} />;
}
