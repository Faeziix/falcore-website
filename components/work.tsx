"use client";

import ScrollReveal from "./scroll-reveal";

const projects = [
  {
    name: "Gulf EPCO",
    type: "Cosmetics Manufacturer",
    description:
      "Corporate site for a Dubai-based cosmetics manufacturer. Showcases GMP and FDA certifications, manufacturing capabilities, and their portfolio of owned brands.",
    url: "www.gulfepco.com",
    href: "https://www.gulfepco.com",
  },
  {
    name: "Dream Drives",
    type: "Luxury Car Rental",
    description:
      "Dark-themed rental platform for a premium fleet in Dubai. High-quality vehicle imagery, detailed pricing, specs, and a seamless booking flow built to convert.",
    url: "www.dreamdrivesdxb.com",
    href: "https://www.dreamdrivesdxb.com",
  },
  {
    name: "ConvoFlow",
    type: "AI SaaS Platform",
    description:
      "Marketing site for an AI-powered lead qualification platform. ROI calculator, step-by-step process breakdown, and client logos — all optimized for conversions.",
    url: "www.convoflow.ae",
    href: "https://www.convoflow.ae",
  },
  {
    name: "Advance Car Rental",
    type: "Car Rental — Lebanon",
    description:
      "Full-service rental site for a company operating across Beirut since 2001. Vehicle categories, chauffeur services, and delivery booking across Lebanon.",
    url: "advance-website.vercel.app",
    href: "https://advance-website.vercel.app",
  },
];

function BrowserMockup({
  url,
  href,
  name,
}: {
  url: string;
  href: string;
  name: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border border-border bg-surface hover:border-border-hover transition-colors group"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 h-6 rounded-md bg-surface-bright flex items-center px-3">
          <span className="text-xs text-muted-dim truncate">{url}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-surface-bright overflow-hidden">
        <img
          src={`https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&type=png&viewport.width=1280&viewport.height=800`}
          alt={`${name} website preview`}
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            Selected work
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl">
            A look at recent projects we have shipped.
          </p>
        </ScrollReveal>

        <div className="mt-16 flex flex-col gap-24">
          {projects.map((project, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={project.name}
                className={`grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center ${
                  isEven ? "lg:direction-rtl" : ""
                }`}
                style={isEven ? { direction: "rtl" } : undefined}
              >
                <ScrollReveal
                  direction={isEven ? "right" : "left"}
                  delay={0.1}
                >
                  <div style={isEven ? { direction: "ltr" } : undefined}>
                    <BrowserMockup
                      url={project.url}
                      href={project.href}
                      name={project.name}
                    />
                  </div>
                </ScrollReveal>
                <ScrollReveal
                  direction={isEven ? "left" : "right"}
                  delay={0.2}
                >
                  <div style={isEven ? { direction: "ltr" } : undefined}>
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight mt-2">
                      {project.name}
                    </h3>
                    <p className="text-muted leading-relaxed mt-3">
                      {project.description}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-accent hover:text-accent-hover transition-colors mt-4"
                    >
                      Visit site
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
