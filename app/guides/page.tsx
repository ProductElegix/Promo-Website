import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AREA_GUIDES, GUIDES, areaGuideHref, areasOf, cardMeta, guideHref } from "@/lib/guides";
import { AreaTags } from "@/components/ui/AreaTags";
import type { AreaKey } from "@/lib/content";
import type { MediaSlot } from "@/lib/content";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { GuideCards, type Card } from "@/components/ui/GuideCards";
import { GuideFilter } from "@/components/ui/GuideFilter";
import { Rich } from "@/components/ui/Rich";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { Join } from "@/components/sections/Join";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import styles from "./hub.module.css";

const TITLE = "Life balance guides: burnout, goals and balance";
const DESCRIPTION = "Free guides from Elegix on the Wheel of Life, the signs of burnout, work-life balance, setting goals for every area of life and a 10-minute weekly review.";
const HERO: MediaSlot = { src: "/images/how-next.jpg", alt: "A notebook, pen and laptop on a wooden desk", brief: "Guides hero", ratio: "3 / 2" };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides", types: { "application/rss+xml": [{ url: "/guides/feed.xml", title: "Elegix guides" }] } },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/guides", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} · Elegix`, description: DESCRIPTION, images: [OG_IMAGE] },
};

/** Hub for every guide and life area page, so each one is two clicks from the home page. The first guide is the "start here". */
export default function Guides() {
  const [first] = GUIDES;
  const areaCards: Card[] = AREA_GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g), areas: areasOf(g) }));
  const all = [...GUIDES.map((g) => `/guides/${g.slug}`), ...AREA_GUIDES.map((g) => areaGuideHref(g.area))];
  return (
    <main>
      <Breadcrumbs name="Guides" path="/guides" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/guides`,
        mainEntity: { "@type": "ItemList", itemListElement: all.map((href, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${href}` })) },
      }} />
      <PhotoHero id="guides-title" media={HERO} eyebrow="Guides" titlePrefix="Life balance guides" title="Guides to a *balanced* life"
        lede="Practical guides on the Wheel of Life, burnout, work-life balance and goals, plus a page for each of the 6 areas of life.">
        <a href="#start" className="btn lime">Start reading</a>
      </PhotoHero>

      {/* start here: the first guide, large */}
      <section id="start" className="section" aria-labelledby="start-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <Link href={`/guides/${first.slug}`} className={styles.featured} data-reveal>
            <span className={styles.featuredPhoto}>{first.media.src && <Image src={first.media.src} alt={first.media.alt} fill sizes="(max-width: 860px) 100vw, 60vw" />}</span>
            <span className={styles.featuredText}>
              <span className="label">Start here</span>
              <AreaTags areas={first.areas} />
              <h2 id="start-title" className={styles.featuredTitle}>{first.title}</h2>
              <p>{first.description}</p>
              <span className={styles.meta}>{cardMeta(first)}</span>
              <span className="btn">Read the guide</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="all-guides" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">Guides</span>
            <h2 id="all-guides" className="display h2"><Rich text="Burnout, balance and *goals*" /></h2>
          </div>
          <GuideFilter
            guides={GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g), areas: areasOf(g) }))}
            areaPages={Object.fromEntries(AREA_GUIDES.map((g, i) => [g.area, areaCards[i]])) as Partial<Record<AreaKey, Card>>} />
        </div>
      </section>

      <section className="section" aria-labelledby="area-guides" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">Life areas</span>
            <h2 id="area-guides" className="display h2"><Rich text="The 6 areas of *life*" /></h2>
            <p className="lede">What each area covers, the signs it's slipping and small habits that bring it back.</p>
          </div>
          <GuideCards cards={areaCards} />
          <p className={styles.policy}><Link href="/tools">Free tools</Link> · <Link href="/guides/how-we-write-guides">How we write and check our guides</Link> · <a href="/guides/feed.xml">RSS</a></p>
        </div>
      </section>

      {/* a next step for readers: the free check on the home page */}
      <section className="section" aria-labelledby="check-cta" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.check} data-reveal>
            <span className="label">Free Life Balance Check</span>
            <h2 id="check-cta" className="display h2"><Rich text="Find your weakest area in *2 minutes*" /></h2>
            <p className="lede">Rate your 6 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area.</p>
            <Link href="/#check" className="btn">Take the free check</Link>
          </div>
        </div>
      </section>

      <Join />
    </main>
  );
}
