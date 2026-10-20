import type { BreadcrumbList, CollectionPage, FAQPage, WebPage } from "schema-dts";
import type { ContentDates } from "@/lib/data/page-dates";
import type { FrequentlyAskedQuestion } from "@/lib/data/faq";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbId, webPageId } from "./entity-ids";
import { organizationReference, websiteReference } from "./site-entities";

export type BreadcrumbTrailStep = {
  name: string;
  path: string;
};

export type PageDescription = {
  path: string;
  name: string;
  description: string;
  dates: ContentDates;
};

export function breadcrumbNode(path: string, trail: BreadcrumbTrailStep[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

export function webPageFields({ path, name, description, dates }: PageDescription) {
  return {
    "@id": webPageId(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: websiteReference,
    datePublished: dates.publishedOn,
    dateModified: dates.updatedOn,
  };
}

export function webPageNode(page: PageDescription, hasBreadcrumb = true): WebPage {
  return {
    "@type": "WebPage",
    ...webPageFields(page),
    about: organizationReference,
    ...(hasBreadcrumb ? { breadcrumb: { "@id": breadcrumbId(page.path) } } : {}),
  };
}

export function collectionPageNode(
  page: PageDescription,
  items: { name: string; path: string }[]
): CollectionPage {
  return {
    "@type": "CollectionPage",
    ...webPageFields(page),
    breadcrumb: { "@id": breadcrumbId(page.path) },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function faqPageNode(path: string, questions: FrequentlyAskedQuestion[]): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
