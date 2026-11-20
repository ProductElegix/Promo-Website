/**
 * Ukrainian text for the guides and life area pages, keyed by slug. Only words live here: slugs,
 * dates, photos, life areas and tools come from lib/guides.ts. A page without an entry is shown in
 * English on /uk until it's translated. The long extra sections live in lib/uk/guide-extras/<slug>.ts.
 */
import type { GuideText } from "@/lib/guides";

export const UK_GUIDES: Record<string, GuideText> = {};
