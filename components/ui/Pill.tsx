import type { CSSProperties } from "react";
import { AREAS, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";

export function areaVars(area: AreaKey): CSSProperties {
  return { ["--s" as string]: `var(--${area}-s)`, ["--t" as string]: `var(--${area}-t)` };
}

type Props = { area: AreaKey; label?: string; strong?: boolean; icon?: boolean; className?: string };

export function Pill({ area, label, strong = false, icon = true, className = "" }: Props) {
  return (
    <span className={`pill${strong ? " strong" : ""} ${className}`} style={areaVars(area)}>
      {icon && <AreaIcon area={area} />}
      {label ?? AREAS[area].short}
    </span>
  );
}
