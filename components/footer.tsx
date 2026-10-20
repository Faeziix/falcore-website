import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_INDEX_PATH, hasPublishedBlogPosts } from "@/app/blog/_lib/blog-posts";
import { CASE_STUDY_INDEX_PATH } from "@/app/work/_lib/case-study-index";
import { SERVICES } from "@/lib/data/services";
import {
  CONTACT_EMAIL,
  SERVED_MARKETS_SENTENCE,
  SOCIAL_PROFILES,
  externalLinkProps,
} from "@/lib/site-config";
import Logo from "./logo";

type FooterLink = { label: string; href: string };

function navigationLinks(): FooterLink[] {
  return [
    { label: "Services", href: "/services" },
    { label: "Work", href: CASE_STUDY_INDEX_PATH },
    ...(hasPublishedBlogPosts() ? [{ label: "Blog", href: BLOG_INDEX_PATH }] : []),
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}

const serviceLinks: FooterLink[] = SERVICES.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

const footerLinkClassName = "text-sm text-foreground/40 hover:text-foreground/80 transition-colors";

function FooterLinkColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <span className="text-sm font-semibold mb-4 text-foreground/70 block">{heading}</span>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={footerLinkClassName}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size="md" />
            <p className="text-foreground/50 text-sm mt-3 leading-relaxed">
              The technical arm your business is missing.
            </p>
            <p className="text-foreground/40 text-sm mt-3 leading-relaxed">{SERVED_MARKETS_SENTENCE}</p>
          </div>

          <FooterLinkColumn heading="Navigate" links={navigationLinks()} />
          <FooterLinkColumn heading="Services" links={serviceLinks} />

          <div>
            <span className="text-sm font-semibold mb-4 text-foreground/70 block">Get in Touch</span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={footerLinkClassName}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_PROFILES.linkedInCompany}
                  {...externalLinkProps}
                  className={`${footerLinkClassName} inline-flex items-center gap-1`}
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-foreground/30">
            &copy; 2026 Falcore. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-foreground/30 hover:text-foreground/50 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
