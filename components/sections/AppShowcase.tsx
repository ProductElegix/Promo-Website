"use client";

import { useState } from "react";
import { APP } from "@/lib/content";
import { Phone } from "@/components/ui/Phone";
import { Rich } from "@/components/ui/Rich";
import styles from "./AppShowcase.module.css";

export function AppShowcase() {
  const [i, setI] = useState(0);
  return (
    <section id="app" className={`section ${styles.app}`} aria-labelledby="app-title">
      <div className={`container ${styles.inner}`}>
        <div className="section-head center" data-reveal>
          <span className="label">{APP.eyebrow}</span>
          <h2 id="app-title" className={`display h2 ${styles.title}`}><Rich text={APP.title} /></h2>
          <p className="lede">{APP.lede}</p>
        </div>
        <div className={styles.stage} data-reveal>
          <Phone screen={APP.screens[i].media} className={styles.phone} />
        </div>
        <div className={styles.tabs} role="tablist" aria-label="App screens">
          {APP.screens.map((s, n) => (
            <button key={s.label} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}>{s.label}</button>
          ))}
        </div>
        <ul className={styles.chips} data-reveal>{APP.chips.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
    </section>
  );
}
