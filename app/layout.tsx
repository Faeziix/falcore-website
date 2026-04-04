import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/schema-markup";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
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
      className={`${oxanium.variable} ${sourceCodePro.variable} dark antialiased`}
    >
      <head>
        <SchemaMarkup />
      </head>
      <body>{children}</body>
    </html>
  );
}
