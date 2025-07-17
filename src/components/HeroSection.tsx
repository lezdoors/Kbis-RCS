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
  title = "OBTENIR KBIS", 
  subtitle = "Votre partenaire pour créer votre entreprise en 24h",
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
    <section className={`relative bg-white min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Large-scale background typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-elegant font-extralight text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] xl:text-[28rem] text-gray-100/40 leading-none tracking-wider select-none">
          {title}
        </h1>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 lg:gap-32">
          
          {/* Left Column - 3D Illustration with Gallery Treatment */}
          <div className="flex-1 relative max-w-2xl">
            <div className="relative">
              {/* Gallery-style frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100/30 rounded-3xl transform rotate-1 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/80 to-white rounded-3xl transform -rotate-1 shadow-md"></div>
              
              {/* Main gallery container */}
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100/50">
                {/* Subtle ambient lighting effect */}
                <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-xl opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-gradient-to-tl from-gray-50 to-transparent rounded-full blur-2xl opacity-40"></div>
                
                <img 
                  src="/lovable-uploads/0a951d9f-bbd3-4723-b5db-128557ca2925.png"
                  alt="Deux figures 3D blanches s'entraident pour gravir des marches grises - illustration de partenariat et progression professionnelle"
                  className="relative w-full h-auto object-contain filter drop-shadow-2xl"
                  loading="eager"
                  style={{
                    filter: 'brightness(1.05) contrast(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.08))'
                  }}
                />
                
                {/* Gallery signature */}
                <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-light tracking-wider">
                  RCS EXPRESS COLLECTION
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 space-y-12 lg:space-y-16 text-center lg:text-left max-w-xl">
            {/* Competitive positioning */}
            <div className="space-y-8">
              <p className="text-lg lg:text-xl text-slate-600 font-light leading-relaxed tracking-wide">
                3x plus rapide que LegalPlace et LegalStart
              </p>
              
              {/* Refined subtitle */}
              <p className="text-2xl lg:text-3xl text-slate-700 font-light leading-relaxed tracking-wide">
                {subtitle}
              </p>
            </div>

            {/* CTA Section */}
            <div className="pt-4 lg:pt-8 space-y-4">
              <Button 
                onClick={() => {
                  trackEvent({
                    event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK
                  });
                  finalPrimaryCTA.action();
                }} 
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-6 px-12 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] min-h-[64px] tracking-wide"
              >
                Commencer maintenant - 2 minutes
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
              
              {/* Process guarantee */}
              <p className="text-sm text-slate-500 font-light tracking-wide">
                Traitement immédiat - Garantie 24h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};