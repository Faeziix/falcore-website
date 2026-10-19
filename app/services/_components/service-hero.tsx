import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoopingVideo } from "@/components/ui/looping-video";
import { ViewfinderFrame } from "@/components/ui/viewfinder-frame";
import { textLinkVariants } from "@/components/ui/text-link";
import { BOOKING_URL, externalLinkProps } from "@/lib/site-config";
import type { Service } from "@/lib/data/services";
import { ServiceTitleReveal } from "./service-title-reveal";

const heroRevealDelayMilliseconds = {
  backLink: 0,
  intro: 420,
  bookingButton: 520,
};

function revealDelay(milliseconds: number) {
  return { animationDelay: `${milliseconds}ms` };
}

export function ServiceHero({ service }: { service: Service }) {
  return (
    <header className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-5">
        <Link
          href="/#services"
          style={revealDelay(heroRevealDelayMilliseconds.backLink)}
          className={textLinkVariants({
            tone: "muted",
            size: "sm",
            underline: "hover",
            className: "motion-safe:animate-rise-in",
          })}
        >
          All services
        </Link>
        <ServiceTitleReveal title={service.title} />
        <p
          style={revealDelay(heroRevealDelayMilliseconds.intro)}
          className="mt-6 text-lead text-foreground-soft motion-safe:animate-rise-in"
        >
          {service.longDescription}
        </p>
        <div
          style={revealDelay(heroRevealDelayMilliseconds.bookingButton)}
          className="mt-9 motion-safe:animate-rise-in"
        >
          <Button asChild size="lg" width="fullOnMobile">
            <a href={BOOKING_URL} {...externalLinkProps}>
              Book a free call
              <ArrowUpRight aria-hidden className="size-4.5" />
            </a>
          </Button>
        </div>
      </div>

      <ViewfinderFrame reveal="onLoad" className="aspect-video lg:col-span-7">
        <LoopingVideo sources={service.loop} label={service.loopLabel} />
      </ViewfinderFrame>
    </header>
  );
}
