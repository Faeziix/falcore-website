import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const actionsRowVariants = cva("mt-6 flex gap-6", {
  variants: {
    actionsPlacement: {
      beside: "items-end justify-between",
      belowOnMobile: "flex-col sm:flex-row sm:items-end sm:justify-between",
    },
  },
  defaultVariants: { actionsPlacement: "beside" },
});

export function SectionHeading({
  id,
  title,
  intro,
  actions,
  actionsPlacement,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
} & VariantProps<typeof actionsRowVariants>) {
  const introParagraph = (
    <p className="max-w-2xl text-balance text-lead text-foreground-soft">{intro}</p>
  );

  return (
    <div className={cn("border-t border-border pt-8", className)}>
      <h2 id={id} className="max-w-4xl text-display-lg font-medium text-foreground">
        {title}
      </h2>
      {actions ? (
        <div className={actionsRowVariants({ actionsPlacement })}>
          {introParagraph}
          <div className="shrink-0">{actions}</div>
        </div>
      ) : (
        <div className="mt-6">{introParagraph}</div>
      )}
    </div>
  );
}
