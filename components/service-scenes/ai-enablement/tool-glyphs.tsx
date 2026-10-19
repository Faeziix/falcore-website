"use client";

import type { ReactElement } from "react";
import { motion } from "motion/react";
import type { ToolName, ToolTone } from "./agent-story";

type GlyphProps = { tone: ToolTone; isPlaying: boolean };

const CALENDAR_SLOTS = [
  { x: 6.5, y: 12.5 }, { x: 10.75, y: 12.5 }, { x: 15, y: 12.5 },
  { x: 6.5, y: 16 }, { x: 10.75, y: 16 }, { x: 15, y: 16 },
];
const RECORD_ROWS = [4, 10, 16];
const DOCUMENT_LINES = ["M10 13 H16", "M10 17 H14"];

function stepping(isAnimating: boolean, index: number, period: number) {
  return isAnimating ? { duration: period, repeat: Infinity, delay: index * (period / 4), ease: "linear" as const } : { duration: 0.4 };
}

function EmailGlyph({ tone, isPlaying }: GlyphProps) {
  const isSending = tone === "live" && isPlaying;
  return (
    <motion.g initial={false} animate={isSending ? { y: [0, -1.5, 0] } : { y: 0 }} transition={stepping(isSending, 0, 0.75)}>
      <rect x={3} y={5} width={18} height={14} />
      <motion.path initial={false} d="M3 6 L12 13 L21 6" animate={{ opacity: tone === "waiting" ? 0.45 : 1 }} />
    </motion.g>
  );
}

function CalendarGlyph({ tone, isPlaying }: GlyphProps) {
  const isBooking = tone === "live" && isPlaying;
  return (
    <g>
      <rect x={4} y={5} width={16} height={15} />
      <path d="M4 10 H20 M9 3 V7 M15 3 V7" />
      {CALENDAR_SLOTS.map((slot, index) => (
        <motion.rect
          key={index}
          x={slot.x}
          y={slot.y}
          width={2.5}
          height={2.5}
          stroke="none"
          fill="currentColor"
          initial={false}
          animate={{ opacity: isBooking ? [0.15, 0.15, 1] : tone === "done" || tone === "live" ? 1 : 0.15 }}
          transition={isBooking ? { duration: 1.4, times: [0, index / 6, (index + 1) / 6], ease: "linear" } : { duration: 0.4 }}
        />
      ))}
    </g>
  );
}

function RecordsGlyph({ tone, isPlaying }: GlyphProps) {
  const isReading = tone === "live" && isPlaying;
  return (
    <g>
      {RECORD_ROWS.map((rowTop, index) => (
        <motion.rect
          key={rowTop}
          x={4}
          y={rowTop}
          width={16}
          height={4}
          fill="currentColor"
          initial={false}
          animate={{ fillOpacity: isReading ? [0, 0.85, 0] : 0 }}
          transition={stepping(isReading, index, 0.9)}
        />
      ))}
    </g>
  );
}

function DocumentsGlyph({ tone, isPlaying }: GlyphProps) {
  const isDrafting = tone === "live" && isPlaying;
  return (
    <g>
      <path d="M7 3 H14 L19 8 V21 H7 Z M14 3 V8 H19" />
      {DOCUMENT_LINES.map((line, index) => (
        <motion.path
          key={line}
          d={line}
          initial={false}
          animate={{ pathLength: isDrafting ? [0, 1, 1] : 1 }}
          transition={isDrafting ? { duration: 0.75, times: [0, 0.6, 1], repeat: Infinity, delay: index * 0.2, ease: "linear" } : { duration: 0.4 }}
        />
      ))}
    </g>
  );
}

const GLYPHS: Record<ToolName, (props: GlyphProps) => ReactElement> = {
  email: EmailGlyph,
  calendar: CalendarGlyph,
  records: RecordsGlyph,
  documents: DocumentsGlyph,
};

export function ToolGlyph({ name, ...glyphProps }: GlyphProps & { name: ToolName }) {
  const Glyph = GLYPHS[name];
  return (
    <svg viewBox="0 0 24 24" className="size-[44%]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" strokeLinejoin="miter">
      <Glyph {...glyphProps} />
    </svg>
  );
}
