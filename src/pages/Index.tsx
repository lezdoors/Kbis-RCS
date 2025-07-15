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
import heroImage from "@/assets/hero-image.jpg";
const Index = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Activity types for the hero section
  const activityTypes = [
    { name: "Consultants & freelance", icon: Briefcase },
    { name: "Construction & travaux", icon: Wrench },
    { name: "Automobile & transport", icon: Car },
    { name: "Vente en ligne", icon: ShoppingCart },
    { name: "Commerce", icon: Building2 },
    { name: "Coursier à vélo", icon: Bike },
    { name: "Achat & revente", icon: TrendingUp },
    { name: "Services aux entreprises", icon: UserCheck },
    { name: "Services à la personne", icon: HandHeart },
    { name: "Restauration", icon: Utensils },
    { name: "SCI", icon: Home },
    { name: "Autres", icon: MoreHorizontal }
  ];
  const legalStructures = [{
    name: "SASU",
    fullName: "Société par Actions Simplifiée Unipersonnelle",
    price: "129€",
    description: "Structure juridique pour entrepreneur individuel",
    icon: Building2,
    advantages: ["Responsabilité limitée", "Statut de dirigeant", "Flexibilité juridique"]
  }, {
    name: "SARL",
    fullName: "Société à Responsabilité Limitée",
    price: "129€",
    description: "Structure pour plusieurs associés",
    icon: Users,
    advantages: ["Répartition des parts", "Gestion collective", "Sécurité juridique"]
  }, {
    name: "EURL",
    fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
    price: "129€",
    description: "Version individuelle de la SARL",
    icon: FileText,
    advantages: ["Protection du patrimoine", "Option fiscale", "Simplicité de gestion"]
  }, {
    name: "SAS",
    fullName: "Société par Actions Simplifiée",
    price: "129€",
    description: "Structure flexible pour associés multiples",
    icon: Building2,
    advantages: ["Liberté statutaire", "Entrée d'investisseurs", "Organes dirigeants"]
  }, {
    name: "Micro-entreprise",
    fullName: "Régime micro-entrepreneur",
    price: "79€",
    description: "Régime simplifié pour débuter",
    icon: FileText,
    advantages: ["Formalités allégées", "Comptabilité simple", "Démarrage rapide"]
  }];
  const processSteps = [{
    number: "1",
    title: "Sélection du statut juridique",
    description: "Choisissez la forme juridique adaptée à votre activité",
    duration: "5 minutes"
  }, {
    number: "2",
    title: "Saisie des informations",
    description: "Complétez le formulaire avec les données de votre entreprise",
    duration: "10 minutes"
  }, {
    number: "3",
    title: "Validation et transmission",
    description: "Vérification et envoi au registre du commerce compétent",
    duration: "48-72h"
  }];
  const benefits = [{
    title: "Conformité aux exigences légales",
    description: "Traitement conforme à la réglementation en vigueur",
    icon: Shield
  }, {
    title: "Traitement par experts certifiés",
    description: "Dossier traité par des professionnels agréés",
    icon: Users
  }, {
    title: "Délais de traitement garantis",
    description: "Respect des délais annoncés pour votre immatriculation",
    icon: Clock
  }, {
    title: "Sécurité des données personnelles",
    description: "Protection et confidentialité de vos informations",
    icon: Shield
  }, {
    title: "Accompagnement personnalisé",
    description: "Support téléphonique pendant tout le processus",
    icon: Phone
  }, {
    title: "Service après-vente inclus",
    description: "Assistance post-création pour vos démarches",
    icon: Mail
  }];
  const faqs = [{
    question: "Qu'est-ce que le Registre du Commerce et des Sociétés ?",
    answer: "Le RCS est le registre officiel tenu par les greffes des tribunaux de commerce. Il recense toutes les entreprises commerciales et sociétés en France.",
    category: "Général"
  }, {
    question: "Quels documents dois-je fournir pour l'immatriculation ?",
    answer: "Les documents requis varient selon le statut juridique : pièce d'identité, justificatif de domicile, statuts signés, attestation de dépôt des fonds.",
    category: "Documents"
  }, {
    question: "Quel est le délai pour recevoir l'extrait Kbis ?",
    answer: "L'extrait Kbis est généralement délivré sous 48 à 72h après validation complète du dossier par le greffe compétent.",
    category: "Délais"
  }, {
    question: "Comment suivre l'avancement de mon dossier ?",
    answer: "Vous recevez un numéro de suivi et des notifications par email à chaque étape du traitement de votre dossier.",
    category: "Suivi"
  }];
  return <div className="min-h-screen bg-background">
      {/* Clean Premium Header - Apple/McKinsey Style */}
      <header className="relative bg-white border-b border-border/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoFav} 
                alt="Inscription RCS" 
                className="h-8 w-auto object-contain md:hidden" 
              />
              <img 
                src={logoHero} 
                alt="Inscription RCS" 
                className="h-8 w-auto object-contain hidden md:block" 
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-foreground hover:text-primary transition-colors font-poppins font-medium text-sm">
                Accueil
              </a>
              <a href="#comment-ca-marche" className="text-foreground hover:text-primary transition-colors font-poppins font-medium text-sm">
                Comment ça marche
              </a>
              <a href="#statuts-juridiques" className="text-foreground hover:text-primary transition-colors font-poppins font-medium text-sm">
                Statuts juridiques
              </a>
              <Button variant="ghost" onClick={() => navigate('/login')} className="font-poppins font-medium">
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
            <div className="md:hidden border-t border-border/30 bg-white">
              <div className="py-4 space-y-2">
                <a href="#accueil" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 font-poppins font-medium py-3 px-4 rounded-lg">
                  Accueil
                </a>
                <a href="#comment-ca-marche" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 font-poppins font-medium py-3 px-4 rounded-lg">
                  Comment ça marche
                </a>
                <a href="#statuts-juridiques" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 font-poppins font-medium py-3 px-4 rounded-lg">
                  Statuts juridiques
                </a>
                <Button variant="ghost" onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }} className="font-poppins font-medium w-full justify-start px-4">
                  Connexion
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Premium Hero Section - Apple Style */}
      <section className="bg-background py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            
            {/* Hero Logo */}
            <div className="flex justify-center animate-fade-in">
              <img 
                src={logoHero} 
                alt="Inscription RCS" 
                className="h-24 w-auto object-contain md:h-32 lg:h-40" 
              />
            </div>

            {/* Slogan */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-primary font-poppins font-semibold text-2xl md:text-4xl lg:text-5xl tracking-tight">
                Créez • Protégez • Lancez
              </h1>
              <p className="text-muted-foreground font-poppins text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                Votre assistant d'immatriculation RCS en France
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in">
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-poppins font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Commencer maintenant
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary/10 font-poppins font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Process Steps Section */}
      <section className="section-administrative" id="services">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Processus d'immatriculation
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Démarche simplifiée en 3 étapes pour créer votre entreprise légalement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, index) => <div key={step.number} className="text-center space-y-6 group">
                {/* Step Number with Premium Styling */}
                <div className="relative mx-auto w-20 h-20">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center text-2xl font-bold shadow-large group-hover:shadow-xl transition-all duration-300">
                    {step.number}
                  </div>
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && <div className="hidden md:block absolute top-10 left-20 w-full h-0.5 bg-gradient-to-r from-primary to-transparent">
                      <ArrowRight className="absolute -top-2 -right-2 w-4 h-4 text-primary" />
                    </div>}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center space-x-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>Durée estimée : {step.duration}</span>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="text-center mt-16">
            <Button onClick={() => navigate('/choisir-statut')} className="btn-administrative btn-touch-lg text-lg btn-ripple" size="lg">
              Démarrer ma démarche
              <ArrowRight className="ml-2 w-5 h-5" />
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
            {legalStructures.map(structure => {
            const IconComponent = structure.icon;
            return <Card key={structure.name} className="card-administrative cursor-pointer hover-administrative" onClick={() => navigate('/choisir-statut')}>
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
                        {structure.advantages.map((advantage, i) => <li key={i} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-success mr-2 flex-shrink-0" />
                            {advantage}
                          </li>)}
                      </ul>
                    </div>

                    <Button className="w-full btn-administrative-outline text-sm" onClick={e => {
                  e.stopPropagation();
                  navigate('/choisir-statut');
                }}>
                      Sélectionner
                    </Button>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <section className="section-administrative" id="tarifs">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Tarifs officiels
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Prix transparents, tout inclus, sans frais cachés
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Premium Corporate Package */}
            <div className="card-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-primary-glow text-white px-6 py-2 rounded-bl-2xl">
                <span className="text-sm font-semibold">Populaire</span>
              </div>
              
              <div className="text-center space-y-6 mb-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">SASU / SARL / EURL / SAS</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl md:text-5xl font-bold text-primary">129€</span>
                    <span className="text-sm text-muted-foreground">TTC</span>
                  </div>
                  <p className="text-muted-foreground">Tout inclus - Aucun frais supplémentaire</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Services inclus :</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Traitement complet du dossier</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Rédaction des statuts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Transmission au greffe</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Suivi personnalisé</span>
                    </div>
                  </div>
                </div>

                <Button onClick={() => navigate('/choisir-statut')} className="w-full btn-administrative btn-touch-lg text-lg btn-ripple">
                  Créer ma société
                </Button>
              </div>
            </div>

            {/* Micro-Enterprise Package */}
            <div className="card-premium">
              <div className="text-center space-y-6 mb-8">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-3xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Micro-entreprise</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl md:text-5xl font-bold text-orange-600">79€</span>
                    <span className="text-sm text-muted-foreground">TTC</span>
                  </div>
                  <p className="text-muted-foreground">Formule simplifiée</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Services inclus :</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Déclaration d'activité</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Immatriculation RCS</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">Accompagnement</span>
                    </div>
                  </div>
                </div>

                <Button onClick={() => navigate('/choisir-statut')} className="w-full btn-administrative-outline btn-touch-lg text-lg">
                  Créer ma micro-entreprise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Service Guarantees */}
      <section className="section-administrative bg-gradient-to-b from-background to-secondary">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Garanties de service
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nos engagements pour votre tranquillité d'esprit
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return <div key={index} className="card-premium group text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Premium Trust & Statistics Section */}
      <section className="section-administrative">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Nos références
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Service reconnu par les institutions officielles
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">3,247</div>
                <div className="text-sm text-muted-foreground font-medium">Entreprises créées en 2024</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">48h</div>
                <div className="text-sm text-muted-foreground font-medium">Délai moyen de traitement</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Conformité légale</div>
              </div>
            </div>
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground font-medium">Satisfaction client</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="card-premium max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-8 text-foreground">Agréments et certifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Service agréé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Conformité RGPD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Sécurité ISO 27001</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Certification greffe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium FAQ Section */}
      <section className="section-administrative bg-gradient-to-b from-background to-muted" id="faq">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Questions fréquentes
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Réponses aux questions les plus courantes sur l'immatriculation RCS
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="card-premium overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline text-foreground text-base md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
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
                <img src={logoFav} alt="Inscription RCS" className="h-8 w-auto object-contain" />
                <span className="text-xl font-semibold text-background font-poppins">Inscription RCS</span>
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
                  © 2024 Inscription RCS - Service agréé pour l'immatriculation d'entreprises
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
    </div>;
};
export default Index;