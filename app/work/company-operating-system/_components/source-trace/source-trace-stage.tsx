"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  readableSources,
  restrictedSource,
  sourceTraceQuestion,
} from "../../_lib/source-trace-script";
import type { SourceTraceSnapshot } from "../../_lib/source-trace-timeline";
import { AnswerCard } from "./answer-card";
import { QuestionBubble } from "./question-bubble";
import { SourceRow, type ConnectorEmphasis, type SourceRowState } from "./source-row";
import { useSourceTracePlayback } from "./use-source-trace-playback";

function readableSourceState(sourceIndex: number, snapshot: SourceTraceSnapshot): SourceRowState {
  if (sourceIndex < snapshot.readSourceCount) return "read";
  if (sourceIndex === snapshot.readingSourceIndex) return "reading";
  return "waiting";
}

function connectorEmphasisFor(sourceIndex: number, snapshot: SourceTraceSnapshot): ConnectorEmphasis {
  if (sourceIndex >= snapshot.readSourceCount) return "hidden";
  const isMostRecentlyRead = sourceIndex === snapshot.readSourceCount - 1;
  return isMostRecentlyRead && !snapshot.isFinished ? "fresh" : "settled";
}

export function SourceTraceStage() {
  const stageReference = useRef<HTMLDivElement>(null);
  const hasEnteredView = useInView(stageReference, { once: true, amount: 0.3 });
  const { snapshot, hasPlayedThrough, playAgain } = useSourceTracePlayback({ hasEnteredView });

  const readCitationNumbers = new Set(
    readableSources.slice(0, snapshot.readSourceCount).map((source) => source.citationNumber)
  );
  const isTypingQuestion =
    snapshot.typedQuestionLength > 0 && snapshot.typedQuestionLength < sourceTraceQuestion.length;

  return (
    <div
      ref={stageReference}
      role="group"
      aria-label="A demo of the assistant answering a question from six sources"
    >
      <div className="flex justify-end lg:pl-[calc(41.666%+2rem)]">
        <QuestionBubble
          question={sourceTraceQuestion}
          typedLength={snapshot.typedQuestionLength}
          isTyping={isTypingQuestion}
        />
      </div>
      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16">
        <ol aria-label="Sources" className="flex flex-col justify-between gap-2.5">
          {readableSources.map((source, sourceIndex) => (
            <SourceRow
              key={source.citationNumber}
              kind={source.kind}
              kindLabel={source.kindLabel}
              title={source.title}
              citationNumber={source.citationNumber}
              hasReadTicks={source.hasReadTicks}
              state={readableSourceState(sourceIndex, snapshot)}
              connectorEmphasis={connectorEmphasisFor(sourceIndex, snapshot)}
            />
          ))}
          <SourceRow
            kind={restrictedSource.kind}
            kindLabel={restrictedSource.kindLabel}
            title={restrictedSource.title}
            restrictionLabel={restrictedSource.restrictionLabel}
            isRestrictionRevealed={snapshot.isRestrictedSourceRevealed}
            state={snapshot.isRestrictedSourceRevealed ? "restricted" : "waiting"}
          />
        </ol>
        <AnswerCard
          traceLabel={snapshot.traceLabel}
          readCitationNumbers={readCitationNumbers}
          isRestrictedSourceRevealed={snapshot.isRestrictedSourceRevealed}
          isFinished={snapshot.isFinished}
        />
      </div>
      <div
        aria-hidden={!hasPlayedThrough}
        className={cn(
          "mt-8 transition-opacity duration-500 ease-out-expo",
          hasPlayedThrough ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <Button
          tabIndex={hasPlayedThrough ? 0 : -1}
          type="button"
          variant="outline"
          size="sm"
          onClick={playAgain}
          className="border-(--company-operating-system-card-edge-strong) text-case-ink hover:border-case-ink-soft"
        >
          <RotateCcw aria-hidden />
          Play again
        </Button>
      </div>
    </div>
  );
}
