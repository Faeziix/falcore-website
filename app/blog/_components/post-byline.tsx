import Link from "next/link";
import { textLinkVariants } from "@/components/ui/text-link";
import { formatContentDate } from "@/lib/format-content-date";
import type { ContentDates } from "@/lib/data/page-dates";
import { FOUNDER_NAME } from "@/lib/site-config";

export function PostByline({ dates }: { dates: ContentDates }) {
  const wasUpdated = dates.updatedOn !== dates.publishedOn;

  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span>
        By{" "}
        <Link href="/about" rel="author" className={textLinkVariants({ tone: "foreground", underline: "hover" })}>
          {FOUNDER_NAME}
        </Link>
      </span>
      <span aria-hidden>·</span>
      <span>
        Published <time dateTime={dates.publishedOn}>{formatContentDate(dates.publishedOn)}</time>
      </span>
      {wasUpdated ? (
        <>
          <span aria-hidden>·</span>
          <span>
            Updated <time dateTime={dates.updatedOn}>{formatContentDate(dates.updatedOn)}</time>
          </span>
        </>
      ) : null}
    </p>
  );
}
