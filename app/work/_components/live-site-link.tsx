import { ArrowUpRight } from "lucide-react";
import { externalLinkProps } from "@/lib/site-config";

function liveSiteHostname(liveUrl: string) {
  return new URL(liveUrl).hostname.replace(/^www\./, "");
}

function HostnameThatBreaksBeforeItsDomain({ hostname }: { hostname: string }) {
  const [siteLabel, ...domainLabels] = hostname.split(".");
  const domain = domainLabels.length ? `.${domainLabels.join(".")}` : "";

  return (
    <>
      <span className="whitespace-nowrap">{siteLabel}</span>
      <wbr />
      <span className="whitespace-nowrap">
        {domain}
        <ArrowUpRight aria-hidden className="ml-1.5 inline size-4 align-[-0.125em]" />
      </span>
    </>
  );
}

export function LiveSiteLink({ liveUrl }: { liveUrl: string }) {
  return (
    <a
      href={liveUrl}
      {...externalLinkProps}
      className="-my-3 inline-block py-3 underline decoration-case-rule underline-offset-[0.3em] transition-colors hover:decoration-current"
    >
      <HostnameThatBreaksBeforeItsDomain hostname={liveSiteHostname(liveUrl)} />
    </a>
  );
}
