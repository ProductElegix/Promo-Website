import { notFound } from "next/navigation";
import { guidesOf } from "@/lib/guides";
import { POSTS, postHref, postsOf, visibleComments, type BlogPost } from "@/lib/blog";
import { storiesOf } from "@/lib/stories-l10n";
import { Article, articleMetadata, founderAuthor } from "@/components/ui/Article";
import { BlogCover } from "@/components/ui/BlogCover";
import { TeamComments } from "@/components/ui/TeamComments";
import { contentOf } from "@/lib/l10n";
import type { Lang } from "@/lib/i18n";
import { paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";
import { teamMember } from "@/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ lang: string; slug: string }> };

/** The Article layout wants a photo slot; a post has an illustration instead, so the slot stays empty. */
const asArticle = (p: BlogPost) => ({ ...p, media: { alt: p.coverAlt, brief: "", ratio: "16 / 9" } });

/** The post's author: their story's author box when they have one (photo, bio, LinkedIn), the founder otherwise. */
function authorOf(p: BlogPost, lang: Lang) {
  const m = teamMember(lang, p.person);
  const story = m && storiesOf(lang).storyByPerson(m.name);
  if (story) return story.author;
  if (m && m.name !== contentOf(lang).TRUST.founder.name) return { name: m.name, role: m.role, photo: m.photo, bio: m.bio ?? "", linkedin: m.linkedin };
  return founderAuthor(lang);
}

export async function generateMetadata({ params }: Props) {
  const lang = await paramsLang(params);
  const p = postsOf(lang).postBySlug((await params).slug);
  if (!p) return {};
  const meta = articleMetadata(asArticle(p), postHref(p), false, lang);
  return { ...meta, openGraph: { ...meta.openGraph, authors: [authorOf(p, lang).name] } };
}

/** A blog post: one person's first-person text, team comments under it, then the waitlist. */
export default async function BlogPostPage({ params }: Props) {
  const lang = await paramsLang(params);
  const t = ui(lang);
  const { POSTS: list, postBySlug } = postsOf(lang);
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const { guideBySlug } = guidesOf(lang);
  const related = p.related.map(guideBySlug).filter((r) => r !== undefined)
    .map((r) => ({ href: `/guides/${r.slug}`, label: t.minRead(r.minutes), title: r.title, media: r.media }));
  const others = list.filter((o) => o.slug !== p.slug)
    .map((o) => ({ href: postHref(o), label: t.minRead(o.minutes), title: o.title }));
  return (
    <Article guide={asArticle(p)} path={postHref(p)} parent={{ name: t.blog, path: "/blog" }} related={related}
      author={authorOf(p, lang)} tocTitle={t.inThisPost} source={`blog:${p.slug}`}
      lists={[{ id: "more-posts-title", title: t.morePosts, items: others }]}
      cover={<BlogCover name={p.cover} alt={p.coverAlt} lang={lang} />}
      comments={<TeamComments comments={visibleComments(p)} lang={lang} />} />
  );
}
