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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Créez votre <span className="text-primary">entreprise</span> ultra rapidement dès 0€ !
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Accompagnement personnalisé par un juriste dédié jusqu'à l'obtention du Kbis.
              </p>
            </div>

            {/* Activity Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Quel sera votre domaine d'activité ?
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activityTypes.slice(0, 8).map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div 
                      key={activity.name}
                      className="group bg-white border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => navigate('/choisir-statut')}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground text-center group-hover:text-primary transition-colors">
                          {activity.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.5/5</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Excellent</span> 4.4 sur 5 ⭐ Trustpilot
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+300 000</span> sociétés accompagnées par InscriptionRCS
            </div>

            {/* CTA Button */}
            <Button 
              onClick={() => navigate('/choisir-statut')} 
              size="lg" 
              className="btn-administrative text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Commencer mon inscription RCS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="w-16 h-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Votre entreprise</h3>
                  <p className="text-muted-foreground">créée en quelques clics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};