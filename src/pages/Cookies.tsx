import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de Cookies</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Qu'est-ce qu'un cookie ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web. 
                  Il permet au site de reconnaître votre navigateur et d'améliorer votre expérience de navigation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types de cookies utilisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Cookies strictement nécessaires</h4>
                    <p className="text-muted-foreground">
                      Ces cookies sont indispensables au fonctionnement du site. Ils permettent l'utilisation 
                      des principales fonctionnalités du site (navigation, authentification).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cookies de performance</h4>
                    <p className="text-muted-foreground">
                      Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer ses performances 
                      et votre expérience utilisateur.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cookies fonctionnels</h4>
                    <p className="text-muted-foreground">
                      Ces cookies permettent de personnaliser votre expérience sur le site 
                      (préférences de langue, informations de connexion).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestion des cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Vous pouvez gérer vos préférences de cookies de plusieurs façons :
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Via votre navigateur</h4>
                    <p className="text-muted-foreground">
                      Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies, 
                      ou pour être averti avant qu'un cookie soit enregistré.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Via notre site</h4>
                    <p className="text-muted-foreground">
                      Lors de votre première visite, une bannière vous permet de choisir 
                      quels types de cookies vous souhaitez accepter.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durée de conservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les cookies sont conservés pour une durée maximale de 13 mois, 
                  conformément aux recommandations de la CNIL.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pour toute question concernant notre politique de cookies, 
                  vous pouvez nous contacter à : contact@rcs-express.fr
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

export default Cookies;