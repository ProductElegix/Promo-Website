"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Carousel.module.css";

/** Horizontal scroll-snap carousel with round prev/next arrows and dot pagination. */
export function Carousel({ children, label, tone = "light" }: { children: ReactNode; label: string; tone?: "light" | "dark" }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft;
      let best = 0;
      slides.forEach((s, i) => { if (Math.abs(s.offsetLeft - el.offsetLeft - left) < Math.abs(slides[best].offsetLeft - el.offsetLeft - left)) best = i; });
      // at the end of the track the last slides can't snap to the start, so show the last dot
      setIndex(left + el.clientWidth >= el.scrollWidth - 4 ? slides.length - 1 : best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const slide = el?.children[Math.max(0, Math.min(items.length - 1, i))] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={track} className={styles.track}>
        {items.map((child, i) => <li key={i} className={styles.slide} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>{child}</li>)}
      </ul>
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous">←</button>
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button key={i} type="button" className={styles.dot} aria-current={i === index} aria-label={`Go to slide ${i + 1}`} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={() => go(index + 1)} disabled={index === items.length - 1} aria-label="Next">→</button>
      </div>
    </div>
  );
}
