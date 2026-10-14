import { ClarityConsent } from "./ClarityConsent";

/**
 * Microsoft Clarity (heatmaps and session replays). Runs on Vercel deployments only (production and
 * the dev preview), never locally, and only after the visitor accepts the cookie banner.
 * Project ID from NEXT_PUBLIC_CLARITY_ID, falling back to Elegix's project.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "wptvh05v5v";

export function Clarity() {
  if (!process.env.VERCEL_ENV) return null;
  return <ClarityConsent id={CLARITY_ID} />;
}
