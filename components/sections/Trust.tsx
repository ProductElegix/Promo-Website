import { TRUST } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import styles from "./Trust.module.css";

export function Trust() {
  const f = TRUST.founder;
  return (
    <section id="trust" className="section" aria-labelledby="trust-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{TRUST.eyebrow}</span>
          <h2 id="trust-title" className="display h2"><Rich text={TRUST.title} /></h2>
        </div>
        <div className={styles.grid}>
          <figure className={styles.founder} data-reveal>
            <div className={styles.photo}><Media media={f.media} fill sizes="(max-width: 860px) 100vw, 360px" /></div>
            <div className={styles.note}>
              <blockquote className={styles.quote}>{f.quote || f.fallback}</blockquote>
              <figcaption><b>{f.name}</b>, {f.role}</figcaption>
            </div>
          </figure>
          <ul className={styles.principles}>
            {TRUST.principles.map((p, i) => (
              <li key={p.title} className={styles.principle} data-reveal>
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
