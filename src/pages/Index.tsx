import { KBISHeader } from "@/components/KBIS/KBISHeader";
import { KBISHeroSection } from "@/components/KBISHeroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <KBISHeader />
      <KBISHeroSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;