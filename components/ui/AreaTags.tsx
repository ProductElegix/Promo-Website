import Link from "next/link";
import { AREAS, type AreaKey } from "@/lib/content";
import { AreaIcon } from "./AreaIcon";
import { areaVars } from "./Pill";

/** The life areas a guide is about, as calm tags (coloured icon, plain name). The same look on every card and in the article header.
 *  An empty list means the guide covers the whole wheel: "All 6 areas". `link` turns each tag into a link to the hub filtered by that area. */
export function AreaTags({ areas, link = false, className = "" }: { areas: AreaKey[]; link?: boolean; className?: string }) {
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
          ? <Link href="/guides?area=whole" className="area-tag"><span className="area-wheel" aria-hidden="true" />All 6 areas</Link>
          : <span className="area-tag"><span className="area-wheel" aria-hidden="true" />All 6 areas</span>
      ) : areas.map((a) => link
        ? <Link key={a} href={`/guides?area=${a}`} className="area-tag" style={areaVars(a)}>{tag(a)}</Link>
        : <span key={a} className="area-tag" style={areaVars(a)}>{tag(a)}</span>)}
    </span>
  );
}
