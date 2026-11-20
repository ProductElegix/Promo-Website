import Link from "next/link";
import type { AreaKey, MediaSlot } from "@/lib/content";
import { Media } from "./Media";
import { Pill } from "./Pill";
import styles from "@/app/guides/hub.module.css";

export type Card = {
  href: string; title: string; text: string; media: MediaSlot; meta: string;
  /** a life area page: one strong pill in its colour */
  area?: AreaKey;
  /** a guide: the life areas it's about (soft pills); an empty list reads "All 6 areas" */
  areas?: AreaKey[];
};

/** A grid of photo cards linking to guides or life area pages. */
export function GuideCards({ cards, two = false }: { cards: Card[]; two?: boolean }) {
  return (
    <ul className={`${styles.grid} ${two ? styles.two : ""}`}>
      {cards.map((c) => (
        <li key={c.href}>
          <Link href={c.href} className={styles.card}>
            <Media media={{ ...c.media, ratio: "16 / 10" }} sizes="(max-width: 640px) 100vw, 400px" />
            <span className={styles.cardText}>
              <span className={styles.tags}>
                {c.area ? <Pill area={c.area} strong /> : c.areas && (c.areas.length
                  ? c.areas.map((a) => <Pill key={a} area={a} />)
                  : <span className={styles.allAreas}>All 6 areas</span>)}
                <span className={styles.meta}>{c.meta}</span>
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
