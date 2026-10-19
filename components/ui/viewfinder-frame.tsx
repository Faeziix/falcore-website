import { cn } from "@/lib/utils";

const cornerPlacements = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

export function ViewfinderFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative p-2.5 sm:p-3", className)}>
      {cornerPlacements.map((placement) => (
        <span
          key={placement}
          aria-hidden
          className={cn("absolute size-4 border-foreground/50", placement)}
        />
      ))}
      <div className="relative size-full overflow-clip bg-surface">
        {children}
      </div>
    </div>
  );
}
