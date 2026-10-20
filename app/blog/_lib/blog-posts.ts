import type { BlogPostSummary } from "./blog-post-types";

export const BLOG_INDEX_PATH = "/blog";

const BLOG_POSTS: BlogPostSummary[] = [];

export function blogPostPath(slug: string) {
  return `${BLOG_INDEX_PATH}/${slug}`;
}

export function publishedBlogPosts() {
  return BLOG_POSTS.filter((post) => post.isPublished).sort((first, second) =>
    second.dates.publishedOn.localeCompare(first.dates.publishedOn)
  );
}

export function hasPublishedBlogPosts() {
  return publishedBlogPosts().length > 0;
}

export function findPublishedBlogPost(slug: string) {
  return publishedBlogPosts().find((post) => post.slug === slug);
}
