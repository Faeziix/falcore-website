import { cva } from "class-variance-authority";
import { CheckCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceKind } from "../../_lib/source-trace-script";
import { SourceKindIcon } from "./source-kind-icon";

export type SourceRowState = "waiting" | "reading" | "read" | "restricted";

const sourceRowVariants = cva(
  "relative flex items-center gap-3.5 rounded-(--company-operating-system-ui-radius) border px-3.5 py-3 transition-[opacity,background-color,border-color] duration-500 ease-out-expo sm:gap-4 sm:px-4",
  {
    variants: {
      state: {
        waiting:
          "border-(--company-operating-system-card-edge) bg-(--company-operating-system-card) opacity-45",
        reading:
          "border-(--company-operating-system-card-edge-strong) bg-(--company-operating-system-card-active) opacity-100",
        read: "border-(--company-operating-system-card-edge) bg-(--company-operating-system-card) opacity-100",
        restricted:
          "border-dashed border-(--company-operating-system-card-edge-strong) bg-transparent opacity-100",
      },
    },
    defaultVariants: { state: "waiting" },
  }
);

const citationMarkerVariants = cva(
  "ml-auto grid size-7 shrink-0 place-items-center rounded-[6px] font-(family-name:--company-operating-system-mono-family) text-[0.8125rem] tabular-nums transition-[background-color,color,border-color] duration-500 ease-out-expo",
  {
    variants: {
      state: {
        waiting: "border border-(--company-operating-system-card-edge-strong) text-case-ink-soft",
        reading: "border border-case-accent text-case-accent",
        read: "border border-case-accent bg-case-accent text-(--company-operating-system-on-accent)",
        restricted: "border border-(--company-operating-system-card-edge-strong) text-case-ink-soft",
      },
    },
    defaultVariants: { state: "waiting" },
  }
);

const connectorStrokeVariants = cva(
  "absolute inset-0 origin-left transition-[transform,background-color] duration-500 ease-out-expo",
  {
    variants: {
      emphasis: {
        hidden: "scale-x-0 bg-case-accent",
        fresh: "scale-x-100 bg-case-accent",
        settled: "scale-x-100 bg-(--company-operating-system-connector-settled)",
      },
    },
    defaultVariants: { emphasis: "hidden" },
  }
);

export type ConnectorEmphasis = "hidden" | "fresh" | "settled";

type SourceRowProps = {
  kind: SourceKind;
  kindLabel: string;
  title: string;
  state: SourceRowState;
  citationNumber?: number;
  hasReadTicks?: boolean;
  restrictionLabel?: string;
  isRestrictionRevealed?: boolean;
  connectorEmphasis?: ConnectorEmphasis;
  className?: string;
};

export function SourceRow({
  kind,
  kindLabel,
  title,
  state,
  citationNumber,
  hasReadTicks = false,
  restrictionLabel,
  isRestrictionRevealed = false,
  connectorEmphasis,
  className,
}: SourceRowProps) {
  const isRestricted = state === "restricted";

  return (
    <li className={cn(sourceRowVariants({ state }), className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-(--company-operating-system-card-active) text-case-ink-soft">
        {isRestricted && isRestrictionRevealed ? (
          <Lock aria-hidden strokeWidth={1.75} className="size-4" />
        ) : (
          <SourceKindIcon kind={kind} className="size-4" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-[0.8125rem] text-case-ink-soft">
          {kindLabel}
          {hasReadTicks ? (
            <CheckCheck aria-label="Read" strokeWidth={2} className="size-3.5 text-case-accent" />
          ) : null}
          {restrictionLabel && isRestrictionRevealed ? (
            <span className="text-case-ink">{restrictionLabel}</span>
          ) : null}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.9375rem] leading-snug text-balance transition-colors duration-500 ease-out-expo sm:truncate",
            isRestricted ? "text-case-ink-soft" : "text-case-ink"
          )}
        >
          {title}
        </span>
      </span>
      {citationNumber ? (
        <span className={citationMarkerVariants({ state })}>
          <span className="sr-only">Source </span>
          {citationNumber}
        </span>
      ) : (
        <span className={cn(citationMarkerVariants({ state }), "text-[0.625rem]")}>
          {isRestrictionRevealed ? (
            <>
              <Lock aria-hidden strokeWidth={2} className="size-3" />
              <span className="sr-only">No access</span>
            </>
          ) : null}
        </span>
      )}
      {connectorEmphasis ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-full hidden h-px w-16 bg-(--company-operating-system-connector-track) lg:block"
        >
          <span className={connectorStrokeVariants({ emphasis: connectorEmphasis })} />
        </span>
      ) : null}
    </li>
  );
}
