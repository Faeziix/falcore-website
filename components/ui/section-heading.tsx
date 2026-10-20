import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PlotterHairline } from "@/components/scroll-reveal/plotter-hairline";
import { MaskedLine, MaskedWords, countWords } from "@/components/scroll-reveal/masked-words";
import { revealOrder } from "@/components/scroll-reveal/reveal-order";

const actionsRowVariants = cva("mt-6 flex gap-6", {
  variants: {
    actionsPlacement: {
      beside: "items-end justify-between",
      belowOnMobile: "flex-col sm:flex-row sm:items-end sm:justify-between",
    },
  },
  defaultVariants: { actionsPlacement: "beside" },
});

const titleFirstOrder = 2;
const stepsBetweenTitleAndIntro = 2;

function RevealedTitle({ title }: { title: React.ReactNode }) {
  return typeof title === "string" ? (
    <MaskedWords text={title} firstOrder={titleFirstOrder} />
  ) : (
    <MaskedLine order={titleFirstOrder}>{title}</MaskedLine>
  );
}

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
  const titleStepCount = typeof title === "string" ? countWords(title) : 1;
  const introOrder = titleFirstOrder + titleStepCount + stepsBetweenTitleAndIntro;
  const introParagraph = (
    <p className="reveal-rise max-w-2xl text-balance text-lead text-foreground-soft" style={revealOrder(introOrder)}>
      {intro}
    </p>
  );

  return (
    <div data-reveal className={cn("relative pt-8", className)}>
      <PlotterHairline />
      <h2 id={id} className="max-w-4xl text-display-lg font-medium text-foreground">
        <RevealedTitle title={title} />
      </h2>
      {actions ? (
        <div className={actionsRowVariants({ actionsPlacement })}>
          {introParagraph}
          <div className="reveal-rise shrink-0" style={revealOrder(introOrder + 1)}>
            {actions}
          </div>
        </div>
      ) : (
        <div className="mt-6">{introParagraph}</div>
      )}
    </div>
  );
}
