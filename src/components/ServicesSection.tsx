import { Button } from "@/components/ui/button";
import { Mail, Zap, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { OrderFormModal } from "@/components/OrderFormModal";

export const ServicesSection = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const services = [
    {
      icon: Mail,
      name: "Standard",
      price: "39€",
      subtitle: "Livraison rapide par email",
      features: [
        "Livraison en 4h maximum",
        "Document PDF officiel",
        "Support par email"
      ],
      buttonText: "Choisir Standard",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      icon: Zap,
      name: "Express",
      price: "59€",
      subtitle: "Livraison prioritaire",
      features: [
        "Livraison en 2h maximum",
        "Document PDF + SMS notification",
        "Support téléphone prioritaire"
      ],
      buttonText: "Choisir Express",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      icon: Send,
      name: "Postal",
      price: "44€",
      subtitle: "Envoi courrier traditionnel",
      features: [
        "Livraison 48h par courrier",
        "Document papier + PDF",
        "Suivi de livraison inclus"
      ],
      buttonText: "Choisir Postal",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsOrderModalOpen(true);
  };

  return (
    <>
      <section className="py-16 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Choisissez votre service
            </h2>
            <p className="text-xl text-gray-600">
              Tous nos extraits KBIS sont officiels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  
                  <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl h-full flex flex-col ${
                    service.popular 
                      ? 'border-brand-red scale-105 relative z-[1]' 
                      : 'border-gray-100 hover:border-brand-blue/30'
                  }`}>
                    <div className="text-center flex-1">
                      <div className="flex justify-center mb-6">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          service.popular ? 'bg-brand-red/10' : 'bg-brand-blue/10'
                        }`}>
                          <IconComponent className={`w-7 h-7 ${
                            service.popular ? 'text-brand-red' : 'text-brand-blue'
                          }`} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-brand-blue mb-2">
                        {service.name}
                      </h3>
                      
                      <div className="mb-4">
                        <div className={`text-4xl font-bold mb-2 ${
                          service.popular ? 'text-brand-red' : 'text-brand-blue'
                        }`}>
                          {service.price}
                        </div>
                        <p className="text-gray-600 text-base">
                          {service.subtitle}
                        </p>
                      </div>
                      
                      <div className="space-y-4 mb-8 flex-1">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 text-left">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant={service.buttonVariant}
                      onClick={() => handleServiceSelect(service.name)}
                      className={`w-full font-semibold h-12 text-base ${
                        service.popular 
                          ? 'bg-brand-red hover:bg-brand-red/90 text-white border-brand-red' 
                          : service.buttonVariant === 'outline'
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                      }`}
                    >
                      {service.buttonText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      <OrderFormModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedService={selectedService}
      />
    </>
  );
};