import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, CheckCircle } from "lucide-react";
export const LegalStructuresSection = () => {
  const legalStructures = [{
    name: "SASU",
    fullName: "Société par Actions Simplifiée Unipersonnelle",
    description: "Structure juridique pour entrepreneur individuel",
    icon: Building2,
    advantages: ["Responsabilité limitée", "Statut de dirigeant", "Flexibilité juridique"]
  }, {
    name: "SARL",
    fullName: "Société à Responsabilité Limitée",
    description: "Structure pour plusieurs associés",
    icon: Users,
    advantages: ["Répartition des parts", "Gestion collective", "Sécurité juridique"]
  }, {
    name: "EURL",
    fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
    description: "Version individuelle de la SARL",
    icon: FileText,
    advantages: ["Protection du patrimoine", "Option fiscale", "Simplicité de gestion"]
  }, {
    name: "SAS",
    fullName: "Société par Actions Simplifiée",
    description: "Structure flexible pour associés multiples",
    icon: Building2,
    advantages: ["Liberté statutaire", "Entrée d'investisseurs", "Organes dirigeants"]
  }, {
    name: "Micro-entreprise",
    fullName: "Régime micro-entrepreneur",
    description: "Régime simplifié pour débuter",
    icon: FileText,
    advantages: ["Formalités allégées", "Comptabilité simple", "Démarrage rapide"]
  }];
  return <section className="bg-muted/30 py-20 lg:py-24" id="structures-juridiques">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Structures juridiques disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choisissez la forme juridique qui correspond le mieux à votre projet
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {legalStructures.map((structure, index) => {
            const IconComponent = structure.icon;
            return <Card key={index} className="border-0 shadow-sm bg-background">
              <CardHeader className="pb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-navy" />
                    </div>
                    <Badge variant="outline" className="text-navy border-navy/30 bg-navy/5">
                      {structure.name}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-foreground">
                      {structure.fullName}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {structure.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground text-sm">Avantages principaux :</h4>
                  <ul className="space-y-3">
                    {structure.advantages.map((advantage, advIndex) => 
                      <li key={advIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-institutional mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{advantage}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>;
          })}
        </div>
      </div>
    </section>;
};