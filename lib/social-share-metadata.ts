import type { Metadata } from "next";

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
}: SocialShareMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Falcore",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
