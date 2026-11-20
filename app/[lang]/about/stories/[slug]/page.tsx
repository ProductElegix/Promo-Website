import { notFound } from "next/navigation";
import { guidesOf } from "@/lib/guides";
import { STORIES, storyHref } from "@/lib/stories";
import { storiesOf } from "@/lib/stories-l10n";
import { Article, articleMetadata } from "@/components/ui/Article";
import { paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";

export const dynamicParams = false;
export const generateStaticParams = () => STORIES.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const lang = await paramsLang(params);
  const s = storiesOf(lang).storyBySlug((await params).slug);
  if (!s) return {};
  const meta = articleMetadata(s, storyHref(s), false, lang);
  return { ...meta, openGraph: { ...meta.openGraph, authors: [s.author.name] } };
}

/** A personal story by someone on the team, in their own words, ending in the waitlist. */
export default async function StoryPage({ params }: Props) {
  const lang = await paramsLang(params);
  const t = ui(lang);
  const { STORIES: list, storyBySlug } = storiesOf(lang);
  const s = storyBySlug((await params).slug);
  if (!s) notFound();
  const { guideBySlug } = guidesOf(lang);
  const related = s.related.map(guideBySlug).filter((r) => r !== undefined)
    .map((r) => ({ href: `/guides/${r.slug}`, label: t.minRead(r.minutes), title: r.title, media: r.media }));
  const others = list.filter((o) => o.slug !== s.slug)
    .map((o) => ({ href: storyHref(o), label: `${o.author.name} · ${o.author.role.replace(/ of Elegix$| Elegix$/, "")}`, title: o.title, media: o.media }));
  return (
    <Article guide={s} path={storyHref(s)} parent={{ name: t.about, path: "/about#team" }} related={related}
      author={s.author} tocTitle={t.inThisStory} source={`story:${s.slug}`} stories={others} />
  );
}
