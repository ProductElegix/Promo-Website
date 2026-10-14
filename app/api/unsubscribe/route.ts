import { NextResponse } from "next/server";
import { mailgunConfig, unsubscribeFromWaitlist } from "@/lib/mailgun";
import { verifyUnsubscribe } from "@/lib/unsubscribe";

/** POST from the confirm button on /unsubscribe. A plain GET never unsubscribes, so link scanners can't do it by accident. */
export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("e") ?? "").trim().toLowerCase();
  const token = String(form.get("t") ?? "");
  const back = (state: string) => NextResponse.redirect(new URL(`/unsubscribe?${new URLSearchParams({ state, e: email, t: token })}`, request.url), 303);

  if (!email || !verifyUnsubscribe(email, token)) return back("invalid");
  const cfg = mailgunConfig();
  if (!cfg) return back("error");
  try {
    await unsubscribeFromWaitlist(cfg, email);
    return back("done");
  } catch (err) {
    console.error("[unsubscribe]", err);
    return back("error");
  }
}
