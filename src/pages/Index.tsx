import { KBISHeader } from "@/components/KBIS/KBISHeader";
import { KBISHeroSection } from "@/components/KBIS/KBISHeroSection";
import { KBISTrustSection } from "@/components/KBIS/KBISTrustSection";
import { KBISPricingSection } from "@/components/KBIS/KBISPricingSection";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <KBISHeader />
      <KBISHeroSection />
      <KBISTrustSection />
      <KBISPricingSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;