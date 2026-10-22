import Image from "next/image";
import { BookCallButton } from "@/components/book-call-button";
import { FOUNDER_NAME } from "@/lib/site-config";
import { ABOUT_LEAD } from "../_lib/about-content";
import { AboutFactList } from "./about-fact-list";

const heroRevealDelayMilliseconds = {
  name: 0,
  lead: 300,
  facts: 420,
  bookingButton: 520,
  portrait: 200,
};

function revealDelay(milliseconds: number) {
  return { animationDelay: `${milliseconds}ms` };
}

export function AboutHero() {
  return (
    <header className="grid gap-12 pb-(--section-space) lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-7">
        <div className="-mb-[0.07em] overflow-clip pb-[0.15em]">
          <h1
            style={revealDelay(heroRevealDelayMilliseconds.name)}
            className="text-display-xl font-medium text-foreground animate-mask-rise"
          >
            {FOUNDER_NAME}
          </h1>
        </div>
        <p
          style={revealDelay(heroRevealDelayMilliseconds.lead)}
          className="mt-6 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in"
        >
          {ABOUT_LEAD}
        </p>
        <div style={revealDelay(heroRevealDelayMilliseconds.facts)} className="mt-6 animate-rise-in">
          <AboutFactList />
        </div>
        <div style={revealDelay(heroRevealDelayMilliseconds.bookingButton)} className="mt-9 animate-rise-in">
          <BookCallButton size="lg" width="fullOnMobile" />
        </div>
      </div>
      <div
        style={revealDelay(heroRevealDelayMilliseconds.portrait)}
        className="animate-rise-in lg:col-span-4 lg:col-start-9"
      >
        <Image
          src="/founder-portrait.jpg"
          alt={`${FOUNDER_NAME}, founder of Falcore`}
          width={1200}
          height={1490}
          preload
          className="aspect-[4/5] w-full max-w-md object-cover"
          sizes="(max-width: 1024px) 100vw, 30vw"
        />
      </div>
    </header>
  );
}
