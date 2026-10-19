import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoopingVideo } from "@/components/ui/looping-video";
import { ViewfinderFrame } from "@/components/ui/viewfinder-frame";
import { textLinkVariants } from "@/components/ui/text-link";
import { BOOKING_URL, externalLinkProps } from "@/lib/site-config";
import type { Service } from "@/lib/data/services";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <header className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-5">
        <Link
          href="/#services"
          className={textLinkVariants({ tone: "muted", size: "sm", underline: "hover" })}
        >
          All services
        </Link>
        <h1 className="mt-6 text-display-lg font-medium text-foreground">
          {service.title}
        </h1>
        <p className="mt-6 text-lead text-foreground-soft">
          {service.longDescription}
        </p>
        <Button asChild size="lg" width="fullOnMobile" className="mt-9">
          <a href={BOOKING_URL} {...externalLinkProps}>
            Book a free call
            <ArrowUpRight aria-hidden className="size-4.5" />
          </a>
        </Button>
      </div>

      <ViewfinderFrame className="aspect-video lg:col-span-7">
        <LoopingVideo sources={service.loop} label={service.loopLabel} />
      </ViewfinderFrame>
    </header>
  );
}
