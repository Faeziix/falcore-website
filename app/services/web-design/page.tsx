import { notFound } from "next/navigation";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import ServicePage from "../_components/service-page";
import { getServiceBySlug } from "@/lib/data/services";
import type { Metadata } from "next";

const service = getServiceBySlug("web-design")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

export default function WebDesignPage() {
  if (!service) notFound();

  return (
    <>
      <SiteNavigation />
      <main className="pt-32">
        <ServicePage
          service={service}
          examples={<BrowserShowcaseSection spacing="followsSection" />}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://falcoretech.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: service.title,
                  item: `https://falcoretech.com/services/${service.slug}`,
                },
              ],
            }),
          }}
        />
      </main>
      <PageClosing />
    </>
  );
}
