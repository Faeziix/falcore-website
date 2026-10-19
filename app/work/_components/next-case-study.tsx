import Image from "next/image";
import Link from "next/link";
import { caseStudyPath, findNextCaseStudy } from "../_lib/case-study-index";

export function NextCaseStudy({ currentSlug }: { currentSlug: string }) {
  const nextCaseStudy = findNextCaseStudy(currentSlug);

  return (
    <section aria-label="Next case study" className="bg-background text-foreground">
      <div className="page-container section-spacing">
        <Link
          href={caseStudyPath(nextCaseStudy.slug)}
          className="group grid gap-10 border-t border-border pt-8 focus-visible:outline-offset-8 lg:grid-cols-12 lg:items-end lg:gap-8"
        >
          <div className="lg:col-span-6">
            <p className="text-sm text-muted-foreground">Next case study</p>
            <h2 className="mt-6 text-display-xl font-medium text-foreground">
              {nextCaseStudy.clientName}
            </h2>
            <p className="mt-6 max-w-md text-lead text-foreground-soft">{nextCaseStudy.headline}</p>
          </div>
          <div className="relative aspect-16/10 overflow-clip border border-border lg:col-span-6">
            <Image
              src={nextCaseStudy.coverImage.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={90}
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
