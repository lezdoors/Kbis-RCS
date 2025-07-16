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
      <section className={`bg-gradient-to-br from-background via-primary-light/30 to-background py-12 sm:py-16 lg:py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Content (7 columns) */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-10 lg:order-1 order-2">
              {/* Main Headlines */}
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight animate-fade-in">
                  <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/90 font-medium leading-relaxed max-w-3xl mx-auto lg:mx-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  {subtitle}
                </p>
              </div>

              {/* CTA Buttons - More Prominent */}
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={() => {
                      trackEvent({ event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK });
                      finalPrimaryCTA.action();
                    }}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-xl text-lg md:text-xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[56px] relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {finalPrimaryCTA.text}
                      <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                  {/* Urgency Message */}
                  <div className="text-sm text-gray-600 mt-3 flex items-center justify-center sm:justify-start gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Commandez avant 16h = traitement aujourd'hui</span>
                  </div>
                </div>
                
                {secondaryCTA && (
                  <div className="w-full sm:w-auto">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[56px]"
                      onClick={finalSecondaryCTA.action}
                    >
                      {finalSecondaryCTA.text}
                    </Button>
                  </div>
                )}
              </div>

              {/* Trust Indicators - Better Positioned */}
              {showTrustIndicators && (
                <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
                  <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-3 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-base sm:text-lg font-bold text-foreground">4.5/5</span>
                    </div>
                    <div className="text-base sm:text-lg text-muted-foreground text-center lg:text-left">
                      <span className="font-bold text-foreground">Excellent</span> 4.4 sur 5 | Trustpilot
                    </div>
                  </div>

                  <div className="text-base sm:text-lg text-muted-foreground text-center lg:text-left">
                    <span className="font-bold text-foreground text-lg sm:text-xl">+300 000</span> sociétés accompagnées par RCS Express
                  </div>
                </div>
              )}

              {/* Bullet Points */}
              {showBulletPoints && (
                <div className="space-y-5 animate-fade-in" style={{animationDelay: '0.8s'}}>
                  {bulletPoints.map((point, index) => {
                    const IconComponent = point.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 text-center lg:text-left justify-center lg:justify-start group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-lg sm:text-xl font-semibold text-foreground">
                          {point.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Guarantee Badges */}
              <div className="animate-fade-in" style={{animationDelay: '1.0s'}}>
                <GuaranteeSection />
              </div>

              {/* Social Proof Testimonials */}
              <div className="animate-fade-in" style={{animationDelay: '1.2s'}}>
                <SocialProofTestimonials />
              </div>
            </div>

            {/* Right Column - Animated Image (5 columns) */}
            <div className="lg:col-span-5 relative lg:order-2 order-1">
              {/* Background gradient that flows naturally */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-light/20 to-primary/5 rounded-full blur-3xl transform scale-110 opacity-60 animate-pulse"></div>
              
              {/* Image container with natural flow */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5 rounded-3xl"></div>
                  
                  {/* Main image with enhanced animations */}
                  <div className="relative group">
                    <img 
                      src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/too-blk-stairs.jpg.png" 
                      alt="Croissance d'entreprise - Illustration 3D représentant le succès entrepreneurial" 
                      className="w-full max-w-[500px] h-auto object-contain transform group-hover:scale-105 transition-all duration-700 ease-out filter drop-shadow-2xl" 
                      loading="lazy"
                    />
                    
                    {/* Static growth indicators */}
                    <div className="absolute top-1/4 -right-4 animate-fade-in" style={{animationDelay: '1s'}}>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        +300%
                      </div>
                    </div>
                    
                    <div className="absolute bottom-1/3 -left-4 animate-fade-in" style={{animationDelay: '1.5s'}}>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        24h
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating text elements */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in" style={{animationDelay: '1.4s'}}>
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-white/20">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Votre entreprise</h3>
                      <p className="text-lg lg:text-xl text-primary font-semibold">créée en 24h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Organic floating elements with animations */}
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