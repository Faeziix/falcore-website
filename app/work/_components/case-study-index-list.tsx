import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, caseStudyPath } from "../_lib/case-study-index";

export function CaseStudyIndexList() {
  return (
    <ul className="mt-16 lg:mt-24">
      {CASE_STUDIES.map((caseStudy, caseStudyPosition) => (
        <li key={caseStudy.slug}>
          <Link
            href={caseStudyPath(caseStudy.slug)}
            className="group grid gap-8 border-t border-border py-10 focus-visible:outline-offset-4 lg:grid-cols-12 lg:gap-8 lg:py-14"
          >
            <div className="flex flex-col lg:col-span-5">
              <h2 className="text-display-md font-medium text-foreground transition-colors duration-300 group-hover:text-accent-hover">
                {caseStudy.clientName}
              </h2>
              <p className="mt-4 max-w-md text-lead text-foreground-soft">{caseStudy.headline}</p>
              <p className="mt-6 text-sm text-muted-foreground lg:mt-auto lg:pt-10">
                {caseStudy.services.join(", ")}, {caseStudy.year}
              </p>
            </div>
            <div className="relative aspect-16/10 overflow-clip border border-border lg:col-span-7">
              <Image
                src={caseStudy.coverImage.src}
                alt={caseStudy.coverImage.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                quality={90}
                priority={caseStudyPosition < 2}
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
