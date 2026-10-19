import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const XMA_AGENCY_IMAGE_DIRECTORY = "/work/xma-agency";

const DESKTOP_CAPTURE_SIZE = { width: 2880, height: 1800 };
const PHONE_CAPTURE_SIZE = { width: 828, height: 1792 };

function xmaAgencyImagePath(fileName: string) {
  return `${XMA_AGENCY_IMAGE_DIRECTORY}/${fileName}`;
}

export const mediaHomeDesktop: CaseStudyImage = {
  src: xmaAgencyImagePath("media-home-desktop-0.jpg"),
  alt: "XMA Media homepage: the headline “Ads as good as your product” over a row of skincare ad films",
  ...DESKTOP_CAPTURE_SIZE,
};

export const mediaHomePhone: CaseStudyImage = {
  src: xmaAgencyImagePath("media-home-mobile-0.jpg"),
  alt: "XMA Media homepage on a phone: the headline, a Get your ads made button and the first ad film",
  ...PHONE_CAPTURE_SIZE,
};

export const filmsByProductDesktop: CaseStudyImage = {
  src: xmaAgencyImagePath("media-home-desktop-1640.jpg"),
  alt: "The section “The work, by what you sell”: filter pills for fragrance, jewellery, skincare, food, filmed and CGI above a row of ad films",
  ...DESKTOP_CAPTURE_SIZE,
};

export const marketPageDesktop: CaseStudyImage = {
  src: xmaAgencyImagePath("media-for-real-estate-desktop-0.jpg"),
  alt: "The real estate page: “Property videos that bring buyers, not browsers” beside a six-step form asking what the visitor needs most",
  ...DESKTOP_CAPTURE_SIZE,
};

export const filmsByProductPhone: CaseStudyImage = {
  src: xmaAgencyImagePath("media-films-by-product-mobile.jpg"),
  alt: "The section “The work, by what you sell” on a phone: filter pills for fragrance, jewellery and more above the first ad film",
  width: PHONE_CAPTURE_SIZE.width,
  height: 1735,
};

export const marketPagePhone: CaseStudyImage = {
  src: xmaAgencyImagePath("media-for-real-estate-mobile-trimmed.jpg"),
  alt: "The real estate page on a phone, opening straight onto the first question of the form",
  width: PHONE_CAPTURE_SIZE.width,
  height: 1762,
};

export const processDesktop: CaseStudyImage = {
  src: xmaAgencyImagePath("media-process-desktop.jpg"),
  alt: "The section “From one call to live ads”: seven steps from call, plan and script to make, approve, launch and improve",
  width: 2880,
  height: 1400,
};

export const processPhone: CaseStudyImage = {
  src: xmaAgencyImagePath("media-process-mobile.jpg"),
  alt: "“From one call to live ads” on a phone: the seven steps from call to improve, one under the other",
  width: PHONE_CAPTURE_SIZE.width,
  height: 1960,
};

export const bookingFormDesktop: CaseStudyImage = {
  src: xmaAgencyImagePath("media-book-form-desktop.jpg"),
  alt: "The booking page “Get your ads made”: three promises on the left and a three-step form on the right ending in picking a time",
  width: 2880,
  height: 1560,
};

export const bookingFormPhone: CaseStudyImage = {
  src: xmaAgencyImagePath("media-book-form-mobile.jpg"),
  alt: "The booking page on a phone: “Get your ads made” above the first step of the form, asking for a name, brand, phone, email and what you sell",
  width: PHONE_CAPTURE_SIZE.width,
  height: 1772,
};

export const firstSiteHero: CaseStudyImage = {
  src: xmaAgencyImagePath("faez-era-hero-growth-systems-2026-03.webp"),
  alt: "The earlier xma.ae homepage I built: “Growth Systems Built to Scale Revenue” over a tilted wall of ad video cards",
  width: 1920,
  height: 1080,
};

export const firstSiteHeroTabletCrop: CaseStudyImage = {
  src: xmaAgencyImagePath("faez-era-hero-growth-systems-tablet-crop.webp"),
  alt: "The earlier xma.ae homepage I built: “Growth Systems Built to Scale Revenue” over a tilted wall of ad video cards",
  width: 1222,
  height: 764,
};

export const firstSiteHeroPhoneCrop: CaseStudyImage = {
  src: xmaAgencyImagePath("faez-era-hero-growth-systems-phone-crop-v2.webp"),
  alt: "The earlier xma.ae homepage I built, cropped to its headline “Growth Systems Built to Scale Revenue” over tilted ad video cards",
  width: 688,
  height: 822,
};

export const familySiteCaptures = {
  xma: {
    desktop: {
      src: xmaAgencyImagePath("family-xma-desktop-0.jpg"),
      alt: "xma.ae: the group site, “We build growth solutions”, on a near-black page",
      ...DESKTOP_CAPTURE_SIZE,
    },
    phone: {
      src: xmaAgencyImagePath("family-xma-mobile-0.jpg"),
      alt: "xma.ae on a phone",
      ...PHONE_CAPTURE_SIZE,
    },
  },
  media: {
    desktop: mediaHomeDesktop,
    phone: mediaHomePhone,
  },
  boost: {
    desktop: {
      src: xmaAgencyImagePath("family-boost-desktop-video.jpg"),
      alt: "xmaboost.com: “All your chats and customers in one place” on a white page with green accents",
      ...DESKTOP_CAPTURE_SIZE,
    },
    phone: {
      src: xmaAgencyImagePath("family-boost-mobile-0.jpg"),
      alt: "xmaboost.com on a phone",
      ...PHONE_CAPTURE_SIZE,
    },
  },
} satisfies Record<string, { desktop: CaseStudyImage; phone: CaseStudyImage }>;
