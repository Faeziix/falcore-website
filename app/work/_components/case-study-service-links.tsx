import Link from "next/link";
import { textLinkVariants } from "@/components/ui/text-link";
import { getServiceBySlug, type Service } from "@/lib/data/services";

function servicesFromSlugs(serviceSlugs: string[]) {
  return serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
}

export function CaseStudyServiceLinks({ serviceSlugs }: { serviceSlugs: string[] }) {
  const services = servicesFromSlugs(serviceSlugs);
  if (services.length === 0) return null;

  return (
    <section aria-label="Services behind this project" className="bg-background text-foreground">
      <div className="page-container pt-16 sm:pt-20 md:pt-[var(--section-space)]">
        <div className="grid gap-4 border-t border-border pt-6 md:pt-8 lg:grid-cols-12 lg:gap-8">
          <p className="text-sm text-muted-foreground lg:col-span-3">
            {services.length === 1 ? "The service behind this project" : "The services behind this project"}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-9">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={textLinkVariants({
                    tone: "foreground",
                    underline: "always",
                    className: "text-lead",
                  })}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
