import type { BlogCoverName } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import styles from "./BlogCover.module.css";

const WEEK = {
  en: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], work: "work", off: "day off", title: "The Elegix week" },
  uk: { days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"], work: "робота", off: "вихідний", title: "Тиждень Elegix" },
} satisfies Record<Lang, { days: string[]; work: string; off: string; title: string }>;

/**
 * A blog post's cover: a flat brand illustration drawn in HTML, never a stock photo, so it scales from a card
 * to the full-width cover and keeps the site's type. Sizes are in container units (cqw).
 * "wednesday": the week as seven tiles, Wednesday raised in lime between two pairs of working days.
 */
export function BlogCover({ name, alt, lang }: { name: BlogCoverName; alt: string; lang: Lang }) {
  const t = WEEK[lang];
  if (name !== "wednesday") return null;
  return (
    <div className={`on-dark ${styles.cover}`} role="img" aria-label={alt}>
      <p className={styles.title} aria-hidden="true">{t.title}</p>
      <ol className={styles.week} aria-hidden="true">
        {t.days.map((d, i) => {
          const kind = i === 2 ? styles.wed : i >= 5 ? styles.weekend : styles.work;
          return (
            <li key={d} className={`${styles.day} ${kind}`}>
              <span className={styles.name}>{d}</span>
              {i === 2 && <span className={styles.sun} />}
              <span className={styles.what}>{i < 5 && i !== 2 ? t.work : t.off}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
