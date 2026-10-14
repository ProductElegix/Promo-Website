"use client";

import { useState } from "react";
import { JOIN } from "@/lib/content";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Join.module.css";

export function StartPicker() {
  const [start, setStart] = useState(JOIN.starts[0].id);
  return (
    <div className={styles.choose}>
      <div className={styles.box}>
        <div className={styles.boxHead}>{JOIN.startLabel}</div>
        <div className={styles.opts} role="radiogroup" aria-label={JOIN.startLabel}>
          {JOIN.starts.map((s) => (
            <button key={s.id} type="button" role="radio" aria-checked={start === s.id} className={styles.opt} onClick={() => setStart(s.id)}>
              <span className={styles.radio} aria-hidden="true" />
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>
      <WaitlistForm source="join" variant="bar" start={start} placeholder="Your email" buttonLabel={JOIN.button} />
      <p className={styles.note}>{JOIN.note}</p>
    </div>
  );
}
