import { FACTS } from "@/lib/content";
import styles from "./FactsTicker.module.css";

/** Dark strip of key facts that scrolls sideways; the row is doubled so the loop has no seam. */
export function FactsTicker() {
  const row = (hidden?: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {FACTS.map((f) => (
        <li key={f.caption} className={styles.item}>
          <b>{f.value}</b><span className="caption">{f.caption}</span><i aria-hidden="true">/</i>
        </li>
      ))}
    </ul>
  );
  return (
    <section className={styles.ticker} aria-label="Elegix in numbers">
      <div className={styles.track}>{row()}{row(true)}</div>
    </section>
  );
}
