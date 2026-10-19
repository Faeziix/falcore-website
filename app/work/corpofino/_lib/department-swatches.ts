import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

export type SwatchTone = "copper" | "blush" | "rose" | "linen" | "ink";

export type StripLanguage = "english" | "arabic";

export type DepartmentSwatch = {
  id: string;
  englishName: string;
  arabicName: string;
  treatmentCount: number;
  tone: SwatchTone;
  treatmentWall: CaseStudyImage;
};

const treatmentWallSize = { width: 1080, height: 1440 };

function treatmentWallFor(departmentId: string, alt: string): CaseStudyImage {
  return {
    src: `/work/corpofino/imagery/department-wall-${departmentId}-4x4.webp`,
    alt,
    ...treatmentWallSize,
  };
}

export const DEPARTMENT_SWATCHES: DepartmentSwatch[] = [
  {
    id: "slimming",
    englishName: "Slimming",
    arabicName: "التنحيف",
    treatmentCount: 22,
    tone: "copper",
    treatmentWall: treatmentWallFor(
      "slimming",
      "Sixteen Slimming treatment images: body-contouring devices on linen beds, therapists at work and treatment rooms in warm copper light."
    ),
  },
  {
    id: "skin-care",
    englishName: "Skin Care",
    arabicName: "العناية بالبشرة",
    treatmentCount: 32,
    tone: "blush",
    treatmentWall: treatmentWallFor(
      "skin-care",
      "Sixteen Skin Care treatment images: facials in progress, clients resting in towel wraps and skincare trays on marble."
    ),
  },
  {
    id: "beauty-care",
    englishName: "Beauty Care",
    arabicName: "العناية بالجمال",
    treatmentCount: 16,
    tone: "rose",
    treatmentWall: treatmentWallFor(
      "beauty-care",
      "Sixteen Beauty Care treatment images: brow shaping, lash work, close-ups of closed eyes and warm wax in a copper bowl."
    ),
  },
  {
    id: "wellness",
    englishName: "Wellness\u00a0& Relaxation",
    arabicName: "العافية والاسترخاء",
    treatmentCount: 28,
    tone: "linen",
    treatmentWall: treatmentWallFor(
      "wellness",
      "Sixteen Wellness and Relaxation images: hammam rituals, black soap and kessa gloves, hot stones and massage."
    ),
  },
  {
    id: "nail-spa",
    englishName: "Nail Spa",
    arabicName: "سبا الأظافر",
    treatmentCount: 21,
    tone: "blush",
    treatmentWall: treatmentWallFor(
      "nail-spa",
      "Sixteen Nail Spa images: manicures on folded towels, pedicure bowls in hammered copper and gel polish under a UV lamp."
    ),
  },
  {
    id: "hair-spa",
    englishName: "Hair Spa",
    arabicName: "سبا الشعر",
    treatmentCount: 19,
    tone: "ink",
    treatmentWall: treatmentWallFor(
      "hair-spa",
      "Sixteen Hair Spa images: long hair brushed, coloured, styled and treated by stylists in a cream and copper salon."
    ),
  },
];

export const INITIALLY_OPEN_DEPARTMENT_ID = "skin-care";

function arabicTreatmentCountLabel(treatmentCount: number) {
  const takesPluralNoun = treatmentCount >= 3 && treatmentCount <= 10;
  return takesPluralNoun ? `${treatmentCount} علاجات` : `${treatmentCount} علاجًا`;
}

export function treatmentCountLabel(treatmentCount: number, language: StripLanguage) {
  return language === "arabic" ? arabicTreatmentCountLabel(treatmentCount) : `${treatmentCount} treatments`;
}

export function departmentName(swatch: DepartmentSwatch, language: StripLanguage) {
  return language === "arabic" ? swatch.arabicName : swatch.englishName;
}
