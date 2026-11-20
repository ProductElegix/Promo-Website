/**
 * Languages of the site. English lives at the plain paths (/guides), Ukrainian under /uk (/uk/guides).
 * Inside the app every page sits in app/[lang]; proxy.ts rewrites plain paths to /en internally.
 */
export const LANGS = ["en", "uk"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/**
 * The Ukrainian version is public (indexed, in the sitemap, offered in the language switch) only when
 * this is on. While the translation is in progress /uk pages exist but ask search engines to stay away.
 */
export const UK_PUBLIC = process.env.NEXT_PUBLIC_UK_PUBLIC === "yes";

/** Paths that are files or API calls and never get a language prefix. */
const isFileLike = (path: string) => path.startsWith("/api/") || /\.[a-z0-9]+$/i.test(path.split(/[?#]/)[0]);

/** A site path in the given language: "/guides" -> "/uk/guides"; "/#join" -> "/uk#join". */
export function localePath(lang: Lang, path: string): string {
  if (lang === DEFAULT_LANG || !path.startsWith("/") || path.startsWith("//") || isFileLike(path)) return path;
  if (path.startsWith("/uk/") || path === "/uk" || path.startsWith("/uk#") || path.startsWith("/uk?")) return path;
  if (path === "/") return "/uk";
  if (path.startsWith("/#") || path.startsWith("/?")) return `/uk${path.slice(1)}`;
  return `/uk${path}`;
}

/** The language of a browser path and the same path without its language prefix. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/uk") return { lang: "uk", path: "/" };
  if (pathname.startsWith("/uk/")) return { lang: "uk", path: pathname.slice(3) };
  return { lang: "en", path: pathname };
}

/** hreflang / Open Graph locale codes. */
export const HREFLANG: Record<Lang, string> = { en: "en", uk: "uk" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", uk: "uk_UA" };

/** Show the EN / UA switch: always once public; before that only on previews, local builds and on /uk pages. */
export const UK_VISIBLE = UK_PUBLIC || process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

/** localStorage key with the language the reader picked in the switch ("en" | "uk"). */
export const LANG_CHOICE_KEY = "elegix_lang";
