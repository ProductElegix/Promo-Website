import type { Metadata } from "next";
import { localePath, OG_LOCALE, UK_PUBLIC, type Lang } from "./i18n";
import { INDEXABLE, OG_IMAGE } from "./site";

/**
 * Language parts of a page's metadata: its canonical URL in this language, hreflang links to the
 * other language, the Open Graph locale, and noindex on Ukrainian pages until the translation is public.
 * `path` is the English (plain) path, e.g. "/guides".
 */
export function langMeta(lang: Lang, path: string): Pick<Metadata, "alternates" | "robots"> & { url: string; locale: string } {
  const url = localePath(lang, path);
  return {
    url,
    locale: OG_LOCALE[lang],
    alternates: {
      canonical: url,
      ...(UK_PUBLIC ? { languages: { en: path, uk: localePath("uk", path), "x-default": path } } : {}),
    },
    ...(lang === "uk" && (!UK_PUBLIC || !INDEXABLE) ? { robots: { index: false, follow: false } } : {}),
  };
}

/** The language from a page's params ({ lang }), falling back to English. */
export async function paramsLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return lang === "uk" ? "uk" : "en";
}

/**
 * Full metadata for an ordinary page in a language: title, description, canonical + hreflang,
 * Open Graph and Twitter. `absolute` skips the " · Elegix" title suffix.
 */
export function pageMeta(lang: Lang, path: string, o: { title: string; description: string; absolute?: boolean; type?: "website" | "profile"; images?: { url: string; alt?: string; width?: number; height?: number }[]; extra?: Metadata }): Metadata {
  const lm = langMeta(lang, path);
  const ogTitle = o.absolute ? o.title : `${o.title} · Elegix`;
  const images = o.images ?? [OG_IMAGE];
  return {
    title: o.absolute ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: lm.alternates,
    ...(lm.robots ? { robots: lm.robots } : {}),
    openGraph: { title: ogTitle, description: o.description, url: lm.url, siteName: "Elegix", type: o.type ?? "website", locale: lm.locale, images },
    twitter: { card: "summary_large_image", title: ogTitle, description: o.description, images },
    ...o.extra,
  };
}
