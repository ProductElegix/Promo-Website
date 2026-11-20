import type { GuideExtra } from "@/lib/guides";
import { UK_PAGES } from "@/lib/uk/guide-pages";

/** Ukrainian extra sections per page slug, like lib/guide-extras. `before` names the Ukrainian h2. */
export const UK_EXTRAS: Record<string, GuideExtra> = Object.fromEntries(
  Object.entries(UK_PAGES).flatMap(([slug, p]) => (p.extra ? [[slug, p.extra]] : [])),
);
