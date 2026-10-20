"use client";

import { useEffect, useRef } from "react";

const revealTriggerSelector = "[data-reveal]";
const revealViewportMargin = "0px 0px -12% 0px";
const runEveryRevealWithoutScript = "[data-reveal-scope] * { animation-play-state: running !important; }";

export function ScrollRevealScope({ children }: { children: React.ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: revealViewportMargin },
    );
    scope.querySelectorAll(revealTriggerSelector).forEach((trigger) => revealObserver.observe(trigger));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div ref={scopeRef} data-reveal-scope="">
      {children}
      <noscript>
        <style>{runEveryRevealWithoutScript}</style>
      </noscript>
    </div>
  );
}
