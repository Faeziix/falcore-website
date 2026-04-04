"use client";

import { useState, useCallback } from "react";
import BrowserChrome from "./BrowserChrome";
import BrowserTabBar from "./BrowserTabBar";
import BrowserAddressBar from "./BrowserAddressBar";
import BrowserContent from "./BrowserContent";
import HorizontalScrollGallery from "./HorizontalScrollGallery";
import ScrollReveal from "@/components/scroll-reveal";

export interface ShowcaseWebsite {
  id: string;
  title: string;
  externalUrl: string;
  thumbnailUrl: string;
  mobileThumbnailUrl: string;
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
}

interface BrowserShowcaseClientProps {
  websites: ShowcaseWebsite[];
}

const BrowserShowcaseClient = ({ websites }: BrowserShowcaseClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeWebsite = websites[activeIndex];

  const handleTabChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleVisit = useCallback(() => {
    if (activeWebsite?.externalUrl) {
      window.open(activeWebsite.externalUrl, "_blank", "noopener,noreferrer");
    }
  }, [activeWebsite]);

  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll gallery (heading is inside the sticky area) */}
      <div className="md:hidden">
        <HorizontalScrollGallery websites={websites} />
      </div>

      {/* Desktop: heading + tabbed browser mockup */}
      <div className="hidden md:block">
        <ScrollReveal>
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
              Selected work
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              A look at recent projects we have shipped.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
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
        </ScrollReveal>
      </div>
    </div>
  );
};

export default BrowserShowcaseClient;
