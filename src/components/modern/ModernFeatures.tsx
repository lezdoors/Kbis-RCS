import { Zap, Shield, Headphones, CheckCircle } from "lucide-react";

export const ModernFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Rapidité",
      description: "Livraison ultra-rapide",
      detail: "Service le plus rapide de France avec livraison garantie en 2h maximum"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "SSL + RGPD + Certifié",
      detail: "Vos données protégées selon les standards européens les plus stricts"
    },
    {
      icon: Headphones,
      title: "Support",
      description: "7j/7 en français",
      detail: "Équipe dédiée disponible tous les jours pour vous accompagner"
    },
    {
      icon: CheckCircle,
      title: "Qualité",
      description: "Documents officiels",
      detail: "Extraits KBIS 100% conformes au RCS et acceptés partout"
    }
  ];

  return (
    <section className="section-modern bg-muted/30">
      <div className="container-modern">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Le leader français de l'obtention d'extraits KBIS
          </h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto">
            Plus de 50,000 entrepreneurs nous font confiance pour obtenir leurs documents officiels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="card-modern text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-feature text-primary font-medium mb-3">
                  {feature.description}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};