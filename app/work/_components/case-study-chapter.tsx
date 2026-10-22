import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const caseStudyChapterVariants = cva("", {
  variants: {
    tone: {
      paper: "bg-case-paper text-case-ink",
      raised: "bg-case-paper-raised text-case-ink",
      hangar: "bg-background text-foreground",
    },
  },
  defaultVariants: { tone: "paper" },
});

const chapterTitleVariants = cva("max-w-4xl text-balance text-display-lg font-medium", {
  variants: {
    tone: {
      paper: "font-case-display text-case-ink",
      raised: "font-case-display text-case-ink",
      hangar: "text-foreground",
    },
  },
  defaultVariants: { tone: "paper" },
});

const chapterIntroVariants = cva("mt-4 max-w-2xl text-balance text-lead md:mt-6", {
  variants: {
    tone: {
      paper: "text-case-ink-soft",
      raised: "text-case-ink-soft",
      hangar: "text-foreground-soft",
    },
  },
  defaultVariants: { tone: "paper" },
});

const chapterRuleVariants = cva("border-t pt-6 md:pt-8", {
  variants: {
    tone: {
      paper: "border-case-rule",
      raised: "border-case-rule",
      hangar: "border-border",
    },
  },
  defaultVariants: { tone: "paper" },
});

const CHAPTER_MEDIA_OFFSET_CLASS_NAME = "mt-10 md:mt-14 lg:mt-20";

type CaseStudyChapterProps = VariantProps<typeof caseStudyChapterVariants> & {
  id: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  isMediaFullBleed?: boolean;
  className?: string;
};

export function CaseStudyChapter({
  id,
  title,
  intro,
  tone,
  children,
  isMediaFullBleed = false,
  className,
}: CaseStudyChapterProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(caseStudyChapterVariants({ tone }), "section-spacing", className)}
    >
      <div className="page-container">
        <div className={chapterRuleVariants({ tone })}>
          <h2 id={headingId} className={chapterTitleVariants({ tone })}>
            {title}
          </h2>
          <p className={chapterIntroVariants({ tone })}>{intro}</p>
        </div>
        {children && !isMediaFullBleed ? <div className={CHAPTER_MEDIA_OFFSET_CLASS_NAME}>{children}</div> : null}
      </div>
      {children && isMediaFullBleed ? <div className={CHAPTER_MEDIA_OFFSET_CLASS_NAME}>{children}</div> : null}
    </section>
  );
}
