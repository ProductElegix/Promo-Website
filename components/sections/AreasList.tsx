"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link, { useContent, useUi } from "@/components/ui/Lang";
import { AREA_ORDER } from "@/lib/content";
import { areaGuideHref } from "@/lib/guides";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Media } from "@/components/ui/Media";
import { Pill } from "@/components/ui/Pill";
import { areaVars } from "@/components/ui/areaVars";
import { Rich } from "@/components/ui/Rich";
import styles from "./AreasList.module.css";

const COUNT = AREA_ORDER.length;

/**
 * "Which area are you neglecting?": one near full-height card, photo on one half and a dark panel
 * with the six areas on the other. The card is sticky inside a taller track, so scrolling the page
 * steps through the areas; hovering or clicking an area picks it too.
 */
export function AreasList() {
  const { AREAS, AREAS_SECTION } = useContent();
  const t = useUi();
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // scroll position inside the track -> active area
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const tr = track.current, cd = card.current;
      if (!tr || !cd) return;
      const travel = tr.offsetHeight - cd.offsetHeight;
      if (travel <= 0) return;
      const top = parseFloat(getComputedStyle(cd).top) || 0;
      const p = (top - tr.getBoundingClientRect().top) / travel;
      if (p < 0 || p > 1) return;
      setIndex(Math.min(COUNT - 1, Math.floor(p * COUNT)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // clicking an area scrolls to its step, so scrolling on from there keeps going in order
  const pick = useCallback((i: number) => {
    setIndex(i);
    const tr = track.current, cd = card.current;
    if (!tr || !cd) return;
    const travel = tr.offsetHeight - cd.offsetHeight;
    if (travel <= 0) return;
    const top = parseFloat(getComputedStyle(cd).top) || 0;
    const y = window.scrollY + tr.getBoundingClientRect().top - top + travel * ((i + 0.5) / COUNT);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const active = AREA_ORDER[index];

  return (
    <section id="areas" className="section" aria-labelledby="areas-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{AREAS_SECTION.label}</span>
          <h2 id="areas-title" className="display h2"><Rich text={AREAS_SECTION.title} /></h2>
        </div>
      </div>
      <div ref={track} className={styles.track}>
          <div ref={card} className={styles.card}>
            <div className={styles.photo} aria-hidden="true">
              {AREA_ORDER.map((a) => (
                <div key={a} className={`${styles.layer} ${a === active ? styles.on : ""}`}>
                  <Media media={AREAS_SECTION.media[a]} tone="dark" fill compact sizes="(max-width: 860px) 100vw, 50vw" />
                </div>
              ))}
              <div className={styles.shade} />
              <Pill area={active} strong className={styles.tag} />
            </div>
            <div id="area-panel" role="tabpanel" aria-labelledby={`area-tab-${active}`} className={styles.panel}>
              <span className={styles.count} aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}</span>
              <ul className={styles.list} role="tablist" aria-label={t.lifeAreas} aria-orientation="vertical">
                {AREA_ORDER.map((a, i) => (
                  <li key={a} role="presentation">
                    <button type="button" role="tab" id={`area-tab-${a}`} aria-selected={i === index} aria-controls="area-panel"
                      tabIndex={i === index ? 0 : -1}
                      className={styles.item} style={areaVars(a)}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => pick(i)}
                      onKeyDown={(e) => {
                        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                        e.preventDefault();
                        const next = (i + (e.key === "ArrowDown" ? 1 : COUNT - 1)) % COUNT;
                        setIndex(next);
                        document.getElementById(`area-tab-${AREA_ORDER[next]}`)?.focus();
                      }}>
                      <span className={styles.icon} aria-hidden="true"><AreaIcon area={a} /></span>
                      <span>{AREAS[a].name}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className={styles.note} aria-live="polite">
                <p key={active} className={styles.line}>{AREAS[active].neglect}</p>
                <Link href={areaGuideHref(active)} className={styles.more}>{t.howToBalance(AREAS[active].name)}</Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
