import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { PricingComparison } from "@/components/PricingComparison";
import { LegalStructuresSection } from "@/components/LegalStructuresSection";
import { SocialProofTestimonials } from "@/components/SocialProofTestimonials";
import { FAQSection } from "@/components/FAQSection";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
      <PricingComparison />
      <LegalStructuresSection />
      <SocialProofTestimonials />
      <FAQSection />
      <Footer />
      <MobileStickyCTA />
      <ChatbotWidget />
    </div>
  );
};

export default Index;