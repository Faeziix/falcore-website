import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const SANAA_OUAHMANE_IMAGE_DIRECTORY = "/work/sanaa-ouahmane";

function sanaaOuahmaneImage(fileName: string, alt: string, width: number, height: number): CaseStudyImage {
  return { src: `${SANAA_OUAHMANE_IMAGE_DIRECTORY}/${fileName}`, alt, width, height };
}

export const bookPageHeroImage = sanaaOuahmaneImage(
  "book-hero-cover-desktop.webp",
  "The Inner Armor book page: the front and back cover on a white page beside the title set large in crimson serif, a short paragraph about the book, an Order on Amazon button and the publisher and date line.",
  2880,
  1800
);

export const manifestoPageImage = sanaaOuahmaneImage(
  "manifesto-hero-plate-edge-desktop.webp",
  "The Manifesto page: the title in crimson serif on white, her epigraph in italic between two thin terracotta rules, and the edge of a graphite plate below.",
  2880,
  1456
);

export const portraitsAsShot: CaseStudyImage[] = [
  sanaaOuahmaneImage(
    "portrait-studio-charcoal-wrap-dress.jpg",
    "Sanaa Ouahmane standing against a charcoal studio wall in a fitted taupe wrap dress, one hand raised to her hair and the other arm folded across her waist.",
    1023,
    1537
  ),
  sanaaOuahmaneImage(
    "portrait-armchair-crimson-suit.jpg",
    "Sanaa Ouahmane in a crimson trouser suit, seated in a white armchair against a pale grey studio wall.",
    1023,
    1537
  ),
  sanaaOuahmaneImage(
    "portrait-stool-grey-check-suit.jpg",
    "Sanaa Ouahmane in a grey check suit and white blouse, seated on a stool against a light grey studio wall.",
    1023,
    1537
  ),
];

export const bookOrderPlateImage = sanaaOuahmaneImage(
  "book-order-plate-crimson-full-desktop.webp",
  "The crimson order plate on the book page: the cover on the left, and on the right “Order your copy”, a line saying the book is available on Amazon.ae and Amazon worldwide in paperback and hardcover, and an Order on Amazon button.",
  2880,
  1488
);

export const recognitionsTimelineDesktopImage = sanaaOuahmaneImage(
  "recognitions-timeline-six-cards-desktop.webp",
  "The Recognitions timeline on the About page: “11 honours, 2016 to 2026”, then six year cards, 2026, 2025, 2023, 2019, 2018 and 2016, alternating either side of a thin drawn rail with crimson square markers.",
  2880,
  3770
);

export const recognitionsTimelineMobileImage = sanaaOuahmaneImage(
  "recognitions-timeline-three-cards-phone.webp",
  "The Recognitions timeline on a phone: the rail runs down the left edge and the 2026, 2025 and 2023 year cards stack beside it.",
  828,
  2300
);

export const bookPageHeroPhoneImage = sanaaOuahmaneImage(
  "book-hero-mobile-cropped.webp",
  "The Inner Armor book page on a phone: the front and back cover, then the title in crimson serif and the subtitle in light italic.",
  828,
  1340
);

export const bookOrderPlatePhoneImage = sanaaOuahmaneImage(
  "book-order-plate-launch-phone.webp",
  "The crimson order plate on a phone: the cover, then “Order your copy”, a line saying the book is available on Amazon.ae and Amazon worldwide in paperback and hardcover, and an Order on Amazon button.",
  828,
  1820
);

export const manifestoPagePhoneImage = sanaaOuahmaneImage(
  "manifesto-hero-plate-edge-phone.webp",
  "The Manifesto page on a phone: the title in crimson serif, her epigraph in italic between two thin terracotta rules, and the edge of a graphite plate below.",
  828,
  1240
);
