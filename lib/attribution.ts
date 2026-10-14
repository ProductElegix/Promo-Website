/**
 * First-touch attribution, captured in the browser on the first page view and sent with every signup:
 * UTM tags and the referrer. Kept in localStorage; the site works without it (private mode, blocked storage).
 */
export type Attribution = { utm_source?: string; utm_medium?: string; utm_campaign?: string; referrer?: string; landing?: string };

const KEY = "elegix_attribution";

export function captureAttribution() {
  try {
    if (localStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const a: Attribution = {
      utm_source: q.get("utm_source") || undefined,
      utm_medium: q.get("utm_medium") || undefined,
      utm_campaign: q.get("utm_campaign") || undefined,
      referrer: ref || undefined,
      landing: window.location.pathname + window.location.search,
    };
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // storage unavailable: signups still work, just without attribution
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}
