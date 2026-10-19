import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chapterSectionVariants = cva("py-(--diamaria-chapter-space) text-case-ink", {
  variants: {
    tone: {
      paper: "bg-case-paper",
      raised: "bg-case-paper-raised",
    },
  },
  defaultVariants: { tone: "paper" },
});

const chapterMediaVariants = cva("mt-14 lg:mt-24", {
  variants: {
    width: {
      contained: "page-container",
      fullBleed: "w-full",
    },
  },
  defaultVariants: { width: "contained" },
});

type DiaMariaChapterProps = VariantProps<typeof chapterSectionVariants> &
  VariantProps<typeof chapterMediaVariants> & {
    id: string;
    title: string;
    intro: string;
    children: ReactNode;
    className?: string;
  };

export function DiaMariaChapter({ id, title, intro, tone, width, children, className }: DiaMariaChapterProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn(chapterSectionVariants({ tone }), className)}>
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={headingId} className="font-case-display text-display-md tracking-[-0.01em] text-case-ink">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[1.0625rem] leading-[1.75] text-case-ink-soft">
            {intro}
          </p>
        </div>
      </div>
      <div className={chapterMediaVariants({ width })}>{children}</div>
    </section>
  );
}
