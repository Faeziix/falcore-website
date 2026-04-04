import Image from "next/image";
import { ArrowRight, Code, Zap, Users, Shield } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Faez Ansari, the founder of Falcore — a full-stack developer and systems builder helping US businesses with web design, custom apps, and AI-powered automation.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Ship Fast, Ship Right",
    icon: Zap,
    description:
      "Speed without shortcuts. We move quickly because we know the stack, not because we cut corners.",
  },
  {
    title: "Build for the Business",
    icon: Users,
    description:
      "Every line of code solves a real problem. We don't build features nobody asked for.",
  },
  {
    title: "Full-Stack Ownership",
    icon: Code,
    description:
      "Design, development, deployment, and support — one team, one point of contact, no handoffs.",
  },
  {
    title: "No Lock-In",
    icon: Shield,
    description:
      "You own your code, your domain, and your data. We build on open standards so you're never stuck.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Vercel",
  "Headless CMS",
  "OpenAI",
  "Make / Zapier",
  "HubSpot",
  "REST / GraphQL",
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mb-20 md:mb-28">
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
              About Falcore
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6">
              The technical arm your business is missing.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Falcore is a one-person studio that builds websites, custom
              applications, and automation systems for US businesses. No account
              managers, no layers — you work directly with the person writing the
              code.
            </p>
          </div>

          {/* Founder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
            {/* Image */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden border border-border/50">
                <Image
                  src="/professional-portrait.png"
                  alt="Faez Ansari — Founder of Falcore, full-stack developer and systems builder"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-primary/30" />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
                  Meet the Founder
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                  Faez Ansari
                </h2>
              </div>

              <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  I&apos;m a full-stack developer and systems builder based in
                  the US. I started Falcore after years of building websites,
                  internal tools, and automation systems for businesses that
                  needed technical help but didn&apos;t have a technical team.
                </p>
                <p>
                  At XMA Agency, I built 13+ client websites for automotive,
                  luxury, and rental businesses — and created the internal tools
                  that kept the operation running: a proposal generator that
                  automated quotes after sales calls, a custom membership
                  platform on Next.js, and a client-facing project tracker used
                  across every active account.
                </p>
                <p>
                  That experience taught me what small and mid-sized businesses
                  actually need: someone who understands the problem, builds the
                  right solution, and ships it fast. No bloated teams, no
                  unnecessary meetings, no six-month timelines for a website.
                </p>
                <p>
                  Today, every Falcore project gets my direct attention — from
                  the first call to launch day and beyond. Whether it&apos;s a
                  website that converts, a custom dashboard your team needs, or
                  the AI-powered automation that eliminates hours of manual work,
                  I find the fastest, most efficient path and ship it.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/30">
                <div>
                  <span className="text-2xl md:text-3xl font-medium text-foreground">
                    13+
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    Client Projects
                  </span>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-medium text-foreground">
                    5+
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    Internal Tools Built
                  </span>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-medium text-foreground">
                    Full-Stack
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    End-to-End Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24 md:mb-32">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
                How We Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                What drives every project
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-y divide-dashed divide-border border border-dashed border-border">
              {values.map((value, i) => (
                <FeatureCard key={i} feature={value} />
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-24 md:mb-32">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
                Tech Stack
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                Tools we build with
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-mono text-muted-foreground border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
              Ready to work together?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Book a free 30-minute call. We&apos;ll talk about your business
              and figure out if we&apos;re a good fit.
            </p>
            <a
              href="https://calendly.com/amirfaezansari/30min"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98]"
            >
              <span>Book a Free Call</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
                  name: "About",
                  item: "https://falcoretech.com/about",
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
