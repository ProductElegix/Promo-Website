import * as en from "./content";
import * as uk from "./uk/content";
import type { Lang } from "./i18n";

export type Content = typeof en;

const UK: Content = { ...en, ...uk };

/** All page copy (lib/content.ts) in the given language. */
export const contentOf = (lang: Lang): Content => (lang === "uk" ? UK : en);
