"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import {
  SHOWCASE_SECTION_INTRO,
  SHOWCASE_SECTION_TITLE,
  type ShowcaseWebsite,
} from "@/lib/data/showcase-websites";

function ProjectCard({
  website,
  isFirst,
}: {
  website: ShowcaseWebsite;
  isFirst: boolean;
}) {
  return (
    <a
      href={website.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className="group flex flex-1 flex-col border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <div className="relative aspect-9/16 border-b border-border bg-muted/10">
        <Image
          src={website.mobileThumbnailUrl}
          alt={`Screenshot of ${website.title}`}
          fill
          draggable={false}
          sizes="(max-width: 767px) 82vw, 320px"
          quality={90}
          className="object-cover object-top"
          priority={isFirst}
        />
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 px-5 pt-4 pb-5">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-foreground">
            {website.title}
          </h3>
          <p className="mt-1 text-sm text-foreground-soft">{website.summary}</p>
        </div>
        <ArrowUpRightIcon
          aria-hidden
          weight="bold"
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-active:text-foreground"
        />
      </div>
    </a>
  );
}

function ShowcaseSlides({ websites }: { websites: ShowcaseWebsite[] }) {
  const { selectedIndex } = useCarousel();

  return (
    <CarouselContent viewportClassName="px-(--page-gutter)">
      {websites.map((website, cardIndex) => (
        <CarouselItem
          key={website.id}
          aria-label={`${cardIndex + 1} of ${websites.length}: ${website.title}`}
          className={cn(
            "basis-[min(82%,20rem)] transition-opacity duration-500 ease-out-expo motion-reduce:transition-none",
            cardIndex === selectedIndex ? "opacity-100" : "opacity-45"
          )}
        >
          <ProjectCard website={website} isFirst={cardIndex === 0} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

function PositionSegments({ websites }: { websites: ShowcaseWebsite[] }) {
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div className="mt-4 flex gap-1.5 px-(--page-gutter)">
      {websites.map((website, cardIndex) => {
        const isCurrent = cardIndex === selectedIndex;
        return (
          <button
            key={website.id}
            type="button"
            aria-label={`Show ${website.title}`}
            aria-current={isCurrent || undefined}
            onClick={() => scrollTo(cardIndex)}
            className="flex h-11 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <span
              className={cn(
                "block w-full transition-[height,background-color] duration-300 ease-out-expo motion-reduce:transition-none",
                isCurrent ? "h-0.5 bg-foreground" : "h-px bg-border-strong"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function SelectedWebsiteAnnouncement({ websites }: { websites: ShowcaseWebsite[] }) {
  const { selectedIndex } = useCarousel();

  return (
    <p aria-live="polite" className="sr-only">
      {selectedIndex + 1} of {websites.length}: {websites[selectedIndex]?.title}
    </p>
  );
}

export default function MobileShowcaseCarousel({
  websites,
}: {
  websites: ShowcaseWebsite[];
}) {
  return (
    <Carousel aria-label={SHOWCASE_SECTION_TITLE} className="section-spacing">
      <SectionHeading
        title={SHOWCASE_SECTION_TITLE}
        intro={SHOWCASE_SECTION_INTRO}
        actions={
          <div className="flex gap-2">
            <CarouselPrevious aria-label="Previous website" />
            <CarouselNext aria-label="Next website" />
          </div>
        }
        className="mx-(--page-gutter) mb-10"
      />
      <SelectedWebsiteAnnouncement websites={websites} />
      <ShowcaseSlides websites={websites} />
      <PositionSegments websites={websites} />
    </Carousel>
  );
}
