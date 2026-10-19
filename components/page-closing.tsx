import { WaveCTA, WaveCTABackground } from "@/components/ui/wave-cta";
import Footer from "@/components/footer";

export function PageClosing() {
  return (
    <div className="relative overflow-clip">
      <WaveCTABackground />
      <WaveCTA />
      <Footer />
    </div>
  );
}
