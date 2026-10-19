import Image from "next/image";
import { cva } from "class-variance-authority";
import {
  BadgeCheck,
  CalendarCheck,
  Check,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadFlowLayout, LeadFlowLayoutName, LeadFlowNode, LeadFlowNodeId } from "../../_lib/lead-flow";
import {
  cssVariables,
  positionWithinLayout,
  secondsAsCssTime,
  type LeadFlowPhase,
} from "../../_lib/lead-flow-geometry";

const nodeIcons: Record<Exclude<LeadFlowNodeId, "engine">, LucideIcon> = {
  ad: Megaphone,
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  qualified: BadgeCheck,
  booked: CalendarCheck,
};

const nodeCardVariants = cva(
  "relative flex border bg-(--convoflow-node-surface) text-case-ink",
  {
    variants: {
      kind: {
        endpoint: "items-center gap-3 px-3 py-3",
        engine: "items-center gap-3 px-3.5 py-3.5",
        channel: "flex-col items-center gap-2 px-2 py-3 text-center",
      },
      layoutName: {
        wide: "",
        upright: "",
      },
      phase: {
        idle: "border-(--convoflow-node-edge)",
        running: "convoflow-node-arrive",
        complete: "border-(--convoflow-node-arrived-edge)",
      },
    },
    compoundVariants: [
      { kind: "endpoint", layoutName: "wide", className: "w-[10.5rem]" },
      { kind: "engine", layoutName: "wide", className: "w-[12rem]" },
      { kind: "channel", layoutName: "wide", className: "w-[7.5rem]" },
      { kind: "endpoint", layoutName: "upright", className: "w-[12.5rem]" },
      { kind: "engine", layoutName: "upright", className: "w-[13.5rem]" },
      { kind: "channel", layoutName: "upright", className: "w-[6.25rem]" },
    ],
  }
);

const arrivalTickVariants = cva(
  "absolute -top-2 -right-2 grid size-5 place-items-center bg-(--convoflow-tick) text-(--convoflow-tick-ink)",
  {
    variants: {
      phase: {
        idle: "scale-[0.4] opacity-0",
        running: "convoflow-tick-pop",
        complete: "opacity-100",
      },
    },
  }
);

function LeadFlowNodeIcon({ nodeId }: { nodeId: LeadFlowNodeId }) {
  if (nodeId === "engine") {
    return (
      <Image
        src="/work/convoflow/brand-mark-icon.png"
        alt=""
        width={280}
        height={280}
        sizes="36px"
        className="size-9 shrink-0"
      />
    );
  }
  const Icon = nodeIcons[nodeId];
  return (
    <span className="grid size-9 shrink-0 place-items-center bg-(--convoflow-icon-well) text-(--convoflow-icon-ink)">
      <Icon aria-hidden className="size-[1.125rem]" strokeWidth={1.75} />
    </span>
  );
}

export function LeadFlowNodeCard({
  node,
  layout,
  layoutName,
  phase,
}: {
  node: LeadFlowNode;
  layout: LeadFlowLayout;
  layoutName: LeadFlowLayoutName;
  phase: LeadFlowPhase;
}) {
  const arrivalTiming = cssVariables({
    "--convoflow-arrival-delay": secondsAsCssTime(node.arrivalSeconds),
  });

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={positionWithinLayout(layout.positions[node.id], layout)}
    >
      <div style={arrivalTiming} className={nodeCardVariants({ kind: node.kind, layoutName, phase })}>
        <LeadFlowNodeIcon nodeId={node.id} />
        <span className="min-w-0 leading-tight">
          <span
            className={cn(
              "block font-medium tracking-[-0.01em]",
              node.kind === "channel" ? "text-sm" : "text-[0.9375rem]"
            )}
          >
            {node.label}
          </span>
          {node.detail ? (
            <span className="mt-1 block text-[0.8125rem] text-case-ink-soft">{node.detail}</span>
          ) : null}
        </span>
        <span style={arrivalTiming} className={arrivalTickVariants({ phase })}>
          <Check aria-hidden className="size-3" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}
