import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail, Menu, X, Info, MapPin, Award, MessageCircle, Briefcase, Car, ShoppingCart, Bike, Utensils, Home, MoreHorizontal, UserCheck, Wrench, HandHeart, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoHero from "@/assets/logo-hero.png";
import logoFav from "@/assets/logo-fav.png";
import logoCentre from "@/assets/logo-centre.png";

const Index = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  const benefits = [
    {
      title: "Conformité aux exigences légales",
      description: "Traitement conforme à la réglementation en vigueur",
      icon: Shield
    },
    {
      title: "Traitement par experts certifiés",
      description: "Dossier traité par des professionnels agréés",
      icon: Users
    },
    {
      title: "Délais de traitement garantis",
      description: "Respect des délais annoncés pour votre immatriculation",
      icon: Clock
    },
    {
      title: "Sécurité des données personnelles",
      description: "Protection et confidentialité de vos informations",
      icon: Shield
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce que le Registre du Commerce et des Sociétés ?",
      answer: "Le RCS est le registre officiel tenu par les greffes des tribunaux de commerce. Il recense toutes les entreprises commerciales et sociétés en France.",
      category: "Général"
    },
    {
      question: "Quels documents dois-je fournir pour l'immatriculation ?",
      answer: "Les documents requis varient selon le statut juridique : pièce d'identité, justificatif de domicile, statuts signés, attestation de dépôt des fonds.",
      category: "Documents"
    },
    {
      question: "Quel est le délai pour recevoir l'extrait Kbis ?",
      answer: "L'extrait Kbis est généralement délivré sous 48 à 72h après validation complète du dossier par le greffe compétent.",
      category: "Délais"
    },
    {
      question: "Comment suivre l'avancement de mon dossier ?",
      answer: "Vous recevez un numéro de suivi et des notifications par email à chaque étape du traitement de votre dossier.",
      category: "Suivi"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Apple-Style Header */}
      <header className="bg-white border-b border-border/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoCentre} 
                alt="Inscription RCS" 
                className="h-7 w-auto object-contain" 
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-foreground hover:text-primary transition-colors font-inter font-medium text-sm">
                Accueil
              </a>
              <a href="#comment-ca-marche" className="text-foreground hover:text-primary transition-colors font-inter font-medium text-sm">
                Comment ça marche
              </a>
              <a href="#statuts-juridiques" className="text-foreground hover:text-primary transition-colors font-inter font-medium text-sm">
                Statuts juridiques
              </a>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')} 
                className="font-inter font-medium text-sm rounded-full px-4 py-2 border-border hover:bg-muted"
              >
                Connexion
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/20 bg-white py-4">
              <div className="space-y-2">
                <a href="#accueil" className="block text-foreground hover:text-primary transition-colors font-inter font-medium py-2 px-4">
                  Accueil
                </a>
                <a href="#comment-ca-marche" className="block text-foreground hover:text-primary transition-colors font-inter font-medium py-2 px-4">
                  Comment ça marche
                </a>
                <a href="#statuts-juridiques" className="block text-foreground hover:text-primary transition-colors font-inter font-medium py-2 px-4">
                  Statuts juridiques
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="font-inter font-medium w-full mt-2 rounded-full"
                >
                  Connexion
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Apple-Style Hero Section */}
      <section className="bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            
            {/* Hero Logo */}
            <div className="flex justify-center animate-fade-in">
              <img 
                src={logoCentre} 
                alt="Inscription RCS" 
                className="h-16 w-auto object-contain md:h-20" 
              />
            </div>

            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-primary font-inter font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Créez • Protégez • Lancez
              </h1>
              <p className="text-muted-foreground font-inter font-normal text-lg md:text-xl max-w-2xl mx-auto">
                Votre assistant d'immatriculation RCS en France
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold px-8 py-4 text-base rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                Commencer maintenant
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5 font-inter font-semibold px-8 py-4 text-base rounded-full transition-all duration-200"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Process Steps Section */}
      <section className="py-20 bg-muted/30" id="comment-ca-marche">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-inter">
              Comment ça marche
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Démarche simplifiée en 3 étapes pour créer votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <div key={step.number} className="text-center space-y-6">
                <div className="relative mx-auto w-16 h-16">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-xl font-bold font-inter shadow-sm">
                    {step.number}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-border">
                      <ArrowRight className="absolute -top-2 -right-2 w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground font-inter">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center space-x-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={() => navigate('/choisir-statut')} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold px-8 py-4 text-base rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              Démarrer ma démarche
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Legal Structures Section */}
      <section className="py-20 bg-background" id="statuts-juridiques">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-inter">
              Statuts juridiques
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Choisissez la forme juridique adaptée à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalStructures.map((structure) => {
              const IconComponent = structure.icon;
              return (
                <Card key={structure.name} className="bg-card border border-border rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/choisir-statut')}>
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-inter font-semibold">{structure.name}</CardTitle>
                      <CardDescription className="text-sm font-inter text-muted-foreground">
                        {structure.fullName}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground font-inter text-center">
                      {structure.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm font-inter">Avantages :</h4>
                      <ul className="space-y-2">
                        {structure.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-start text-sm text-muted-foreground font-inter">
                            <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0 mt-0.5" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-medium rounded-full transition-all duration-200" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/choisir-statut');
                      }}
                    >
                      Sélectionner
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-inter">
              Nos garanties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Un service professionnel et sécurisé pour votre immatriculation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-inter">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-inter text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-inter">
              Questions fréquentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Trouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-inter font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-inter">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4">
            <img 
              src={logoCentre} 
              alt="Inscription RCS" 
              className="h-8 w-auto object-contain mx-auto" 
            />
            <p className="text-muted-foreground font-inter text-sm">
              © 2024 Inscription RCS. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;