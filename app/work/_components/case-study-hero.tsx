import type { ReactNode } from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { textLinkVariants } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";
import { CASE_STUDY_INDEX_PATH } from "../_lib/case-study-index";
import type { CaseStudySummary } from "../_lib/case-study-types";
import { LiveSiteLink } from "./live-site-link";

const heroRevealDelayMilliseconds = {
  backLink: 0,
  clientName: 80,
  headline: 300,
  facts: 420,
  media: 520,
};

const FACT_COUNT_THAT_FITS_ONE_TABLET_ROW = 4;

function revealDelay(milliseconds: number) {
  return { animationDelay: `${milliseconds}ms` };
}

const factsRowVariants = cva(
  "mt-10 grid animate-rise-in sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 md:mt-12",
  {
    variants: {
      tabletLayout: {
        oneRow: "md:grid-cols-none md:auto-cols-fr md:grid-flow-col",
        threeColumns: "md:grid-cols-3 lg:grid-cols-none lg:auto-cols-fr lg:grid-flow-col",
      },
    },
    defaultVariants: { tabletLayout: "oneRow" },
  }
);

function CaseStudyFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-case-rule py-3.5 last:border-b sm:block sm:pt-4 sm:pb-0 sm:last:border-b-0">
      <dt className="text-sm text-case-ink-soft">{label}</dt>
      <dd className="text-case-ink sm:mt-1.5">{children}</dd>
    </div>
  );
}

export function CaseStudyHero({
  caseStudy,
  media,
  clientNameClassName,
}: {
  caseStudy: CaseStudySummary;
  media?: ReactNode;
  clientNameClassName?: string;
}) {
  const factCount = 3 + Number(Boolean(caseStudy.team)) + Number(Boolean(caseStudy.liveUrl));

  return (
    <header>
      <div className="page-container">
        <Link
          href={CASE_STUDY_INDEX_PATH}
          style={revealDelay(heroRevealDelayMilliseconds.backLink)}
          className={textLinkVariants({
            tone: "muted",
            size: "sm",
            underline: "hover",
            className: "-my-3 min-h-11 text-case-ink-soft hover:text-case-ink animate-rise-in",
          })}
        >
          All work
        </Link>
        <div className="-mb-[0.07em] overflow-clip pb-[0.15em]">
          <h1
            style={revealDelay(heroRevealDelayMilliseconds.clientName)}
            className={cn(
              "mt-6 text-balance font-case-display text-display-xl font-medium text-case-ink animate-mask-rise md:mt-8",
              clientNameClassName
            )}
          >
            {caseStudy.clientName}
          </h1>
        </div>
        <p
          style={revealDelay(heroRevealDelayMilliseconds.headline)}
          className="mt-5 max-w-3xl text-balance text-lead text-case-ink-soft animate-rise-in md:mt-6"
        >
          {caseStudy.headline}
        </p>
        <dl
          style={revealDelay(heroRevealDelayMilliseconds.facts)}
          className={factsRowVariants({
            tabletLayout: factCount > FACT_COUNT_THAT_FITS_ONE_TABLET_ROW ? "threeColumns" : "oneRow",
          })}
        >
          <CaseStudyFact label="Year">{caseStudy.year}</CaseStudyFact>
          <CaseStudyFact label="What I did">{caseStudy.services.join(", ")}</CaseStudyFact>
          <CaseStudyFact label="Client">{caseStudy.summary}</CaseStudyFact>
          {caseStudy.team ? <CaseStudyFact label="Team">{caseStudy.team}</CaseStudyFact> : null}
          {caseStudy.liveUrl ? (
            <CaseStudyFact label="Live site">
              <LiveSiteLink liveUrl={caseStudy.liveUrl} />
            </CaseStudyFact>
          ) : null}
        </dl>
      </div>
      {media ? (
        <div
          style={revealDelay(heroRevealDelayMilliseconds.media)}
          className="mt-12 animate-rise-in md:mt-16 lg:mt-24"
        >
          {media}
        </div>
      ) : null}
    </header>
  );
}
