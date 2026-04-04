"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

const SERVICES = [
  {
    title: "AI Enablement",
    description:
      "Put AI to work inside your business — integrated into how you already operate.",
    image: "/services/ai-enablement.jpg",
    imageAlt: "AI-powered workflow automation dashboard for business operations",
    bullets: [
      "AI-powered workflow automation",
      "Custom chatbots & virtual assistants",
      "Intelligent data processing",
      "AI integration into existing tools",
      "Smarter decision-making pipelines",
    ],
  },
  {
    title: "Systems & Automations",
    description:
      "Eliminate the manual work slowing your team down. We wire everything together.",
    image: "/services/system-automation.jpg",
    imageAlt: "CRM and business process automation system integration",
    bullets: [
      "CRM setup & configuration",
      "Workflow automation across tools",
      "Third-party integrations",
      "Process optimization & mapping",
      "Scalable operational infrastructure",
    ],
  },
  {
    title: "Web Design",
    description:
      "Designs built around your brand and your customers — not a template with your logo slapped on.",
    image: "/services/web-design.jpg",
    imageAlt: "Custom website design with brand-focused UI and responsive layout",
    bullets: [
      "Custom UI/UX tailored to your brand",
      "Mobile-first responsive layouts",
      "Conversion-focused page structures",
      "Brand identity integration",
      "Rapid turnaround — designs in days, not weeks",
    ],
  },
  {
    title: "Custom Web Applications",
    description:
      "If your business needs it built, we build it. Full-stack, production-grade, and built to scale.",
    image: "/services/web-dev.jpg",
    imageAlt: "Full-stack web application with client portal and dashboard interface",
    bullets: [
      "Client portals & membership platforms",
      "Internal dashboards & admin panels",
      "Headless CMS implementation",
      "Booking & scheduling systems",
      "Custom tools built for your workflow",
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-card border border-border/50 overflow-hidden transition-colors duration-500 hover:border-primary/20"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/10">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
          {service.title}
        </h3>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
          {service.description}
        </p>

        {/* Bullet points */}
        <ul className="mt-8 space-y-4 flex-1">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <Check
                className="size-5 text-primary mt-0.5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-base text-foreground/80">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="mt-10 inline-flex items-center justify-center h-12 px-6 text-base font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 active:scale-[0.98] w-full"
        >
          Book a Call
        </a>
      </div>
    </motion.div>
  );
}

export function VerticalTabs() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground text-balance">
            Services that power your business
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            From design to deployment to the systems running behind the
            scenes — I handle the technical side so you don&apos;t have to.
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;
