import { ModernHero } from "@/components/modern/ModernHero";
import { ModernFeatures } from "@/components/modern/ModernFeatures";
import { ModernHowItWorks } from "@/components/modern/ModernHowItWorks";
import { ModernServices } from "@/components/modern/ModernServices";
import { ModernStats } from "@/components/modern/ModernStats";
import { ModernTestimonials } from "@/components/modern/ModernTestimonials";
import { ModernFAQ } from "@/components/modern/ModernFAQ";
import { ModernHeader } from "@/components/modern/ModernHeader";
import { ModernFooter } from "@/components/modern/ModernFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      <main>
        <ModernHero />
        <ModernFeatures />
        <ModernHowItWorks />
        <ModernServices />
        <ModernStats />
        <ModernTestimonials />
        <ModernFAQ />
      </main>
      <ModernFooter />
    </div>
  );
};

export default Index;