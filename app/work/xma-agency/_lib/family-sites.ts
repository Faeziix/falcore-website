import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { familySiteCaptures } from "./case-study-images";

export type FamilySiteTone = "group" | "media" | "boost";

export type FamilySite = {
  id: FamilySiteTone;
  name: string;
  job: string;
  address: string;
  desktop: CaseStudyImage;
  phone: CaseStudyImage;
};

export const FAMILY_SITES: FamilySite[] = [
  {
    id: "media",
    name: "XMA Media",
    job: "Makes the ads",
    address: "xmamedia.ai",
    ...familySiteCaptures.media,
  },
  {
    id: "group",
    name: "XMA",
    job: "Growth solutions, Dubai",
    address: "xma.ae",
    ...familySiteCaptures.xma,
  },
  {
    id: "boost",
    name: "XMA Boost",
    job: "Answers the leads",
    address: "xmaboost.com",
    ...familySiteCaptures.boost,
  },
];
