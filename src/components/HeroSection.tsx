import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import heroBusinessmanImage from "@/assets/hero-businessman.png";
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  // Backward compatibility props (not used in new design)
  showActivityGrid?: boolean;
  showTrustIndicators?: boolean;
  showBulletPoints?: boolean;
  showUrgencyBanner?: boolean;
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
}
export const HeroSection = ({
  title = "Créez votre entreprise en 24h",
  subtitle = "3x plus rapide que LegalPlace et LegalStart",
  className = "",
  primaryCTA,
  secondaryCTA,
  // Backward compatibility props (ignored in new design)
  showActivityGrid,
  showTrustIndicators,
  showBulletPoints,
  showUrgencyBanner
}: HeroSectionProps) => {
  const navigate = useNavigate();

  const defaultPrimaryCTA = {
    text: "Commencer maintenant",
    action: () => navigate('/choisir-statut')
  };

  const finalPrimaryCTA = primaryCTA || defaultPrimaryCTA;

  return (
    <section className={`bg-white py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-12">
            {/* Main Headlines */}
            <div className="space-y-8">
              <h1 className="text-hero-navy font-semibold leading-tight" style={{ fontSize: '48px' }}>
                {title}
              </h1>
              <p className="text-hero-gray text-xl leading-relaxed font-medium">
                {subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button 
                onClick={() => {
                  trackEvent({
                    event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK
                  });
                  finalPrimaryCTA.action();
                }} 
                className="bg-hero-blue hover:bg-hero-blue/90 text-white font-semibold py-6 px-10 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-h-[64px]"
              >
                {finalPrimaryCTA.text}
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src={heroBusinessmanImage} 
                alt="Businessman professionnel gravissant des marches vers le succès"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Subtle background elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-hero-blue/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-hero-navy/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};