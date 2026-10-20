import type { ReactNode } from "react";

export function PolicySection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-medium text-foreground">{heading}</h2>
      {children}
    </section>
  );
}
