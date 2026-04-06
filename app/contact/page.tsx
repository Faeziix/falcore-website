import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Falcore. Book a free 30-minute call to discuss your website, custom app, or automation project. Serving businesses across the United States.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6">
              Let&apos;s talk about your project.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Whether you need a website, a custom application, or help
              automating your operations — start with a free 30-minute call. No
              commitment, no jargon.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — Contact Methods */}
            <div className="space-y-10">
              {/* Book a Call — Primary CTA */}
              <div className="border border-border/50 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-4">
                  Book a free call
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                  Pick a time that works for you. We&apos;ll spend 30 minutes
                  talking about your business, what you need, and whether
                  we&apos;re the right fit.
                </p>
                <a
                  href="https://calendly.com/amirfaezansari/30min"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98] w-full sm:w-auto"
                >
                  <span>Schedule a Call</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-border/50 p-6">
                  <Mail
                    className="size-5 text-accent mb-4"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:contact@falcoretech.com"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    contact@falcoretech.com
                  </a>
                </div>

                <div className="border border-border/50 p-6">
                  <MapPin
                    className="size-5 text-accent mb-4"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Service Area
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Remote — serving businesses across the United States
                  </p>
                </div>

                <div className="border border-border/50 p-6 sm:col-span-2">
                  <Clock
                    className="size-5 text-accent mb-4"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most inquiries get a response within 24 hours. Book a call
                    for the fastest path to getting started.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — What to Expect */}
            <div className="border border-border/50 p-8 md:p-10 h-fit">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-6">
                What happens next
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <span className="font-mono text-xs text-accent/60 tabular-nums mt-1 shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-foreground mb-1">
                      Discovery call
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We talk about your business, your customers, and what
                      you&apos;re trying to accomplish. Free, no pressure.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border/30" />

                <div className="flex gap-4">
                  <span className="font-mono text-xs text-accent/60 tabular-nums mt-1 shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-foreground mb-1">
                      Scope & proposal
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Within 48 hours, you get a clear proposal with scope,
                      timeline, and pricing — no surprises.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border/30" />

                <div className="flex gap-4">
                  <span className="font-mono text-xs text-accent/60 tabular-nums mt-1 shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-foreground mb-1">
                      Kick-off
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Once approved, we start immediately. You see progress
                      within the first week — not the first month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://falcoretech.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Contact",
                  item: "https://falcoretech.com/contact",
                },
              ],
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
