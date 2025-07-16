import { Rocket, Wrench, Euro, Shield, Phone, Zap, CheckCircle } from "lucide-react";
import { ScrollFade } from "@/components/ui/scroll-fade";

export const BenefitsSection = () => {
  const comparisons = [
    {
      title: "VITESSE INÉGALÉE",
      advantage: "24h garanties vs 3-5 jours chez nos concurrents",
      description: "Traitement le plus rapide du marché",
      icon: Rocket
    },
    {
      title: "TECHNOLOGIE 2025",
      advantage: "Plateforme moderne vs solutions obsolètes",
      description: "Architecture cloud nouvelle génération",
      icon: Wrench
    },
    {
      title: "PRIX TRANSPARENT",
      advantage: "129€ tout inclus vs frais cachés ailleurs",
      description: "Aucune surprise, aucun supplément",
      icon: Euro
    },
    {
      title: "SÉCURITÉ MAXIMALE",
      advantage: "Données cryptées et conformité RGPD totale",
      description: "Protection et confidentialité garanties",
      icon: Shield
    },
    {
      title: "SUPPORT EXPERT",
      advantage: "Accompagnement humain à chaque étape",
      description: "Conseillers juridiques disponibles",
      icon: Phone
    },
    {
      title: "SUIVI TEMPS RÉEL",
      advantage: "Notifications instantanées vs emails sporadiques",
      description: "Vous savez toujours où en est votre dossier",
      icon: Zap
    }
  ];

  return (
    <section className="bg-background py-20 lg:py-24" id="pourquoi-nous">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Pourquoi RCS Express bat tous les concurrents
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comparaison objective avec LegalPlace et autres plateformes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comparisons.map((comparison, index) => {
            const IconComponent = comparison.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="space-y-5">
                  {/* Icon and Title */}
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-navy" />
                    </div>
                    <h3 className="font-bold text-foreground text-xl">
                      {comparison.title}
                    </h3>
                  </div>

                  {/* Advantage with checkmark */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-institutional mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        {comparison.advantage}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground pl-8 leading-relaxed">
                      {comparison.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-institutional/5 border border-institutional/20 rounded-xl px-8 py-4">
            <CheckCircle className="w-5 h-5 text-institutional" />
            <span className="text-institutional font-semibold">
              Rejoignez les 300,000+ entrepreneurs qui nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};