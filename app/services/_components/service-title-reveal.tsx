const firstWordDelayMilliseconds = 90;
const wordStaggerMilliseconds = 70;

export function ServiceTitleReveal({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <h1 className="mt-6 text-display-lg font-medium text-foreground">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="inline-block overflow-clip pb-[0.06em] align-top">
            <span
              style={{
                animationDelay: `${firstWordDelayMilliseconds + index * wordStaggerMilliseconds}ms`,
              }}
              className="inline-block motion-safe:animate-mask-rise"
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
