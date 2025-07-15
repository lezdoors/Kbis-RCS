import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail, Menu, X, Info, MapPin, Award, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import modernLogo from "@/assets/modern-logo.png";
import heroImage from "@/assets/hero-image.jpg";

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
      {/* Premium Administrative Header */}
      <header className="header-administrative shadow-medium">
        <div className="container-administrative">
          <div className="flex h-20 items-center justify-between py-4">
            {/* Enhanced Logo with Real Image */}
            <div className="flex items-center space-x-4">
              <img 
                src={modernLogo} 
                alt="RCS Express" 
                className="w-16 h-16 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">RCS Express</span>
                <span className="text-sm text-muted-foreground font-medium">Immatriculation ultra-rapide</span>
              </div>
            </div>

            {/* Desktop Navigation with Phone */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#tarifs" className="text-foreground hover:text-primary transition-colors font-medium">
                Tarifs officiels
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
                Questions fréquentes
              </a>
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <Phone className="w-4 h-4" />
                <span className="text-sm">01 XX XX XX XX</span>
              </div>
            </nav>

            {/* Desktop CTA with Trust Elements */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>Sécurisé SSL</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')} 
                className="btn-administrative-outline btn-touch"
              >
                Se connecter
              </Button>
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                className="btn-administrative btn-touch"
              >
                Commencer ma démarche
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

          {/* Enhanced Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background shadow-medium">
              <div className="py-6 space-y-6">
                <nav className="space-y-1">
                  <a href="#services" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 text-base font-medium py-3 px-4 rounded-lg">
                    Services
                  </a>
                  <a href="#tarifs" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 text-base font-medium py-3 px-4 rounded-lg">
                    Tarifs officiels
                  </a>
                  <a href="#faq" className="block text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 text-base font-medium py-3 px-4 rounded-lg">
                    Questions fréquentes
                  </a>
                </nav>
                
                {/* Mobile Contact */}
                <div className="px-4 py-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Besoin d'aide ?</p>
                      <p className="text-sm text-primary font-semibold">01 XX XX XX XX</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Trust Elements */}
                <div className="px-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">Sécurisé SSL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">4.9/5 sur Google</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }} 
                    className="btn-administrative-outline w-full btn-touch-lg"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/choisir-statut');
                      setIsMobileMenuOpen(false);
                    }} 
                    className="btn-administrative w-full btn-touch-lg"
                  >
                    Commencer ma démarche
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* LegalPlace-Inspired Hero Section */}
      <section className="hero-administrative section-administrative overflow-hidden">
        <div className="container-administrative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT SIDE */}
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              {/* Headline & Subheadline */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                  Inscription RCS ultra rapide dès <span className="text-primary">79€</span> !
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Accompagnement personnalisé par un juriste dédié jusqu'à l'obtention du Kbis
                </p>
              </div>

              {/* Activity Selector */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Quel sera votre domaine d'activité ?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {legalStructures.slice(0, 6).map((structure) => {
                    const IconComponent = structure.icon;
                    return (
                      <div 
                        key={structure.name}
                        className="flex flex-col items-center p-3 sm:p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 hover:shadow-medium transition-all duration-300 cursor-pointer group transform hover:scale-105"
                        onClick={() => navigate('/choisir-statut')}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-primary group-hover:text-primary/80 transition-colors">
                          <IconComponent className="w-full h-full" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-center group-hover:text-primary transition-colors">{structure.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Social Proof Stack */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9/5 sur Google</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Excellent Trustpilot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">Service agréé</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <p className="text-sm text-muted-foreground font-medium">
                    + 3,247 entreprises créées cette année
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">15 créations aujourd'hui</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Visual Testimonial */}
              <div className="bg-background border border-border rounded-xl p-6 space-y-4 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold shadow-soft">
                    M
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-foreground italic mb-2 text-sm sm:text-base">
                      "Simple et efficace, j'ai reçu mon Kbis en 48h. Service impeccable !"
                    </blockquote>
                    <cite className="text-sm text-muted-foreground font-medium">
                      - Marie L., Fondatrice SARL
                    </cite>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <MessageCircle className="h-3 w-3" />
                  <span>Avis vérifié - Il y a 2 jours</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => navigate('/choisir-statut')} 
                size="lg"
                className="btn-administrative btn-touch-lg text-lg btn-ripple w-full md:w-auto"
              >
                Commencer mon inscription RCS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* RIGHT SIDE - Professional Illustration */}
            <div className="relative hidden lg:block">
              <div className="card-premium animate-slide-down relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src={heroImage} 
                    alt="Professional business setup" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center shadow-large">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      Votre Kbis en 48h
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-success" />
                        </div>
                        <span>Dossier traité par un juriste</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                          <Shield className="h-4 w-4 text-success" />
                        </div>
                        <span>Conformité garantie</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-success" />
                        </div>
                        <span>Délai respecté</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Hero Enhancement */}
            <div className="lg:hidden mt-8 space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Garantie satisfait ou remboursé</p>
                    <p className="text-xs text-muted-foreground">Service 100% sécurisé</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-success" />
                  <span>SSL</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-3 w-3 text-orange-500" />
                  <span>Certifié</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>4.9/5</span>
                </div>
              </div>
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
            {processSteps.map((step, index) => (
              <div key={step.number} className="text-center space-y-6 group">
                {/* Step Number with Premium Styling */}
                <div className="relative mx-auto w-20 h-20">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center text-2xl font-bold shadow-large group-hover:shadow-xl transition-all duration-300">
                    {step.number}
                  </div>
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-20 w-full h-0.5 bg-gradient-to-r from-primary to-transparent">
                      <ArrowRight className="absolute -top-2 -right-2 w-4 h-4 text-primary" />
                    </div>
                  )}
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
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={() => navigate('/choisir-statut')} 
              className="btn-administrative btn-touch-lg text-lg btn-ripple"
              size="lg"
            >
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

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  className="w-full btn-administrative btn-touch-lg text-lg btn-ripple"
                >
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

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  className="w-full btn-administrative-outline btn-touch-lg text-lg"
                >
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
              return (
                <div key={index} className="card-premium group text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
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
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="card-premium overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline text-foreground text-base md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
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