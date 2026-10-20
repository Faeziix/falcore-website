import Link from "next/link";
import { formatContentDate } from "@/lib/format-content-date";
import type { BlogPostSummary } from "../_lib/blog-post-types";
import { blogPostPath } from "../_lib/blog-posts";

export function BlogPostList({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <ul className="mt-14 border-b border-border lg:mt-20">
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-border">
          <Link
            href={blogPostPath(post.slug)}
            className="group grid gap-3 py-8 focus-visible:outline-offset-4 md:grid-cols-12 md:gap-8"
          >
            <time dateTime={post.dates.publishedOn} className="text-sm text-muted-foreground md:col-span-3">
              {formatContentDate(post.dates.publishedOn)}
            </time>
            <div className="md:col-span-9">
              <h2 className="font-display text-display-sm font-medium text-foreground underline-offset-[0.2em] decoration-1 group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-foreground-soft">{post.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
