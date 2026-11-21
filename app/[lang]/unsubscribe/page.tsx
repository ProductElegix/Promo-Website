import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { verifyUnsubscribe } from "@/lib/unsubscribe";
import { langMeta, paramsLang } from "@/lib/meta";
import { getLang } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import { RollText } from "@/components/ui/RollText";

const T: Record<Lang, {
  meta: string; label: string; ask: [string, (e: string) => string]; done: [string, (e: string) => string];
  error: [string, string]; invalid: [string, string]; button: string; back: string;
}> = {
  en: {
    meta: "Unsubscribe",
    label: "Email preferences",
    ask: ["Unsubscribe from Elegix emails?", (e) => `We'll stop sending emails to ${e}. You can join the waitlist again any time.`],
    done: ["You're unsubscribed", (e) => `We won't email ${e} again. If you change your mind, you can rejoin from the site.`],
    error: ["Something went wrong", "We couldn't unsubscribe you just now. Please try again, or reply to any of our emails and we'll do it by hand."],
    invalid: ["This link doesn't work", "The unsubscribe link is incomplete or expired. Reply to any of our emails and we'll remove you by hand."],
    button: "Unsubscribe",
    back: "Back to Elegix",
  },
  uk: {
    meta: "Відписатися",
    label: "Налаштування листів",
    ask: ["Відписатися від листів Elegix?", (e) => `Ми більше не надсилатимемо листи на ${e}. Повернутися до списку очікування можна будь-коли.`],
    done: ["Тебе відписано", (e) => `Ми більше не писатимемо на ${e}. Якщо передумаєш, можеш знову приєднатися на сайті.`],
    error: ["Щось пішло не так", "Зараз не вдалося тебе відписати. Спробуй ще раз або дай відповідь на будь-який наш лист, і ми зробимо це вручну."],
    invalid: ["Це посилання не працює", "Посилання для відписки неповне або застаріле. Дай відповідь на будь-який наш лист, і ми видалимо тебе вручну."],
    button: "Відписатися",
    back: "Повернутися на Elegix",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return { title: T[lang].meta, robots: { index: false, follow: false }, alternates: { canonical: langMeta(lang, "/unsubscribe").url } };
}

type Search = Promise<{ [key: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function Unsubscribe({ searchParams }: { searchParams: Search }) {
  const lang = await getLang();
  const t = T[lang];
  const q = await searchParams;
  const email = one(q.e).trim().toLowerCase();
  const token = one(q.t);
  const state = one(q.state);
  const valid = !!email && verifyUnsubscribe(email, token);

  let [title, text] = [t.ask[0], t.ask[1](email)];
  let showForm = valid;
  if (state === "done") { [title, text] = [t.done[0], t.done[1](email)]; showForm = false; }
  else if (state === "error") [title, text] = t.error;
  else if (!valid) { [title, text] = t.invalid; showForm = false; }

  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <div className="container" style={{ maxWidth: 640, display: "grid", gap: 20, justifyItems: "start" }}>
        <span className="label">{t.label}</span>
        <h1 className="display h2">{title}</h1>
        <p className="lede">{text}</p>
        {showForm && (
          <form method="post" action="/api/unsubscribe">
            <input type="hidden" name="e" value={email} />
            <input type="hidden" name="t" value={token} />
            <input type="hidden" name="l" value={lang} />
            <button type="submit" className="btn dark"><RollText>{t.button}</RollText></button>
          </form>
        )}
        <Link href="/" className="btn ghost"><RollText>{t.back}</RollText></Link>
      </div>
    </main>
  );
}
