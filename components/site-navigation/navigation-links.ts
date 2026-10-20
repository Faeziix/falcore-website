import { BLOG_INDEX_PATH, hasPublishedBlogPosts } from "@/app/blog/_lib/blog-posts";

export type NavigationLinkId = "services" | "work" | "blog" | "about" | "contact";

export type NavigationLink = {
  id: NavigationLinkId;
  label: string;
  href: string;
};

export const SERVICES_NAVIGATION_LABEL = "Services";
export const WORK_NAVIGATION_LABEL = "Work";
export const WORK_INDEX_LINK = { label: "All work", href: "/work" };

const BLOG_NAVIGATION_LINK: NavigationLink = { id: "blog", label: "Blog", href: BLOG_INDEX_PATH };

export const PAGE_NAVIGATION_LINKS: NavigationLink[] = [
  ...(hasPublishedBlogPosts() ? [BLOG_NAVIGATION_LINK] : []),
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const NAVIGATION_LINK_BY_HOME_SECTION_ID: Record<string, NavigationLinkId> = {
  services: "services",
  "operating-system": "work",
  work: "work",
};

const NAVIGATION_LINK_BY_ROUTE_PREFIX: [string, NavigationLinkId][] = [
  ["/services", "services"],
  ["/work", "work"],
  [BLOG_INDEX_PATH, "blog"],
  ["/about", "about"],
  ["/contact", "contact"],
];

export function findNavigationLinkForPathname(pathname: string): NavigationLinkId | null {
  const matchingRoute = NAVIGATION_LINK_BY_ROUTE_PREFIX.find(([routePrefix]) =>
    pathname.startsWith(routePrefix)
  );
  return matchingRoute ? matchingRoute[1] : null;
}

export const SERVICES_MENU_PANEL_ID = "services-menu-panel";
export const WORK_MENU_PANEL_ID = "work-menu-panel";
export const MOBILE_NAVIGATION_SHEET_ID = "mobile-navigation-sheet";
