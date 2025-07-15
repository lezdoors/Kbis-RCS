import { Rocket, Wrench, Euro, Shield, Phone, Zap, CheckCircle } from "lucide-react";

export const BenefitsSection = () => {
  const comparisons = [
    {
      title: "🚀 VITESSE INÉGALÉE",
      advantage: "24h garanties vs 3-5 jours chez nos concurrents",
      description: "Traitement le plus rapide du marché",
      icon: Rocket
    },
    {
      title: "🔧 TECHNOLOGIE 2025",
      advantage: "Plateforme moderne vs solutions obsolètes",
      description: "Architecture cloud nouvelle génération",
      icon: Wrench
    },
    {
      title: "💰 PRIX TRANSPARENT",
      advantage: "129€ tout inclus vs frais cachés ailleurs",
      description: "Aucune surprise, aucun supplément",
      icon: Euro
    },
    {
      title: "🛡️ SÉCURITÉ MAXIMALE",
      advantage: "Données cryptées et conformité RGPD totale",
      description: "Protection et confidentialité garanties",
      icon: Shield
    },
    {
      title: "📞 SUPPORT EXPERT",
      advantage: "Accompagnement humain à chaque étape",
      description: "Conseillers juridiques disponibles",
      icon: Phone
    },
    {
      title: "⚡ SUIVI TEMPS RÉEL",
      advantage: "Notifications instantanées vs emails sporadiques",
      description: "Vous savez toujours où en est votre dossier",
      icon: Zap
    }
  ];

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24" id="pourquoi-nous">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Pourquoi RCS Express bat tous les concurrents
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comparaison objective avec LegalPlace et autres plateformes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comparison, index) => {
            const IconComponent = comparison.icon;
            return (
              <div 
                key={index} 
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <div className="space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {comparison.title}
                    </h3>
                  </div>

                  {/* Advantage with checkmark */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-semibold text-foreground">
                        {comparison.advantage}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground pl-7">
                      {comparison.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-xl px-6 py-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              Rejoignez les 300,000+ entrepreneurs qui nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};