import Image from "next/image";

type LogoVariant = "full" | "icon";
type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { icon: number; text: string }> = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export default function Logo({
  variant = "full",
  size = "md",
  className = "",
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <a href="/" className={`flex items-center gap-0 ${className}`}>
      <Image
        src="/logo-transparent.png"
        alt="Falcore"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
      />
      {variant === "full" && (
        <span
          className={`${s.text} font-[family-name:var(--font-oxanium)] font-bold tracking-tighter text-foreground`}
        >
          FALCORE
        </span>
      )}
    </a>
  );
}
