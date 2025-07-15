import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail, Menu, X, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      price: "129€",
      description: "Structure juridique pour entrepreneur individuel",
      icon: Building2,
      advantages: [
        "Responsabilité limitée",
        "Statut de dirigeant",
        "Flexibilité juridique"
      ]
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée", 
      price: "129€",
      description: "Structure pour plusieurs associés",
      icon: Users,
      advantages: [
        "Répartition des parts",
        "Gestion collective",
        "Sécurité juridique"
      ]
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      price: "129€", 
      description: "Version individuelle de la SARL",
      icon: FileText,
      advantages: [
        "Protection du patrimoine",
        "Option fiscale",
        "Simplicité de gestion"
      ]
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      price: "129€",
      description: "Structure flexible pour associés multiples",
      icon: Building2,
      advantages: [
        "Liberté statutaire",
        "Entrée d'investisseurs",
        "Organes dirigeants"
      ]
    },
    {
      name: "Micro-entreprise", 
      fullName: "Régime micro-entrepreneur",
      price: "79€",
      description: "Régime simplifié pour débuter",
      icon: FileText,
      advantages: [
        "Formalités allégées",
        "Comptabilité simple",
        "Démarrage rapide"
      ]
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
    },
    {
      title: "Accompagnement personnalisé",
      description: "Support téléphonique pendant tout le processus",
      icon: Phone
    },
    {
      title: "Service après-vente inclus",
      description: "Assistance post-création pour vos démarches",
      icon: Mail
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
      {/* Official Administrative Header */}
      <header className="header-administrative">
        <div className="container-administrative">
          <div className="flex h-16 items-center justify-between">
            {/* Official Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">RCS Express</span>
                <span className="text-xs text-muted-foreground">Service agréé</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Services</a>
              <a href="#tarifs" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Tarifs officiels</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Questions fréquentes</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')} 
                className="btn-administrative-outline"
              >
                Se connecter
              </Button>
              <Button onClick={() => navigate('/commencer')} className="btn-administrative">
                Commencer mon inscription
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background">
              <div className="py-4 space-y-4">
                <nav className="space-y-2">
                  <a href="#services" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2">Services</a>
                  <a href="#tarifs" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2">Tarifs officiels</a>
                  <a href="#faq" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2">Questions fréquentes</a>
                </nav>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')} 
                    className="btn-administrative-outline w-full"
                  >
                    Se connecter
                  </Button>
                  <Button onClick={() => navigate('/choisir-statut')} className="btn-administrative w-full">
                    Commencer ma démarche
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="hero-administrative section-administrative">
        <div className="container-administrative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-hero">
                  Inscription au Registre du Commerce et des Sociétés
                </h1>
                <h2 className="text-subtitle">
                  Service en ligne officiel pour l'immatriculation de votre entreprise
                </h2>
              </div>
              
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg"
                className="btn-administrative btn-touch-lg text-lg btn-ripple"
              >
                Commencer ma démarche
              </Button>

              {/* Trust Indicators */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Service conforme aux exigences du greffe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Données sécurisées et chiffrées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-success" />
                  <span>Accompagnement par des experts agréés</span>
                </div>
              </div>
            </div>

            <div className="card-premium animate-slide-down">
              <h3 className="text-xl font-bold mb-6 text-premium">Informations importantes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>L'immatriculation au RCS est obligatoire pour exercer une activité commerciale</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>Délai de traitement : 48 à 72 heures ouvrées</p>
                </div>
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p>L'extrait Kbis sera envoyé par le greffe compétent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps - Government Style */}
      <section className="section-administrative" id="services">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Processus d'immatriculation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Démarche simplifiée en 3 étapes pour créer votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.number} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary text-primary-foreground rounded-sm flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  <div className="text-sm font-medium text-primary">
                    Durée estimée : {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/choisir-statut')} 
              className="btn-administrative"
              size="lg"
            >
              Démarrer ma démarche
            </Button>
          </div>
        </div>
      </section>

      {/* Structure Selection - Administrative Form Style */}
      <section className="section-administrative bg-muted" id="structures">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Choisir votre statut juridique</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez la forme juridique adaptée à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalStructures.map((structure) => {
              const IconComponent = structure.icon;
              return (
                <Card 
                  key={structure.name}
                  className="card-administrative cursor-pointer hover-administrative"
                  onClick={() => navigate('/choisir-statut')}
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{structure.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {structure.fullName}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {structure.price}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{structure.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Avantages principaux :</h4>
                      <ul className="space-y-1">
                        {structure.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-success mr-2 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full btn-administrative-outline text-sm"
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

      {/* Official Pricing */}
      <section className="section-administrative" id="tarifs">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Tarifs officiels</h2>
            <p className="text-lg text-muted-foreground">
              Prix transparents, tout inclus, sans frais cachés
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SASU/SARL/EURL/SAS */}
            <Card className="card-administrative p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">SASU / SARL / EURL / SAS</CardTitle>
                <div className="text-3xl font-bold text-primary">129€ TTC</div>
                <CardDescription>Tout inclus - Aucun frais supplémentaire</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Services inclus :</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Traitement complet du dossier</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Rédaction des statuts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Transmission au greffe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Suivi personnalisé</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  className="w-full btn-administrative"
                >
                  Créer ma société
                </Button>
              </CardContent>
            </Card>

            {/* Micro-entreprise */}
            <Card className="card-administrative p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Micro-entreprise</CardTitle>
                <div className="text-3xl font-bold text-primary">79€ TTC</div>
                <CardDescription>Formule simplifiée</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Services inclus :</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Déclaration d'activité</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Immatriculation RCS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Accompagnement</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  className="w-full btn-administrative"
                >
                  Créer ma micro-entreprise
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Official Guarantees */}
      <section className="section-administrative bg-secondary">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Garanties de service</h2>
            <p className="text-lg text-muted-foreground">
              Nos engagements pour votre tranquillité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-card border border-border rounded-sm p-4 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official References */}
      <section className="section-administrative">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Nos références</h2>
            <p className="text-lg text-muted-foreground">
              Service reconnu par les institutions officielles
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">3,247</div>
              <div className="text-sm text-muted-foreground">Entreprises créées en 2024</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">48h</div>
              <div className="text-sm text-muted-foreground">Délai moyen de traitement</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Conformité légale</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Satisfaction client</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-card border border-border rounded-sm p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-4">Agréments et certifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div>Service agréé</div>
                <div>Conformité RGPD</div>
                <div>Sécurité ISO 27001</div>
                <div>Certification greffe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-administrative bg-muted" id="faq">
        <div className="container-administrative">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground">
              Réponses aux questions les plus courantes
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-sm">
                  <AccordionTrigger className="px-4 py-3 text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 text-muted-foreground text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Premium Apple-Style Footer */}
      <footer className="bg-foreground text-background">
        <div className="container-administrative py-16">
          {/* Main Footer Content */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-background" />
                </div>
                <span className="text-xl font-semibold text-background">RCS Express</span>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Service officiel d'immatriculation au Registre du Commerce et des Sociétés.
                Simplifions ensemble vos démarches d'entreprise.
              </p>
            </div>
            
            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-background text-base">Services</h3>
              <nav className="space-y-3">
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Immatriculation RCS
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Création de société
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Micro-entreprise
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Accompagnement juridique
                </a>
              </nav>
            </div>
            
            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold text-background text-base">Support</h3>
              <nav className="space-y-3">
                <a href="#faq" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Questions fréquentes
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Guide d'utilisation
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-sm text-background/70 hover:text-background transition-colors">
                  Statut du service
                </a>
              </nav>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-background text-base">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                  <span className="text-sm text-background/70">Service ouvert</span>
                </div>
                <div className="text-sm text-background/70">
                  <p>Du lundi au vendredi</p>
                  <p>9h00 - 18h00</p>
                </div>
                <a href="mailto:contact@rcs-express.fr" className="text-sm text-background/70 hover:text-background transition-colors">
                  contact@rcs-express.fr
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-background/10 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="text-sm text-background/70">
                  © 2024 RCS Express - Service agréé pour l'immatriculation d'entreprises
                </p>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-xs text-background/50 hover:text-background/70 transition-colors">
                    Mentions légales
                  </a>
                  <a href="#" className="text-xs text-background/50 hover:text-background/70 transition-colors">
                    Politique de confidentialité
                  </a>
                  <a href="#" className="text-xs text-background/50 hover:text-background/70 transition-colors">
                    CGU
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-background/70">Sécurisé SSL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-background/70">Conformité RGPD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;