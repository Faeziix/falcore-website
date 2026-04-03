import Nav from "@/components/nav";
import { HeroSection } from "@/components/ui/hero-dithering-card";
import VerticalTabs from "@/components/ui/vertical-tabs";
import BrowserShowcaseSection from "@/components/BrowserShowcaseSection";
import AboutFounder from "@/components/about-founder";
import { WaveCTA, WaveCTABackground } from "@/components/ui/wave-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <VerticalTabs />
        <BrowserShowcaseSection />
        <AboutFounder />
      </main>
      <div className="relative overflow-hidden">
        <WaveCTABackground />
        <WaveCTA />
        <Footer />
      </div>
    </>
  );
}
