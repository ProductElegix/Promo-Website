import type { CSSProperties } from "react";
import type { AreaKey } from "@/lib/content";

/** CSS variables for an area's colours (--s strong, --t tint). Plain function, usable on the server and the client. */
export function areaVars(area: AreaKey): CSSProperties {
  return { ["--s" as string]: `var(--${area}-s)`, ["--t" as string]: `var(--${area}-t)` };
}
