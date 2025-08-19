import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sophie Dubois",
      role: "Fondatrice, Tech Startup",
      avatar: "SD",
      rating: 5,
      content: "Service incroyable ! J'ai reçu mon KBIS en 1h30 alors que je m'attendais à 2h. Le support client est exceptionnel et répond immédiatement. Je recommande vivement !",
      highlight: "Livraison ultra-rapide"
    },
    {
      name: "Marc Laurent",
      role: "Dirigeant, Import-Export",
      avatar: "ML",
      rating: 5,
      content: "Après avoir testé 3 autres services, KBIS Express est de loin le meilleur. Prix transparent, pas de frais cachés, et surtout un vrai gain de temps pour mon entreprise.",
      highlight: "Prix transparent"
    },
    {
      name: "Amélie Martin",
      role: "Consultante Indépendante",
      avatar: "AM",
      rating: 5,
      content: "J'ai utilisé leur service Express un dimanche soir et j'ai reçu mon KBIS en 2h chrono ! Même le weekend, ils assurent. Service client français et très professionnel.",
      highlight: "Support 7j/7"
    },
    {
      name: "Thomas Rousseau",
      role: "CEO, E-commerce",
      avatar: "TR",
      rating: 5,
      content: "Plus de 50 KBIS commandés via leur plateforme pour mes différentes sociétés. Jamais eu aucun problème, toujours dans les temps. C'est devenu mon service de référence.",
      highlight: "Fiabilité totale"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plus de 50,000 entrepreneurs nous font confiance pour obtenir leurs extraits KBIS.
            Découvrez pourquoi ils nous recommandent.
          </p>
          
          {/* Trust Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="font-semibold text-primary">4.9/5</span>
            </div>
            <div className="text-muted-foreground">•</div>
            <div className="text-sm font-medium text-muted-foreground">
              Plus de 2,500 avis Trustpilot
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/30"
            >
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-foreground leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Highlight */}
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="w-3 h-3" />
                  {testimonial.highlight}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Rejoignez nos 50,000+ clients satisfaits
            </h3>
            <p className="text-muted-foreground mb-6">
              Obtenez votre KBIS en 2 heures et découvrez pourquoi nous sommes le leader français.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                Commander maintenant
              </button>
              <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Voir tous les avis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};