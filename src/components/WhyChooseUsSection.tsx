import { CheckCircle, Shield, Phone, Zap } from "lucide-react";

export const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Zap,
      title: "RAPIDITÉ",
      subtitle: "Livraison ultra-rapide",
      description: "Recevez votre KBIS en 2 heures maximum. Le service le plus rapide de France.",
      highlight: "Express"
    },
    {
      icon: Shield,
      title: "SÉCURITÉ", 
      subtitle: "SSL + RGPD + Certifié",
      description: "Vos données sont protégées selon les standards les plus élevés. Documents officiels garantis.",
      highlight: "Certifié"
    },
    {
      icon: Phone,
      title: "SUPPORT",
      subtitle: "7j/7 en français",
      description: "Une équipe dédiée vous accompagne du lundi au dimanche. Support téléphonique gratuit.",
      highlight: "Premium"
    },
    {
      icon: CheckCircle,
      title: "QUALITÉ",
      subtitle: "Documents officiels",
      description: "Extraits KBIS authentiques issus directement du registre du commerce et des sociétés.",
      highlight: "Officiel"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Pourquoi choisir KBIS Express ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Le leader français de l'obtention d'extraits KBIS en ligne.
            Plus de 50,000 entrepreneurs nous font confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3 left-6">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {feature.highlight}
                </span>
              </div>

              <div className="text-center space-y-4">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-secondary mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 pt-12 border-t border-border/30">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            <div className="text-sm text-muted-foreground font-medium">Certifié RGPD</div>
            <div className="text-sm text-muted-foreground font-medium">SSL 256-bit</div>
            <div className="text-sm text-muted-foreground font-medium">4.9/5 sur Trustpilot</div>
            <div className="text-sm text-muted-foreground font-medium">Service Premium</div>
          </div>
        </div>
      </div>
    </section>
  );
};