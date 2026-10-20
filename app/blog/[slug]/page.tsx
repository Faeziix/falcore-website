import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNavigation } from "@/components/site-navigation";
import { PageClosing } from "@/components/page-closing";
import { textLinkVariants } from "@/components/ui/text-link";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { JsonLd } from "@/lib/structured-data/json-ld";
import { BLOG_SHARE_CARD_ALT } from "../_lib/blog-content";
import { BLOG_INDEX_PATH, blogPostPath, findPublishedBlogPost, publishedBlogPosts } from "../_lib/blog-posts";
import { blogPostStructuredDataNodes } from "../_lib/blog-structured-data";
import { PostByline } from "../_components/post-byline";
import { PostRelatedLinks } from "../_components/post-related-links";

type BlogPostRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPublishedBlogPost(slug);
  if (!post) return {};

  const path = blogPostPath(post.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    ...buildSocialShareMetadata({
      title: `${post.title} | Falcore`,
      description: post.description,
      path,
      image: generatedShareCard("blog", BLOG_SHARE_CARD_ALT),
      articleDates: post.dates,
    }),
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = findPublishedBlogPost(slug);
  if (!post) notFound();

  const { default: PostContent } = await post.loadContent();

  return (
    <>
      <JsonLd nodes={blogPostStructuredDataNodes(post)} />
      <SiteNavigation />
      <main className="pt-28 md:pt-32">
        <article className="page-container pb-16 sm:pb-20 md:pb-(--section-space)">
          <div className="mx-auto max-w-3xl">
            <Link
              href={BLOG_INDEX_PATH}
              className={textLinkVariants({ tone: "muted", size: "sm", underline: "hover", className: "animate-rise-in" })}
            >
              All posts
            </Link>
            <h1 className="mt-6 text-balance text-display-lg font-medium text-foreground">{post.title}</h1>
            <p className="mt-6 text-balance text-lead text-foreground-soft">{post.description}</p>
            <div className="mt-8 border-t border-border pt-5">
              <PostByline dates={post.dates} />
            </div>
            <div className="mt-6">
              <PostContent />
            </div>
            <PostRelatedLinks post={post} />
          </div>
        </article>
      </main>
      <PageClosing />
    </>
  );
}
