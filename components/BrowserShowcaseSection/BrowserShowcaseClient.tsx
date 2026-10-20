"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrowserChrome from "./BrowserChrome";
import BrowserTabBar from "./BrowserTabBar";
import BrowserAddressBar from "./BrowserAddressBar";
import BrowserContent from "./BrowserContent";
import MobileShowcaseCarousel from "./MobileShowcaseCarousel";
import { AcquireFrame } from "@/components/scroll-reveal/acquire-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";

export type { ShowcaseWebsite } from "@/lib/data/showcase-websites";
import {
  SHOWCASE_SECTION_INTRO,
  SHOWCASE_SECTION_TITLE,
  type ShowcaseWebsite,
} from "@/lib/data/showcase-websites";

interface BrowserShowcaseClientProps {
  websites: ShowcaseWebsite[];
}

const BrowserShowcaseClient = ({ websites }: BrowserShowcaseClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const activeWebsite = websites[activeIndex];

  const handleTabChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleVisit = useCallback(() => {
    if (activeWebsite?.caseStudyPath) {
      router.push(activeWebsite.caseStudyPath);
    }
  }, [activeWebsite, router]);

  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll gallery (heading is inside the sticky area) */}
      <div className="md:hidden">
        <MobileShowcaseCarousel websites={websites} />
      </div>

      {/* Desktop: heading + tabbed browser mockup */}
      <div className="hidden md:block">
        <SectionHeading
          title={SHOWCASE_SECTION_TITLE}
          intro={SHOWCASE_SECTION_INTRO}
          actions={
            <TextLink asChild tone="foreground" underline="always">
              <Link href={activeWebsite.caseStudyPath}>
                Read the {activeWebsite.title} case study
              </Link>
            </TextLink>
          }
          className="mb-14"
        />

        <div data-reveal>
          <AcquireFrame>
            <BrowserChrome>
              <BrowserTabBar
                websites={websites}
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
              />
              <BrowserAddressBar url={activeWebsite.externalUrl} />
              <BrowserContent
                websites={websites}
                activeIndex={activeIndex}
                onContentClick={handleVisit}
              />
            </BrowserChrome>
          </AcquireFrame>
        </div>
      </div>
    </div>
  );
};

export default BrowserShowcaseClient;
