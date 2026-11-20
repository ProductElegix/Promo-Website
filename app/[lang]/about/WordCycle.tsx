"use client";

import { useEffect, useState } from "react";
import styles from "./about.module.css";

/**
 * "Choose" in one language after another, landing on "elegix" and resting there, then starting over.
 * Screen readers get the plain sentence instead; with reduced motion it simply shows "elegix".
 */
export function WordCycle({ words }: { words: { word: string; lang: string }[] }) {
  const last = words.length - 1;
  const [i, setI] = useState(last);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: number;
    const tick = (n: number) => {
      setI(n);
      t = window.setTimeout(() => tick(n === last ? 0 : n + 1), n === last ? 2600 : 900);
    };
    t = window.setTimeout(() => tick(0), 1400);
    return () => window.clearTimeout(t);
  }, [last]);

  return (
    <span className={styles.cycle} aria-hidden="true">
      {words.map((w, n) => (
        <span key={w.word} lang={w.lang} className={`${styles.cycleWord} ${n === i ? styles.cycleOn : ""} ${n === last ? styles.cycleLast : ""}`}>{w.word}</span>
      ))}
    </span>
  );
}
