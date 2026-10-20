import type { Metadata } from "next";
import { Instrument_Sans, Oxanium, Source_Code_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import {
  BUSINESS_NAME,
  FOUNDER_NAME,
  HOMEPAGE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site-config";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { founderNode, organizationNode } from "@/lib/structured-data/site-entities";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOMEPAGE_TITLE,
    template: "%s | Falcore",
  },
  description: SITE_DESCRIPTION,
  applicationName: BUSINESS_NAME,
  authors: [{ name: FOUNDER_NAME, url: absoluteUrl("/about") }],
  creator: FOUNDER_NAME,
  publisher: BUSINESS_NAME,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...buildSocialShareMetadata({
    title: HOMEPAGE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
    image: generatedShareCard("default", "Falcore: the technical arm your business is missing"),
  }),
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${oxanium.variable} ${instrumentSans.variable} ${sourceCodePro.variable} dark antialiased`}
    >
      <head>
        <JsonLd nodes={[organizationNode, founderNode]} />
      </head>
      <body>
        {children}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          strategy="afterInteractive"
          data-pid="7VqVCQaJDcNf2Yve"
          data-version="062024"
        />
      </body>
    </html>
  );
}
