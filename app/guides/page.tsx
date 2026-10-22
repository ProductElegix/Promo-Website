import type { Metadata } from "next";
import { AREA_GUIDES, GUIDES, areaGuideHref } from "@/lib/guides";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";
import { OG_IMAGE } from "@/lib/site";
import styles from "./hub.module.css";

const TITLE = "Life balance guides: Wheel of Life, burnout and work-life balance";
const DESCRIPTION = "Free guides from Elegix on the Wheel of Life, the signs of burnout, work-life balance, setting goals for every area of life and a 10-minute weekly review.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/guides", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} · Elegix`, description: DESCRIPTION, images: [OG_IMAGE] },
};

/** Hub for every guide and life area page, so each one is two clicks from the home page. */
export default function Guides() {
  return (
    <main>
      <Breadcrumbs name="Guides" path="/guides" />
      <section className={`section ${styles.hero}`} aria-labelledby="guides-title">
        <div className="container">
          <div className={`section-head ${styles.head}`}>
            <span className="label">Guides</span>
            <h1 id="guides-title" className={`display ${styles.title}`}><Rich text="Guides to a *balanced* life" /></h1>
            <p className="lede">Practical guides on the Wheel of Life, burnout, work-life balance and goals, plus a page for each of the 6 areas of life.</p>
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`} aria-labelledby="all-guides">
        <div className="container">
          <h2 id="all-guides" className={styles.h2}>Guides</h2>
          <GuideCards cards={GUIDES.map((g) => ({ href: `/guides/${g.slug}`, title: g.title, text: g.description, media: g.media, meta: `${g.minutes} min read` }))} />
          <h2 className={styles.h2}>The 6 areas of life</h2>
          <GuideCards cards={AREA_GUIDES.map((g) => ({ href: areaGuideHref(g.area), title: g.title, text: g.description, media: g.media, meta: `${g.minutes} min read`, area: g.area }))} />
        </div>
      </section>
    </main>
  );
}
