import type { CaseStudyOutcome } from "@/app/work/_lib/case-study-types";

export const outcomesIntro =
  "I built the knowledge base, the AI agents, projects, meetings and the client portal, and co-built sales, WhatsApp, finance and parts of the studio with one other developer. These are counts from the code, not estimates.";

export const companyOperatingSystemOutcomes: CaseStudyOutcome[] = [
  {
    statement: "215 screens in one system",
    detail:
      "The team's workspace, sales, the film studio, finance, a portal where clients follow their own projects, and public pages for booking and signing.",
  },
  {
    statement: "More than 140 actions AI can take",
    detail:
      "The in-app assistant and the team's own Claude apps share them, and every action checks the person's permissions first.",
  },
  {
    statement: "More than 2,800 changes in five months",
    detail: "Shipped by two developers between 11 May and 19 October 2026, and still shipping.",
  },
];
