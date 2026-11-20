import Link from "@/components/ui/Lang";
import { notFound } from "next/navigation";
import { AREA_GUIDES, GUIDES, guideHref, guidesOf, areasOf, cardMeta, type AreaGuide } from "@/lib/guides";
import { Article, articleMetadata } from "@/components/ui/Article";
import { GuideCards } from "@/components/ui/GuideCards";
import { contentOf } from "@/lib/l10n";
import type { Lang } from "@/lib/i18n";
import { paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";
import styles from "../hub.module.css";

export const dynamicParams = false;
/** Guides and the 6 life area pages share /guides/…: an area page is the home of that area inside Guides. */
export const generateStaticParams = () => [...GUIDES, ...AREA_GUIDES].map((g) => ({ slug: g.slug }));

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const lang = await paramsLang(params);
  const { slug } = await params;
  const set = guidesOf(lang);
  const g = set.guideBySlug(slug) ?? set.areaGuideBySlug(slug);
  return g ? articleMetadata(g, `/guides/${g.slug}`, true, lang) : {};
}

export default async function GuidePage({ params }: Props) {
  const lang = await paramsLang(params);
  const { slug } = await params;
  const set = guidesOf(lang);
  const area = set.areaGuideBySlug(slug);
  if (area) return <AreaPage g={area} lang={lang} />;
  const g = set.guideBySlug(slug);
  if (!g) notFound();
  const related = set.relatedTo(g)
    .map((r) => ({ href: guideHref(r), label: cardMeta(r, lang), areas: areasOf(r), title: r.title, media: r.media }));
  return <Article guide={g} path={`/guides/${g.slug}`} parent={{ name: ui(lang).guides, path: "/guides" }} related={related} areas={g.areas} promote midTitle={set.midCtaTitle(g)} />;
}

/** The home of one life area: the overview header, every guide about this area right under it, then the full write-up
 *  and "Keep reading" links to the other five areas. */
function AreaPage({ g, lang }: { g: AreaGuide; lang: Lang }) {
  const t = ui(lang);
  const set = guidesOf(lang);
  const name = contentOf(lang).AREAS[g.area].short;
  const related = set.AREA_GUIDES.filter((o) => o.slug !== g.slug)
    .map((o) => ({ href: guideHref(o), label: cardMeta(o, lang), areas: areasOf(o), title: o.title, media: o.media }));
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
  return <Article guide={g} path={`/guides/${g.slug}`} parent={{ name: t.guides, path: "/guides" }} related={related} promote midTitle={set.midCtaTitle({ areas: [g.area] })} hub={hub} />;
}
