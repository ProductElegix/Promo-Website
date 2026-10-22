import Link from "next/link";
import type { AreaKey, MediaSlot } from "@/lib/content";
import { Media } from "./Media";
import { Pill } from "./Pill";
import styles from "@/app/guides/hub.module.css";

export type Card = { href: string; title: string; text: string; media: MediaSlot; meta: string; area?: AreaKey };

/** A grid of photo cards linking to guides or life area pages. */
export function GuideCards({ cards }: { cards: Card[] }) {
  return (
    <ul className={styles.grid}>
      {cards.map((c) => (
        <li key={c.href}>
          <Link href={c.href} className={styles.card}>
            <Media media={{ ...c.media, ratio: "16 / 10" }} sizes="(max-width: 640px) 100vw, 400px" />
            <span className={styles.cardText}>
              {c.area ? <Pill area={c.area} strong /> : <span className={styles.meta}>{c.meta}</span>}
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
