import { BLOG_INDEX_PATH, blogPostPath, publishedBlogPosts } from "@/app/blog/_lib/blog-posts";
import { CASE_STUDIES, CASE_STUDY_INDEX_PATH, caseStudyPath } from "@/app/work/_lib/case-study-index";
import { STATIC_PAGE_DATES, type ContentDates } from "@/lib/data/page-dates";
import { SERVICES } from "@/lib/data/services";

export type IndexablePageGroup = "main" | "service" | "caseStudy" | "blogPost";

export type IndexablePage = {
  path: string;
  title: string;
  description: string;
  dates: ContentDates;
  group: IndexablePageGroup;
};

export function listIndexablePages(): IndexablePage[] {
  const blogPosts = publishedBlogPosts();

  return [
    { path: "/", title: "Home", description: "What I build and how a project runs.", dates: STATIC_PAGE_DATES.home, group: "main" },
    { path: "/about", title: "About Faez Ansari", description: "Who builds your project and how I work.", dates: STATIC_PAGE_DATES.about, group: "main" },
    { path: "/contact", title: "Contact", description: "Book a consultation call or send an email.", dates: STATIC_PAGE_DATES.contact, group: "main" },
    { path: "/services", title: "Services", description: "All four services.", dates: STATIC_PAGE_DATES.services, group: "main" },
    ...SERVICES.map((service) => ({
      path: `/services/${service.slug}`,
      title: service.title,
      description: service.metaDescription,
      dates: service.dates,
      group: "service" as const,
    })),
    { path: CASE_STUDY_INDEX_PATH, title: "Work", description: "All case studies.", dates: STATIC_PAGE_DATES.work, group: "main" },
    ...CASE_STUDIES.map((caseStudy) => ({
      path: caseStudyPath(caseStudy.slug),
      title: caseStudy.seoTitle,
      description: caseStudy.headline,
      dates: caseStudy.dates,
      group: "caseStudy" as const,
    })),
    ...(blogPosts.length > 0
      ? [
          { path: BLOG_INDEX_PATH, title: "Blog", description: "Notes from projects I've built.", dates: latestDates(blogPosts.map((post) => post.dates)), group: "main" as const },
          ...blogPosts.map((post) => ({
            path: blogPostPath(post.slug),
            title: post.title,
            description: post.description,
            dates: post.dates,
            group: "blogPost" as const,
          })),
        ]
      : []),
    { path: "/privacy", title: "Privacy policy", description: "How I handle your data.", dates: STATIC_PAGE_DATES.privacy, group: "main" },
  ];
}

function latestDates(allDates: ContentDates[]): ContentDates {
  const latestUpdate = allDates.map((dates) => dates.updatedOn).sort().at(-1) ?? STATIC_PAGE_DATES.blog.updatedOn;
  return { publishedOn: STATIC_PAGE_DATES.blog.publishedOn, updatedOn: latestUpdate };
}
