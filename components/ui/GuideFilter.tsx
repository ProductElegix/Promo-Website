"use client";

import Link, { useContent, useUi } from "@/components/ui/Lang";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";
import { AreaTags } from "./AreaTags";
import { Media } from "./Media";
import { track } from "@/lib/track";
import { areaVars } from "./areaVars";
import type { Card } from "./GuideCards";
import styles from "@/app/[lang]/guides/hub.module.css";

type Filter = "all" | "whole" | AreaKey;

type Props = {
  /** every guide, newest first */
  guides: (Card & { areas: AreaKey[] })[];
  /** the life area page for each area: listed in the sidebar, and a banner over its guides when that area is picked */
  areaPages: Partial<Record<AreaKey, Card>>;
  /** the sidebar's last box (the email sign-up), rendered by the page */
  subscribe?: ReactNode;
};

const isFilter = (v: string | null): v is Filter => v === "all" || v === "whole" || (AREA_ORDER as string[]).includes(v ?? "");

/** The guide library, laid out like a magazine: a list of guides (photo left, kicker, title, area tags) with search on the left,
 *  and a sidebar with topic chips (all, whole wheel, or one of the 6 areas), the 6 life area pages and the email sign-up.
 *  The picked topic lives in ?area= so a filtered view can be shared; without JS every guide shows. */
export function GuideFilter({ guides, areaPages, subscribe }: Props) {
  const { AREAS } = useContent();
  const t = useUi();
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
    { f: "all", label: t.allGuides },
    { f: "whole", label: t.wholeLife },
    ...AREA_ORDER.map((a) => ({ f: a as Filter, label: AREAS[a].short })),
  ];
  const areaList = AREA_ORDER.filter((a) => areaPages[a]).map((a) => ({ area: a, card: areaPages[a]! }));

  return (
    <div className={styles.library}>
      <div className={styles.libraryMain}>
        <div className={styles.colHead}>
          <h2 className={styles.colTitle}>{t.allGuides}</h2>
          <p className={styles.result} aria-live="polite">
            {q ? t.nResultsFor(cards.length, query.trim())
              : filter === "all" ? t.nGuides(guides.length)
              : filter === "whole" ? t.wholeLifeGuides
              : t.nGuidesAbout(tagged(filter), AREAS[filter].short)}
          </p>
        </div>
        <label className={styles.search}>
          <span className="sr-only">{t.searchGuides}</span>
          <input type="search" placeholder={t.searchGuides} value={query} onChange={(e) => setQuery(e.target.value)}
            onBlur={() => q && track("search", { search_term: q })} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </label>
        {!q && banner && (
          <Link href={banner.href} className={styles.areaBanner} style={areaVars(banner.area)}>
            <span className={styles.areaBannerIcon}><AreaIcon area={banner.area} /></span>
            <span className={styles.areaBannerText}><strong>{t.areaOverviewTitle(AREAS[banner.area].short)}</strong><span>{AREAS[banner.area].description} {t.areaOverviewText}</span></span>
            <span className={styles.areaBannerGo}>{t.open}</span>
          </Link>
        )}
        {cards.length ? (
          <ul className={styles.list}>
            {cards.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={styles.item}>
                  <span className={styles.itemPhoto}><Media media={{ ...c.media, ratio: "16 / 10" }} compact sizes="(max-width: 640px) 120px, 220px" /></span>
                  <span className={styles.itemText}>
                    <span className={styles.kicker}>{c.date ? `${c.meta} · ${c.date}` : c.meta}</span>
                    <h3>{c.title}</h3>
                    {c.areas && <AreaTags areas={c.areas} />}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className={styles.empty}>{!q && banner ? t.guidesOnTheWay(AREAS[banner.area].short) : t.nothingFound}</p>}
      </div>

      <section className={styles.topics} aria-label={t.guideTopics}>
        <h2 className={styles.colTitle}>{t.guideTopics}</h2>
        <div ref={chipsRef} className={styles.chips} role="group" aria-label={t.filterByArea}>
          {items.map(({ f, label }) => {
            const area = f !== "all" && f !== "whole" ? f : null;
            return (
              <button key={f} type="button" className={styles.chip} aria-pressed={filter === f} data-area={area ?? undefined} onClick={() => pick(f)} style={area ? areaVars(area) : undefined}>
                {area ? <AreaIcon area={area} /> : f === "whole" ? <span className="area-wheel" aria-hidden="true" /> : null}
                {label}
                <span className={styles.chipCount}>{count(f)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {areaList.length > 0 && (
        <nav className={styles.areasSide} aria-label={t.areaOverviews}>
          <h2 className={styles.colTitle}>{t.areaOverviews}</h2>
          <ul>
            {areaList.map(({ area, card }) => (
              <li key={area}>
                <Link href={card.href} className={styles.sideItem}>
                  <span className={styles.sidePhoto}><Media media={{ ...card.media, ratio: "1 / 1" }} compact sizes="80px" /></span>
                  <span className={styles.sideText}>
                    <span className={styles.kicker} style={areaVars(area)}><AreaIcon area={area} />{AREAS[area].short}</span>
                    <span className={styles.sideTitle}>{card.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {subscribe && <div className={styles.subscribe}>{subscribe}</div>}
    </div>
  );
}
