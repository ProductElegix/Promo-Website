import Script from "next/script";

/**
 * Ahrefs Web Analytics: cookieless page-view statistics shown next to SEO data in Ahrefs, so it runs
 * without the cookie banner. Vercel deployments only (not local). Key from NEXT_PUBLIC_AHREFS_ANALYTICS_KEY.
 */
const KEY = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY || "Wf4GcVMDkm9ayL+dTj/mQA";

export function AhrefsAnalytics() {
  if (!process.env.VERCEL_ENV) return null;
  return <Script id="ahrefs-analytics" src="https://analytics.ahrefs.com/analytics.js" data-key={KEY} strategy="afterInteractive" />;
}
