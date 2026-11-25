import type { GuideExtra } from "@/lib/guides";
import choosingBetweenCareerAndFamily from "./choosing-between-career-and-family";
import financeAndCareer from "./finance-and-career";
import health from "./health";
import leisure from "./leisure";
import personalGrowth from "./personal-growth";
import relationships from "./relationships";
import spirituality from "./spirituality";

/** Extra long-form sections per page slug. Add a file per page and register it here. */
export const EXTRAS: Record<string, GuideExtra> = {
  "choosing-between-career-and-family": choosingBetweenCareerAndFamily,
  "finance-and-career": financeAndCareer,
  "health": health,
  "leisure": leisure,
  "personal-growth": personalGrowth,
  "relationships": relationships,
  "spirituality": spirituality,
};
