import { BookCallButton } from "@/components/book-call-button";
import { textLinkVariants } from "@/components/ui/text-link";
import { CONTACT_DETAILS, CONTACT_LEAD } from "../_lib/contact-content";

const heroRevealDelayMilliseconds = {
  title: 0,
  lead: 300,
  bookingButton: 420,
  details: 520,
};

function revealDelay(milliseconds: number) {
  return { animationDelay: `${milliseconds}ms` };
}

export function ContactHero() {
  return (
    <header className="pb-(--section-space)">
      <div className="-mb-[0.07em] overflow-clip pb-[0.15em]">
        <h1
          style={revealDelay(heroRevealDelayMilliseconds.title)}
          className="max-w-4xl text-display-xl font-medium text-foreground animate-mask-rise"
        >
          Let’s talk about your project.
        </h1>
      </div>
      <p
        style={revealDelay(heroRevealDelayMilliseconds.lead)}
        className="mt-6 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in"
      >
        {CONTACT_LEAD}
      </p>
      <div style={revealDelay(heroRevealDelayMilliseconds.bookingButton)} className="mt-9 animate-rise-in">
        <BookCallButton size="lg" width="fullOnMobile" />
      </div>
      <dl
        style={revealDelay(heroRevealDelayMilliseconds.details)}
        className="mt-16 grid animate-rise-in md:grid-cols-3 md:gap-8 lg:mt-20"
      >
        {CONTACT_DETAILS.map((detail) => (
          <div key={detail.label} className="border-t border-border py-5 md:pb-0">
            <dt className="text-sm text-muted-foreground">{detail.label}</dt>
            <dd className="mt-2 text-foreground">
              {detail.href ? (
                <a
                  href={detail.href}
                  className={textLinkVariants({ tone: "foreground", underline: "always" })}
                >
                  {detail.value}
                </a>
              ) : (
                detail.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
