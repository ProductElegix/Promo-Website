/** Sends a GA4 event when analytics is loaded and allowed (consent mode keeps it cookieless until "Accept"). */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", event, params);
}
