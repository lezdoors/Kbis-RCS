import { Shield, Clock, Users, Phone, Mail } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Conformité aux exigences légales",
      description: "Traitement conforme à la réglementation en vigueur",
      icon: Shield
    },
    {
      title: "Traitement par experts certifiés",
      description: "Dossier traité par des professionnels agréés",
      icon: Users
    },
    {
      title: "Délais de traitement garantis",
      description: "Respect des délais annoncés pour votre immatriculation",
      icon: Clock
    },
    {
      title: "Sécurité des données personnelles",
      description: "Protection et confidentialité de vos informations",
      icon: Shield
    },
    {
      title: "Accompagnement personnalisé",
      description: "Support téléphonique pendant tout le processus",
      icon: Phone
    },
    {
      title: "Service après-vente inclus",
      description: "Assistance post-création pour vos démarches",
      icon: Mail
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" id="pourquoi-nous">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Pourquoi InscriptionRCS ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une solution complète et sécurisée pour créer votre entreprise en toute sérénité
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left - Professional illustration */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <img 
              src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/Toon-blk-tie.jpg.png"
              alt="Personnage professionnel avec cravate illustrant la fiabilité du service"
              className="w-full max-w-[180px] mx-auto lg:mx-0 object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Right - Benefits grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="group bg-white border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};