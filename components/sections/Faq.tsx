import { getContent } from "@/lib/lang";
import { ui } from "@/lib/ui";
import { Rich } from "@/components/ui/Rich";
import styles from "./Faq.module.css";
import { RollText } from "@/components/ui/RollText";

/** `only` limits it to these questions (in the home FAQ order); `items` and `title` replace them for other pages, e.g. Careers. */
export async function Faq({ only, items: own, title: ownTitle }: { only?: string[]; items?: { q: string; a: string }[]; title?: string }) {
  const { lang, c: { FAQ, FAQ_SECTION } } = await getContent();
  const t = ui(lang);
  const title = ownTitle ?? FAQ_SECTION.title;
  const items = own ?? (only ? FAQ.filter((f) => only.includes(f.q)) : FAQ);
  return (
    <section id="faq" className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head} data-reveal>
          <span className="label">{t.faq}</span>
          <h2 id="faq-title" className="display h2"><Rich text={title} /></h2>
          <p className="lede">{FAQ_SECTION.text}</p>
          <a className="btn" href={`mailto:${FAQ_SECTION.email}`}><RollText>{t.emailUs}</RollText></a>
        </div>
        <div className={styles.list} data-reveal>
          {items.map((f) => (
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
