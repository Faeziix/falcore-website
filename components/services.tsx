"use client";

import {
  PaintBrushIcon,
  CodeIcon,
  MagnifyingGlassIcon,
  LifebuoyIcon,
} from "@phosphor-icons/react";
import ScrollReveal from "./scroll-reveal";

const services = [
  {
    icon: PaintBrushIcon,
    title: "Website Design",
    description:
      "Custom designs that reflect your brand and speak to your customers. No cookie-cutter templates.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: CodeIcon,
    title: "Development",
    description:
      "Fast, responsive, and built with modern technology. Your site will work on every device.",
    span: "",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "SEO Basics",
    description:
      "On-page optimization so local customers can actually find you on Google.",
    span: "",
  },
  {
    icon: LifebuoyIcon,
    title: "Ongoing Support",
    description:
      "Updates, fixes, and improvements whenever you need them. You focus on your business.",
    span: "md:col-span-2",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            What we build
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Everything your business needs to stand out online, handled from
            start to finish.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div
                  className={`bg-card border border-border p-8 hover:border-foreground/20 transition-colors h-full ${service.span}`}
                >
                  <Icon size={32} weight="light" className="text-primary" />
                  <h3 className="text-xl font-semibold tracking-tight mt-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
