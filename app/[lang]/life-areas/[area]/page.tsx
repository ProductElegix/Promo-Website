import Link from "@/components/ui/Lang";
import { notFound } from "next/navigation";
import { AREA_GUIDES, areaGuideHref, guideHref, guidesOf, areasOf, cardMeta } from "@/lib/guides";
import { contentOf } from "@/lib/l10n";
import { paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";
import { Article, articleMetadata } from "@/components/ui/Article";
import { GuideCards } from "@/components/ui/GuideCards";
import styles from "@/app/[lang]/guides/hub.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => AREA_GUIDES.map((g) => ({ area: g.slug }));

type Props = { params: Promise<{ lang: string; area: string }> };

export async function generateMetadata({ params }: Props) {
  const lang = await paramsLang(params);
  const g = guidesOf(lang).areaGuideBySlug((await params).area);
  return g ? articleMetadata(g, `/life-areas/${g.slug}`, true, lang) : {};
}

/** The home of one life area: the overview header, every guide about this area right under it, then the full write-up
 *  and "Keep reading" links to the other five areas. */
export default async function AreaPage({ params }: Props) {
  const lang = await paramsLang(params);
  const t = ui(lang);
  const set = guidesOf(lang);
  const g = set.areaGuideBySlug((await params).area);
  if (!g) notFound();
  const name = contentOf(lang).AREAS[g.area].short;
  const related = set.AREA_GUIDES.filter((o) => o.slug !== g.slug)
    .map((o) => ({ href: areaGuideHref(o.area), label: cardMeta(o, lang), areas: areasOf(o), title: o.title, media: o.media }));
  const guides = set.guidesForArea(g.area);
  const whole = set.GUIDES.filter((o) => !o.areas.length).length;
  const hub = (
    <section className={`container ${styles.areaHub}`} aria-labelledby="area-guides-title">
      <div className={styles.areaHubHead}>
        <h2 id="area-guides-title" className={styles.areaHubTitle}>{t.guidesAbout(name)} <span>{guides.length}</span></h2>
        <a href="#article-body" className={styles.areaHubSkip}>{t.readOverview(name)}</a>
      </div>
      {guides.length
        ? <GuideCards rows cards={guides.map((o) => ({ href: guideHref(o), title: o.title, text: o.description, media: o.media, meta: cardMeta(o, lang), areas: areasOf(o) }))} />
        : <p className={styles.empty}>{t.areaGuidesOnTheWay(name)}</p>}
      {whole > 0 && <p className={styles.areaHubMore}><Link href="/guides?area=whole">{t.moreWholeGuides(whole)}</Link></p>}
    </section>
  );
  return <Article guide={g} path={`/life-areas/${g.slug}`} parent={{ name: t.lifeAreasTitle, path: "/life-areas" }} related={related} promote midTitle={set.midCtaTitle({ areas: [g.area] })} hub={hub} />;
}
