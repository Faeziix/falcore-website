import type { ReactNode } from "react";

interface BrowserChromeProps {
  children: ReactNode;
  className?: string;
}

const BrowserChrome = ({ children, className = "" }: BrowserChromeProps) => {
  return (
    <div
      className={`relative border border-border bg-card shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "oklch(0.628 0.258 29.23)" }}
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "oklch(0.869 0.195 91.94)" }}
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "oklch(0.648 0.2 142.5)" }}
            aria-hidden="true"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default BrowserChrome;
