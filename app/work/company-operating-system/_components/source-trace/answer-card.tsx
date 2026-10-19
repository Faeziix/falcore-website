import { cva } from "class-variance-authority";
import { Check, LoaderCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  answerIntroduction,
  answerLines,
  restrictedSourceNote,
  sourcesSummaryLabel,
} from "../../_lib/source-trace-script";

const revealVariants = cva(
  "transition-[opacity,transform] duration-500 ease-out-expo",
  {
    variants: {
      isRevealed: {
        true: "translate-y-0 opacity-100",
        false: "translate-y-1 opacity-0",
      },
    },
  }
);

const inlineCitationVariants = cva(
  "ml-1 inline-grid h-[1.35em] min-w-[1.35em] translate-y-[-0.1em] place-items-center rounded-[5px] px-1 align-middle font-(family-name:--company-operating-system-mono-family) text-[0.6875rem] tabular-nums transition-colors duration-500 ease-out-expo",
  {
    variants: {
      isLit: {
        true: "bg-case-accent text-(--company-operating-system-on-accent)",
        false: "bg-(--company-operating-system-card-active) text-case-ink-soft",
      },
    },
  }
);

function TraceLine({ label, isFinished }: { label: string | null; isFinished: boolean }) {
  return (
    <p className="flex h-6 items-center gap-2 text-sm text-case-ink-soft">
      {label ? (
        isFinished ? (
          <Check aria-hidden strokeWidth={2} className="size-4 text-case-ink-soft" />
        ) : (
          <LoaderCircle
            aria-hidden
            strokeWidth={2}
            className="size-4 animate-spin text-case-accent"
          />
        )
      ) : null}
      <span>{label}</span>
    </p>
  );
}

export function AnswerCard({
  traceLabel,
  readCitationNumbers,
  isRestrictedSourceRevealed,
  isFinished,
}: {
  traceLabel: string | null;
  readCitationNumbers: Set<number>;
  isRestrictedSourceRevealed: boolean;
  isFinished: boolean;
}) {
  const hasAnyAnswer = readCitationNumbers.size > 0;

  return (
    <div className="flex h-full flex-col rounded-(--company-operating-system-ui-radius) border border-(--company-operating-system-card-edge) bg-(--company-operating-system-card) p-5 sm:p-7">
      <TraceLine label={traceLabel} isFinished={isFinished} />
      <p
        className={cn(
          "mt-6 text-lg text-case-ink sm:mt-8 sm:text-xl",
          revealVariants({ isRevealed: hasAnyAnswer })
        )}
      >
        {answerIntroduction}
      </p>
      <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        {answerLines.map((answerLine) => {
          const isRevealed = answerLine.citationNumbers.some((citationNumber) =>
            readCitationNumbers.has(citationNumber)
          );
          return (
            <li
              key={answerLine.lead}
              className={cn(
                "text-base leading-relaxed text-case-ink-soft sm:text-[1.0625rem]",
                revealVariants({ isRevealed })
              )}
            >
              <span className="font-medium text-case-ink">{answerLine.lead}:</span> {answerLine.text}
              {answerLine.citationNumbers.map((citationNumber) => (
                <span
                  key={citationNumber}
                  className={inlineCitationVariants({ isLit: readCitationNumbers.has(citationNumber) })}
                >
                  <span className="sr-only">source </span>
                  {citationNumber}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto pt-8">
        <div className="flex flex-col gap-2 border-t border-(--company-operating-system-card-edge) pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className={cn("text-case-ink-soft", revealVariants({ isRevealed: isFinished }))}>
            {sourcesSummaryLabel}
          </p>
          <p
            className={cn(
              "flex items-center gap-2 text-case-ink",
              revealVariants({ isRevealed: isRestrictedSourceRevealed })
            )}
          >
            <Lock aria-hidden strokeWidth={1.75} className="size-3.5 text-case-ink-soft" />
            {restrictedSourceNote}
          </p>
        </div>
      </div>
    </div>
  );
}
