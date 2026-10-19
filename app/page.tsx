import { SiteNavigation } from "@/components/site-navigation";
import ClientLogoSection from "@/components/ClientLogoSection";
import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import AboutFounder from "@/components/about-founder";
import FAQ from "@/components/faq";
import { WaveCTA, WaveCTABackground } from "@/components/ui/wave-cta";
import Footer from "@/components/footer";
import { HeroSection } from "./_components/hero/hero-section";
import { ServicesSection } from "./_components/services/services-section";
import { LaunchpadSection } from "./_components/launchpad/launchpad-section";
import { ProcessSection } from "./_components/process/process-section";

export default function Home() {
  return (
    <>
      <SiteNavigation />
      <main>
        <HeroSection />
        <ClientLogoSection />
        <ServicesSection />
        <LaunchpadSection />
        <BrowserShowcaseSection />
        <ProcessSection />
        <AboutFounder />
        <FAQ />
      </main>
      <div className="relative overflow-clip">
        <WaveCTABackground />
        <WaveCTA />
        <Footer />
      </div>
    </>
  );
}
