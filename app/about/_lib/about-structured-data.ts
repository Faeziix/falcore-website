import type { ProfilePage } from "schema-dts";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { breadcrumbId } from "@/lib/structured-data/entity-ids";
import { breadcrumbNode, webPageFields } from "@/lib/structured-data/page-nodes";
import { founderReference } from "@/lib/structured-data/site-entities";
import { ABOUT_DESCRIPTION, ABOUT_PATH, ABOUT_TITLE } from "./about-content";

const profilePageNode: ProfilePage = {
  "@type": "ProfilePage",
  ...webPageFields({
    path: ABOUT_PATH,
    name: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    dates: STATIC_PAGE_DATES.about,
  }),
  breadcrumb: { "@id": breadcrumbId(ABOUT_PATH) },
  mainEntity: founderReference,
};

export const aboutStructuredData = [
  profilePageNode,
  breadcrumbNode(ABOUT_PATH, [{ name: "About", path: ABOUT_PATH }]),
];
