import { notFound } from "next/navigation";
import { GUIDES, guideHref, guidesOf, areasOf, cardMeta } from "@/lib/guides";
import { Article, articleMetadata } from "@/components/ui/Article";
import { paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const lang = await paramsLang(params);
  const g = guidesOf(lang).guideBySlug((await params).slug);
  return g ? articleMetadata(g, `/guides/${g.slug}`, true, lang) : {};
}

export default async function GuidePage({ params }: Props) {
  const lang = await paramsLang(params);
  const set = guidesOf(lang);
  const g = set.guideBySlug((await params).slug);
  if (!g) notFound();
  const related = set.relatedTo(g)
    .map((r) => ({ href: guideHref(r), label: cardMeta(r, lang), areas: areasOf(r), title: r.title, media: r.media }));
  return <Article guide={g} path={`/guides/${g.slug}`} parent={{ name: ui(lang).guides, path: "/guides" }} related={related} areas={g.areas} promote midTitle={set.midCtaTitle(g)} />;
}
