import { Button } from "@/components/ui/button";
import { Mail, Zap, Truck, Check } from "lucide-react";

export const ModernServices = () => {
  const services = [
    {
      icon: Mail,
      name: "Standard",
      delivery: "Livraison rapide par email",
      features: ["Email dans les 4h", "PDF certifié", "Support inclus"],
      popular: false
    },
    {
      icon: Zap,
      name: "Express",
      delivery: "Livraison prioritaire",
      features: ["Email dans les 2h", "Support premium", "Garantie rapidité"],
      popular: true
    },
    {
      icon: Truck,
      name: "Postal",
      delivery: "Envoi courrier traditionnel",
      features: ["48h maximum", "Original papier", "Certifié authentique"],
      popular: false
    }
  ];

  return (
    <section className="section-modern bg-white">
      <div className="container-modern">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choisissez votre service
          </h2>
          <p className="text-large text-muted-foreground">
            Tous nos extraits KBIS sont officiels et acceptés par toutes les administrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="relative">
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </div>
                  </div>
                )}
                
                <div className={`card-modern ${service.popular ? 'ring-2 ring-primary/20' : ''}`}>
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        service.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'
                      }`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-feature text-muted-foreground mb-8">
                      {service.delivery}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-feature text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${
                        service.popular 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                      size="lg"
                    >
                      Choisir
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};