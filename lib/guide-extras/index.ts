import type { GuideExtra } from "@/lib/guides";
import aiTimeSavingsWorkLifeBalance from "./ai-time-savings-work-life-balance";
import choosingBetweenCareerAndFamily from "./choosing-between-career-and-family";
import financeAndCareer from "./finance-and-career";
import goalsForEveryAreaOfLife from "./goals-for-every-area-of-life";
import health from "./health";
import howToChoosePrioritiesInLife from "./how-to-choose-priorities-in-life";
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
  "goals-for-every-area-of-life": goalsForEveryAreaOfLife,
  "health": health,
  "how-to-choose-priorities-in-life": howToChoosePrioritiesInLife,
  "leisure": leisure,
  "personal-growth": personalGrowth,
  "plan-next-year-by-area-of-life": planNextYearByAreaOfLife,
  "relationships": relationships,
  "spirituality": spirituality,
};
