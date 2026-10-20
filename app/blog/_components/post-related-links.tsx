import Link from "next/link";
import { textLinkVariants } from "@/components/ui/text-link";
import { caseStudyPath, findCaseStudy } from "@/app/work/_lib/case-study-index";
import { getServiceBySlug } from "@/lib/data/services";
import type { BlogPostSummary } from "../_lib/blog-post-types";

type RelatedLink = { label: string; href: string };

function relatedLinks(post: BlogPostSummary): RelatedLink[] {
  const serviceLinks = post.serviceSlugs.flatMap((slug) => {
    const service = getServiceBySlug(slug);
    return service ? [{ label: service.title, href: `/services/${service.slug}` }] : [];
  });
  const caseStudyLinks = post.caseStudySlugs.flatMap((slug) => {
    const caseStudy = findCaseStudy(slug);
    return caseStudy ? [{ label: `${caseStudy.clientName} case study`, href: caseStudyPath(caseStudy.slug) }] : [];
  });
  return [...serviceLinks, ...caseStudyLinks];
}

export function PostRelatedLinks({ post }: { post: BlogPostSummary }) {
  const links = relatedLinks(post);
  if (links.length === 0) return null;

  return (
    <aside aria-label="Related work" className="mt-16 grid gap-4 border-t border-border pt-6 md:pt-8">
      <p className="text-sm text-muted-foreground">Related</p>
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={textLinkVariants({ tone: "foreground", underline: "always", className: "text-lead" })}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
