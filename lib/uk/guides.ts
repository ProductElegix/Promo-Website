/**
 * Ukrainian text for the guides and life area pages, keyed by slug. Only words live here: slugs,
 * dates, photos, life areas and tools come from lib/guides.ts. A page without an entry is shown in
 * English on /uk until it's translated. Each page lives in lib/uk/guide-pages/<slug>.ts with its
 * text, its extra sections (like lib/guide-extras) and its key takeaways.
 */
import type { GuideExtra, GuideText } from "@/lib/guides";
import { UK_PAGES } from "@/lib/uk/guide-pages";

export type UkGuidePage = { text: GuideText; extra?: GuideExtra; takeaways?: string[] };

export const UK_GUIDES: Record<string, GuideText> = Object.fromEntries(Object.entries(UK_PAGES).map(([slug, p]) => [slug, p.text]));
