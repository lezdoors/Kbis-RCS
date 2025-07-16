import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Building2, ArrowLeft, CheckCircle, Info, Users, FileText, Lightbulb, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const ChoisirStatut = () => {
  const navigate = useNavigate();
  const [recommendedStructure] = useState("SASU");

  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      price: "129€",
      description: "Structure juridique pour entrepreneur individuel avec responsabilité limitée",
      pros: [
        "Responsabilité limitée au capital social",
        "Statut de dirigeant assimilé salarié",
        "Grande liberté dans la rédaction des statuts",
        "Évolution possible vers SAS"
      ],
      cons: [
        "Obligations comptables importantes",
        "Formalités de création plus complexes",
        "Charges sociales élevées sur les rémunérations"
      ],
      target: "Créateurs souhaitant entreprendre seuls avec une structure évolutive et protectrice",
      route: "/inscription/societe/1"
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      price: "129€",
      description: "Structure classique et sécurisante pour plusieurs associés",
      pros: [
        "Responsabilité limitée des associés",
        "Statut social avantageux du gérant majoritaire",
        "Structure rassurante pour les partenaires",
        "Régime fiscal souple (IR ou IS)"
      ],
      cons: [
        "Fonctionnement plus rigide que la SAS",
        "Cessions de parts soumises à formalités",
        "Minimum 2 associés requis pour la création"
      ],
      target: "Projets entrepreneuriaux à plusieurs associés cherchant la sécurité juridique",
      route: "/inscription/societe/1"
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      price: "129€",
      description: "Version unipersonnelle de la SARL, idéale pour protéger son patrimoine",
      pros: [
        "Responsabilité limitée au capital",
        "Possibilité d'opter pour l'impôt sur les sociétés",
        "Protection du patrimoine personnel",
        "Évolution possible vers SARL"
      ],
      cons: [
        "Gérant majoritaire = statut de travailleur non salarié",
        "Formalités comptables obligatoires",
        "Moins de flexibilité que la SASU"
      ],
      target: "Entrepreneurs individuels souhaitant limiter leur responsabilité personnelle",
      route: "/inscription/societe/1"
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      price: "129€",
      description: "Structure offrant une flexibilité maximale pour les associés multiples",
      pros: [
        "Grande liberté dans l'organisation statutaire",
        "Statut assimilé salarié des dirigeants",
        "Facilité d'entrée d'investisseurs externes",
        "Responsabilité limitée au capital"
      ],
      cons: [
        "Formalités de création plus complexes",
        "Coût de fonctionnement généralement élevé",
        "Obligations comptables et administratives lourdes"
      ],
      target: "Projets innovants ou à fort potentiel de développement nécessitant des investissements",
      route: "/inscription/societe/1"
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      price: "79€",
      description: "Régime simplifié pour débuter une activité avec des contraintes allégées",
      pros: [
        "Formalités de création très simplifiées",
        "Comptabilité allégée (livre des recettes)",
        "Franchise de TVA possible",
        "Cotisations sociales proportionnelles au chiffre d'affaires"
      ],
      cons: [
        "Chiffre d'affaires plafonné selon l'activité",
        "Responsabilité illimitée de l'entrepreneur",
        "Difficultés pour obtenir des financements bancaires"
      ],
      target: "Activités de service, commerciales ou artisanales en phase de démarrage",
      route: "/inscription/micro/1"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Progress Indicator - Enhanced */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 border-b border-border shadow-sm">
        <div className="container-administrative">
          <div className="py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-primary">Étape 1 sur 6</span>
              <span className="text-sm text-muted-foreground font-medium">Choix du statut juridique</span>
            </div>
            <div className="progress-administrative">
              <div className="progress-bar-administrative animate-pulse" style={{ width: '16.66%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Progression : 16% complété
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container-administrative py-2">
          <nav className="breadcrumb-administrative">
            <span>Accueil</span> &gt; <span className="font-medium">Choix du statut juridique</span>
          </nav>
        </div>
      </div>

      {/* Competitive Header */}
      <section className="bg-background py-12">
        <div className="container-administrative">
          {/* Comparison Banner */}
          <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg text-center font-medium mb-6">
            <Zap className="inline w-4 h-4 mr-1" />
            Création en 24h vs 5 jours chez LegalPlace
          </div>

          {/* Page Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">
              Choisissez la structure optimale en 30 secondes
            </h1>
            <p className="text-xl text-gray-600 text-center mb-2">
              Notre IA recommande la meilleure option pour votre projet
            </p>
            <div className="bg-orange-100 text-orange-800 p-2 rounded-lg text-center font-medium mb-8 inline-block">
              <Zap className="inline w-4 h-4 mr-1" />
              Toutes structures créées en 24h maximum
            </div>
          </div>

          {/* Smart Recommendation Box - Enhanced */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8 max-w-4xl mx-auto shadow-lg animate-fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2 text-lg">🚀 RECOMMANDATION IA PERSONNALISÉE</h3>
                <p className="text-blue-800 mb-4 text-base">
                  Basé sur votre activité SERVICE, nous recommandons une <span className="font-semibold">{recommendedStructure}</span> pour ses avantages fiscaux et sa flexibilité optimale.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-white hover:bg-blue-50 text-blue-600 border-blue-300 font-semibold">
                    Voir pourquoi
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg">
                    Choisir {recommendedStructure} →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-administrative">
        <div className="container-administrative">

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {legalStructures.map((structure) => (
              <div 
                key={structure.name}
                className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full group"
                onClick={() => {
                  trackEvent({ 
                    event_type: ANALYTICS_EVENTS.ENTITY_SELECTED, 
                    entity_type: structure.name 
                  });
                  localStorage.setItem('selectedStructure', JSON.stringify(structure));
                  navigate(structure.route);
                }}
              >
                {/* POPULAIRE Badge for SASU */}
                {structure.name === "SASU" && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    POPULAIRE
                  </div>
                )}

                {/* Speed Indicator */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Zap className="w-3 h-3" />
                  24h
                </div>

                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-4 pt-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Building2 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{structure.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {structure.fullName}
                      </p>
                    </div>

                    {/* Price with Comparison */}
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-green-600">{structure.price} TTC</div>
                      <div className="text-sm text-gray-500">
                        vs <span className="line-through text-red-500">199€ ailleurs</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm underline">
                        Voir exemple de statuts
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-2">
                    <p className="text-center text-muted-foreground leading-relaxed">
                      {structure.description}
                    </p>
                  </div>

                  {/* Benefits & Considerations */}
                  <div className="space-y-4">
                    <div className="bg-success/5 border border-success/20 rounded-2xl p-4">
                      <h4 className="font-semibold text-success mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Avantages principaux
                      </h4>
                      <ul className="space-y-2">
                        {structure.pros.slice(0, 3).map((pro, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4">
                      <h4 className="font-semibold text-warning mb-3 flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Points d'attention
                      </h4>
                      <ul className="space-y-2">
                        {structure.cons.slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Recommandé pour
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {structure.target}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <Button 
                      className="w-full btn-administrative btn-touch-lg text-base btn-ripple"
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorage.setItem('selectedStructure', JSON.stringify(structure));
                        navigate(structure.route);
                      }}
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Sélectionner {structure.name}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Official Help Section */}
          <div id="help-section" className="mt-16 text-center">
            <Card className="form-administrative max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-lg">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Assistance pour le choix du statut
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Nos conseillers juridiques sont disponibles pour vous accompagner dans le choix 
                  de votre statut juridique. Consultation gratuite et sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="btn-administrative-outline text-sm">
                    📞 01 23 45 67 89
                  </Button>
                  <Button variant="outline" className="btn-administrative-outline text-sm">
                    📧 Demander un conseil
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  Service disponible du lundi au vendredi, de 9h00 à 18h00
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ChoisirStatut;