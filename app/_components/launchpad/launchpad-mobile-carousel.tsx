"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPositionSegments,
  CarouselPrevious,
  CarouselSelectedSlideAnnouncement,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadFeatureSlide } from "./launchpad-feature-slide";

export function LaunchpadMobileCarousel({
  caseStudyLink,
}: {
  caseStudyLink: React.ReactNode;
}) {
  const { title, summary, features } = LAUNCHPAD_SHOWCASE;
  const featureNames = features.map((feature) => feature.name);

  return (
    <Carousel aria-label="Platform features">
      <SectionHeading
        title={title}
        intro={summary}
        actionsPlacement="belowOnMobile"
        actions={
          <div className="flex items-center justify-between gap-6">
            {caseStudyLink}
            <div className="flex gap-2">
              <CarouselPrevious aria-label="Previous feature" />
              <CarouselNext aria-label="Next feature" />
            </div>
          </div>
        }
        className="mb-10"
      />
      <CarouselSelectedSlideAnnouncement slideLabels={featureNames} />
      <CarouselContent viewportClassName="-mx-(--page-gutter) px-(--page-gutter)">
        {features.map((feature, featureIndex) => (
          <CarouselItem
            key={feature.id}
            aria-label={`${featureIndex + 1} of ${features.length}: ${feature.name}`}
            className="basis-[min(86%,30rem)]"
          >
            <LaunchpadFeatureSlide feature={feature} isFirst={featureIndex === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPositionSegments slideLabels={featureNames} />
    </Carousel>
  );
}
