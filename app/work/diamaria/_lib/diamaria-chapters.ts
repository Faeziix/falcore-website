import type { CaseStudyOutcome } from "@/app/work/_lib/case-study-types";

type ChapterCopy = {
  id: string;
  title: string;
  intro: string;
};

export const startingPhotographsChapter: ChapterCopy = {
  id: "the-photos-i-started-with",
  title: "The photos I started with",
  intro:
    "One raw studio shoot, each ring small and soft on a blue-grey sweep, and a few phone photos sent over chat. Little of it could go on the site as it was.",
};

export const loupeChapter: ChapterCopy = {
  id: "under-the-loupe",
  title: "Under the loupe",
  intro:
    "The frame from the shoot, as it came, and the finished packshot of the same ring.",
};

export const loupeInstruction = {
  finePointer: "Move the loupe over the frame. Arrow keys work too.",
  coarsePointer: "Drag the loupe, or tap where you want it.",
};

export const matchedPackshotsChapter: ChapterCopy = {
  id: "one-look-piece-after-piece",
  title: "One look, piece after piece",
  intro:
    "Each piece I imaged gets the same pure white ground, fixed angles for its category and one faint shadow, so they read as one shoot.",
};

export const wornFramesChapter: ChapterCopy = {
  id: "worn-not-pasted",
  title: "Worn, not pasted",
  intro:
    "Early worn images looked pasted onto the model. I learned to work from real photos of the piece and to set it at its true size.",
};

export const wornSequenceCaptions = {
  rawShoot: "Raw shoot",
  packshot: "Packshot",
  worn: "Worn",
};

export const catalogueChapter: ChapterCopy = {
  id: "a-catalogue-she-can-run-herself",
  title: "A catalogue she can run herself",
  intro:
    "The founder can add pieces, reorder collections and compose pages herself. Private enquiries arrive in the same place.",
};

export const houseScenesChapter: ChapterCopy = {
  id: "scenes-for-the-house",
  title: "Scenes for the house",
  intro: "Images for the house and its collection pages, each one built around a real DiaMaria piece.",
};

export const outcomesIntro = "A quiet catalogue, live, with images that finally match the pieces.";

export const diaMariaOutcomes: CaseStudyOutcome[] = [
  {
    statement: "Live at diamaria.com",
    detail:
      "I designed and built it and made its product imagery, replacing the old WordPress site with a catalogue made for high jewellery.",
  },
  {
    statement: "Built in about a month",
    detail: "44 updates shipped between 31 August and 29 September 2026.",
  },
  {
    statement: "About 85 new product images",
    detail:
      "Across about 40 pieces, made with AI in my image studio from DiaMaria's own shoot and phone photos. The rest of the catalogue still uses its existing photos.",
  },
  {
    statement: "Run by the founder",
    detail: "Pieces, collection order, page layouts and private enquiries all live in one content studio she can edit herself.",
  },
];
