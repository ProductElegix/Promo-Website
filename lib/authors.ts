/**
 * Author pages (/authors/…): one per person who has written something on the site, built from the
 * founder (who writes every guide) and the people with a personal story in lib/stories.ts.
 * Each page lists everything that person wrote and carries ProfilePage structured data.
 * Slugs come from the English names, so /authors/edward-korytskyi and /uk/authors/edward-korytskyi are one person.
 */
import type { AreaKey, MediaSlot } from "@/lib/content";
import { contentOf } from "@/lib/l10n";
import { areasOf, cardMeta, guideHref, guidesOf } from "@/lib/guides";
import { STORIES, storyHref, type Author } from "@/lib/stories";
import { storiesOf } from "@/lib/stories-l10n";
import { ui } from "@/lib/ui";
import { postHref, postsOf, teamMember } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";

export type AuthorPage = Author & {
  slug: string;
  /** their personal story, when they have one: linked at the top of the author page */
  story?: string;
  writes: { href: string; title: string; text: string; label: string; areas?: AreaKey[]; media?: MediaSlot; date: string }[];
};

export const authorSlug = (name: string) => name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The slug for a name in any site language: a translated name maps back to its English one. */
function slugOf(name: string): string {
  const en = contentOf("en").TRUST.founder.name;
  if (name === contentOf("uk").TRUST.founder.name) return authorSlug(en);
  const uk = storiesOf("uk").STORIES.find((s) => s.author.name === name);
  const enStory = uk && STORIES.find((s) => s.slug === uk.slug);
  return authorSlug(enStory ? enStory.author.name : name);
}

export const authorHref = (name: string) => `/authors/${slugOf(name)}`;

function build(lang: Lang): AuthorPage[] {
  const { TRUST } = contentOf(lang);
  const { STORIES: list } = storiesOf(lang);
  const { GUIDES, AREA_GUIDES } = guidesOf(lang);
  const t = ui(lang);
  const founderStory = list.find((s) => s.author.name === TRUST.founder.name);
  const founder: Author = founderStory?.author ?? {
    name: TRUST.founder.name, role: t.founderOfElegix, photo: TRUST.founder.media.src, bio: TRUST.founder.experience, linkedin: TRUST.founder.profiles[0],
  };
  const people = [founder, ...list.map((s) => s.author).filter((a) => a.name !== founder.name)];
  const unique = people.filter((a, i) => people.findIndex((b) => b.name === a.name) === i);
  return unique.map((a) => {
    const stories = list.filter((s) => s.author.name === a.name)
      .map((s) => ({ href: storyHref(s), title: s.title, text: s.description, label: t.story, media: s.media, date: s.updated }));
    const guides = a.name === founder.name
      ? [...GUIDES, ...AREA_GUIDES].map((g) => ({ href: guideHref(g), title: g.title, text: g.description, label: cardMeta(g, lang), areas: areasOf(g), media: g.media, date: g.updated }))
      : [];
    const posts = postsOf(lang).POSTS.filter((p) => teamMember(lang, p.person)?.name === a.name)
      .map((p) => ({ href: postHref(p), title: p.title, text: p.description, label: `${t.blog} · ${t.minRead(p.minutes)}`, date: p.updated }));
    return { ...a, slug: slugOf(a.name), story: stories[0]?.href, writes: [...stories, ...posts, ...guides].sort((x, y) => y.date.localeCompare(x.date)) };
  });
}

const BY_LANG: Record<Lang, AuthorPage[]> = { en: build("en"), uk: build("uk") };

export const AUTHORS: AuthorPage[] = BY_LANG.en;
export const authorsOf = (lang: Lang) => BY_LANG[lang];
export const authorBySlug = (slug: string, lang: Lang = "en") => BY_LANG[lang].find((a) => a.slug === slug);
