"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AREAS, AREA_ORDER, AREAS_SECTION } from "@/lib/content";
import { areaGuideHref } from "@/lib/guides";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Media } from "@/components/ui/Media";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./AreasList.module.css";

export function AreasList() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % AREA_ORDER.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const active = AREA_ORDER[index];

  return (
    <section id="areas" className="section" aria-labelledby="areas-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{AREAS_SECTION.label}</span>
          <h2 id="areas-title" className="display h2"><Rich text={AREAS_SECTION.title} /></h2>
        </div>
        <div className={styles.grid} data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <ul className={styles.list} role="tablist" aria-label="Life areas" aria-orientation="vertical">
            {AREA_ORDER.map((a, i) => (
              <li key={a} role="presentation">
                <button type="button" role="tab" id={`area-tab-${a}`} aria-selected={i === index} aria-controls="area-panel"
                  className={styles.item} style={areaVars(a)} onClick={() => setIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : AREA_ORDER.length - 1)) % AREA_ORDER.length;
                    setIndex(next);
                    document.getElementById(`area-tab-${AREA_ORDER[next]}`)?.focus();
                  }}>
                  <span className={styles.icon} aria-hidden="true"><AreaIcon area={a} /></span>
                  {AREAS[a].name}
                </button>
              </li>
            ))}
          </ul>
          <div id="area-panel" role="tabpanel" aria-labelledby={`area-tab-${active}`} className={`grain ${styles.visual}`}>
            {AREA_ORDER.map((a) => (
              <div key={a} className={`${styles.layer} ${a === active ? styles.on : ""}`} aria-hidden={a !== active}>
                <Media media={AREAS_SECTION.media[a]} tone="dark" fill compact sizes="(max-width: 860px) 100vw, 560px" />
              </div>
            ))}
            <div className={styles.tint} style={areaVars(active)} aria-hidden="true" />
            <div className={`glass ${styles.note}`}>
              <Pill area={active} strong />
              <p>{AREAS[active].neglect}</p>
              <Link href={areaGuideHref(active)} className={styles.more}>How to balance {AREAS[active].name.toLowerCase()} →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
