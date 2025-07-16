import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CGV = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article 1 - Objet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les présentes conditions générales de vente régissent les relations contractuelles entre RCS Express et ses clients 
                  concernant la prestation de services d'aide à la création d'entreprise en France.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 2 - Services proposés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  RCS Express propose des services d'accompagnement pour la création de différentes formes juridiques d'entreprises :
                  SASU, SARL, SCI, et auto-entrepreneur. Ces services incluent la préparation des documents, 
                  l'assistance administrative et le suivi des démarches.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 3 - Tarifs et paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Les tarifs sont indiqués en euros toutes taxes comprises. Le paiement s'effectue au moment de la commande 
                    par carte bancaire ou virement.
                  </p>
                  <p className="text-muted-foreground">
                    En cas de défaut de paiement, RCS Express se réserve le droit de suspendre ou annuler la prestation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 4 - Exécution du service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  RCS Express s'engage à traiter les dossiers dans un délai de 24 heures à compter de la réception 
                  de tous les documents requis. Ce délai peut être prolongé en cas de demande d'informations complémentaires.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 5 - Responsabilité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  RCS Express s'engage à fournir un service conforme aux règles en vigueur. Sa responsabilité ne peut être engagée 
                  qu'en cas de faute prouvée dans l'exécution du service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article 6 - Droit applicable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les présentes conditions sont régies par le droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
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

export default CGV;