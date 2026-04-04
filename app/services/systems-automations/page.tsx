import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ServicePage from "@/components/service-page";
import { getServiceBySlug } from "@/lib/data/services";
import type { Metadata } from "next";

const service = getServiceBySlug("systems-automations")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

export default function SystemsAutomationsPage() {
  if (!service) notFound();

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <ServicePage service={service} />

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
      <Footer />
    </>
  );
}
