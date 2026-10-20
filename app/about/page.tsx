import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { ABOUT_DESCRIPTION, ABOUT_PATH, ABOUT_TITLE } from "./_lib/about-content";
import { aboutStructuredData } from "./_lib/about-structured-data";
import { AboutHero } from "./_components/about-hero";
import { WorkingPrinciples } from "./_components/working-principles";
import { RecentWork } from "./_components/recent-work";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: ABOUT_PATH },
  ...buildSocialShareMetadata({
    title: `${ABOUT_TITLE} | Falcore`,
    description: ABOUT_DESCRIPTION,
    path: ABOUT_PATH,
    image: generatedShareCard("about", "About Falcore: you talk directly to the person who builds it"),
  }),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={aboutStructuredData} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container">
          <AboutHero />
          <WorkingPrinciples />
          <RecentWork />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
