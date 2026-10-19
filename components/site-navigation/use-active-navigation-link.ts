"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  findNavigationLinkForPathname,
  NAVIGATION_LINK_BY_HOME_SECTION_ID,
  type NavigationLinkId,
} from "./navigation-links";

const SECTION_DETECTION_BAND = "-45% 0px -50% 0px";

export type ActiveNavigationLink = {
  activeLinkId: NavigationLinkId | null;
  ariaCurrentValue: "page" | "location";
};

function useActiveHomeSectionLink(isHomePage: boolean) {
  const [activeHomeSectionLink, setActiveHomeSectionLink] = useState<NavigationLinkId | null>(null);

  useEffect(() => {
    if (!isHomePage) return;

    const observedSections = Object.keys(NAVIGATION_LINK_BY_HOME_SECTION_ID)
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);
    const visibleSectionIds = new Set<string>();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSectionIds.add(entry.target.id);
          else visibleSectionIds.delete(entry.target.id);
        }
        const firstVisibleSection = observedSections.find((section) =>
          visibleSectionIds.has(section.id)
        );
        setActiveHomeSectionLink(
          firstVisibleSection ? NAVIGATION_LINK_BY_HOME_SECTION_ID[firstVisibleSection.id] : null
        );
      },
      { rootMargin: SECTION_DETECTION_BAND }
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, [isHomePage]);

  return activeHomeSectionLink;
}

export function useActiveNavigationLink(): ActiveNavigationLink {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const activeHomeSectionLink = useActiveHomeSectionLink(isHomePage);

  if (isHomePage) {
    return { activeLinkId: activeHomeSectionLink, ariaCurrentValue: "location" };
  }
  return { activeLinkId: findNavigationLinkForPathname(pathname), ariaCurrentValue: "page" };
}
