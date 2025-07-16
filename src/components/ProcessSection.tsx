import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GuaranteeBadge } from "@/components/GuaranteeBadges";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export const ProcessSection = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      number: "01",
      title: "Configuration Ultra-Rapide",
      description: "Questionnaire intelligent en 2 minutes. Notre IA pré-remplit tout automatiquement.",
      competitiveNote: "VS 15 minutes chez LegalPlace",
      image: "https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/Toon-blk-tie.jpg.png",
      altText: "Processus rapide de configuration avec accord professionnel",
      timeline: "2 minutes"
    },
    {
      number: "02",
      title: "Traitement Express",
      description: "Nos experts traitent votre dossier en temps record. Suivi en direct via votre tableau de bord.",
      competitiveNote: "VS attente aveugle ailleurs",
      image: "https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/toon-pik-stairs.jpg.png",
      altText: "Traitement expert rapide avec progression par étapes",
      timeline: "1-12 heures"
    },
    {
      number: "03",
      title: "Livraison Garantie",
      description: "KBIS reçu en 24h maximum ou remboursé. Plus rapide que tous nos concurrents.",
      competitiveNote: "VS 3-5 jours minimum ailleurs",
      image: "https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/Toon-green-pie.jpg.png",
      altText: "Livraison garantie rapide avec résultats finalisés",
      timeline: "24h max"
    }
  ];

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            3 étapes pour battre vos concurrents en vitesse
          </h2>
        </div>

        {/* 3-Step Timeline */}
        <div className="relative">
          {/* Progress Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary w-full"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {processSteps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Step Card */}
                <div className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden w-full max-w-sm">
                  {/* Image */}
                  <div className="relative p-6 pb-4">
                    <img 
                      src={step.image}
                      alt={step.altText}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-40 object-contain mx-auto rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2 space-y-4">
                    {/* Step Number */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Timeline Badge */}
                    <div className="flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {step.timeline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Competitive Note */}
                    <div className="pt-2">
                      <p className="text-red-600 font-medium text-sm">
                        {step.competitiveNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile connector line */}
                {index < processSteps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-primary my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/choisir-statut')}
              variant="institutional"
              size="touch"
              className="py-3 px-6 md:py-4 md:px-8 text-base md:text-lg min-h-[44px]"
            >
              Créer mon entreprise maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            {/* Urgency Messages */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span> <span>47 entreprises créées cette semaine</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-3 h-3 bg-primary rounded-full"></span> <span>Offre limitée</span>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Plus rapide que LegalPlace et tous nos concurrents
          </p>

          {/* Guarantee Badge */}
          <div className="mt-6">
            <GuaranteeBadge text="Livraison en 24h ou remboursé" />
          </div>
        </div>
      </div>
    </section>
  );
};