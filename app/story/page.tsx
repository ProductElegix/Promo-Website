import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { STORY, TRUST } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import styles from "./story.module.css";

const DESCRIPTION = "Why we created Elegix: a system that helps people build a balanced, intentional life without burning out.";

export const metadata: Metadata = {
  title: "Our story",
  description: DESCRIPTION,
  alternates: { canonical: "/story" },
  openGraph: { title: "Our story · Elegix", description: DESCRIPTION, url: "/story", siteName: "Elegix", type: "article", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: "Our story · Elegix", description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function Story() {
  const photo = TRUST.founder.media;
  return (
    <main className={`section ${styles.story}`}>
      <article className={`container ${styles.inner}`}>
        <Link href="/" className="label" style={{ textDecoration: "none" }}>Back to Elegix</Link>
        <span className="eyebrow muted">{STORY.label}</span>
        <h1 className="display h2"><Rich text={STORY.title} /></h1>
        {photo.src && (
          <div className={styles.photo}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 860px) 100vw, 720px" priority /></div>
        )}
        <div className={styles.body}>
          {STORY.blocks.map((b, i) => {
            if (b.type === "lines") return <p key={i} className={styles.lines}>{b.lines.map((l) => <span key={l}>{l}</span>)}</p>;
            if (b.type === "quote") return <blockquote key={i} className={styles.quote}>{b.text}</blockquote>;
            return <p key={i} className={b.type === "lead" ? styles.lead : undefined}>{b.text}</p>;
          })}
        </div>
        <p className={styles.sign}>— {STORY.signature}</p>
        <Link href="/#join" className="btn">{STORY.cta}</Link>
      </article>
    </main>
  );
}
