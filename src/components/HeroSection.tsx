import { Button } from "@/components/ui/button";
import { Building2, Star, ArrowRight, Briefcase, Car, ShoppingCart, Bike, Utensils, Home, MoreHorizontal, UserCheck, Wrench, HandHeart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  // Activity types for the hero section
  const activityTypes = [
    { name: "Consultants & freelance", icon: Briefcase },
    { name: "Construction & travaux", icon: Wrench },
    { name: "Automobile & transport", icon: Car },
    { name: "Vente en ligne", icon: ShoppingCart },
    { name: "Commerce", icon: Building2 },
    { name: "Coursier à vélo", icon: Bike },
    { name: "Achat & revente", icon: TrendingUp },
    { name: "Services aux entreprises", icon: UserCheck },
    { name: "Services à la personne", icon: HandHeart },
    { name: "Restauration", icon: Utensils },
    { name: "SCI", icon: Home },
    { name: "Autres", icon: MoreHorizontal }
  ];

  return (
    <section className="bg-gradient-to-br from-background via-primary-light/30 to-background py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                Créez votre <span className="text-primary">entreprise</span> ultra rapidement dès 0€ !
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground/90 font-medium leading-relaxed max-w-2xl">
                Accompagnement personnalisé par un juriste dédié jusqu'à l'obtention du Kbis.
              </p>
            </div>

            {/* Activity Selection */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                Quel sera votre domaine d'activité ?
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activityTypes.slice(0, 8).map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div 
                      key={activity.name}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                      onClick={() => navigate('/choisir-statut')}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors leading-tight">
                          {activity.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg" 
                className="btn-administrative text-lg px-10 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[56px] w-full sm:w-auto"
              >
                Commencer mon inscription RCS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="btn-administrative-outline text-lg px-8 py-6 min-h-[56px] w-full sm:w-auto"
                onClick={() => {
                  const processSection = document.querySelector('#process');
                  processSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comment ça marche ?
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-base font-bold text-foreground">4.5/5</span>
                </div>
                <div className="text-base text-muted-foreground">
                  <span className="font-bold text-foreground">Excellent</span> 4.4 sur 5 ⭐ Trustpilot
                </div>
              </div>

              <div className="text-base text-muted-foreground">
                <span className="font-bold text-foreground text-lg">+300 000</span> sociétés accompagnées par InscriptionRCS
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Illustration */}
          <div className="relative animate-fade-in">
            <div className="bg-gradient-to-br from-primary/15 via-primary-light/40 to-primary/5 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
              <div className="max-w-[450px] mx-auto p-6">
                <div className="text-center space-y-8">
                  <div className="relative animate-float">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                    <img 
                      src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/too-blk-stairs.jpg.png"
                      alt="Deux personnages en escalade symbolisant l'accompagnement vers la création d'entreprise"
                      className="w-full h-80 object-contain mx-auto rounded-2xl shadow-lg relative z-10 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Votre entreprise</h3>
                    <p className="text-lg text-muted-foreground font-medium">créée en quelques clics</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-glow/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};