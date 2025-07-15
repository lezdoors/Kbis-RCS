import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail, Menu, X, Info, MapPin, Award, MessageCircle, Briefcase, Car, ShoppingCart, Bike, Utensils, Home, MoreHorizontal, UserCheck, Wrench, HandHeart, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import modernLogo from "@/assets/modern-logo.png";
import heroImage from "@/assets/hero-image.jpg";

// Official Inscription RCS logos - uploaded versions
const mainLogo = "/lovable-uploads/44d3fbcd-ea82-40a6-81b1-53e0f643dd45.png"; // Main website logo for hero section
const faviconLogo = "/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png"; // Favicon/minimal logo
const centerLogo = "/lovable-uploads/02f38eff-0bf3-4875-88a2-5fce416ad9e4.png"; // Centered logo for navbar
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
    description: "Structure juridique pour entrepreneur individuel",
    icon: Building2,
    advantages: ["Responsabilité limitée", "Statut de dirigeant", "Flexibilité juridique"]
  }, {
    name: "SARL",
    fullName: "Société à Responsabilité Limitée",
    description: "Structure pour plusieurs associés",
    icon: Users,
    advantages: ["Répartition des parts", "Gestion collective", "Sécurité juridique"]
  }, {
    name: "EURL",
    fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
    description: "Version individuelle de la SARL",
    icon: FileText,
    advantages: ["Protection du patrimoine", "Option fiscale", "Simplicité de gestion"]
  }, {
    name: "SAS",
    fullName: "Société par Actions Simplifiée",
    description: "Structure flexible pour associés multiples",
    icon: Building2,
    advantages: ["Liberté statutaire", "Entrée d'investisseurs", "Organes dirigeants"]
  }, {
    name: "Micro-entreprise",
    fullName: "Régime micro-entrepreneur",
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
      {/* Clean Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src={centerLogo} alt="Inscription RCS" className="h-12 w-auto object-contain" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#comment-ca-marche" className="text-foreground hover:text-primary transition-colors font-medium">
                Comment ça marche ?
              </a>
              <a href="#pourquoi-nous" className="text-foreground hover:text-primary transition-colors font-medium">
                Pourquoi nous ?
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
                Questions fréquentes
              </a>
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <Phone className="w-4 h-4" />
                <span className="text-sm">01 XX XX XX XX</span>
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/login')} className="btn-administrative-outline">
                Se connecter
              </Button>
              <Button onClick={() => navigate('/choisir-statut')} className="btn-administrative">
                Commencer
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && <div className="md:hidden border-t border-border bg-background">
              <div className="py-6 space-y-6">
                <nav className="space-y-1">
                  <a href="#comment-ca-marche" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4">
                    Comment ça marche ?
                  </a>
                  <a href="#pourquoi-nous" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4">
                    Pourquoi nous ?
                  </a>
                  <a href="#faq" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4">
                    Questions fréquentes
                  </a>
                </nav>
                
                <div className="space-y-3">
                  <Button variant="outline" onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }} className="btn-administrative-outline w-full">
                    Se connecter
                  </Button>
                  <Button onClick={() => {
                navigate('/choisir-statut');
                setIsMobileMenuOpen(false);
              }} className="btn-administrative w-full">
                    Commencer
                  </Button>
                </div>
              </div>
            </div>}
        </div>
      </header>

      {/* Hero Section - LegalPlace Style */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Créez votre <span className="text-primary">entreprise</span> ultra rapidement dès 0€ !
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Accompagnement personnalisé par un juriste dédié jusqu'à l'obtention du Kbis.
                </p>
              </div>

              {/* Activity Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Quel sera votre domaine d'activité ?
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activityTypes.slice(0, 8).map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <div 
                        key={activity.name}
                        className="group bg-white border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => navigate('/choisir-statut')}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-foreground text-center group-hover:text-primary transition-colors">
                            {activity.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.5/5</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Excellent</span> 4.4 sur 5 ⭐ Trustpilot
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+300 000</span> sociétés accompagnées par InscriptionRCS
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg" 
                className="btn-administrative text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Commencer mon inscription RCS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Building2 className="w-16 h-16 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Votre entreprise</h3>
                    <p className="text-muted-foreground">créée en quelques clics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche? Section - LegalPlace Style */}
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

      {/* Pourquoi InscriptionRCS? Section - LegalPlace Style */}
      <section className="bg-white py-16 sm:py-20 lg:py-24" id="pourquoi-nous">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Pourquoi InscriptionRCS ?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Devenez indépendant en créant votre entreprise et ne perdez plus de temps ou d'argent avec le juridique.
            </p>
            <p className="text-lg md:text-xl font-semibold text-primary max-w-3xl mx-auto leading-relaxed">
              Faites ce que vous aimez faire, on s'occupe du juridique.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Notre service a été construit par des avocats.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Vos données sont en sécurité.</h3>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Vous êtes satisfait ou remboursé.</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Service sécurisé</h3>
                    <p className="text-muted-foreground">par des experts juridiques</p>
                  </div>
                </div>
              </div>
            </div>
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
                      <p className="text-sm text-muted-foreground">{structure.description}</p>
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
                      Commencer ma démarche
                    </Button>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Premium Service Information Section */}
      <section className="section-administrative" id="services-info">
        <div className="container-administrative">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Services inclus
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tout ce dont vous avez besoin pour créer votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Corporate Package */}
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
                  <p className="text-muted-foreground">Tout inclus - Service complet</p>
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
                  Commencer ma démarche
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
                  Commencer ma démarche
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
                <img src={faviconLogo} alt="Inscription RCS" className="h-8 w-auto object-contain" />
                <span className="text-xl font-semibold text-background">Inscription RCS</span>
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
                  © 2024 StartLégal - Service agréé pour l'immatriculation d'entreprises
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