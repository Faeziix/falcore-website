import ScrollReveal from "@/components/scroll-reveal";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";
import LogoMarquee from "./LogoMarquee";

export default function ClientLogoSection() {
  return (
    <section aria-labelledby="client-logos-heading" className="py-16 md:py-20">
      <ScrollReveal>
        <p
          id="client-logos-heading"
          className="page-container mb-10 text-center text-sm text-muted-foreground"
        >
          Brands I&apos;ve built websites for
        </p>
      </ScrollReveal>
      <LogoMarquee logos={CLIENT_LOGOS} label="Brands I’ve built websites for" />
    </section>
  );
}
