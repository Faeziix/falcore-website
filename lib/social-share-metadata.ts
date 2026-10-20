import type { Metadata } from "next";
import type { ContentDates } from "@/lib/data/page-dates";
import { absoluteUrl } from "@/lib/site-config";

export type ShareCardImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

type SocialShareMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: ShareCardImage;
  articleDates?: ContentDates;
};

const GENERATED_SHARE_CARD_WIDTH = 1200;
const GENERATED_SHARE_CARD_HEIGHT = 630;
const GENERATED_SHARE_CARD_REVISION = 2;

export function generatedShareCard(cardName: string, alt: string): ShareCardImage {
  return {
    url: `/og/${cardName}.jpg?v=${GENERATED_SHARE_CARD_REVISION}`,
    alt,
    width: GENERATED_SHARE_CARD_WIDTH,
    height: GENERATED_SHARE_CARD_HEIGHT,
  };
}

export function buildSocialShareMetadata({
  title,
  description,
  path,
  image,
  articleDates,
}: SocialShareMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const sharedOpenGraph = {
    title,
    description,
    url: path,
    siteName: "Falcore",
    images: [image],
  };

  return {
    openGraph: articleDates
      ? {
          ...sharedOpenGraph,
          type: "article",
          publishedTime: articleDates.publishedOn,
          modifiedTime: articleDates.updatedOn,
          authors: [absoluteUrl("/about")],
        }
      : { ...sharedOpenGraph, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
