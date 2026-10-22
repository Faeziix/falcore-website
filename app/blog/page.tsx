import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { BLOG_INDEX_DESCRIPTION, BLOG_INDEX_TITLE, BLOG_SHARE_CARD_ALT } from "./_lib/blog-content";
import { BLOG_INDEX_PATH, publishedBlogPosts } from "./_lib/blog-posts";
import { blogIndexStructuredDataNodes } from "./_lib/blog-structured-data";
import { BlogPostList } from "./_components/blog-post-list";

export const metadata: Metadata = {
  title: BLOG_INDEX_TITLE,
  description: BLOG_INDEX_DESCRIPTION,
  alternates: { canonical: BLOG_INDEX_PATH },
  ...buildSocialShareMetadata({
    title: `${BLOG_INDEX_TITLE} | Falcore`,
    description: BLOG_INDEX_DESCRIPTION,
    path: BLOG_INDEX_PATH,
    image: generatedShareCard("blog", BLOG_SHARE_CARD_ALT),
  }),
};

export default function BlogIndexPage() {
  const posts = publishedBlogPosts();
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd nodes={blogIndexStructuredDataNodes(posts)} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <div className="page-container pb-(--section-space)">
          <h1 className="max-w-5xl text-display-xl font-medium text-foreground animate-rise-in">Blog</h1>
          <p className="mt-5 max-w-2xl text-balance text-lead text-foreground-soft animate-rise-in [animation-delay:120ms]">
            Notes from projects I’ve built, and what I learned building them.
          </p>
          <BlogPostList posts={posts} />
        </div>
      </main>
      <PageClosing />
    </>
  );
}
