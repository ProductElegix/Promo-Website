import { lang as rootLang } from "next/root-params";
import { isLang, type Lang } from "./i18n";
import { contentOf } from "./l10n";

/** The page language in any Server Component, read from the [lang] segment of the root layout. */
export async function getLang(): Promise<Lang> {
  const l = await rootLang();
  return isLang(l) ? l : "en";
}

/** The page language and all copy in it, for Server Components. */
export async function getContent() {
  const lang = await getLang();
  return { lang, c: contentOf(lang) };
}
