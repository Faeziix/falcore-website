import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, caseStudyPath } from "../_lib/case-study-index";

export function CaseStudyIndexList() {
  return (
    <ul className="mt-12 md:mt-16 lg:mt-24">
      {CASE_STUDIES.map((caseStudy, caseStudyPosition) => (
        <li key={caseStudy.slug}>
          <Link
            href={caseStudyPath(caseStudy.slug)}
            className="group grid gap-6 border-t border-border py-8 focus-visible:outline-offset-4 md:gap-8 md:py-10 lg:grid-cols-12 lg:py-14"
          >
            <div className="flex flex-col lg:col-span-5">
              <h2 className="text-balance text-display-md font-medium text-foreground transition-colors duration-300 group-hover:text-accent-hover">
                {caseStudy.clientName}
              </h2>
              <p className="mt-3 max-w-md text-lead text-foreground-soft md:mt-4">{caseStudy.headline}</p>
              <p className="mt-4 text-sm text-muted-foreground md:mt-6 lg:mt-auto lg:pt-10">
                {caseStudy.services.join(", ")}, {caseStudy.year}
              </p>
            </div>
            <div className="relative -order-1 aspect-16/10 overflow-clip border border-border lg:order-none lg:col-span-7">
              <Image
                src={caseStudy.coverImage.src}
                alt={caseStudy.coverImage.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                quality={90}
                preload={caseStudyPosition < 2}
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
