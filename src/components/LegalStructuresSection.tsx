import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, CheckCircle, TrendingUp, Shield, Zap, Star } from "lucide-react";

export const LegalStructuresSection = () => {
  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      description: "La structure idéale pour l'entrepreneur moderne",
      icon: Building2,
      illustration: "/lovable-uploads/44d3fbcd-ea82-40a6-81b1-53e0f643dd45.png",
      advantages: ["Responsabilité limitée", "Statut de dirigeant assimilé salarié", "Flexibilité statutaire maximale"],
      idealFor: "Freelances, consultants, projets innovants",
      popularity: "★★★★★",
      isRecommended: true
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      description: "L'équilibre parfait entre sécurité et collaboration",
      icon: Users,
      illustration: "/lovable-uploads/8ccf8709-45bb-4bb5-bc25-14595b39de8d.png",
      advantages: ["Répartition des parts équitable", "Gestion démocratique", "Sécurité juridique éprouvée"],
      idealFor: "Projets collaboratifs, PME familiales",
      popularity: "★★★★☆",
      isRecommended: false
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      description: "La simplicité de l'entreprise individuelle protégée",
      icon: FileText,
      illustration: "/lovable-uploads/baefcc3d-696b-4676-a726-7234c1b77f2e.png",
      advantages: ["Protection du patrimoine", "Option fiscale avantageuse", "Simplicité de gestion"],
      idealFor: "Commerces, artisans, professions libérales",
      popularity: "★★★☆☆",
      isRecommended: false
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      description: "Maximum de flexibilité pour vos ambitions",
      icon: TrendingUp,
      illustration: "/lovable-uploads/7e7f74c1-8f7c-4800-b9f0-be37d9e343e9.png",
      advantages: ["Liberté statutaire totale", "Facilite l'entrée d'investisseurs", "Organes dirigeants modulables"],
      idealFor: "Startups, scale-ups, projets d'envergure",
      popularity: "★★★★☆",
      isRecommended: false
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      description: "Le point de départ pour tester votre marché",
      icon: Zap,
      illustration: "/lovable-uploads/5e2630a9-1361-4451-a9dd-3bc0834d859e.png",
      advantages: ["Formalités ultra-allégées", "Comptabilité simplifiée", "Démarrage immédiat"],
      idealFor: "Tests, activités secondaires, petits revenus",
      popularity: "★★★☆☆",
      isRecommended: false
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 lg:py-32" id="structures-juridiques">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-navy/5 border border-navy/20 rounded-full px-6 py-2 mb-4">
            <Shield className="w-4 h-4 text-navy" />
            <span className="text-navy font-medium text-sm tracking-wide">GUIDE EXPERT</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Quelle structure juridique choisir ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Notre guide complet des formes juridiques pour faire le bon choix dès le départ
          </p>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {legalStructures.map((structure, index) => {
            const IconComponent = structure.icon;
            return (
              <Card 
                key={index} 
                className={`group relative border-0 shadow-lg hover:shadow-2xl bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 ${
                  structure.isRecommended ? 'ring-2 ring-institutional/20 bg-gradient-to-br from-white to-institutional/5' : ''
                }`}
              >
                {/* Recommended Badge */}
                {structure.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-institutional text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      ⭐ RECOMMANDÉ
                    </div>
                  </div>
                )}

                {/* Unified Gallery-style 3D illustration */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 mx-auto mb-6 relative">
                    <div className="illustration-3d-compact absolute inset-0">
                      <img 
                        src={structure.illustration}
                        alt={`Illustration 3D pour ${structure.name}`}
                        className="w-full h-full object-contain"
                      />
                      <div className="gallery-signature">
                        RCS COLLECTION
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon overlay */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-navy rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                </div>

                <CardHeader className="p-0 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="outline" 
                        className={`text-navy border-navy/30 bg-navy/5 font-bold text-lg px-4 py-1 ${
                          structure.isRecommended ? 'bg-institutional/10 border-institutional/30 text-institutional' : ''
                        }`}
                      >
                        {structure.name}
                      </Badge>
                      <div className="text-xs text-yellow-500 font-medium">
                        {structure.popularity}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <CardTitle className="text-xl font-bold text-foreground leading-tight">
                        {structure.fullName}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-muted-foreground">
                        {structure.description}
                      </CardDescription>
                      <div className="flex items-center space-x-2 pt-2">
                        <Star className="w-4 h-4 text-institutional" />
                        <span className="text-sm font-medium text-institutional">
                          {structure.idealFor}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="space-y-5">
                    <h4 className="font-bold text-foreground text-base border-b border-gray-100 pb-2">
                      Avantages clés :
                    </h4>
                    <ul className="space-y-3">
                      {structure.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className="flex items-start space-x-3 group/item">
                          <div className="w-5 h-5 bg-institutional/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-institutional/20 transition-colors duration-200">
                            <CheckCircle className="w-3 h-3 text-institutional" />
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {advantage}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Consultation CTA */}
                    <div className="pt-4 border-t border-gray-100">
                      <button className="w-full text-navy hover:text-institutional font-medium text-sm py-2 hover:bg-navy/5 rounded-lg transition-all duration-200">
                        En savoir plus →
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expert Consultation CTA */}
        <div className="text-center mt-20">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Encore des doutes ? Nos experts vous conseillent
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Consultation personnalisée gratuite pour choisir la structure parfaite selon votre situation
              </p>
              <button className="bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Parler à un expert gratuitement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};