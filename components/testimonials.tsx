"use client";

import ScrollReveal from "./scroll-reveal";

const testimonials = [
  {
    quote:
      "We needed a site that matched the quality of our brand. Falcore delivered something we are genuinely proud to show our clients. The process was smooth and the result speaks for itself.",
    name: "Rashid Al Maktoum",
    role: "Managing Director, Gulf EPCO",
    location: "Dubai, UAE",
  },
  {
    quote:
      "Fast turnaround, zero hassle. Our online bookings jumped within the first month of launching.",
    name: "Karim Haddad",
    role: "Founder, Advance Car Rental",
    location: "Beirut, LB",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            What clients say
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="bg-card border border-border p-8 lg:p-10 h-full flex flex-col">
                <span className="text-6xl font-serif text-primary/20 leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-lg leading-relaxed text-foreground mt-2 flex-1">
                  {t.quote}
                </p>
                <div className="mt-8">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {t.role} &mdash; {t.location}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
