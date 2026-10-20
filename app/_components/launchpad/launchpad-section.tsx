import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { SectionCallToAction } from "@/components/section-call-to-action";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadShowcase } from "./launchpad-showcase";
import { LaunchpadMobileCarousel } from "./launchpad-mobile-carousel";

function CaseStudyLink() {
  return (
    <TextLink asChild tone="foreground" underline="always">
      <Link href={LAUNCHPAD_SHOWCASE.caseStudyPath}>Read the case study</Link>
    </TextLink>
  );
}

export function LaunchpadSection() {
  return (
    <section id="operating-system" aria-label={LAUNCHPAD_SHOWCASE.title} className="section-spacing">
      <div className="page-container">
        <div className="lg:hidden">
          <LaunchpadMobileCarousel caseStudyLink={<CaseStudyLink />} />
        </div>
        <div className="hidden lg:block">
          <SectionHeading
            title={LAUNCHPAD_SHOWCASE.title}
            intro={LAUNCHPAD_SHOWCASE.summary}
            actions={<CaseStudyLink />}
          />
          <div data-reveal className="mt-20">
            <LaunchpadShowcase />
          </div>
        </div>
        <SectionCallToAction
          prompt="Want a system like this running your business?"
          className="mt-14 lg:mt-20"
        />
      </div>
    </section>
  );
}
