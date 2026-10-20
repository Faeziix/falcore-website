import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { WhatHappensNext } from "@/components/process/what-happens-next";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { CONTACT_DESCRIPTION, CONTACT_PATH, CONTACT_TITLE } from "./_lib/contact-content";
import { contactStructuredData } from "./_lib/contact-structured-data";
import { ContactHero } from "./_components/contact-hero";

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: CONTACT_PATH },
  ...buildSocialShareMetadata({
    title: `${CONTACT_TITLE} | Falcore`,
    description: CONTACT_DESCRIPTION,
    path: CONTACT_PATH,
    image: generatedShareCard("contact", "Contact Falcore: let's talk about your project"),
  }),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd nodes={contactStructuredData} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container">
          <ContactHero />
          <WhatHappensNext />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
