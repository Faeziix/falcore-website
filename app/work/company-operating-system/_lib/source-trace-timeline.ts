import {
  finishedTraceLabel,
  readableSources,
  sourceTraceQuestion,
  sourceTraceSearchLabel,
} from "./source-trace-script";

export type SourceTraceSnapshot = {
  typedQuestionLength: number;
  traceLabel: string | null;
  readingSourceIndex: number | null;
  readSourceCount: number;
  isRestrictedSourceRevealed: boolean;
  isFinished: boolean;
};

export type SourceTraceStep = {
  snapshot: SourceTraceSnapshot;
  holdMilliseconds: number;
};

const sourceTraceTiming = {
  beforeTyping: 350,
  perTypedCharacter: 34,
  afterTyping: 450,
  searching: 800,
  readingSource: 620,
  afterSourceRead: 280,
  beforeRestriction: 520,
};

const emptySnapshot: SourceTraceSnapshot = {
  typedQuestionLength: 0,
  traceLabel: null,
  readingSourceIndex: null,
  readSourceCount: 0,
  isRestrictedSourceRevealed: false,
  isFinished: false,
};

export function buildSourceTraceTimeline(): SourceTraceStep[] {
  const steps: SourceTraceStep[] = [
    { snapshot: emptySnapshot, holdMilliseconds: sourceTraceTiming.beforeTyping },
  ];

  for (let typedLength = 1; typedLength <= sourceTraceQuestion.length; typedLength += 1) {
    const isLastCharacter = typedLength === sourceTraceQuestion.length;
    steps.push({
      snapshot: { ...emptySnapshot, typedQuestionLength: typedLength },
      holdMilliseconds: isLastCharacter
        ? sourceTraceTiming.afterTyping
        : sourceTraceTiming.perTypedCharacter,
    });
  }

  const typedSnapshot = { ...emptySnapshot, typedQuestionLength: sourceTraceQuestion.length };
  steps.push({
    snapshot: { ...typedSnapshot, traceLabel: sourceTraceSearchLabel },
    holdMilliseconds: sourceTraceTiming.searching,
  });

  readableSources.forEach((source, sourceIndex) => {
    steps.push({
      snapshot: {
        ...typedSnapshot,
        traceLabel: source.traceLabel,
        readingSourceIndex: sourceIndex,
        readSourceCount: sourceIndex,
      },
      holdMilliseconds: sourceTraceTiming.readingSource,
    });
    steps.push({
      snapshot: {
        ...typedSnapshot,
        traceLabel: source.traceLabel,
        readSourceCount: sourceIndex + 1,
      },
      holdMilliseconds: sourceTraceTiming.afterSourceRead,
    });
  });

  const allSourcesRead = { ...typedSnapshot, readSourceCount: readableSources.length };
  steps.push({
    snapshot: { ...allSourcesRead, traceLabel: "Checking access…" },
    holdMilliseconds: sourceTraceTiming.beforeRestriction,
  });
  steps.push({
    snapshot: {
      ...allSourcesRead,
      traceLabel: finishedTraceLabel,
      isRestrictedSourceRevealed: true,
      isFinished: true,
    },
    holdMilliseconds: 0,
  });

  return steps;
}
