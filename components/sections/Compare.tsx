import { COMPARE } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import styles from "./Compare.module.css";

export function Compare() {
  const [them, us] = COMPARE.columns;
  return (
    <section className={`section on-dark ${styles.compare}`} aria-labelledby="compare-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{COMPARE.eyebrow}</span>
          <h2 id="compare-title" className="display h2"><Rich text={COMPARE.title} /></h2>
          <p className="lede">{COMPARE.lede}</p>
        </div>
        <div className={styles.table} role="table" aria-label={`${them} compared with ${us}`} data-reveal>
          <div role="row" className={`${styles.row} ${styles.headRow}`}>
            <span role="columnheader" className={styles.rowLabel}><span className="visually-hidden">Compared</span></span>
            <span role="columnheader" className={styles.them}>{them}</span>
            <span role="columnheader" className={styles.us}><LogoMark className={styles.mark} />{us}</span>
          </div>
          {COMPARE.rows.map((r) => (
            <div role="row" key={r.label} className={styles.row}>
              <span role="rowheader" className={styles.rowLabel}>{r.label}</span>
              <span role="cell" className={styles.them}>{r.them}</span>
              <span role="cell" className={styles.us}>{r.us}</span>
            </div>
          ))}
        </div>
        <p className={`display h2 ${styles.line}`} data-reveal><Rich text={COMPARE.line} /></p>
      </div>
    </section>
  );
}
