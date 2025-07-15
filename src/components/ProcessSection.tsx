import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProcessSection = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      number: "1",
      title: "Sélection du statut juridique",
      description: "Choisissez la forme juridique adaptée à votre activité",
      duration: "5 minutes"
    },
    {
      number: "2",
      title: "Saisie des informations",
      description: "Complétez le formulaire avec les données de votre entreprise",
      duration: "10 minutes"
    },
    {
      number: "3",
      title: "Validation et transmission",
      description: "Vérification et envoi au registre du commerce compétent",
      duration: "48-72h"
    }
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24" id="comment-ca-marche">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Comment ça marche ?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Illustration */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.number} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Vous complétez le questionnaire.</h3>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nous préparons votre dossier pour qu'il soit conforme.</h3>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nous déposons votre dossier sur le Guichet Unique (INPI).</h3>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nous assurons la gestion des échanges avec le greffe.</h3>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-success rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-success mb-2">Votre entreprise est créée !</h3>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-success rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-success mb-2">Vous pouvez démarrer votre activité !</h3>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/choisir-statut')} 
              size="lg" 
              className="btn-administrative text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};