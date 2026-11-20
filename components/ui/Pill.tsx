"use client";

import type { AreaKey } from "@/lib/content";
import { useContent } from "./Lang";
import { areaVars } from "./areaVars";
import { AreaIcon } from "./AreaIcon";


type Props = { area: AreaKey; label?: string; strong?: boolean; icon?: boolean; className?: string };

export function Pill({ area, label, strong = false, icon = true, className = "" }: Props) {
  const { AREAS } = useContent();
  return (
    <span className={`pill${strong ? " strong" : ""} ${className}`} style={areaVars(area)}>
      {icon && <AreaIcon area={area} />}
      {label ?? AREAS[area].short}
    </span>
  );
}
