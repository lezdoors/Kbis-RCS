import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Mail, Phone, Truck } from "lucide-react";

export const KBISPricingSection = () => {
  const pricingTiers = [
    {
      name: "STANDARD",
      price: "€39",
      delivery: "4h par email",
      popular: false,
      features: [
        "Document certifié",
        "Support email",
        "Livraison garantie",
        "Format PDF officiel"
      ],
      icon: <Mail className="h-5 w-5" />,
      description: "Parfait pour la plupart des besoins"
    },
    {
      name: "EXPRESS",
      price: "€59",
      delivery: "2h par email", 
      popular: true,
      features: [
        "Document certifié",
        "Support prioritaire",
        "Urgence garantie",
        "Format PDF officiel",
        "Livraison ultra-rapide"
      ],
      icon: <Clock className="h-5 w-5" />,
      description: "Pour les demandes urgentes"
    },
    {
      name: "POSTAL",
      price: "+€5",
      delivery: "Envoi courrier 48h",
      popular: false,
      features: [
        "Document certifié",
        "Support email", 
        "Original papier",
        "Courrier suivi",
        "Valeur légale renforcée"
      ],
      icon: <Truck className="h-5 w-5" />,
      description: "Document papier officiel"
    },
    {
      name: "ABONNEMENT",
      price: "€29/mois",
      delivery: "KBIS tous les 3 mois",
      popular: false,
      features: [
        "Toujours à jour",
        "Support premium",
        "Résiliation libre",
        "Alerte changements",
        "Économies garanties"
      ],
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Pour un suivi régulier"
    }
  ];

  return (
    <section id="tarifs" className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Nos Tarifs KBIS
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choisissez l'option qui correspond le mieux à vos besoins.
              Tous nos services incluent des documents certifiés et un support expert.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative border-2 transition-all duration-300 hover:scale-105 ${
                  tier.popular 
                    ? 'border-destructive bg-destructive/5 shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-destructive text-white px-3 py-1">
                      POPULAIRE
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      {tier.icon}
                      <h3 className="font-bold text-sm tracking-wide">
                        {tier.name}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className={`text-3xl font-bold ${tier.popular ? 'text-destructive' : 'text-primary'}`}>
                        {tier.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tier.delivery}
                      </div>
                      <div className="text-xs text-muted-foreground italic">
                        {tier.description}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-destructive hover:bg-destructive/90 text-white' 
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    }`}
                  >
                    {tier.name === "ABONNEMENT" ? "S'abonner" : "Commander"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Competitor Comparison */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary mb-2">
                💡 Compétiteurs vs KBIS Express
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="font-semibold text-muted-foreground">kbis.services</div>
                <div className="text-lg font-bold text-red-500">€49.90</div>
                <div className="text-sm text-muted-foreground">24h</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-muted-foreground">extrait-kbis.net</div>
                <div className="text-lg font-bold text-red-500">€49</div>
                <div className="text-sm text-muted-foreground">24h</div>
              </div>
              <div className="space-y-1 bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <div className="font-semibold text-destructive">KBIS Express</div>
                <div className="text-lg font-bold text-destructive">€39-59</div>
                <div className="text-sm text-destructive">2-4h ⚡</div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <Badge variant="outline" className="text-destructive border-destructive">
                ➜ KBIS Express: Meilleur prix + Service premium
              </Badge>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Besoin d'aide pour choisir ? Notre équipe est là pour vous conseiller.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                01 XX XX XX XX
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Support Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};