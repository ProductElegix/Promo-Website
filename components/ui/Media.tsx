import Image from "next/image";
import type { MediaSlot } from "@/lib/content";
import styles from "./Media.module.css";

type Props = {
  media: MediaSlot;
  tone?: "light" | "dark";
  /** fill the parent box instead of using the slot's aspect ratio */
  fill?: boolean;
  /** hide the written brief (for very small slots) */
  compact?: boolean;
  sizes?: string;
  priority?: boolean;
  /** place the brief at the top (when something overlaps the bottom) */
  metaTop?: boolean;
  className?: string;
};

/**
 * An image slot. With `media.src` it renders an optimised next/image.
 * Without it, it renders a placeholder that says what belongs there.
 */
export function Media({ media, tone = "light", fill = false, compact = false, sizes = "50vw", priority, metaTop = false, className = "" }: Props) {
  const box = `${styles.box} ${fill ? styles.fill : ""} ${className}`;
  const style = fill ? undefined : { aspectRatio: media.ratio };

  if (media.src) {
    return (
      <div className={box} style={style}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className={styles.img} />
      </div>
    );
  }

  return (
    <div className={`${box} ${styles.ph} ${tone === "dark" ? styles.dark : ""}`} style={style} role="img" aria-label={`Placeholder: ${media.alt}`}>
      {!compact && (
        <span className={`${styles.meta} ${metaTop ? styles.top : ""}`}>
          <span className={styles.kind}>Photo</span>
          <span className={styles.brief}>{media.brief}</span>
        </span>
      )}
    </div>
  );
}
