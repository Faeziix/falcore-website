export type PaletteSwatchName = "ground" | "porcelain" | "graphite" | "crimson" | "mulberry" | "terracotta";

export type PaletteSwatch = {
  name: PaletteSwatchName;
  label: string;
  share: number;
  isLabelVisible: boolean;
};

export const paletteAsTheSiteSpendsIt: PaletteSwatch[] = [
  { name: "porcelain", label: "Porcelain", share: 36, isLabelVisible: true },
  { name: "ground", label: "White", share: 31, isLabelVisible: true },
  { name: "graphite", label: "Graphite", share: 20, isLabelVisible: true },
  { name: "crimson", label: "Crimson", share: 10, isLabelVisible: true },
  { name: "mulberry", label: "Mulberry", share: 2, isLabelVisible: false },
  { name: "terracotta", label: "Terracotta", share: 1, isLabelVisible: false },
];

export const paletteSpendCaption =
  "Her palette by how much of her Home, Book and About pages each colour covers, measured from full-page captures. Terracotta is a hairline accent.";
