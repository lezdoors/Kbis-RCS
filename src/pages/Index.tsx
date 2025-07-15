import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import documentsImage from "@/assets/documents-image.jpg";
import teamSuccess from "@/assets/team-success.jpg";

const Index = () => {
  const navigate = useNavigate();

  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      price: "129€",
      description: "Idéal pour entreprendre seul avec flexibilité"
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      price: "129€",
      description: "Structure classique pour plusieurs associés"
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      price: "129€",
      description: "Version unipersonnelle de la SARL"
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      price: "129€",
      description: "Flexibilité maximale pour les associés"
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      price: "79€",
      description: "Simple et rapide pour débuter"
    }
  ];

  const testimonials = [
    {
      text: "Très rapide et clair, j'ai reçu mon Kbis en 48h. Service impeccable !",
      author: "Jean M.",
      business: "Créateur SASU"
    },
    {
      text: "Un service impeccable, équipe très professionnelle. Je recommande vivement.",
      author: "Marie L.",
      business: "SARL"
    },
    {
      text: "Simplicité et efficacité, parfait pour créer sa micro-entreprise !",
      author: "Pierre D.",
      business: "Micro-entreprise"
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce que le RCS ?",
      answer: "Le Registre du Commerce et des Sociétés est un registre public tenu par les greffes des tribunaux de commerce. Il recense toutes les entreprises commerciales et les sociétés en France."
    },
    {
      question: "Quels documents dois-je fournir ?",
      answer: "Les documents varient selon votre statut juridique. Généralement : pièce d'identité, justificatif de domicile, statuts signés, attestation de dépôt des fonds, et selon l'activité, des justificatifs spécifiques."
    },
    {
      question: "En combien de temps vais-je recevoir mon Kbis ?",
      answer: "Généralement sous 48-72h après validation complète de votre dossier par nos experts et transmission au greffe compétent."
    },
    {
      question: "Que se passe-t-il après le paiement ?",
      answer: "Nous traitons immédiatement votre dossier, vérifions tous les documents et transmettons au greffe. Vous recevez un suivi par email à chaque étape."
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
          <Button onClick={() => navigate('/choisir-statut')} className="btn-primary">
            Commencer l'inscription
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient section-padding overflow-hidden">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Inscrivez votre entreprise au{" "}
                  <span className="text-gradient">RCS</span>{" "}
                  en quelques clics
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground">
                  SASU, SARL, auto-entrepreneur — obtenez votre Kbis rapidement
                </h2>
              </div>
              
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg"
                className="btn-primary text-lg px-8 py-4 hover-lift"
              >
                Commencer l'inscription
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="h-5 w-5 text-success" />
                  <span>Service sécurisé - Données chiffrées</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Conforme aux exigences du greffe</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Users className="h-5 w-5 text-success" />
                  <span>Support humain disponible 6j/7</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <img 
                src={heroImage} 
                alt="Professional French business registration" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Comment ça marche</h2>
            <p className="text-xl text-muted-foreground">Simple, rapide et sécurisé</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 card-elegant p-8 hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">1. Choisissez votre statut juridique</h3>
              <p className="text-muted-foreground">SASU, SARL, EURL, SAS ou micro-entreprise</p>
            </div>

            <div className="text-center space-y-4 card-elegant p-8 hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">2. Remplissez le formulaire guidé</h3>
              <p className="text-muted-foreground">Nos experts vous accompagnent étape par étape</p>
            </div>

            <div className="text-center space-y-4 card-elegant p-8 hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">3. Recevez votre extrait Kbis</h3>
              <p className="text-muted-foreground">Document officiel sous 48-72h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Structure Preview */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Sélecteur de statut juridique</h2>
            <p className="text-xl text-muted-foreground">Choisissez la structure adaptée à votre projet</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {legalStructures.map((structure, index) => (
              <Card 
                key={structure.name}
                className="hover-lift cursor-pointer transition-all duration-300 hover:shadow-primary border-2 hover:border-primary"
                onClick={() => navigate('/choisir-statut')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{structure.name}</CardTitle>
                  <CardDescription className="text-sm h-12 flex items-center">
                    {structure.fullName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">{structure.description}</p>
                  <Badge variant="outline" className="text-lg font-semibold px-4 py-2">
                    À partir de {structure.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Tarifs transparents</h2>
            <p className="text-xl text-muted-foreground">Pas de frais cachés, service complet inclus</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-elegant p-8 hover-lift">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">SASU / SARL / EURL / SAS</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">129€</div>
                <CardDescription>TTC - Prix tout compris</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Traitement complet du dossier</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Assistance personnalisée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Envoi sécurisé au greffe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Suivi en temps réel</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant p-8 hover-lift">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Micro-entreprise</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">79€</div>
                <CardDescription>TTC - Prix tout compris</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Immatriculation simplifiée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Support dédié</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Confirmation par email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Documents officiels</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-accent">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Pourquoi choisir RCS Express ?</h2>
            <p className="text-xl text-muted-foreground">La confiance de milliers d'entrepreneurs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <Users className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Accompagnement complet par des experts</h3>
                <p className="text-muted-foreground">Nos spécialistes vous guident à chaque étape</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Délais rapides (48-72h)</h3>
                <p className="text-muted-foreground">Traitement prioritaire de votre dossier</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Service sécurisé - Données chiffrées</h3>
                <p className="text-muted-foreground">Protection maximale de vos informations</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Garantie conformité légale</h3>
                <p className="text-muted-foreground">100% conforme aux exigences officielles</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Assistance humaine 6j/7</h3>
                <p className="text-muted-foreground">Une équipe dédiée à votre service</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Star className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Satisfaction garantie</h3>
                <p className="text-muted-foreground">Plus de 10 000 entrepreneurs satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Avis clients</h2>
            <p className="text-xl text-muted-foreground">Ils nous font confiance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elegant p-6 hover-lift">
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="font-semibold">
                    <div>{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Questions fréquentes</h2>
            <p className="text-xl text-muted-foreground">Tout ce que vous devez savoir</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="card-elegant px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-max text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à créer votre entreprise ?
          </h2>
          <p className="text-xl opacity-90">
            Rejoignez les milliers d'entrepreneurs qui nous font confiance
          </p>
          <Button 
            onClick={() => navigate('/choisir-statut')}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-4 hover-lift"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8" />
                <span className="text-xl font-bold">RCS Express</span>
              </div>
              <p className="text-gray-400">
                Service agréé pour les formalités d'entreprise en France
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Création SASU</li>
                <li>Création SARL</li>
                <li>Création EURL</li>
                <li>Micro-entreprise</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Contact</li>
                <li>Suivi de dossier</li>
                <li>Assistance</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@rcs-express.fr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RCS Express - Service agréé pour les formalités d'entreprise</p>
            <div className="mt-4 space-x-4">
              <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="/cgu" className="hover:text-white transition-colors">CGU</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              <a href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
