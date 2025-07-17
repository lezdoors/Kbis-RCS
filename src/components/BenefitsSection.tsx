import { Rocket, Wrench, Euro, Shield, Phone, Zap, CheckCircle, Users, Trophy } from "lucide-react";
import { ScrollFade } from "@/components/ui/scroll-fade";

export const BenefitsSection = () => {
  const comparisons = [
    {
      title: "VITESSE INÉGALÉE",
      advantage: "24h garanties vs 3-5 jours chez nos concurrents",
      description: "Traitement le plus rapide du marché",
      icon: Rocket,
      illustration: "/lovable-uploads/02f38eff-0bf3-4875-88a2-5fce416ad9e4.png" // Running figure
    },
    {
      title: "TECHNOLOGIE 2025",
      advantage: "Plateforme moderne vs solutions obsolètes",
      description: "Architecture cloud nouvelle génération",
      icon: Wrench,
      illustration: null // Keep institutional logo icon only
    },
    {
      title: "PRIX TRANSPARENT",
      advantage: "129€ tout inclus vs frais cachés ailleurs",
      description: "Aucune surprise, aucun supplément",
      icon: Euro,
      illustration: "/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png" // Celebration figures
    },
    {
      title: "SÉCURITÉ MAXIMALE",
      advantage: "Données cryptées et conformité RGPD totale",
      description: "Protection et confidentialité garanties",
      icon: Shield,
      illustration: null // Keep shield/security icon only
    },
    {
      title: "SUPPORT EXPERT",
      advantage: "Accompagnement humain à chaque étape",
      description: "Conseillers juridiques disponibles",
      icon: Users,
      illustration: "/lovable-uploads/8ccf8709-45bb-4bb5-bc25-14595b39de8d.png" // Couple illustration
    },
    {
      title: "SUIVI TEMPS RÉEL",
      advantage: "Notifications instantanées vs emails sporadiques",
      description: "Vous savez toujours où en est votre dossier",
      icon: Zap,
      illustration: "/lovable-uploads/7e7f74c1-8f7c-4800-b9f0-be37d9e343e9.png" // Different chart/analytics illustration
    }
  ];

  return (
    <section className="bg-background py-20 lg:py-32" id="pourquoi-nous">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Pourquoi RCS Express bat tous les concurrents
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comparaison objective avec LegalPlace et autres plateformes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {comparisons.map((comparison, index) => {
            const IconComponent = comparison.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gallery-style 3D illustration background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* 3D Illustration as elegant icon */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy/5 to-navy/10 group-hover:from-navy/10 group-hover:to-navy/20 transition-all duration-500"></div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      {comparison.illustration ? (
                        <img 
                          src={comparison.illustration}
                          alt={`3D illustration for ${comparison.title}`}
                          className="w-12 h-12 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <IconComponent className="w-12 h-12 text-navy group-hover:scale-110 transition-transform duration-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Icon overlay for technical clarity */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-navy rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="relative space-y-6">
                  {/* Title */}
                  <h3 className="font-bold text-foreground text-xl lg:text-2xl tracking-tight">
                    {comparison.title}
                  </h3>

                  {/* Advantage with checkmark */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-institutional/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-institutional" />
                      </div>
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        {comparison.advantage}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                      {comparison.description}
                    </p>
                  </div>
                </div>

                {/* Premium hover indicator */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-institutional rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced trust badge */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-institutional/5 via-institutional/10 to-institutional/5 border border-institutional/20 rounded-2xl px-10 py-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-8 h-8 bg-institutional/10 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-institutional" />
            </div>
            <span className="text-institutional font-semibold text-lg tracking-wide">
              Rejoignez les 300,000+ entrepreneurs qui nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};