import { UK_PAGES } from "@/lib/uk/guide-pages";

/** Ukrainian "Key takeaways" per page slug, like lib/guide-takeaways.ts. */
export const UK_TAKEAWAYS: Record<string, string[]> = Object.fromEntries(
  Object.entries(UK_PAGES).flatMap(([slug, p]) => (p.takeaways ? [[slug, p.takeaways]] : [])),
);
