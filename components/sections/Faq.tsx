import { FAQ, FAQ_SECTION } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section id="faq" className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head} data-reveal>
          <span className="label">FAQ</span>
          <h2 id="faq-title" className="display h2"><Rich text={FAQ_SECTION.title} /></h2>
          <p className="lede">{FAQ_SECTION.text}</p>
          <a className="btn dark" href={`mailto:${FAQ_SECTION.email}`}>Email us</a>
        </div>
        <div className={styles.list} data-reveal>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary>{f.q}<span className={styles.plus} aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
