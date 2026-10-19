import { bookExcerpt } from "../_lib/book-excerpt";
import { excerptSignatureCopy } from "../_lib/case-study-chapters";
import { SharpeningExcerpt } from "./sharpening-excerpt";

export function ExcerptSignature() {
  const headingId = `${excerptSignatureCopy.id}-heading`;

  return (
    <section
      id={excerptSignatureCopy.id}
      aria-labelledby={headingId}
      data-surface="graphite"
      className="section-spacing bg-(--sanaa-ouahmane-plate-graphite) text-(--sanaa-ouahmane-plate-ink)"
    >
      <div className="page-container">
        <div className="border-t border-(--sanaa-ouahmane-plate-seam) pt-8">
          <h2
            id={headingId}
            className="max-w-4xl font-case-display text-display-lg font-medium text-(--sanaa-ouahmane-plate-headline)"
          >
            {excerptSignatureCopy.title}
          </h2>
          <p className="mt-6 max-w-2xl text-balance text-lead text-(--sanaa-ouahmane-plate-ink-dim)">
            {excerptSignatureCopy.intro}
          </p>
        </div>

        <div className="mt-20 lg:mt-32">
          <blockquote className="max-w-5xl">
            <p className="font-(family-name:--sanaa-ouahmane-label-family) text-xs tracking-(--sanaa-ouahmane-label-tracking) text-(--sanaa-ouahmane-plate-ink-dim) uppercase">
              {bookExcerpt.label}
            </p>
            <SharpeningExcerpt
              text={bookExcerpt.text}
              className="mt-8 font-case-display text-[clamp(2rem,3.4vw+0.5rem,4.25rem)] leading-[1.12] tracking-(--sanaa-ouahmane-display-tracking) text-(--sanaa-ouahmane-plate-ink) [text-wrap:pretty]"
            />
            <footer className="mt-10 border-t border-(--sanaa-ouahmane-plate-seam) pt-5 text-sm text-(--sanaa-ouahmane-plate-ink-dim)">
              <cite className="not-italic">{bookExcerpt.source}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
