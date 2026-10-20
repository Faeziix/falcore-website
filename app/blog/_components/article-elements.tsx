import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { textLinkVariants } from "@/components/ui/text-link";
import { externalLinkProps } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const articleLinkClassName = textLinkVariants({ tone: "foreground", underline: "always", className: "inline" });

function ArticleLink({ href = "", children, className, ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={cn(articleLinkClassName, className)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...externalLinkProps} {...props} className={cn(articleLinkClassName, className)}>
      {children}
    </a>
  );
}

export function ArticleImage({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full border border-border"
      />
      {caption ? <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

export const articleElements: MDXComponents = {
  h2: (props) => <h2 className="mt-16 mb-6 text-display-sm font-medium text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-12 mb-4 font-display text-xl font-medium text-foreground" {...props} />,
  p: (props) => <p className="my-6 text-lg leading-relaxed text-foreground-soft" {...props} />,
  a: ArticleLink,
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  ul: (props) => <ul className="my-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-foreground-soft marker:text-accent" {...props} />,
  ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground-soft marker:text-muted-foreground" {...props} />,
  blockquote: (props) => <blockquote className="my-10 border-l-2 border-accent pl-6 text-lead text-foreground" {...props} />,
  hr: () => <hr className="my-16 border-border" />,
  code: (props) => <code className="bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-foreground" {...props} />,
  pre: (props) => <pre className="my-8 overflow-x-auto border border-border bg-surface p-5 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0" {...props} />,
  table: (props) => (
    <div className="my-10 overflow-x-auto">
      <table className="w-full border-collapse text-left text-base text-foreground-soft" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-border-strong py-3 pr-6 font-medium text-foreground" {...props} />,
  td: (props) => <td className="border-b border-border py-3 pr-6 align-top" {...props} />,
  ArticleImage,
};
