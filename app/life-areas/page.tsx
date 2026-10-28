import type { Metadata } from "next";
import { AREA_GUIDES, areaGuideHref } from "@/lib/guides";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";
import { OG_IMAGE } from "@/lib/site";
import styles from "../guides/hub.module.css";

const TITLE = "The 6 areas of life and how to balance each";
const DESCRIPTION = "The 6 areas of life Elegix tracks, what each one covers, the signs it's being neglected and small habits that bring it back into balance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/life-areas" },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/life-areas", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} · Elegix`, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function LifeAreas() {
  return (
    <main>
      <Breadcrumbs name="Life areas" path="/life-areas" />
      <section className={`section ${styles.hero}`} aria-labelledby="areas-title">
        <div className="container">
          <div className={`section-head ${styles.head}`}>
            <span className="label">Life areas</span>
            <h1 id="areas-title" className={`display ${styles.title}`}><Rich text="The 6 areas of a *balanced* life" /></h1>
            <p className="lede">Every goal, habit and task in Elegix belongs to one of these areas. Read what each covers, how to tell it's slipping and what helps.</p>
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`} aria-label="All life areas">
        <div className="container">
          <GuideCards cards={AREA_GUIDES.map((g) => ({ href: areaGuideHref(g.area), title: g.title, text: g.description, media: g.media, meta: `${g.minutes} min read`, area: g.area }))} />
        </div>
      </section>
    </main>
  );
}
