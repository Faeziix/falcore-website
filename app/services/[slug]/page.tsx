import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import ServicePage from "../_components/service-page";

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const canonicalPath = `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: canonicalPath },
    ...buildSocialShareMetadata({
      title: `${service.metaTitle} | Falcore`,
      description: service.metaDescription,
      path: canonicalPath,
      image: generatedShareCard(service.slug, `${service.title} by Falcore`),
    }),
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <SiteNavigation />
      <main className="pt-32">
        <ServicePage service={service} />
      </main>
      <PageClosing />
    </>
  );
}
