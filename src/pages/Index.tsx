import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { LegalStructuresSection } from "@/components/LegalStructuresSection";
import { FAQSection } from "@/components/FAQSection";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
      <LegalStructuresSection />
      <FAQSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;