import LogoMarquee from "@/components/ClientLogoSection/LogoMarquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";

export function ClientLogoBand() {
  return (
    <section aria-labelledby="clients-heading" className="pb-(--section-space)">
      <div className="page-container">
        <SectionHeading id="clients-heading" title="Who I’ve built for" intro="A few of the brands I’ve designed and built for." />
      </div>
      <div className="mt-12">
        <LogoMarquee logos={CLIENT_LOGOS} label="Brands I’ve built for" />
      </div>
    </section>
  );
}
