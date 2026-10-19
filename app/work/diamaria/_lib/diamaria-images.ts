import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const DIAMARIA_IMAGE_DIRECTORY = "/work/diamaria";

function diaMariaImage(fileName: string, alt: string, width: number, height: number): CaseStudyImage {
  return { src: `${DIAMARIA_IMAGE_DIRECTORY}/${fileName}`, alt, width, height };
}

export const coupeAndLariatScene = diaMariaImage(
  "scene-classic-collection-coupe-and-lariat.webp",
  "A model in a champagne satin dress wearing DiaMaria's marquise and pear diamond lariat, holding a coupe glass, a diamond eternity band on her finger",
  3200,
  1786
);

export const coupeAndLariatCover = diaMariaImage(
  "cover-classic-coupe-and-lariat-16x10.webp",
  "A model in a champagne satin dress wearing DiaMaria's marquise and pear diamond lariat, holding a coupe glass",
  2858,
  1786
);

export const pinkRadiantRawShoot = diaMariaImage(
  "before-pink-radiant-ring-raw-shoot.webp",
  "The untouched studio frame: a pink radiant-cut ring sits small and soft in the middle of a wide blue-grey backdrop",
  3200,
  2133
);

export const lariatPhonePhoto = diaMariaImage(
  "before-lariat-necklace-client-phone-photo.webp",
  "A phone photo of the lariat on a grey velvet display bust: the marquise diamond at the neck, the drop chain running out of frame",
  960,
  1280
);

export const emeraldCutRawShoot = diaMariaImage(
  "before-emerald-cut-ring-raw-shoot.webp",
  "The untouched studio frame: an emerald-cut diamond ring with tapered baguettes, small on a blue-grey backdrop",
  3200,
  2133
);

export const emeraldCutRawShootDetail = diaMariaImage(
  "before-emerald-cut-ring-raw-shoot-detail.webp",
  "A close crop of the raw studio frame: the emerald-cut ring on the blue-grey backdrop, soft and flat in the grey light",
  1200,
  1200
);

export const emeraldCutPackshotThreeQuarter = diaMariaImage(
  "after-emerald-cut-ring-packshot-three-quarter.webp",
  "The finished packshot: the same emerald-cut ring upright in a three-quarter view on pure white",
  2000,
  2000
);

export const matchedPackshots: CaseStudyImage[] = [
  diaMariaImage(
    "after-emerald-cut-ring-packshot-front.webp",
    "Packshot of an emerald-cut diamond ring with tapered baguettes, seen from above on pure white",
    2000,
    2000
  ),
  diaMariaImage(
    "after-pink-radiant-ring-packshot-front.webp",
    "Packshot of a pink radiant-cut diamond ring flanked by two white heart-shaped diamonds, on pure white",
    2000,
    2000
  ),
  diaMariaImage(
    "after-blue-heart-necklace-packshot.webp",
    "Packshot of a diamond tennis necklace laid in a long loop on pure white, a blue heart-shaped stone hanging at its centre",
    2000,
    2000
  ),
  diaMariaImage(
    "after-lariat-necklace-packshot.webp",
    "Packshot of a diamond lariat necklace on pure white: a marquise diamond at the neck and a pear diamond at the end of the drop chain",
    1536,
    1536
  ),
];

export const blueHeartRawShoot = diaMariaImage(
  "before-blue-heart-necklace-raw-shoot.webp",
  "The raw studio frame: the blue heart tennis necklace lying in a loose, uneven loop on the blue-grey backdrop",
  3200,
  2133
);

export const blueHeartPackshot = diaMariaImage(
  "after-blue-heart-necklace-packshot.webp",
  "The finished packshot: the same necklace laid in an even loop on pure white, the blue heart centred",
  2000,
  2000
);

export const blueHeartWorn = diaMariaImage(
  "after-blue-heart-necklace-lifestyle.webp",
  "The necklace worn above a black strapless top, the blue heart resting just below the collarbone",
  1856,
  2304
);

export const olympicCollectionPieces = diaMariaImage(
  "site-collection-olympic-grid-desktop-pieces.webp",
  "The Olympic collection page on diamaria.com: four interlocking five-ring pendants on the same white ground, one in yellow gold with coloured stones, then three in white gold: all white diamonds, blue and red stones, and blue and black stones",
  2880,
  1010
);

export const olympicCollectionPiecesOnPhone = diaMariaImage(
  "site-collection-olympic-grid-mobile-pieces.webp",
  "The Olympic collection page on a phone: four five-ring pendants in a two-by-two grid on the same white ground, each with its name and metal",
  828,
  1446
);

export const pinkRadiantProductPageDesktop = diaMariaImage(
  "site-product-pink-radiant-desktop-gallery.webp",
  "A product page on diamaria.com: the pink radiant ring beside its name, Price on request, Enquire and Book an appointment",
  2880,
  1728
);

export const pinkRadiantProductPageMobile = diaMariaImage(
  "site-product-pink-radiant-mobile.jpg",
  "The same product page on a phone: the ring gallery with thumbnails, then the piece name and an Enquire button",
  828,
  1792
);

export const bespokeDrawingScene = diaMariaImage(
  "scene-bespoke-collection-hand-at-drawing.webp",
  "A hand painting an emerald necklace design in watercolour, the other hand wearing a diamond butterfly ring",
  1792,
  2400
);

export const olympicColourScene = diaMariaImage(
  "scene-olympic-collection-colour-macro.webp",
  "The coloured Olympic pendant on pink stone in a raking shaft of sunlight, its rings casting long shadows",
  1792,
  2400
);
