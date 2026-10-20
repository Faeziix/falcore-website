import { formatContentDate } from "@/lib/format-content-date";
import { cn } from "@/lib/utils";

export function ContentUpdatedNote({ updatedOn, className }: { updatedOn: string; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Last updated <time dateTime={updatedOn}>{formatContentDate(updatedOn)}</time>
    </p>
  );
}
