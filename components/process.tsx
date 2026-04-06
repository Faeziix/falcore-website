"use client";

import ScrollReveal from "./scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We talk about your business, your customers, and what you need. Free, no pressure.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "You get mockups to review. We refine until it feels right.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop your site with clean code, fast load times, and mobile-first design.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Your site goes live. We handle hosting setup, DNS, and make sure everything runs smooth.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Four straightforward steps from first call to launch day.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.12}>
              <div className="bg-background p-8 lg:p-6 xl:p-8 h-full">
                <span className="text-5xl font-bold text-accent/15 font-mono">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
