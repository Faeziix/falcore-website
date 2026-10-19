import {
  ClipboardList,
  FileText,
  MessageCircle,
  MessagesSquare,
  Tag,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { SourceKind } from "../../_lib/source-trace-script";

const iconForSourceKind: Record<SourceKind, LucideIcon> = {
  meeting: Video,
  room: MessagesSquare,
  whatsapp: MessageCircle,
  onboarding: ClipboardList,
  document: FileText,
  learning: Tag,
};

export function SourceKindIcon({ kind, className }: { kind: SourceKind; className?: string }) {
  const Icon = iconForSourceKind[kind];
  return <Icon aria-hidden strokeWidth={1.75} className={className} />;
}
