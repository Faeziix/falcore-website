import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const CORPOFINO_IMAGE_ROOT = "/work/corpofino";

const desktopFrameSize = { width: 2880, height: 1800 };

export const skinCareDepartmentFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/department-hero-skin-care-en-desktop-band.webp`,
  alt: "The Skin Care department page: the title “Skin Care” and a short description on a full blush field, beside a close-up of a cheekbone with a single drop of serum.",
  width: 2880,
  height: 1532,
};

export const treatmentPageFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/service-page-booking-panel-en-desktop-band.webp`,
  alt: "The Moroccan Bath with Herbs treatment page: a large title and description on a linen field, with a “Book this treatment” panel holding a Call to book button and a link to the price list.",
  width: 2880,
  height: 1184,
};

export const priceMenuFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/price-list-menu-slimming-en-desktop-band.webp`,
  alt: "The price list set like a printed spa menu: under the Slimming heading, treatments sit in two columns, each name joined to its “From” price in AED by a dotted leader, with a bar of department colour dots along the top.",
  width: 2880,
  height: 1652,
};

export const priceMenuPhoneFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/price-list-menu-slimming-en-mobile.webp`,
  alt: "The price list on a phone: the Slimming heading, then Muscle Stimulation and Fat Reduction treatments, each joined to its “From” price by a dotted leader.",
  width: 828,
  height: 1580,
};

export const englishHomeFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/home-hero-en-desktop.webp`,
  alt: "The English home page: the headline “Sculpt your life!” over the left side of the brand photograph, a model in a white bandeau against flowing white satin, with Explore treatments and Call to book buttons.",
  ...desktopFrameSize,
};

export const arabicHomeFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/home-hero-ar-desktop.webp`,
  alt: "The Arabic home page, mirrored: the Arabic headline and buttons sit on the right, the photograph is flipped, and the Arabic wordmark leads the navigation from the right.",
  ...desktopFrameSize,
};

const phoneFrameSize = { width: 828, height: 1792 };

export const englishHomePhoneFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/home-hero-en-mobile.webp`,
  alt: "The English home page on a phone: the headline “Sculpt your life!” over the brand photograph, with Explore treatments and Call to book buttons.",
  ...phoneFrameSize,
};

export const arabicHomePhoneFrame: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/home-hero-ar-mobile.webp`,
  alt: "The Arabic home page on a phone, mirrored: the photograph is flipped and the Arabic headline and buttons sit on the right.",
  ...phoneFrameSize,
};

export const treatmentImageryWall: CaseStudyImage = {
  src: `${CORPOFINO_IMAGE_ROOT}/ai-service-imagery-wall-138.webp`,
  alt: "All 138 treatment images tiled in one wall: facials, brows, hair, nails, hammam and massage scenes in the same warm cream, blush and copper light.",
  width: 3128,
  height: 1086,
};
