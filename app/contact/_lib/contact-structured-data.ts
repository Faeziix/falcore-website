import type { ContactPage } from "schema-dts";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { breadcrumbId } from "@/lib/structured-data/entity-ids";
import { breadcrumbNode, webPageFields } from "@/lib/structured-data/page-nodes";
import { organizationReference } from "@/lib/structured-data/site-entities";
import { CONTACT_DESCRIPTION, CONTACT_PATH, CONTACT_TITLE } from "./contact-content";

const contactPageNode: ContactPage = {
  "@type": "ContactPage",
  ...webPageFields({
    path: CONTACT_PATH,
    name: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    dates: STATIC_PAGE_DATES.contact,
  }),
  breadcrumb: { "@id": breadcrumbId(CONTACT_PATH) },
  about: organizationReference,
};

export const contactStructuredData = [
  contactPageNode,
  breadcrumbNode(CONTACT_PATH, [{ name: "Contact", path: CONTACT_PATH }]),
];
