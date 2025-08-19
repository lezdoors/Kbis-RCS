import { Search, FileText, Download } from "lucide-react";

export const ModernHowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Recherchez",
      description: "Saisissez le SIREN, SIRET ou nom de votre entreprise dans notre moteur de recherche",
      step: "01"
    },
    {
      icon: FileText,
      title: "Commandez",
      description: "Sélectionnez votre service et procédez au paiement sécurisé en quelques clics",
      step: "02"
    },
    {
      icon: Download,
      title: "Recevez",
      description: "Téléchargez votre extrait KBIS officiel par email dans les 2h maximum",
      step: "03"
    }
  ];

  return (
    <section className="section-modern bg-muted/30">
      <div className="container-modern">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comment ça marche
          </h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et rapide pour obtenir votre extrait KBIS en toute sécurité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px bg-border -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative z-10">
                <div className="card-modern text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-feature text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};