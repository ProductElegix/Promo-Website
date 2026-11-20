import { NextResponse, type NextRequest } from "next/server";

/**
 * English lives at the plain paths and Ukrainian under /uk, but inside app/ every page sits in [lang].
 * - /uk/...            served as is
 * - /en/... (a page)   308 to the plain path, so English has one address
 * - anything else      rewritten to /en/... internally; the address bar keeps the plain path
 * Generated images (opengraph-image) under /en stay reachable, because page metadata points at them.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (/(opengraph|twitter)-image/.test(pathname)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip Next internals, API routes and anything with a file extension (public files, robots.txt, sitemap.xml, feeds)
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
