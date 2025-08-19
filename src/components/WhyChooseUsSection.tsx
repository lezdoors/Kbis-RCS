import { Zap, Shield, Phone, CheckCircle } from "lucide-react";

export const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Zap,
      title: "RAPIDITÉ",
      highlight: "2h maximum",
      description: "Le service le plus rapide de France"
    },
    {
      icon: Shield,
      title: "SÉCURITÉ", 
      highlight: "SSL + RGPD",
      description: "Vos données protégées selon les standards"
    },
    {
      icon: Phone,
      title: "SUPPORT",
      highlight: "7j/7 en français",
      description: "Équipe dédiée disponible"
    },
    {
      icon: CheckCircle,
      title: "QUALITÉ",
      highlight: "Documents officiels",
      description: "Conformes au RCS"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Le leader français de l'obtention d'extraits KBIS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-brand-blue" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-brand-blue mb-2">
                    {feature.title}
                  </h3>
                  
                  <div className="text-brand-red font-semibold mb-2">
                    {feature.highlight}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-brand-blue/5 px-6 py-3 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-brand-blue font-semibold">
              Plus de 50,000 entrepreneurs nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};