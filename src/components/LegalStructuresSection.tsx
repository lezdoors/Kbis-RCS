import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, CheckCircle } from "lucide-react";

export const LegalStructuresSection = () => {
  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      description: "Structure juridique pour entrepreneur individuel",
      icon: Building2,
      advantages: ["Responsabilité limitée", "Statut de dirigeant", "Flexibilité juridique"]
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      description: "Structure pour plusieurs associés",
      icon: Users,
      advantages: ["Répartition des parts", "Gestion collective", "Sécurité juridique"]
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      description: "Version individuelle de la SARL",
      icon: FileText,
      advantages: ["Protection du patrimoine", "Option fiscale", "Simplicité de gestion"]
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      description: "Structure flexible pour associés multiples",
      icon: Building2,
      advantages: ["Liberté statutaire", "Entrée d'investisseurs", "Organes dirigeants"]
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      description: "Régime simplifié pour débuter",
      icon: FileText,
      advantages: ["Formalités allégées", "Comptabilité simple", "Démarrage rapide"]
    }
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24" id="structures-juridiques">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Structures juridiques disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choisissez la forme juridique qui correspond le mieux à votre projet
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left - Illustration */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center lg:justify-start">
            <img 
              src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/Toon-green-pie.jpg.png"
              alt="Diagramme circulaire symbolisant la répartition des statuts juridiques"
              className="w-full max-w-[240px] h-60 object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Right - Legal structures grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {legalStructures.map((structure, index) => {
                const IconComponent = structure.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-primary border-primary">
                          {structure.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {structure.fullName}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {structure.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground text-sm">Avantages :</h4>
                        <ul className="space-y-2">
                          {structure.advantages.map((advantage, advIndex) => (
                            <li key={advIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-sm text-muted-foreground">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};