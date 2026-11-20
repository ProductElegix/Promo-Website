"use client";

import { useEffect, useRef, useState } from "react";
import { AREAS, AREA_ORDER, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";
import { track } from "@/lib/track";
import { areaVars } from "./Pill";
import { GuideCards, type Card } from "./GuideCards";
import styles from "@/app/guides/hub.module.css";

type Filter = "all" | "whole" | AreaKey;

type Props = {
  /** every guide, in hub order; the first is the "Start here" guide, left out of the "All" view */
  guides: (Card & { areas: AreaKey[] })[];
  /** the life area page for each area, shown first when that area is picked */
  areaPages: Partial<Record<AreaKey, Card>>;
};

const isFilter = (v: string | null): v is Filter => v === "all" || v === "whole" || (AREA_ORDER as string[]).includes(v ?? "");

/** Chips over the guide grid: all guides, guides about the whole wheel, or one of the 6 life areas.
 *  The pick lives in ?area= so a filtered view can be shared; without JS every guide shows. */
export function GuideFilter({ guides, areaPages }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("area");
    if (isFilter(v)) setFilter(v);
  }, []);

  // on phones the chips scroll sideways: keep the picked one in view (e.g. after opening ?area=hobby)
  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && chip && row.scrollWidth > row.clientWidth) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2 });
  }, [filter]);

  function pick(f: Filter) {
    setFilter(f);
    track("guide_filter", { area: f });
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("area"); else url.searchParams.set("area", f);
    window.history.replaceState(null, "", url);
  }

  const tagged = (f: AreaKey) => guides.filter((g) => g.areas.includes(f)).length;
  /** pages a chip shows; an area chip also shows that area's own page */
  const count = (f: Filter) => (f === "all" ? guides.length : f === "whole" ? guides.filter((g) => !g.areas.length).length : tagged(f) + (areaPages[f] ? 1 : 0));

  const cards: Card[] =
    filter === "all" ? guides.slice(1)
    : filter === "whole" ? guides.filter((g) => !g.areas.length)
    : [...(areaPages[filter] ? [areaPages[filter]] : []), ...guides.filter((g) => g.areas.includes(filter))];

  const chips: { f: Filter; label: string }[] = [
    { f: "all", label: "All guides" },
    { f: "whole", label: "Whole life" },
    ...AREA_ORDER.map((a) => ({ f: a as Filter, label: AREAS[a].short })),
  ];

  return (
    <>
      <div ref={chipsRef} className={styles.chips} role="group" aria-label="Filter guides by life area">
        {chips.map(({ f, label }) => (
          <button key={f} type="button" className={styles.chip} aria-pressed={filter === f} onClick={() => pick(f)}
            style={f !== "all" && f !== "whole" ? areaVars(f) : undefined} data-area={f !== "all" && f !== "whole" ? "" : undefined}>
            {f !== "all" && f !== "whole" && <AreaIcon area={f} />}
            {label}
            <span className={styles.chipCount}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className={styles.result} aria-live="polite">
        {filter === "all" ? `${guides.length} guides`
          : filter === "whole" ? "Guides that look at all 6 areas together"
          : tagged(filter) ? `${AREAS[filter].short}: the area page and ${tagged(filter)} guide${tagged(filter) === 1 ? "" : "s"}`
          : `${AREAS[filter].short}: the area page. More guides are on the way.`}
      </p>
      <GuideCards cards={cards} />
    </>
  );
}
