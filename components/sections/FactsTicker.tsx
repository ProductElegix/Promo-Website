import { getContent } from "@/lib/lang";
import { ui } from "@/lib/ui";
import styles from "./FactsTicker.module.css";

/** Dark strip of key facts that scrolls sideways; the row is doubled so the loop has no seam. */
export async function FactsTicker() {
  const { lang, c: { FACTS } } = await getContent();
  const row = (hidden?: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {FACTS.map((f) => (
        <li key={f.caption} className={styles.item}>
          <b>{f.value}</b><span className="caption">{f.caption}</span><i aria-hidden="true">✳</i>
        </li>
      ))}
    </ul>
  );
  return (
    <section className={`on-dark ${styles.ticker}`} data-theme="dark" aria-label={ui(lang).inNumbers}>
      <div className={styles.track}>{row()}{row(true)}</div>
    </section>
  );
}
