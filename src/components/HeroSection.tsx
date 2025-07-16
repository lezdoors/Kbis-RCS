import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Zap, Trophy, Lock, Smartphone, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GuaranteeSection } from "@/components/GuaranteeBadges";
import { SocialProofTestimonials } from "@/components/SocialProofTestimonials";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showBulletPoints?: boolean;
  showActivityGrid?: boolean; // Backward compatibility - maps to showBulletPoints
  showTrustIndicators?: boolean;
  showUrgencyBanner?: boolean;
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
  className?: string;
}

export const HeroSection = ({
  title = "Créez votre entreprise en 24h - Garanti",
  subtitle = "La plateforme la plus rapide de France. Technology 2025, résultats immédiats.",
  showBulletPoints = true,
  showActivityGrid = true, // Backward compatibility
  showTrustIndicators = true,
  showUrgencyBanner = true,
  primaryCTA,
  secondaryCTA,
  className = ""
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Bullet points for competitive advantages
  const bulletPoints = [
    {
      icon: Zap,
      text: "Traitement express en 24h maximum"
    },
    {
      icon: Trophy,
      text: "Plus rapide que LegalPlace et les autres"
    },
    {
      icon: Lock,
      text: "Plateforme ultra-moderne et sécurisée"
    },
    {
      icon: Smartphone,
      text: "Suivi temps réel de votre dossier"
    },
    {
      icon: CheckCircle,
      text: "300,000+ entrepreneurs nous font confiance"
    }
  ];

  const defaultPrimaryCTA = {
    text: "Créer mon entreprise maintenant",
    action: () => navigate('/choisir-statut')
  };

  const defaultSecondaryCTA = {
    text: "Comment ça marche ?",
    action: () => {
      const processSection = document.querySelector('#process');
      processSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const finalPrimaryCTA = primaryCTA || defaultPrimaryCTA;
  const finalSecondaryCTA = secondaryCTA || defaultSecondaryCTA;

  return (
    <>
      {/* Urgency Banner */}
      {showUrgencyBanner && !bannerDismissed && (
        <div className="bg-[#EA580C] text-white py-3 px-4 text-center relative">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </span>
            <span>Offre de lancement : Accompagnement expert gratuit (valeur 150€)</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80"
            aria-label="Fermer la bannière"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-background via-primary-light/30 to-background py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8 lg:order-1 order-2">
              {/* Main Headlines */}
              <div className="space-y-4 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                  {title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              {showBulletPoints && (
                <div className="space-y-4">
                  {bulletPoints.map((point, index) => {
                    const IconComponent = point.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 text-center lg:text-left justify-center lg:justify-start">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg font-medium text-foreground">
                          {point.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start">
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={() => {
                      trackEvent({ event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK });
                      finalPrimaryCTA.action();
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg shadow-lg w-full sm:w-auto min-h-[44px]"
                  >
                    {finalPrimaryCTA.text}
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  {/* Urgency Message */}
                  <div className="text-sm text-gray-600 mt-2 flex items-center justify-center sm:justify-start gap-1">
                    <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                    <span>Commandez avant 16h = traitement aujourd'hui</span>
                  </div>
                </div>
                
                {secondaryCTA && (
                  <div className="w-full sm:w-auto">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto min-h-[44px]"
                      onClick={finalSecondaryCTA.action}
                    >
                      {finalSecondaryCTA.text}
                    </Button>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              {showTrustIndicators && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm sm:text-base font-bold text-foreground">4.5/5</span>
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground text-center lg:text-left">
                      <span className="font-bold text-foreground">Excellent</span> 4.4 sur 5 | Trustpilot
                    </div>
                  </div>

                  <div className="text-sm sm:text-base text-muted-foreground text-center lg:text-left">
                    <span className="font-bold text-foreground text-base sm:text-lg">+300 000</span> sociétés accompagnées par InscriptionRCS
                  </div>
                </div>
              )}

              {/* Guarantee Badges */}
              <div>
                <GuaranteeSection />
              </div>

              {/* Social Proof Testimonials */}
              <div>
                <SocialProofTestimonials />
              </div>
            </div>

            {/* Right Column - Organic Image Integration */}
            <div className="relative lg:order-2 order-1">
              {/* Background gradient that flows naturally */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-light/20 to-primary/5 rounded-full blur-3xl transform scale-110 opacity-60"></div>
              
              {/* Image container with natural flow */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="relative">
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5 rounded-3xl"></div>
                  
                  {/* Main image flowing naturally */}
                  <img 
                    src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/too-blk-stairs.jpg.png" 
                    alt="Croissance d'entreprise - Illustration 3D représentant le succès entrepreneurial" 
                    className="w-full max-w-[450px] h-auto object-contain transform hover:scale-105 transition-transform duration-700 ease-out filter drop-shadow-2xl" 
                    loading="lazy"
                  />
                  
                  {/* Floating text elements */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground">Votre entreprise</h3>
                      <p className="text-base lg:text-lg text-primary font-semibold">créée en 24h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Organic floating elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-primary-light/20 to-primary/20 rounded-full blur-2xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-6 w-20 h-20 bg-gradient-to-br from-primary-glow/30 to-primary/20 rounded-full blur-xl opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};