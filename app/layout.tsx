import type { Metadata } from "next";
import { Instrument_Sans, Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/schema-markup";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { SITE_URL } from "@/lib/site-config";

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

const SITE_DESCRIPTION =
  "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies. Book a consultation call.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Falcore | Web Design, Custom Apps & AI for US Businesses",
    template: "%s | Falcore",
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  ...buildSocialShareMetadata({
    title: "Falcore | Web Design, Custom Apps & AI Systems for US Businesses",
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
      className={`${oxanium.variable} ${instrumentSans.variable} ${sourceCodePro.variable} dark antialiased`}
    >
      <head>
        <SchemaMarkup />
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="7VqVCQaJDcNf2Yve"
          data-version="062024"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
