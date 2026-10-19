import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/schema-markup";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://falcoretech.com"),
  title: {
    default:
      "Falcore | Web Design, Custom Apps & AI for US Businesses",
    template: "%s | Falcore",
  },
  description:
    "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies. Book a free 15-minute call.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Falcore | Web Design, Custom Apps & AI Systems for US Businesses",
    description:
      "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies. Book a free 15-minute call.",
    url: "https://falcoretech.com",
    siteName: "Falcore",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falcore — Web Design, Custom Apps & AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcore | Web Design, Custom Apps & AI Systems for US Businesses",
    description:
      "Falcore builds websites, custom web applications, AI-powered workflows, and business automations for US companies. Book a free 15-minute call.",
    images: ["/og-image.png"],
  },
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
      className={`${oxanium.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${sourceCodePro.variable} dark antialiased`}
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
