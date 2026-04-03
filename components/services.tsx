"use client";

import {
  PaintBrushIcon,
  CodeIcon,
  RobotIcon,
  GearSixIcon,
} from "@phosphor-icons/react";
import ScrollReveal from "./scroll-reveal";

const services = [
  {
    icon: PaintBrushIcon,
    title: "Web Design",
    description:
      "Designs built around your brand and your customers — not a template with your logo slapped on. Every page is intentional.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: CodeIcon,
    title: "Custom Web Applications",
    description:
      "Client portals, membership platforms, internal dashboards, booking systems — if your business needs it built, we build it.",
    span: "",
  },
  {
    icon: RobotIcon,
    title: "AI Enablement",
    description:
      "Put AI to work inside your business. Smarter workflows, automated responses, and tools that learn — integrated into how you already operate.",
    span: "",
  },
  {
    icon: GearSixIcon,
    title: "Systems & Automations",
    description:
      "CRM setup, workflow automation, and tool integrations that eliminate the manual work slowing your team down.",
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
            From design to deployment to the systems that run behind the
            scenes — we handle the technical side so you don&apos;t have to.
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
