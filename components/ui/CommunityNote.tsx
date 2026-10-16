import { COMMUNITY } from "@/lib/content";

/** "Check your inbox" line after a signup, shown only when the email carried a private-group invite. */
export function CommunityNote({ className = "" }: { className?: string }) {
  return <p className={className} data-community-note>{COMMUNITY.siteLine}</p>;
}
