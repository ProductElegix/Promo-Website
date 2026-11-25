/**
 * Draft content: things written as placeholders that must never reach the live site.
 * They show on local builds and Vercel previews (with a yellow "Draft" mark) and disappear in production,
 * so a page can be reviewed with them in place and still ship without them.
 *
 * Used by blog posts for `{ todo }` blocks (a spot where the author should add a real fact) and for team
 * comments marked `draft: true` (placeholder words, to be replaced with what the person actually said).
 */
export const SHOW_DRAFTS = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
