import type { MDXComponents } from "mdx/types";
import { articleElements } from "@/app/blog/_components/article-elements";

export function useMDXComponents(): MDXComponents {
  return articleElements;
}
