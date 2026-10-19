export type SourceKind = "meeting" | "room" | "whatsapp" | "onboarding" | "document" | "learning";

export type ReadableSource = {
  citationNumber: number;
  kind: SourceKind;
  kindLabel: string;
  title: string;
  traceLabel: string;
  hasReadTicks?: boolean;
};

export type RestrictedSource = {
  kind: SourceKind;
  kindLabel: string;
  title: string;
  restrictionLabel: string;
};

export type AnswerLine = {
  lead: string;
  text: string;
  citationNumbers: number[];
};

export const sourceTraceQuestion = "Where are we with the December campaign?";

export const sourceTraceSearchLabel = "Searching the Brain…";

export const readableSources: ReadableSource[] = [
  {
    citationNumber: 1,
    kind: "meeting",
    kindLabel: "Meeting",
    title: "Q4 content planning, Oct 18",
    traceLabel: "Reading the meeting…",
  },
  {
    citationNumber: 2,
    kind: "room",
    kindLabel: "Room",
    title: "Northline Dental, production",
    traceLabel: "Reading the room…",
  },
  {
    citationNumber: 3,
    kind: "whatsapp",
    kindLabel: "WhatsApp",
    title: "Front desk, week of Oct 13",
    traceLabel: "Reading WhatsApp…",
    hasReadTicks: true,
  },
  {
    citationNumber: 4,
    kind: "onboarding",
    kindLabel: "Onboarding",
    title: "Questionnaire answers",
    traceLabel: "Reading onboarding…",
  },
  {
    citationNumber: 5,
    kind: "document",
    kindLabel: "PDF",
    title: "Brand guidelines v2",
    traceLabel: "Reading the brand guide…",
  },
  {
    citationNumber: 6,
    kind: "learning",
    kindLabel: "Learning",
    title: "Tagged: preferences",
    traceLabel: "Reading learnings…",
  },
];

export const restrictedSource: RestrictedSource = {
  kind: "meeting",
  kindLabel: "Meeting",
  title: "Retainer pricing review",
  restrictionLabel: "Confidential",
};

export const answerIntroduction = "Here's where Northline Dental's December campaign stands:";

export const answerLines: AnswerLine[] = [
  {
    lead: "Scope",
    text: "the aligners and whitening bundle, timed for wedding season.",
    citationNumbers: [1],
  },
  {
    lead: "Filming",
    text: "booked for Sunday the 9th, 7:00 to 9:00, in treatment room 2.",
    citationNumbers: [2],
  },
  {
    lead: "Still open",
    text: "two signed consent forms before any before-and-after footage.",
    citationNumbers: [3],
  },
  {
    lead: "Tone",
    text: "calm and fear-free, with captions on every video.",
    citationNumbers: [4, 6],
  },
  {
    lead: "Guardrails",
    text: "natural light only, and no “perfect smile” language.",
    citationNumbers: [5],
  },
];

export const sourcesSummaryLabel = `${readableSources.length} sources`;

export const restrictedSourceNote = "Confidential meetings never reach the assistant.";

export const finishedTraceLabel = `Read ${readableSources.length} sources`;
