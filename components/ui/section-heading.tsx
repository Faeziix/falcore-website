import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  title,
  intro,
  actions,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  const introParagraph = (
    <p className="max-w-2xl text-balance text-lead text-foreground-soft">{intro}</p>
  );

  return (
    <div className={cn("border-t border-border pt-8", className)}>
      <h2 id={id} className="max-w-4xl text-display-lg font-medium text-foreground">
        {title}
      </h2>
      {actions ? (
        <div className="mt-6 flex items-end justify-between gap-6">
          {introParagraph}
          <div className="shrink-0">{actions}</div>
        </div>
      ) : (
        <div className="mt-6">{introParagraph}</div>
      )}
    </div>
  );
}
