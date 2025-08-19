import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sophie Dubois",
      role: "Fondatrice Tech Startup",
      avatar: "👤",
      rating: 5,
      text: "Service incroyable ! J'ai reçu mon KBIS en 1h30 alors que je m'attendais à 2h. Le support client est exceptionnel et répond immédiatement. Je recommande vivement !",
      result: "Reçu en 1h30"
    },
    {
      name: "Marc Laurent", 
      role: "Dirigeant Import-Export",
      avatar: "👤",
      rating: 5,
      text: "Après avoir testé 3 autres services, KBIS Express est de loin le meilleur. Prix transparent, pas de frais cachés, et surtout un vrai gain de temps pour mon entreprise.",
      result: "Économie de temps"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-brand-blue">4.9/5</span>
          </div>
          <p className="text-lg text-gray-600">
            Plus de 2,500 avis Trustpilot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {testimonial.result}
                    </span>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold text-brand-blue">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              Voir tous les avis
            </Button>
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
              Commander maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};