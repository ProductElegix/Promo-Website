import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { getLang } from "@/lib/lang";

const T = {
  en: { title: "Page not found", h1: "This page is out of balance", back: "Back to home" },
  uk: { title: "Сторінку не знайдено", h1: "Ця сторінка втратила баланс", back: "На головну" },
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: T[await getLang()].title };
}

export default async function NotFound() {
  const t = T[await getLang()];
  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <div className="container" style={{ textAlign: "center", display: "grid", gap: 20, justifyItems: "center" }}>
        <span className="label">404</span>
        <h1 className="display h2">{t.h1}</h1>
        <Link href="/" className="btn">{t.back}</Link>
      </div>
    </main>
  );
}
