import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Shield, CheckCircle, Zap, Users, Star } from "lucide-react";

export const KBISTrustSection = () => {
  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-destructive" />,
      title: "RAPIDITÉ",
      subtitle: "2 heures",
      description: "vs 24h marché",
      highlight: "Express garanti"
    },
    {
      icon: <Euro className="h-8 w-8 text-secondary" />,
      title: "PRIX",
      subtitle: "Dès €39",
      description: "vs €49+ autres",
      highlight: "Meilleur prix"
    },
    {
      icon: <Shield className="h-8 w-8 text-success" />,
      title: "SÉCURITÉ",
      subtitle: "Certifié SSL",
      description: "Données RGPD",
      highlight: "100% sécurisé"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "SUPPORT",
      subtitle: "7j/7",
      description: "Chat & tél",
      highlight: "Support expert"
    }
  ];

  const competitors = [
    { name: "kbis.services", price: "€49.90", delivery: "24h" },
    { name: "extrait-kbis.net", price: "€49", delivery: "24h" },
    { name: "infogreffe.fr", price: "€3.37", delivery: "officiel", note: "Procédure complexe" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Title */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Pourquoi choisir KBIS Express ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Le service KBIS le plus rapide et le plus abordable de France
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    {benefit.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-primary text-sm tracking-wide">
                      {benefit.title}
                    </h3>
                    <div className="text-2xl font-bold text-foreground">
                      {benefit.subtitle}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {benefit.description}
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {benefit.highlight}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Comparaison avec la concurrence
              </h3>
              <p className="text-muted-foreground">
                KBIS Express offre le meilleur rapport qualité-prix du marché
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* KBIS Express (Featured) */}
              <Card className="relative border-2 border-destructive bg-destructive/5">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-destructive text-white">
                    <Star className="w-3 h-3 mr-1" />
                    RECOMMANDÉ
                  </Badge>
                </div>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-destructive">KBIS Express</h4>
                    <div className="text-3xl font-bold text-destructive">€39</div>
                    <div className="text-sm text-muted-foreground">Livraison 2h</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Document certifié</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Support premium</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Garantie 2h</span>
                    </div>
                  </div>
                  <Button className="w-full bg-destructive hover:bg-destructive/90">
                    Choisir
                  </Button>
                </CardContent>
              </Card>

              {/* Competitors */}
              {competitors.map((competitor, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground text-sm">
                        {competitor.name}
                      </h4>
                      <div className="text-2xl font-bold text-muted-foreground">
                        {competitor.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {competitor.delivery}
                      </div>
                    </div>
                    {competitor.note && (
                      <Badge variant="secondary" className="text-xs">
                        {competitor.note}
                      </Badge>
                    )}
                    <Button variant="outline" className="w-full" disabled>
                      Moins avantageux
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong>KBIS Express :</strong> Meilleur prix + Service premium = 
                <span className="text-destructive font-semibold"> Le choix intelligent</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};