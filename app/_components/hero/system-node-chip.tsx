import {
  CalendarDays,
  Database,
  Globe,
  MessageCircle,
  Phone,
  ReceiptText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SYSTEM_CANVAS,
  type SystemNode,
  type SystemNodeId,
} from "@/app/_lib/operation-scenarios";

const iconByNodeId: Record<SystemNodeId, LucideIcon> = {
  website: Globe,
  phone: Phone,
  invoices: ReceiptText,
  crm: Database,
  assistant: Sparkles,
  whatsapp: MessageCircle,
  calendar: CalendarDays,
};

export type SystemNodeState = "idle" | "visited" | "active";

export function SystemNodeChip({
  node,
  state,
}: {
  node: SystemNode;
  state: SystemNodeState;
}) {
  const Icon = iconByNodeId[node.id];

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${(node.x / SYSTEM_CANVAS.width) * 100}%`,
        top: `${(node.y / SYSTEM_CANVAS.height) * 100}%`,
      }}
    >
      <div
        className={cn(
          "relative flex items-center gap-2 border px-1.5 py-1 text-[0.625rem] font-medium whitespace-nowrap transition-[border-color,background-color,color] duration-500 sm:px-3 sm:py-2 sm:text-[0.8125rem]",
          state === "idle" &&
            "border-border bg-surface text-muted-foreground",
          state === "visited" &&
            "border-accent/50 bg-surface text-foreground-soft",
          state === "active" &&
            "border-primary bg-surface-raised text-foreground"
        )}
      >
        {state === "active" && (
          <span
            aria-hidden
            className="absolute -top-1 -right-1 size-2 bg-primary"
          >
            <span className="absolute inset-0 animate-signal-pulse bg-primary" />
          </span>
        )}
        <Icon
          aria-hidden
          className={cn(
            "hidden size-3.5 transition-colors duration-500 sm:block",
            state === "active" && "text-primary",
            state === "visited" && "text-accent"
          )}
        />
        {node.label}
      </div>
    </div>
  );
}
