import { Button } from "@/components/ui/button";
import { Building2, Star, ArrowRight, Briefcase, Car, ShoppingCart, Bike, Utensils, Home, MoreHorizontal, UserCheck, Wrench, HandHeart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showActivityGrid?: boolean;
  showTrustIndicators?: boolean;
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
  title = "Créez votre entreprise ultra rapidement dès 0€ !",
  subtitle = "Accompagnement personnalisé par un juriste dédié jusqu'à l'obtention du Kbis.",
  showActivityGrid = true,
  showTrustIndicators = true,
  primaryCTA,
  secondaryCTA,
  className = ""
}: HeroSectionProps) => {
  const navigate = useNavigate();

  // Activity types for the hero section
  const activityTypes = [{
    name: "Consultants & freelance",
    icon: Briefcase
  }, {
    name: "Construction & travaux",
    icon: Wrench
  }, {
    name: "Automobile & transport",
    icon: Car
  }, {
    name: "Vente en ligne",
    icon: ShoppingCart
  }, {
    name: "Commerce",
    icon: Building2
  }, {
    name: "Coursier à vélo",
    icon: Bike
  }, {
    name: "Achat & revente",
    icon: TrendingUp
  }, {
    name: "Services aux entreprises",
    icon: UserCheck
  }, {
    name: "Services à la personne",
    icon: HandHeart
  }, {
    name: "Restauration",
    icon: Utensils
  }, {
    name: "SCI",
    icon: Home
  }, {
    name: "Autres",
    icon: MoreHorizontal
  }];

  const defaultPrimaryCTA = {
    text: "Commencer mon inscription RCS",
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
    <section className={`bg-gradient-to-br from-background via-primary-light/30 to-background py-8 sm:py-12 lg:py-16 animate-fade-in ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8 lg:order-1 order-2">
            {/* Main Headlines */}
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight animate-slide-in-left">
                {title.includes("entreprise") ? (
                  <>
                    {title.split("entreprise")[0]}
                    <span className="text-primary">entreprise</span>
                    {title.split("entreprise")[1]}
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-in-left [animation-delay:0.2s]">
                {subtitle}
              </p>
            </div>

            {/* Activity Selection Grid */}
            {showActivityGrid && (
              <div className="space-y-5 animate-slide-in-left [animation-delay:0.4s]">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground text-center lg:text-left">
                  Quel sera votre domaine d'activité ?
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                  {activityTypes.slice(0, 8).map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <div 
                        key={activity.name} 
                        className="group bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 touch-target" 
                        onClick={() => navigate('/choisir-statut')}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-foreground text-center group-hover:text-primary transition-colors leading-tight">
                            {activity.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start animate-slide-in-left [animation-delay:0.6s]">
              <Button 
                onClick={finalPrimaryCTA.action}
                size="lg" 
                className="btn-administrative text-base sm:text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px] sm:min-h-[56px] w-full sm:w-auto order-1"
              >
                {finalPrimaryCTA.text}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-administrative-outline text-base sm:text-lg px-6 py-4 min-h-[48px] sm:min-h-[56px] w-full sm:w-auto order-2"
                onClick={finalSecondaryCTA.action}
              >
                {finalSecondaryCTA.text}
              </Button>
            </div>

            {/* Trust Indicators */}
            {showTrustIndicators && (
              <div className="space-y-3 animate-slide-in-left [animation-delay:0.8s]">
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
                    <span className="font-bold text-foreground">Excellent</span> 4.4 sur 5 ⭐ Trustpilot
                  </div>
                </div>

                <div className="text-sm sm:text-base text-muted-foreground text-center lg:text-left">
                  <span className="font-bold text-foreground text-base sm:text-lg">+300 000</span> sociétés accompagnées par InscriptionRCS
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Enhanced Illustration */}
          <div className="relative lg:order-2 order-1 animate-slide-in-right">
            <div className="bg-gradient-to-br from-primary/15 via-primary-light/40 to-primary/5 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm max-w-[420px] mx-auto">
              <div className="p-6">
                <div className="text-center space-y-6">
                  <div className="relative animate-float">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                    <img 
                      src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/too-blk-stairs.jpg.png" 
                      alt="Deux personnages en escalade symbolisant l'accompagnement vers la création d'entreprise" 
                      className="w-full h-64 sm:h-72 lg:h-80 object-contain mx-auto rounded-2xl shadow-lg relative z-10 transition-transform duration-700 hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">Votre entreprise</h3>
                    <p className="text-base lg:text-lg text-muted-foreground font-medium">créée en quelques clics</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-glow/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};