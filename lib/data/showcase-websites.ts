export type ShowcaseWebsite = {
  id: string;
  title: string;
  summary: string;
  externalUrl: string;
  thumbnailUrl: string;
  mobileThumbnailUrl: string;
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
};

export const DESKTOP_VIEWPORT = { width: 1280, height: 800 };
export const MOBILE_VIEWPORT = { width: 414, height: 736 };

export const SHOWCASE_SECTION_TITLE = "Selected websites";
export const SHOWCASE_SECTION_INTRO = "Recent sites I\u00A0designed and built.";

export const SHOWCASE_SCREENSHOT_DIRECTORY = "showcase";

const screenshotPath = (
  id: string,
  screenshotVersion: number,
  device: "desktop" | "mobile"
) =>
  `/${SHOWCASE_SCREENSHOT_DIRECTORY}/${id}-v${screenshotVersion}-${device}.jpg`;

type ShowcaseEntry = {
  id: string;
  title: string;
  summary: string;
  externalUrl: string;
  screenshotVersion?: number;
  mobileScreenshotVersion?: number;
};

const showcaseEntries: ShowcaseEntry[] = [
  {
    id: "diamaria",
    title: "DiaMaria",
    summary: "Bespoke diamond jewellery, Dubai",
    externalUrl: "https://www.diamaria.com",
    mobileScreenshotVersion: 2,
  },
  {
    id: "xma",
    title: "XMA Agency",
    summary: "Growth agency for UAE businesses",
    externalUrl: "https://www.xma.ae",
    mobileScreenshotVersion: 2,
  },
  {
    id: "convoflow",
    title: "ConvoFlow",
    summary: "AI lead qualification and booking",
    externalUrl: "https://www.convoflow.ae",
    mobileScreenshotVersion: 2,
  },
  {
    id: "timeless-touch",
    title: "Timeless Touch Ceramics",
    summary: "Porcelain surfaces manufacturer, Dubai",
    externalUrl: "https://www.timelesstouchceramics.com",
    screenshotVersion: 2,
    mobileScreenshotVersion: 3,
  },
  {
    id: "sanaa",
    title: "Sanaa Ouahmane",
    summary: "Author site for the book Inner Armor",
    externalUrl: "https://www.sanaaouahmane.com",
    screenshotVersion: 2,
    mobileScreenshotVersion: 3,
  },
  {
    id: "corpofino",
    title: "Corpofino",
    summary: "Women’s spa and slimming lounge, Abu Dhabi",
    externalUrl: "https://corpofino-web.vercel.app/en",
    mobileScreenshotVersion: 2,
  },
];

export const SHOWCASE_WEBSITES: ShowcaseWebsite[] = showcaseEntries.map(
  ({
    screenshotVersion = 1,
    mobileScreenshotVersion = screenshotVersion,
    ...entry
  }) => ({
    ...entry,
    thumbnailUrl: screenshotPath(entry.id, screenshotVersion, "desktop"),
    mobileThumbnailUrl: screenshotPath(entry.id, mobileScreenshotVersion, "mobile"),
    width: DESKTOP_VIEWPORT.width,
    height: DESKTOP_VIEWPORT.height,
    mobileWidth: MOBILE_VIEWPORT.width,
    mobileHeight: MOBILE_VIEWPORT.height,
  })
);
