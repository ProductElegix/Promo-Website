"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "./Lang";
import styles from "./Article.module.css";

type Item = { id: string; label: string };

/**
 * The article's table of contents. Highlights the section being read and shows reading progress
 * (a bar on the card and a thin bar at the top of the window). On narrow screens it folds into
 * "In this guide ▾" with the current section number, and closes again after a jump.
 * The list is in the HTML from the start, so it works and is crawlable without JS.
 */
export function Toc({ title, items, bodyId }: { title: string; items: Item[]; bodyId: string }) {
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDetailsElement>(null);
  const t = useUi();

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1100px)");
    const sync = () => { if (ref.current) ref.current.open = wide.matches; };
    sync();
    wide.addEventListener("change", sync);

    const els = items.map((i) => document.getElementById(i.id));
    const body = document.getElementById(bodyId);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = -1;
      els.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= line) current = i; });
      setActive(current);
      if (body) {
        const r = body.getBoundingClientRect();
        const done = (line - r.top) / Math.max(1, r.height - line * 0.5);
        setProgress(Math.min(1, Math.max(0, done)));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      wide.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items, bodyId]);

  const close = () => { if (ref.current && !window.matchMedia("(min-width: 1100px)").matches) ref.current.open = false; };
  const pct = Math.round(progress * 100);

  return (
    <>
      <div className={styles.progressTop} aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      <details ref={ref} className={styles.toc} open data-lenis-prevent>
        <summary className={styles.tocSummary}>
          <span className={styles.tocTitle}>{title}</span>
          <span className={styles.tocNow}>{active >= 0 ? `${String(active + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : t.sections(items.length)}</span>
          <span className={styles.tocChevron} aria-hidden="true" />
        </summary>
        <div className={styles.tocBar} role="progressbar" aria-label={t.readingProgress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <ol>
          {items.map((it, i) => (
            <li key={it.id} className={i === active ? styles.tocActive : undefined}>
              <a href={`#${it.id}`} aria-current={i === active ? "location" : undefined} onClick={close}>{it.label}</a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
