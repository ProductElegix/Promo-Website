"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AREAS, AREA_ORDER, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";
import { track } from "@/lib/track";
import { areaVars } from "./Pill";
import { GuideCards, type Card } from "./GuideCards";
import styles from "@/app/guides/hub.module.css";

type Filter = "all" | "whole" | AreaKey;

type Props = {
  /** every guide, in hub order; in hub order */
  guides: (Card & { areas: AreaKey[] })[];
  /** the life area page for each area: a banner over its guides when that area is picked */
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

  const [query, setQuery] = useState("");
  const tagged = (f: AreaKey) => guides.filter((g) => g.areas.includes(f)).length;
  /** pages a menu item shows; an area also shows that area's own page */
  const count = (f: Filter) => (f === "all" ? guides.length : f === "whole" ? guides.filter((g) => !g.areas.length).length : tagged(f));

  const inFilter: Card[] =
    filter === "all" ? guides
    : filter === "whole" ? guides.filter((g) => !g.areas.length)
    : guides.filter((g) => g.areas.includes(filter));
  const q = query.trim().toLowerCase();
  const pool = q && filter === "all" ? [...guides, ...Object.values(areaPages)] : inFilter;
  const cards = q ? pool.filter((c) => `${c.title} ${c.text}`.toLowerCase().includes(q)) : inFilter;

  const banner = filter !== "all" && filter !== "whole" && areaPages[filter] ? { area: filter, href: areaPages[filter]!.href } : null;

  const items: { f: Filter; label: string }[] = [
    { f: "all", label: "All guides" },
    { f: "whole", label: "Whole life" },
    ...AREA_ORDER.map((a) => ({ f: a as Filter, label: AREAS[a].short })),
  ];

  return (
    <div className={styles.library}>
      <aside className={styles.menu} aria-label="Guide topics">
        <div ref={chipsRef} className={styles.menuList} role="group" aria-label="Filter guides by life area">
          {items.map(({ f, label }) => {
            const area = f !== "all" && f !== "whole" ? f : null;
            return (
              <button key={f} type="button" className={styles.menuItem} aria-pressed={filter === f} onClick={() => pick(f)} style={area ? areaVars(area) : undefined}>
                {area ? <AreaIcon area={area} /> : <span className={f === "whole" ? styles.wheelDot : styles.allDot} aria-hidden="true" />}
                {label}
                <span className={styles.menuCount}>{count(f)}</span>
              </button>
            );
          })}
        </div>
        <nav className={styles.overviews} aria-label="Life area overviews">
          <p>Area overviews</p>
          <ul>
            {AREA_ORDER.filter((a) => areaPages[a]).map((a) => (
              <li key={a}><Link href={areaPages[a]!.href} style={areaVars(a)}><AreaIcon area={a} />{AREAS[a].short}</Link></li>
            ))}
          </ul>
        </nav>
        <label className={styles.search}>
          <span className="sr-only">Search guides</span>
          <input type="search" placeholder="Search guides" value={query} onChange={(e) => setQuery(e.target.value)}
            onBlur={() => q && track("search", { search_term: q })} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </label>
      </aside>
      <div className={styles.libraryMain}>
        <p className={`${styles.result}`} aria-live="polite">
          {q ? `${cards.length} result${cards.length === 1 ? "" : "s"} for “${query.trim()}”`
            : filter === "all" ? `${guides.length} guides`
            : filter === "whole" ? "Guides that look at all 6 areas together"
            : `${tagged(filter)} guide${tagged(filter) === 1 ? "" : "s"} about ${AREAS[filter].short.toLowerCase()}`}
        </p>
        {!q && banner && (
          <Link href={banner.href} className={styles.areaBanner} style={areaVars(banner.area)}>
            <span className={styles.areaBannerIcon}><AreaIcon area={banner.area} /></span>
            <span className={styles.areaBannerText}><strong>{AREAS[banner.area].short}: the area overview</strong><span>{AREAS[banner.area].description} Signs it&apos;s slipping and habits that bring it back.</span></span>
            <span className={styles.areaBannerGo}>Open →</span>
          </Link>
        )}
        {cards.length ? <GuideCards cards={cards} rows /> : <p className={styles.empty}>{!q && banner ? `Guides about ${AREAS[banner.area].short.toLowerCase()} are on the way. Start with the area overview above.` : "Nothing found. Try another word, or pick a life area on the left."}</p>}
      </div>
    </div>
  );
}
