import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PolitiqueRGPD = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de Protection des Données (RGPD)</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Responsable du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  RCS Express, société par actions simplifiée au capital de 10 000 €, 
                  immatriculée au RCS de Paris sous le numéro 123 456 789, 
                  dont le siège social est situé 123 Avenue des Champs-Élysées, 75008 Paris.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Données collectées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Nous collectons les données suivantes dans le cadre de nos services :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Données d'identification : nom, prénom, adresse email, téléphone</li>
                    <li>Données relatives à l'entreprise : dénomination, activité, capital</li>
                    <li>Données techniques : adresse IP, cookies, données de navigation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Finalités du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Vos données sont traitées pour les finalités suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Exécution du contrat de service</li>
                    <li>Gestion de la relation client</li>
                    <li>Amélioration de nos services</li>
                    <li>Respect des obligations légales</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durée de conservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vos données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles sont traitées, 
                  conformément aux obligations légales et réglementaires.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vos droits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Droit d'accès et de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                    <li>Droit d'opposition</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Pour exercer vos droits, contactez-nous à : contact@rcs-express.fr
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité des données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous mettons en place des mesures techniques et organisationnelles appropriées 
                  pour protéger vos données contre la perte, l'utilisation non autorisée, la divulgation ou la modification.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueRGPD;