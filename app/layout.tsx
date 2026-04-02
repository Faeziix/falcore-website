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
    default: "Falcore | Web Design for Local Businesses",
    template: "%s | Falcore",
  },
  description:
    "Falcore builds high-performance websites for local businesses. Custom design, fast load times, SEO setup included. Book a free 15-minute call.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Falcore | Web Design for Local Businesses",
    description:
      "Falcore builds high-performance websites for local businesses. Custom design, fast load times, SEO setup included.",
    url: "https://falcoretech.com",
    siteName: "Falcore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcore | Web Design for Local Businesses",
    description:
      "Falcore builds high-performance websites for local businesses. Custom design, fast load times, SEO setup included.",
  },
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
