"use client";

import NextLink from "next/link";
import { createContext, useContext, type ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { localePath, splitPath, type Lang } from "@/lib/i18n";
import { contentOf } from "@/lib/l10n";
import { ui } from "@/lib/ui";

const LangContext = createContext<Lang>("en");

/** Set once in the root layout from the [lang] segment, so client components know the page language. */
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** The current path without its language prefix ("/uk/guides" and "/guides" both give "/guides"). */
export function usePlainPath() {
  const pathname = usePathname() ?? "/";
  const plain = splitPath(pathname).path;
  // during a rewrite the server can see /en/...; strip that too
  return plain === "/en" ? "/" : plain.startsWith("/en/") ? plain.slice(3) : plain;
}

/** next/link that keeps the reader in their language: href="/guides" goes to /uk/guides on Ukrainian pages. */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const lang = useLang();
  const to = typeof href === "string" ? localePath(lang, href) : href;
  return <NextLink href={to} {...rest} />;
}

/** All page copy in the current language, for Client Components. */
export const useContent = () => contentOf(useLang());

/** Interface words (buttons, labels) in the current language, for Client Components. */
export const useUi = () => ui(useLang());
