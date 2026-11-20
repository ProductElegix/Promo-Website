/**
 * Author pages (/authors/…): one per person who has written something on the site, built from the
 * founder (who writes every guide) and the people with a personal story in lib/stories.ts.
 * Each page lists everything that person wrote and carries ProfilePage structured data.
 */
import { TRUST } from "@/lib/content";
import { AREA_GUIDES, GUIDES, guideHref } from "@/lib/guides";
import { STORIES, storyHref, type Author } from "@/lib/stories";
import type { MediaSlot } from "@/lib/content";

export type AuthorPage = Author & {
  slug: string;
  writes: { href: string; title: string; text: string; label: string; media?: MediaSlot; date: string }[];
};

export const authorSlug = (name: string) => name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const authorHref = (name: string) => `/authors/${authorSlug(name)}`;

function build(): AuthorPage[] {
  const founderStory = STORIES.find((s) => s.author.name === TRUST.founder.name);
  const founder: Author = founderStory?.author ?? {
    name: TRUST.founder.name, role: "Founder of Elegix", photo: TRUST.founder.media.src, bio: TRUST.founder.experience, linkedin: TRUST.founder.profiles[0],
  };
  const people = [founder, ...STORIES.map((s) => s.author).filter((a) => a.name !== founder.name)];
  const unique = people.filter((a, i) => people.findIndex((b) => b.name === a.name) === i);
  return unique.map((a) => {
    const stories = STORIES.filter((s) => s.author.name === a.name)
      .map((s) => ({ href: storyHref(s), title: s.title, text: s.description, label: "Story", media: s.media, date: s.updated }));
    const guides = a.name === founder.name
      ? [...GUIDES, ...AREA_GUIDES].map((g) => ({ href: guideHref(g), title: g.title, text: g.description, label: "area" in g ? "Life area" : "Guide", media: g.media, date: g.updated }))
      : [];
    return { ...a, slug: authorSlug(a.name), writes: [...stories, ...guides].sort((x, y) => y.date.localeCompare(x.date)) };
  });
}

export const AUTHORS: AuthorPage[] = build();
export const authorBySlug = (slug: string) => AUTHORS.find((a) => a.slug === slug);
