import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Éditeur du site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">RCS Express</h3>
                  <p className="text-muted-foreground">
                    Société par actions simplifiée<br/>
                    Capital social : 10 000 €<br/>
                    RCS Paris : 123 456 789<br/>
                    SIRET : 12345678901234<br/>
                    TVA intracommunautaire : FR12345678901
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Siège social</h4>
                  <p className="text-muted-foreground">
                    123 Avenue des Champs-Élysées<br/>
                    75008 Paris, France
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <p className="text-muted-foreground">
                    Email : contact@rcs-express.fr<br/>
                    Téléphone : 01 23 45 67 89
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Directeur de la publication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Le directeur de la publication est le représentant légal de RCS Express.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hébergement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ce site est hébergé par Lovable<br/>
                  Adresse : États-Unis<br/>
                  Site web : https://lovable.dev
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
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

export default MentionsLegales;