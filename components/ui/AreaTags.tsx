"use client";

import Link, { useContent, useUi } from "@/components/ui/Lang";
import type { AreaKey } from "@/lib/content";
import { areaHref } from "@/lib/area-slugs";
import { AreaIcon } from "./AreaIcon";
import { areaVars } from "./areaVars";

/** The life areas a guide is about, as calm tags (coloured icon, plain name). The same look on every card and in the article header.
 *  An empty list means the guide covers the whole wheel: "All 6 areas". `link` turns each tag into a link to that area's home page in Guides (all 6: the hub filtered to whole-life guides). */
export function AreaTags({ areas, link = false, className = "" }: { areas: AreaKey[]; link?: boolean; className?: string }) {
  const { AREAS } = useContent();
  const t = useUi();
  const tag = (a: AreaKey) => (
    <>
      <AreaIcon area={a} />
      {AREAS[a].short}
    </>
  );
  return (
    <span className={`area-tags ${className}`}>
      {areas.length === 0 ? (
        link
          ? <Link href="/guides?area=whole" className="area-tag"><span className="area-wheel" aria-hidden="true" />{t.allSixAreas}</Link>
          : <span className="area-tag"><span className="area-wheel" aria-hidden="true" />{t.allSixAreas}</span>
      ) : areas.map((a) => link
        ? <Link key={a} href={areaHref(a)} className="area-tag" style={areaVars(a)}>{tag(a)}</Link>
        : <span key={a} className="area-tag" style={areaVars(a)}>{tag(a)}</span>)}
    </span>
  );
}
