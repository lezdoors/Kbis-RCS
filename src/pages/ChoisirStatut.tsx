import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowLeft, CheckCircle, Info, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChoisirStatut = () => {
  const navigate = useNavigate();

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
      {/* Official Administrative Header */}
      <header className="header-administrative">
        <div className="container-administrative">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground">RCS Express</span>
                <span className="text-xs text-muted-foreground">Service agréé</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')} className="btn-administrative-outline">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-secondary border-b border-border">
        <div className="container-administrative">
          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Étape 1 sur 6</span>
              <span className="text-sm text-muted-foreground">Choix du statut juridique</span>
            </div>
            <div className="progress-administrative">
              <div className="progress-bar-administrative" style={{ width: '16.66%' }}></div>
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

      {/* Main Content */}
      <section className="section-administrative">
        <div className="container-administrative">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-6 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Sélection du statut juridique
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choisissez la forme juridique la plus adaptée à votre projet entrepreneurial
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {legalStructures.map((structure) => (
              <Card 
                key={structure.name}
                className="card-administrative cursor-pointer hover-administrative transition-all duration-200 h-full"
                onClick={() => {
                  localStorage.setItem('selectedStructure', JSON.stringify(structure));
                  navigate(structure.route);
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-sm flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{structure.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {structure.fullName}
                  </CardDescription>
                  <Badge className="bg-primary text-primary-foreground text-base font-semibold px-4 py-1 mt-3">
                    {structure.price} TTC
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-center text-muted-foreground text-sm font-medium">
                    {structure.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-success mb-3 flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Avantages principaux
                      </h4>
                      <ul className="space-y-1.5">
                        {structure.pros.slice(0, 3).map((pro, index) => (
                          <li key={index} className="flex items-start text-xs text-muted-foreground">
                            <span className="text-success mr-2 mt-0.5">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-warning mb-3 flex items-center text-sm">
                        <Info className="h-4 w-4 mr-2" />
                        Points d'attention
                      </h4>
                      <ul className="space-y-1.5">
                        {structure.cons.slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-start text-xs text-muted-foreground">
                            <span className="text-warning mr-2 mt-0.5">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/30 border border-border rounded-sm p-3">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        Recommandé pour
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {structure.target}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full btn-administrative text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.setItem('selectedStructure', JSON.stringify(structure));
                      navigate(structure.route);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Sélectionner {structure.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Official Help Section */}
          <div className="mt-16 text-center">
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
    </div>
  );
};

export default ChoisirStatut;