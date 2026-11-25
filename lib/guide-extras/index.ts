import type { GuideExtra } from "@/lib/guides";
import aiTimeSavingsWorkLifeBalance from "./ai-time-savings-work-life-balance";
import choosingBetweenCareerAndFamily from "./choosing-between-career-and-family";
import financeAndCareer from "./finance-and-career";
import health from "./health";
import leisure from "./leisure";
import personalGrowth from "./personal-growth";
import planNextYearByAreaOfLife from "./plan-next-year-by-area-of-life";
import relationships from "./relationships";
import spirituality from "./spirituality";

/** Extra long-form sections per page slug. Add a file per page and register it here. */
export const EXTRAS: Record<string, GuideExtra> = {
  "ai-time-savings-work-life-balance": aiTimeSavingsWorkLifeBalance,
  "choosing-between-career-and-family": choosingBetweenCareerAndFamily,
  "finance-and-career": financeAndCareer,
  "health": health,
  "leisure": leisure,
  "personal-growth": personalGrowth,
  "plan-next-year-by-area-of-life": planNextYearByAreaOfLife,
  "relationships": relationships,
  "spirituality": spirituality,
};
