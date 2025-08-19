import { Button } from "@/components/ui/button";
import { Mail, Zap, Send, CheckCircle } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      icon: Mail,
      name: "STANDARD",
      type: "email",
      delivery: "Livraison rapide par email",
      features: ["Email 4h", "PDF certifié", "Support inclus"],
      popular: false
    },
    {
      icon: Zap,
      name: "EXPRESS",
      type: "priority",
      delivery: "Livraison prioritaire",
      features: ["Email 2h", "Support premium", "Garantie rapidité"],
      popular: true
    },
    {
      icon: Send,
      name: "POSTAL",
      type: "mail",
      delivery: "Envoi courrier traditionnel",
      features: ["48h maximum", "Original papier", "Certifié authentique"],
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Choisissez votre service
          </h2>
          <p className="text-xl text-gray-600">
            Tous nos extraits KBIS sont officiels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="relative">
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-brand-red text-white px-4 py-1 rounded-full text-sm font-semibold">
                      POPULAIRE
                    </div>
                  </div>
                )}
                
                <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  service.popular ? 'border-brand-red' : 'border-gray-100'
                }`}>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        service.popular ? 'bg-brand-red/10' : 'bg-brand-blue/10'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          service.popular ? 'text-brand-red' : 'text-brand-blue'
                        }`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-blue mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {service.delivery}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full font-semibold ${
                        service.popular 
                          ? 'bg-brand-red hover:bg-brand-red/90 text-white' 
                          : 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                      }`}
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