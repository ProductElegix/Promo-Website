/** The personal stories in each site language: English from lib/stories.ts, Ukrainian from lib/uk/stories.ts. */
import type { Lang } from "@/lib/i18n";
import { STORIES } from "@/lib/stories";
import { UK_STORIES } from "@/lib/uk/stories";

export function storiesOf(lang: Lang) {
  const list = lang === "uk" ? UK_STORIES : STORIES;
  return {
    STORIES: list,
    storyBySlug: (slug: string) => list.find((s) => s.slug === slug),
    storyByPerson: (name: string) => list.find((s) => s.person === name),
  };
}
