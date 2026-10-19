"use client";

import Image from "next/image";
import { CASE_STUDIES } from "@/app/work/_lib/case-study-index";
import { cn } from "@/lib/utils";

const PREVIEW_IMAGE_SIZES = "(min-width: 1400px) 650px, 50vw";

export function WorkMenuPreview({ previewedSlug }: { previewedSlug: string }) {
  const previewedCaseStudy =
    CASE_STUDIES.find((caseStudy) => caseStudy.slug === previewedSlug) ?? CASE_STUDIES[0];

  return (
    <figure aria-hidden>
      <div className="relative aspect-video overflow-clip border border-border bg-surface">
        {CASE_STUDIES.map((caseStudy) => (
          <Image
            key={caseStudy.slug}
            src={caseStudy.coverImage.src}
            alt=""
            fill
            sizes={PREVIEW_IMAGE_SIZES}
            className={cn(
              "object-cover transition-[opacity,scale] duration-500 ease-out-expo",
              caseStudy.slug === previewedCaseStudy.slug ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            )}
          />
        ))}
      </div>
      <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-soft">
        {previewedCaseStudy.headline}
      </figcaption>
    </figure>
  );
}
