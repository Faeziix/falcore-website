import type { CaseStudyOutcome } from "@/app/work/_lib/case-study-types";

export const CHAPTER_COPY = {
  documents: {
    title: "A box of documents, not a brief",
    intro:
      "The spa sent a map of the site, a price sheet and 60 treatment documents in English and Arabic, and no treatment photos. I matched them up by hand once, and a script built every treatment page from them.",
  },
  priceMenu: {
    title: "The menu, not the price tag",
    intro:
      "The spa wanted prices kept off the treatment pages. So every price lives on one page, set like the menu you are handed at a spa.",
  },
  rightToLeft: {
    title: "Read right to left",
    intro:
      "Every page exists in English and Arabic, and the Arabic one mirrors the layout. On the home page even the photograph flips. I also wrote the Arabic treatment names the documents didn’t have.",
  },
  oldAddresses: {
    title: "Old addresses, rebuilt",
    intro:
      "The old site had already been deleted, so I rebuilt its address list from the Wayback Machine. About 145 old addresses are mapped to their new pages, ready for the day the domain moves over.",
  },
  photographs: {
    title: "138 pictures that did not exist",
    intro:
      "There were no treatment photos, so I wrote a shot note for every treatment and art-directed an AI image of each one. They hold the place, in one warm style, until the spa’s own photographs arrive.",
  },
  departments: {
    title: "Five skins, six departments",
    intro:
      "Each department wears one tone from the brand’s five skin swatches, as on the spa’s site. Open a band to see a wall of its treatment images, then read the strip in Arabic.",
  },
} as const;

export const CAPTIONS = {
  rightToLeft: "The hero photograph comes from the spa’s brand identity.",
  photographs: "All 138 treatment images. AI art direction, not photographs of the spa.",
} as const;

export const OUTCOMES_INTRO =
  "The site runs on a preview address with launch prep done, waiting only on the spa’s own inputs.";

export const OUTCOMES: CaseStudyOutcome[] = [
  {
    statement: "138 treatment pages, none retyped",
    detail:
      "Plus 6 departments, 25 treatment groups and 74 FAQs, built from the spa’s own spreadsheets and documents through a mapping I checked by hand.",
  },
  {
    statement: "Launch prep done in 10 days",
    detail:
      "Every department, treatment and marketing page was up within four days of the first commit. Search setup, redirects and accessibility fixes were done by day ten.",
  },
  {
    statement: "92 to 95 on phones",
    detail:
      "Google’s Lighthouse speed score on phones for the home, department and treatment pages, with 100 for accessibility. Measured on the preview site, September 2026.",
  },
  {
    statement: "Edits live in about a minute",
    detail:
      "The spa’s staff can edit English and Arabic side by side, with a plain-language guide. A monthly offer appears and expires on its own dates.",
  },
];
