import { notFound } from "next/navigation";
import { guideBySlug } from "@/lib/guides";
import { STORIES, storyBySlug, storyHref } from "@/lib/stories";
import { Article, articleMetadata } from "@/components/ui/Article";

export const dynamicParams = false;
export const generateStaticParams = () => STORIES.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = storyBySlug((await params).slug);
  if (!s) return {};
  const meta = articleMetadata(s, storyHref(s));
  return { ...meta, openGraph: { ...meta.openGraph, authors: [s.author.name] } };
}

/** A personal story by someone on the team, in their own words, ending in the waitlist. */
export default async function StoryPage({ params }: Props) {
  const s = storyBySlug((await params).slug);
  if (!s) notFound();
  const related = s.related.map(guideBySlug).filter((r) => r !== undefined)
    .map((r) => ({ href: `/guides/${r.slug}`, label: `${r.minutes} min read`, title: r.title, media: r.media }));
  const others = STORIES.filter((o) => o.slug !== s.slug)
    .map((o) => ({ href: storyHref(o), label: `${o.author.name} · ${o.author.role.replace(/ of Elegix$/, "")}`, title: o.title, media: o.media }));
  return (
    <Article guide={s} path={storyHref(s)} parent={{ name: "About", path: "/about#team" }} related={related}
      author={s.author} tocTitle="In this story" source={`story:${s.slug}`} stories={others} />
  );
}
