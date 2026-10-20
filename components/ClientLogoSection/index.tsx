import { CLIENT_LOGOS } from "@/lib/data/client-logos";
import { MaskedLine } from "@/components/scroll-reveal/masked-words";
import { revealOrder } from "@/components/scroll-reveal/reveal-order";
import LogoMarquee from "./LogoMarquee";

export default function ClientLogoSection() {
  return (
    <section data-reveal aria-labelledby="client-logos-heading" className="py-16 md:py-20">
      <p
        id="client-logos-heading"
        className="page-container mb-10 text-center text-sm text-muted-foreground"
      >
        <MaskedLine>Brands I&apos;ve built websites for</MaskedLine>
      </p>
      <div className="reveal-aperture" style={revealOrder(2)}>
        <LogoMarquee logos={CLIENT_LOGOS} label="Brands I’ve built websites for" />
      </div>
    </section>
  );
}
