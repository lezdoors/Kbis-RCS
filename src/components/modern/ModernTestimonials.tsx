import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ModernTestimonials = () => {
  const testimonials = [
    {
      name: "Sophie Dubois",
      role: "Fondatrice Tech Startup",
      avatar: "SD",
      rating: 5,
      text: "Service incroyable ! J'ai reçu mon KBIS en 1h30 alors que je m'attendais à 2h. Le support client est exceptionnel et répond immédiatement. Je recommande vivement !",
      result: "Reçu en 1h30"
    },
    {
      name: "Marc Laurent", 
      role: "Dirigeant Import-Export",
      avatar: "ML",
      rating: 5,
      text: "Après avoir testé 3 autres services, KBIS Express est de loin le meilleur. Prix transparent, pas de frais cachés, et surtout un vrai gain de temps pour mon entreprise.",
      result: "Économie de temps"
    }
  ];

  return (
    <section className="section-modern bg-white">
      <div className="container-modern">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-3xl font-bold text-foreground">4.9/5</span>
          </div>
          <p className="text-large text-muted-foreground">
            Plus de 2,500 avis Trustpilot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-modern">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-warning">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                      {testimonial.result}
                    </span>
                  </div>
                  
                  <blockquote className="text-feature text-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
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
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="border-border text-foreground hover:bg-muted">
              Voir tous les avis
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Commander maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};