import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, Truck, Zap, CheckCircle, Star, Shield } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      name: "KBIS Standard",
      subtitle: "Livraison rapide par email",
      features: [
        "Livraison par email sous 4h",
        "Document PDF officiel",
        "Support client inclus",
        "Garantie remboursement"
      ],
      deliveryTime: "4h",
      icon: Mail,
      badge: "Populaire",
      popular: false
    },
    {
      name: "KBIS Express",
      subtitle: "Livraison prioritaire",
      features: [
        "Livraison par email sous 2h",
        "Traitement prioritaire",
        "Support téléphonique",
        "Garantie 100% remboursé"
      ],
      deliveryTime: "2h",
      icon: Zap,
      badge: "Recommandé",
      popular: true
    },
    {
      name: "KBIS Postal",
      subtitle: "Envoi courrier traditionnel",
      features: [
        "Document papier original",
        "Envoi sous 48h",
        "Suivi de livraison",
        "Support client premium"
      ],
      deliveryTime: "48h",
      icon: Truck,
      badge: "Officiel",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nos Services KBIS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choisissez le service qui correspond à vos besoins.
            Tous nos extraits KBIS sont officiels et certifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`relative p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                service.popular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground px-4 py-1 text-sm font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    {service.badge}
                  </Badge>
                </div>
              )}

              {!service.popular && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="outline" className="text-xs">
                    {service.badge}
                  </Badge>
                </div>
              )}

              <div className="text-center space-y-6">
                {/* Icon & Delivery Time */}
                <div className="space-y-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
                    service.popular 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">Livraison {service.deliveryTime}</span>
                  </div>
                </div>

                {/* Service Name */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {service.subtitle}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full mt-8 ${
                    service.popular 
                      ? 'bg-primary hover:bg-primary-glow text-primary-foreground font-semibold' 
                      : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  Commander maintenant
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 p-6 bg-card border border-border rounded-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-success" />
            <span className="font-semibold text-primary">Garantie 100% Remboursé</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Si nous ne livrons pas votre KBIS dans les délais annoncés, nous vous remboursons intégralement.
            Aucune condition, aucune question posée.
          </p>
        </div>
      </div>
    </section>
  );
};