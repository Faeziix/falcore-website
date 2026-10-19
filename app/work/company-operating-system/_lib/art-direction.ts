import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

export type ArtDirectedImage = {
  image: CaseStudyImage;
  tabletImage?: CaseStudyImage;
  phoneImage?: CaseStudyImage;
};

export type ArtDirectedRendition = {
  key: "phone" | "tablet" | "desktop";
  image: CaseStudyImage;
  sizes: string;
  visibilityClassName: string;
};

const phoneSizes = "(min-width: 768px) 1px, 94vw";
const tabletSizesAfterPhone = "(min-width: 1024px) 1px, (min-width: 768px) 94vw, 1px";
const tabletSizesWithoutPhone = "(min-width: 1024px) 1px, 94vw";

const phoneVisibility = "md:hidden";
const portraitPhoneVisibility = "sm:max-w-md md:hidden";

function isPortrait(image: CaseStudyImage) {
  return image.height > image.width;
}

function desktopVisibility({ tabletImage, phoneImage }: ArtDirectedImage) {
  if (tabletImage) return { className: "hidden lg:block", hiddenBelow: "(max-width: 1023px) 1px, " };
  if (phoneImage) return { className: "hidden md:block", hiddenBelow: "(max-width: 767px) 1px, " };
  return { className: "", hiddenBelow: "" };
}

export function artDirectedRenditions(
  artDirectedImage: ArtDirectedImage,
  desktopSizes: string
): ArtDirectedRendition[] {
  const { image, tabletImage, phoneImage } = artDirectedImage;
  const renditions: ArtDirectedRendition[] = [];

  if (phoneImage) {
    renditions.push({
      key: "phone",
      image: phoneImage,
      sizes: phoneSizes,
      visibilityClassName: isPortrait(phoneImage) ? portraitPhoneVisibility : phoneVisibility,
    });
  }

  if (tabletImage) {
    renditions.push({
      key: "tablet",
      image: tabletImage,
      sizes: phoneImage ? tabletSizesAfterPhone : tabletSizesWithoutPhone,
      visibilityClassName: phoneImage ? "hidden md:block lg:hidden" : "lg:hidden",
    });
  }

  const desktop = desktopVisibility(artDirectedImage);
  renditions.push({
    key: "desktop",
    image,
    sizes: `${desktop.hiddenBelow}${desktopSizes}`,
    visibilityClassName: desktop.className,
  });

  return renditions;
}
