import Link from "next/link";
import { BookCallButton } from "@/components/book-call-button";
import { ServiceScene } from "@/components/service-scenes/service-scene";
import { ViewfinderFrame } from "@/components/ui/viewfinder-frame";
import { textLinkVariants } from "@/components/ui/text-link";
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
            className: "animate-rise-in",
          })}
        >
          All services
        </Link>
        <ServiceTitleReveal title={service.title} />
        <p
          style={revealDelay(heroRevealDelayMilliseconds.intro)}
          className="mt-6 text-lead text-foreground-soft animate-rise-in"
        >
          {service.longDescription}
        </p>
        <div
          style={revealDelay(heroRevealDelayMilliseconds.bookingButton)}
          className="mt-9 animate-rise-in"
        >
          <BookCallButton size="lg" width="fullOnMobile" />
        </div>
      </div>

      <ViewfinderFrame reveal="onLoad" className="aspect-video lg:col-span-7">
        <ServiceScene slug={service.slug} label={service.sceneLabel} />
      </ViewfinderFrame>
    </header>
  );
}
