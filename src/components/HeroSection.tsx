import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import heroImage from "@/assets/hero-image.jpg";
import { HeroSearch } from "@/components/HeroSearch";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
  // Backward compatibility props (ignored in new design)
  showActivityGrid?: boolean;
  showTrustIndicators?: boolean;
  showBulletPoints?: boolean;
  showUrgencyBanner?: boolean;
}
export const HeroSection = ({
  title = "Obtenez votre extrait Kbis en ligne",
  subtitle = "Démarrez votre demande en quelques minutes. Traitement rapide et accompagnement par des spécialistes.",
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
    text: "Commencer la demande",
    action: () => {
      trackEvent({
        event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK
      });
      navigate("/commencer");
    }
  };

  const defaultSecondaryCTA = {
    text: "En savoir plus",
    action: () => {
      navigate("/informations");
    }
  };

  const finalPrimaryCTA = primaryCTA || defaultPrimaryCTA;
  const finalSecondaryCTA = secondaryCTA || defaultSecondaryCTA;

  return (
    <section 
      className={`relative min-h-screen bg-gradient-to-br from-[hsl(var(--bg-page))] via-[hsl(var(--bg-section))] to-[hsl(var(--bg-page))] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[hsl(var(--brand-primary))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-screen-lg mx-auto px-4 pt-32 pb-20">
        <div className="text-center space-y-8">
          {/* Main headline */}
          <div className="space-y-6">
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--text-primary))] leading-tight text-balance max-w-4xl mx-auto"
            >
              {title}
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--text-secondary))] max-w-2xl mx-auto leading-relaxed">
              Documents officiels • Support 7j/7 • Prix transparent
            </p>
          </div>

          {/* Hero Search - Most prominent element after headline */}
          <HeroSearch />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              onClick={finalPrimaryCTA.action}
              className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90 text-[hsl(var(--brand-primary-contrast))] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:ring-4 focus:ring-[hsl(var(--brand-primary))]/20 focus:ring-offset-2 min-h-[48px]"
              aria-label={`${finalPrimaryCTA.text} - Bouton principal`}
            >
              {finalPrimaryCTA.text}
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
            
            <button
              onClick={finalSecondaryCTA.action}
              className="text-[hsl(var(--text-primary))] hover:text-[hsl(var(--brand-primary))] font-medium underline underline-offset-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/20 focus:ring-offset-2 rounded-md px-2 py-1 min-h-[48px]"
              aria-label={`${finalSecondaryCTA.text} - Lien secondaire`}
            >
              {finalSecondaryCTA.text}
            </button>
          </div>

          {/* Trust bar */}
          <div 
            className="max-w-2xl mx-auto pt-8 mt-8 border-t border-[hsl(var(--border-soft))]"
            role="list"
            aria-label="Garanties de service"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div 
                className="flex items-center justify-center gap-2"
                role="listitem"
              >
                <Shield className="h-4 w-4 text-success flex-shrink-0" aria-hidden="true" />
                <span className="text-[hsl(var(--text-secondary))] font-medium">
                  Paiement sécurisé
                </span>
              </div>
              <div 
                className="flex items-center justify-center gap-2"
                role="listitem"
              >
                <Clock className="h-4 w-4 text-success flex-shrink-0" aria-hidden="true" />
                <span className="text-[hsl(var(--text-secondary))] font-medium">
                  Traitement sous 24–48h
                </span>
              </div>
              <div 
                className="flex items-center justify-center gap-2"
                role="listitem"
              >
                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" aria-hidden="true" />
                <span className="text-[hsl(var(--text-secondary))] font-medium">
                  Support en français
                </span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative max-w-md mx-auto mt-12">
            <div className="illustration-3d-consistent">
              <img
                src={heroImage}
                alt="Illustration représentant la démarche administrative pour obtenir un extrait Kbis"
                className="w-full h-auto object-contain max-h-80"
                loading="eager"
                width="400"
                height="320"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};