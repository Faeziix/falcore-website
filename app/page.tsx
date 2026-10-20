import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import ClientLogoSection from "@/components/ClientLogoSection";
import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import AboutFounder from "@/components/about-founder";
import FAQ from "@/components/faq";
import { FAQ_ITEMS } from "@/lib/data/faq";
import { PageClosing } from "@/components/page-closing";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { HOMEPAGE_TITLE, SITE_DESCRIPTION } from "@/lib/site-config";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { faqPageNode, webPageNode } from "@/lib/structured-data/page-nodes";
import { websiteNode } from "@/lib/structured-data/site-entities";
import { HeroSection } from "./_components/hero/hero-section";
import { ServicesSection } from "@/components/services/services-section";
import { LaunchpadSection } from "./_components/launchpad/launchpad-section";
import { ProcessSection } from "@/components/process/process-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const homepageStructuredData = [
  websiteNode,
  webPageNode(
    { path: "/", name: HOMEPAGE_TITLE, description: SITE_DESCRIPTION, dates: STATIC_PAGE_DATES.home },
    false
  ),
  faqPageNode("/", FAQ_ITEMS),
];

export default function Home() {
  return (
    <>
      <SiteNavigation />
      <main>
        <HeroSection />
        <ClientLogoSection />
        <ServicesSection />
        <BrowserShowcaseSection />
        <LaunchpadSection />
        <ProcessSection />
        <AboutFounder />
        <FAQ items={FAQ_ITEMS} />
      </main>
      <JsonLd nodes={homepageStructuredData} />
      <PageClosing />
    </>
  );
}
