import Script from "next/script";

/**
 * Cloudflare Web Analytics: cookieless, aggregated page-view statistics, so it runs without the
 * cookie banner. Vercel deployments only (not local). Token from NEXT_PUBLIC_CF_BEACON_TOKEN.
 */
const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN || "b9346fb3b2ea4b628fde419002f8dd55";

export function CloudflareAnalytics() {
  if (!process.env.VERCEL_ENV) return null;
  return <Script id="cf-web-analytics" src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" data-cf-beacon={JSON.stringify({ token: TOKEN })} />;
}
