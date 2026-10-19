import { OLD_ADDRESS_REDIRECTS, type OldAddressRedirect } from "../_lib/old-addresses";

function OldAddressLedgerRow({ redirect }: { redirect: OldAddressRedirect }) {
  return (
    <li className="flex flex-col gap-1.5 border-t border-case-rule py-5 md:flex-row md:items-baseline md:gap-0 md:py-6">
      <span className="sr-only">Old address</span>
      <bdi
        dir="ltr"
        lang={redirect.isOldPathArabic ? "ar" : undefined}
        className="min-w-0 break-all text-case-ink-soft line-through decoration-(--corpofino-strike) decoration-1"
      >
        {redirect.oldPath}
      </bdi>
      <span
        aria-hidden
        className="mx-5 hidden min-w-8 flex-1 translate-y-[-0.3em] border-b border-dotted border-(--corpofino-leader) md:block"
      />
      <span className="sr-only">is mapped to</span>
      <span className="min-w-0 break-all text-case-ink md:text-end">{redirect.newPath}</span>
    </li>
  );
}

export function OldAddressLedger() {
  return (
    <div className="max-w-5xl">
      <div aria-hidden className="hidden justify-between pb-4 text-sm text-case-ink-soft md:flex">
        <span>On corpofino.me</span>
        <span>On the new site</span>
      </div>
      <ul className="border-b border-case-rule text-[clamp(1.125rem,1.2vw+0.6rem,1.625rem)] leading-snug tracking-[-0.01em]">
        {OLD_ADDRESS_REDIRECTS.map((redirect) => (
          <OldAddressLedgerRow key={redirect.oldPath} redirect={redirect} />
        ))}
      </ul>
    </div>
  );
}
