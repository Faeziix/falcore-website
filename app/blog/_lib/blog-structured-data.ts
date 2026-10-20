import type { BlogPosting } from "schema-dts";
import { STATIC_PAGE_DATES } from "@/lib/data/page-dates";
import { breadcrumbNode, collectionPageNode } from "@/lib/structured-data/page-nodes";
import { founderAuthor, organizationReference } from "@/lib/structured-data/site-entities";
import { absoluteUrl } from "@/lib/site-config";
import { BLOG_INDEX_DESCRIPTION, BLOG_INDEX_TITLE } from "./blog-content";
import type { BlogPostSummary } from "./blog-post-types";
import { BLOG_INDEX_PATH, blogPostPath } from "./blog-posts";

export function blogIndexStructuredDataNodes(posts: BlogPostSummary[]) {
  return [
    collectionPageNode(
      {
        path: BLOG_INDEX_PATH,
        name: BLOG_INDEX_TITLE,
        description: BLOG_INDEX_DESCRIPTION,
        dates: STATIC_PAGE_DATES.blog,
      },
      posts.map((post) => ({ name: post.title, path: blogPostPath(post.slug) }))
    ),
    breadcrumbNode(BLOG_INDEX_PATH, [{ name: "Blog", path: BLOG_INDEX_PATH }]),
  ];
}

function blogPostingNode(post: BlogPostSummary): BlogPosting {
  const pageUrl = absoluteUrl(blogPostPath(post.slug));
  return {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: absoluteUrl("/og/blog.jpg"),
    datePublished: post.dates.publishedOn,
    dateModified: post.dates.updatedOn,
    author: founderAuthor,
    publisher: organizationReference,
    inLanguage: "en",
    about: post.serviceSlugs.map((slug) => ({ "@id": `${absoluteUrl(`/services/${slug}`)}#service` })),
  };
}

export function blogPostStructuredDataNodes(post: BlogPostSummary) {
  const path = blogPostPath(post.slug);
  return [
    blogPostingNode(post),
    breadcrumbNode(path, [
      { name: "Blog", path: BLOG_INDEX_PATH },
      { name: post.title, path },
    ]),
  ];
}
