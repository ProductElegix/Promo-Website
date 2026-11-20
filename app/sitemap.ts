import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { AREA_GUIDES, GUIDES } from "@/lib/guides";
import { STORIES, storyHref } from "@/lib/stories";
import { AUTHORS } from "@/lib/authors";
import { UK_PUBLIC, localePath } from "@/lib/i18n";
import { hasUk } from "@/lib/guides";

function entries(): MetadataRoute.Sitemap {
  const now = new Date();
  /** hubs change when a page in them does: the newest "updated" date, not the build time */
  const newest = (dates: string[]) => new Date(dates.reduce((m, d) => (d > m ? d : m), "1970-01-01"));
  const guidesUpdated = newest([...GUIDES, ...AREA_GUIDES].map((g) => g.updated));
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...STORIES.map((s) => ({ url: `${SITE_URL}${storyHref(s)}`, lastModified: new Date(s.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/guides`, lastModified: guidesUpdated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides/how-we-write-guides`, lastModified: new Date("2026-11-20"), changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${SITE_URL}/tools`, lastModified: guidesUpdated, changeFrequency: "monthly" as const, priority: 0.6 },
    ...AUTHORS.map((a) => ({ url: `${SITE_URL}/authors/${a.slug}`, lastModified: newest(a.writes.map((w) => w.date)), changeFrequency: "monthly" as const, priority: 0.4 })),
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...AREA_GUIDES.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}

/** Guide and life area pages exist in Ukrainian only once translated; every other page always does. */
function ukReady(path: string) {
  const m = path.match(/^\/guides\/([^/]+)$/);
  return !m || m[1] === "how-we-write-guides" || hasUk(m[1]);
}

/**
 * English pages at their plain paths. Once the Ukrainian version is public (UK_PUBLIC), each page that
 * has a Ukrainian twin also lists it, with hreflang alternates on both.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const en = entries();
  if (!UK_PUBLIC) return en;
  return en.flatMap((e) => {
    const path = e.url.slice(SITE_URL.length) || "/";
    if (!ukReady(path)) return [e];
    const uk = `${SITE_URL}${localePath("uk", path)}`;
    const alternates = { languages: { en: e.url, uk, "x-default": e.url } };
    return [{ ...e, alternates }, { ...e, url: uk, alternates }];
  });
}
