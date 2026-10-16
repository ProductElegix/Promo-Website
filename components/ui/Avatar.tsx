import Image from "next/image";

const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

/** Team portrait, or the person's initials on a soft green tile until a photo arrives. */
export function Avatar({ name, photo, size, className = "" }: { name: string; photo?: string; size: number; className?: string }) {
  const box = { width: size, height: size, fontSize: Math.round(size * 0.36) };
  return photo
    ? <Image src={photo} alt={name} width={size * 2} height={size * 2} className={className} style={{ ...box, objectFit: "cover", objectPosition: "50% 30%" }} />
    : <span className={className} style={{ ...box, display: "grid", placeItems: "center", background: "linear-gradient(140deg, var(--mint), var(--health-t))", color: "var(--deep)", fontWeight: 500, letterSpacing: "-0.02em" }} role="img" aria-label={name}>{initials(name)}</span>;
}
