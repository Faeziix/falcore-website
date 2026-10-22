export type ContentDates = {
  publishedOn: string;
  updatedOn: string;
};

export const STATIC_PAGE_DATES = {
  home: { publishedOn: "2026-03-31", updatedOn: "2026-10-20" },
  about: { publishedOn: "2026-04-04", updatedOn: "2026-10-22" },
  contact: { publishedOn: "2026-04-04", updatedOn: "2026-10-20" },
  services: { publishedOn: "2026-10-19", updatedOn: "2026-10-20" },
  work: { publishedOn: "2026-10-19", updatedOn: "2026-10-20" },
  blog: { publishedOn: "2026-10-20", updatedOn: "2026-10-20" },
  privacy: { publishedOn: "2026-04-03", updatedOn: "2026-10-20" },
} satisfies Record<string, ContentDates>;
