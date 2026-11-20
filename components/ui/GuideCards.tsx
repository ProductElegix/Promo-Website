import Link from "@/components/ui/Lang";
import type { AreaKey, MediaSlot } from "@/lib/content";
import { AreaTags } from "./AreaTags";
import { Media } from "./Media";
import styles from "@/app/[lang]/guides/hub.module.css";

export type Card = {
  href: string; title: string; text: string; media: MediaSlot;
  /** the line under the text: "Guide · 12 min read" */
  meta: string;
  /** the life areas it's about, shown as tags above the title; an empty list reads "All 6 areas"; leave out for stories */
  areas?: AreaKey[];
};

/** A grid of photo cards linking to guides or life area pages: area tags, title, summary, then kind and read time.
 *  `rows`: the guide library layout, two columns of wide cards with the text left and a round photo right. */
export function GuideCards({ cards, two = false, rows = false }: { cards: Card[]; two?: boolean; rows?: boolean }) {
  if (rows) return (
    <ul className={styles.rows}>
      {cards.map((c) => (
        <li key={c.href}>
          <Link href={c.href} className={styles.row}>
            <span className={styles.rowText}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className={styles.rowFoot}>
                {c.areas && <AreaTags areas={c.areas} />}
                <span className={styles.meta}>{c.meta}</span>
              </span>
            </span>
            <span className={styles.rowPhoto}>
              <Media media={{ ...c.media, ratio: "1 / 1" }} compact sizes="180px" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <ul className={`${styles.grid} ${two ? styles.two : ""}`}>
      {cards.map((c) => (
        <li key={c.href}>
          <Link href={c.href} className={styles.card}>
            <Media media={{ ...c.media, ratio: "16 / 10" }} sizes="(max-width: 640px) 100vw, 400px" />
            <span className={styles.cardText}>
              {c.areas && <AreaTags areas={c.areas} />}
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className={styles.meta}>{c.meta}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
