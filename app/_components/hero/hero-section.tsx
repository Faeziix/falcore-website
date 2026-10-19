"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { InteractiveDitheringBackground } from "@/components/ui/interactive-dithering";
import { BookCallButton } from "@/components/book-call-button";
import { HeroHeadline } from "./hero-headline";

const supportingContentDelaySeconds = 0.55;

export function HeroSection() {
  const riseIn = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-clip pt-[calc(var(--nav-height)+clamp(3rem,7vw,6rem))] pb-[clamp(4rem,8vw,7rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[78%] opacity-25 mix-blend-screen [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      >
        <InteractiveDitheringBackground />
      </div>

      <div className="page-container">
        <HeroHeadline />

        <motion.div
          {...riseIn(supportingContentDelaySeconds)}
          className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8"
        >
          <p className="max-w-xl text-lead text-foreground-soft lg:col-span-6">
            I build websites, custom software and AI-powered systems that take
            the busywork off your team. Leads answered in seconds, follow-ups
            that never slip, invoices that chase themselves.
          </p>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookCallButton size="lg" width="fullOnMobile" />
              <Button asChild size="lg" variant="outline" width="fullOnMobile">
                <a href="#operating-system">See my work</a>
              </Button>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Based in the UAE, working with US businesses. You talk directly
              to the person who builds it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
