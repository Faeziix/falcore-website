import Script from "next/script";
import { LEADSY_PIXEL_ID } from "@/lib/site-config";

export function VisitorIdentificationTag() {
  return (
    <Script
      id="vtag-ai-js"
      src="https://r2.leadsy.ai/tag.js"
      strategy="afterInteractive"
      data-pid={LEADSY_PIXEL_ID}
      data-version="062024"
    />
  );
}
