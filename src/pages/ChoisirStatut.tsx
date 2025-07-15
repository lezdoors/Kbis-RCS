import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowLeft, CheckCircle, Info, Users, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChoisirStatut = () => {
  const navigate = useNavigate();

  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      price: "129€",
      description: "Idéal pour entreprendre seul avec flexibilité",
      pros: [
        "Responsabilité limitée au capital",
        "Statut assimilé salarié du dirigeant",
        "Grande liberté dans la rédaction des statuts",
        "Facilité d'évolution vers SAS"
      ],
      cons: [
        "Obligations comptables importantes",
        "Formalités de création plus complexes",
        "Charges sociales élevées"
      ],
      target: "Créateurs souhaitant entreprendre seuls avec une structure évolutive",
      route: "/inscription/societe/1"
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      price: "129€",
      description: "Structure classique pour plusieurs associés",
      pros: [
        "Responsabilité limitée des associés",
        "Statut social avantageux du gérant majoritaire",
        "Structure rassurante pour les partenaires",
        "Régime fiscal souple"
      ],
      cons: [
        "Fonctionnement plus rigide que la SAS",
        "Cessions de parts soumises à formalités",
        "Minimum 2 associés requis"
      ],
      target: "Projets à plusieurs associés cherchant la sécurité juridique",
      route: "/inscription/societe/1"
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      price: "129€",
      description: "Version unipersonnelle de la SARL",
      pros: [
        "Responsabilité limitée",
        "Possibilité d'opter pour l'IS",
        "Protection du patrimoine personnel",
        "Évolution possible vers SARL"
      ],
      cons: [
        "Gérant majoritaire = statut TNS",
        "Formalités comptables obligatoires",
        "Moins de flexibilité que la SASU"
      ],
      target: "Entrepreneurs individuels souhaitant limiter leur responsabilité",
      route: "/inscription/societe/1"
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      price: "129€",
      description: "Flexibilité maximale pour les associés",
      pros: [
        "Grande liberté statutaire",
        "Statut assimilé salarié des dirigeants",
        "Facilité d'entrée d'investisseurs",
        "Responsabilité limitée"
      ],
      cons: [
        "Formalités de création complexes",
        "Coût de fonctionnement élevé",
        "Obligations comptables lourdes"
      ],
      target: "Projets innovants ou à fort potentiel de développement",
      route: "/inscription/societe/1"
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      price: "79€",
      description: "Simple et rapide pour débuter",
      pros: [
        "Formalités simplifiées",
        "Comptabilité allégée",
        "Exonération de TVA",
        "Cotisations sociales proportionnelles"
      ],
      cons: [
        "Chiffre d'affaires plafonné",
        "Responsabilité illimitée",
        "Difficultés pour obtenir des financements"
      ],
      target: "Activités de service, commerciales ou artisanales en début d'activité",
      route: "/inscription/micro/1"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-max flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">RCS Express</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted border-b">
        <div className="container-max">
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Étape 1/6</span>
              <span className="text-sm text-muted-foreground">Choix du statut juridique</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '16.66%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl md:text-4xl font-bold">Choisissez votre statut juridique</h1>
              <p className="text-xl text-muted-foreground">
                Sélectionnez la structure la plus adaptée à votre projet entrepreneurial
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalStructures.map((structure) => (
              <Card 
                key={structure.name}
                className="card-elegant hover-lift cursor-pointer border-2 hover:border-primary transition-all duration-300 h-full"
                onClick={() => {
                  // Store selected structure in localStorage for form
                  localStorage.setItem('selectedStructure', JSON.stringify(structure));
                  navigate(structure.route);
                }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{structure.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {structure.fullName}
                  </CardDescription>
                  <Badge variant="outline" className="text-lg font-semibold px-4 py-2 mt-4">
                    {structure.price}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-center text-muted-foreground font-medium">
                    {structure.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-success mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Avantages
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {structure.pros.slice(0, 3).map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-success mr-2">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-warning mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Points d'attention
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {structure.cons.slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-warning mr-2">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        Idéal pour
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {structure.target}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.setItem('selectedStructure', JSON.stringify(structure));
                      navigate(structure.route);
                    }}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Choisir {structure.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <Card className="card-elegant p-8 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Info className="h-6 w-6 mr-2 text-primary" />
                  Besoin d'aide pour choisir ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nos experts sont là pour vous accompagner dans le choix de votre statut juridique.
                  Contactez-nous pour un conseil personnalisé et gratuit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    📞 01 23 45 67 89
                  </Button>
                  <Button variant="outline">
                    📧 Nous contacter
                  </Button>
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