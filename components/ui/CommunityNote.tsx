"use client";

import { useContent } from "./Lang";

/** "Check your inbox" line after a signup, shown only when the email carried a private-group invite. */
export function CommunityNote({ className = "" }: { className?: string }) {
  const { COMMUNITY } = useContent();
  return <p className={className} data-community-note>{COMMUNITY.siteLine}</p>;
}
