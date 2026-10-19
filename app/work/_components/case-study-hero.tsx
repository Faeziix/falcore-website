import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { textLinkVariants } from "@/components/ui/text-link";
import { externalLinkProps } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CASE_STUDY_INDEX_PATH } from "../_lib/case-study-index";
import type { CaseStudySummary } from "../_lib/case-study-types";

const heroRevealDelayMilliseconds = {
  backLink: 0,
  clientName: 80,
  headline: 300,
  facts: 420,
  media: 520,
};

function revealDelay(milliseconds: number) {
  return { animationDelay: `${milliseconds}ms` };
}

function CaseStudyFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-case-rule pt-4">
      <dt className="text-sm text-case-ink-soft">{label}</dt>
      <dd className="mt-1.5 text-case-ink">{children}</dd>
    </div>
  );
}

function liveSiteLabel(liveUrl: string) {
  return new URL(liveUrl).hostname.replace(/^www\./, "");
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
            className: "text-case-ink-soft hover:text-case-ink animate-rise-in",
          })}
        >
          All work
        </Link>
        <div className="-mb-[0.07em] overflow-clip pb-[0.15em]">
          <h1
            style={revealDelay(heroRevealDelayMilliseconds.clientName)}
            className={cn(
              "mt-8 font-case-display text-display-xl font-medium text-case-ink animate-mask-rise",
              clientNameClassName
            )}
          >
            {caseStudy.clientName}
          </h1>
        </div>
        <p
          style={revealDelay(heroRevealDelayMilliseconds.headline)}
          className="mt-6 max-w-3xl text-balance text-lead text-case-ink-soft animate-rise-in"
        >
          {caseStudy.headline}
        </p>
        <dl
          style={revealDelay(heroRevealDelayMilliseconds.facts)}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 animate-rise-in md:auto-cols-fr md:grid-flow-col"
        >
          <CaseStudyFact label="Year">{caseStudy.year}</CaseStudyFact>
          <CaseStudyFact label="What I did">{caseStudy.services.join(", ")}</CaseStudyFact>
          <CaseStudyFact label="Client">{caseStudy.summary}</CaseStudyFact>
          {caseStudy.team ? <CaseStudyFact label="Team">{caseStudy.team}</CaseStudyFact> : null}
          {caseStudy.liveUrl ? (
            <CaseStudyFact label="Live site">
              <a
                href={caseStudy.liveUrl}
                {...externalLinkProps}
                className="inline-flex items-center gap-1.5 underline decoration-case-rule underline-offset-[0.3em] transition-colors hover:decoration-current"
              >
                {liveSiteLabel(caseStudy.liveUrl)}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </CaseStudyFact>
          ) : null}
        </dl>
      </div>
      {media ? (
        <div
          style={revealDelay(heroRevealDelayMilliseconds.media)}
          className="mt-16 animate-rise-in lg:mt-24"
        >
          {media}
        </div>
      ) : null}
    </header>
  );
}
