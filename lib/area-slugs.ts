import type { AreaKey } from "@/lib/content";

/** The address of each life area's home inside Guides: /guides/<slug>. Small on purpose, so client components can use it. */
export const AREA_SLUGS: Record<AreaKey, string> = {
  health: "health",
  people: "relationships",
  meaning: "spirituality",
  hobby: "leisure",
  growth: "personal-growth",
  career: "finance-and-career",
};

export const areaHref = (key: AreaKey) => `/guides/${AREA_SLUGS[key]}`;
