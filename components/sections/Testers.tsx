import { getContent } from "@/lib/lang";
import { waitlistCount } from "@/lib/waitlist-count";
import { Avatar } from "@/components/ui/Avatar";
import { Rich } from "@/components/ui/Rich";
import styles from "./Testers.module.css";

/** Social proof above the founder: early testers' quotes and, once the list is big enough, the waitlist counter. */
export async function Testers() {
  const { lang, c: { TESTERS } } = await getContent();
  const count = await waitlistCount();
  const showCount = count !== null && count >= TESTERS.counter.min;
  if (!TESTERS.quotes.length && !showCount) return null;
  return (
    <section id="testers" className="section" aria-labelledby="testers-title">
      <div className="container">
        <div className="section-head centered" data-reveal>
          <span className="label">{TESTERS.label}</span>
          <h2 id="testers-title" className="display h2"><Rich text={TESTERS.title} /></h2>
        </div>
        <div className={`${styles.grid} ${showCount ? "" : styles.solo}`}>
          {TESTERS.quotes.map((q) => (
            <figure key={q.name} className={styles.quote} data-reveal>
              <blockquote>{q.text}</blockquote>
              <figcaption>
                <Avatar name={q.name} photo={q.photo} size={44} className={styles.avatar} />
                <span><b>{q.name}</b>{q.role}</span>
              </figcaption>
            </figure>
          ))}
          {showCount && (
            <div className={`on-dark ${styles.counter}`} data-reveal>
              <b data-count={count}>{count.toLocaleString(lang === "uk" ? "uk-UA" : "en-US")}</b>
              <span>{TESTERS.counter.after}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
