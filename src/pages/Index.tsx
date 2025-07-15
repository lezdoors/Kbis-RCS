import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, FileText, CheckCircle, Shield, Clock, Users, Star, ArrowRight, Phone, Mail, Menu, X, Play, Sparkles, Timer, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-image.jpg";
import modernLogo from "@/assets/modern-logo.png";
import heroBackground from "@/assets/hero-background.png";
import documentsImage from "@/assets/documents-image.jpg";
import teamSuccess from "@/assets/team-success.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const legalStructures = [
    {
      name: "SASU",
      fullName: "Société par Actions Simplifiée Unipersonnelle",
      price: "129€",
      description: "Idéal pour entreprendre seul avec flexibilité",
      icon: Building2,
      badge: "Plus populaire",
      idealFor: [
        "Freelance & consulting",
        "Activité de service",
        "Croissance rapide prévue"
      ],
      advantages: [
        "Président de la société",
        "Dividendes + rémunération",
        "Flexibilité statuts"
      ]
    },
    {
      name: "SARL",
      fullName: "Société à Responsabilité Limitée",
      price: "129€",
      description: "Structure classique pour plusieurs associés",
      icon: Users,
      idealFor: [
        "Projet avec associés",
        "Business familial",
        "Activité commerciale"
      ],
      advantages: [
        "Répartition des parts",
        "Gérance collective",
        "Stabilité juridique"
      ]
    },
    {
      name: "EURL",
      fullName: "Entreprise Unipersonnelle à Responsabilité Limitée",
      price: "129€",
      description: "Version unipersonnelle de la SARL",
      icon: FileText,
      idealFor: [
        "Entrepreneur individuel",
        "Protection patrimoine",
        "Activité artisanale"
      ],
      advantages: [
        "Responsabilité limitée",
        "Option IR ou IS",
        "Simplicité gestion"
      ]
    },
    {
      name: "SAS",
      fullName: "Société par Actions Simplifiée",
      price: "129€",
      description: "Flexibilité maximale pour les associés",
      icon: TrendingUp,
      idealFor: [
        "Levée de fonds",
        "Projet innovant",
        "Équipe dirigeante"
      ],
      advantages: [
        "Liberté statutaire",
        "Investisseurs externes",
        "Organes dirigeants"
      ]
    },
    {
      name: "Micro-entreprise",
      fullName: "Régime micro-entrepreneur",
      price: "79€",
      description: "Simple et rapide pour débuter",
      icon: Zap,
      idealFor: [
        "Test d'activité",
        "Revenus complémentaires",
        "Démarrage simple"
      ],
      advantages: [
        "Comptabilité allégée",
        "Cotisations au CA",
        "Régime fiscal avantageux"
      ]
    }
  ];

  const testimonials = [
    {
      text: "Très rapide et clair, j'ai reçu mon Kbis en 48h. Service impeccable ! L'équipe m'a accompagné de A à Z.",
      author: "Jean Moreau",
      business: "Créateur SASU",
      company: "TechConsult Pro",
      result: "Entreprise créée en 3 jours",
      image: teamSuccess,
      linkedin: "https://linkedin.com/in/jeanmoreau",
      rating: 5
    },
    {
      text: "Un service impeccable, équipe très professionnelle. Je recommande vivement. Économisé 500€ vs mon avocat habituel.",
      author: "Marie Lefebvre", 
      business: "SARL",
      company: "Boulangerie du Marché",
      result: "CA +300% en 6 mois",
      image: documentsImage,
      linkedin: "https://linkedin.com/in/marielefebvre",
      rating: 5
    },
    {
      text: "Simplicité et efficacité, parfait pour créer sa micro-entreprise ! Support réactif et conseils personnalisés.",
      author: "Pierre Dubois",
      business: "Micro-entreprise",
      company: "Design & Innovation",
      result: "Premier client dès J+1",
      image: heroImage,
      linkedin: "https://linkedin.com/in/pierredubois",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce que le RCS ?",
      answer: "Le Registre du Commerce et des Sociétés est un registre public tenu par les greffes des tribunaux de commerce. Il recense toutes les entreprises commerciales et les sociétés en France.",
      icon: FileText,
      category: "Général"
    },
    {
      question: "Quels documents dois-je fournir ?",
      answer: "Les documents varient selon votre statut juridique. Généralement : pièce d'identité, justificatif de domicile, statuts signés, attestation de dépôt des fonds, et selon l'activité, des justificatifs spécifiques.",
      icon: CheckCircle,
      category: "Documents"
    },
    {
      question: "En combien de temps vais-je recevoir mon Kbis ?",
      answer: "Généralement sous 48-72h après validation complète de votre dossier par nos experts et transmission au greffe compétent.",
      icon: Clock,
      category: "Délais"
    },
    {
      question: "Que se passe-t-il après le paiement ?",
      answer: "Nous traitons immédiatement votre dossier, vérifions tous les documents et transmettons au greffe. Vous recevez un suivi par email à chaque étape.",
      icon: Shield,
      category: "Processus"
    },
    {
      question: "Vos tarifs sont-ils réellement tout compris ?",
      answer: "Oui, absolument ! Nos tarifs incluent tous les frais : traitement du dossier, vérification par nos experts, transmission au greffe, et suivi personnalisé. Aucun frais caché.",
      icon: Star,
      category: "Tarifs"
    },
    {
      question: "Puis-je modifier mes statuts après la création ?",
      answer: "Oui, vous pouvez modifier vos statuts à tout moment. Nous proposons également ce service pour 89€ TTC avec accompagnement complet.",
      icon: Users,
      category: "Modifications"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header with Glass Effect */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect border-b border-white/20 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container-max flex h-20 items-center justify-between container-fluid">
          {/* Modern Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center p-1">
              <img src={modernLogo} alt="RCS Express" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold text-gradient">RCS Express</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground/80 hover:text-primary transition-colors font-medium">Services</a>
            <a href="#tarifs" className="text-foreground/80 hover:text-primary transition-colors font-medium">Tarifs</a>
            <a href="#avis" className="text-foreground/80 hover:text-primary transition-colors font-medium">Avis clients</a>
            <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors font-medium">FAQ</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="btn-interactive focus-ring font-medium hover-scale">
              <Play className="w-4 h-4 mr-2" />
              Voir démo
            </Button>
            <Button onClick={() => navigate('/choisir-statut')} className="btn-primary btn-interactive focus-ring animate-pulse-glow hover-scale">
              Commencer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-white/20 mobile-nav-slide">
            <div className="container-max container-fluid py-6 mobile-spacing">
              <nav className="space-y-4">
                <a href="#services" className="block text-foreground/80 hover:text-primary transition-colors font-medium py-2 btn-touch focus-ring">Services</a>
                <a href="#tarifs" className="block text-foreground/80 hover:text-primary transition-colors font-medium py-2 btn-touch focus-ring">Tarifs</a>
                <a href="#avis" className="block text-foreground/80 hover:text-primary transition-colors font-medium py-2 btn-touch focus-ring">Avis clients</a>
                <a href="#faq" className="block text-foreground/80 hover:text-primary transition-colors font-medium py-2 btn-touch focus-ring">FAQ</a>
              </nav>
              <div className="flex flex-col space-y-4 pt-6 border-t border-white/20">
                <Button variant="outline" className="btn-touch-lg justify-center btn-interactive focus-ring">
                  <Play className="w-5 h-5 mr-2" />
                  Voir démo 2 min
                </Button>
                <Button onClick={() => navigate('/choisir-statut')} className="btn-primary btn-touch-lg justify-center btn-interactive focus-ring">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Revolutionary Hero Section */}
      <section className="relative section-spacing pt-24 overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent opacity-50"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        
        <div className="container-max container-fluid relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Content */}
            <div className="space-y-10 animate-slide-in-left">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Créez votre{" "}
                  <span className="text-gradient relative">
                    entreprise
                    <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-xl opacity-50 animate-pulse-glow"></div>
                  </span>{" "}
                  en moins de 15 minutes
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
                  Simplifiez votre immatriculation RCS avec notre plateforme intelligente
                </h2>
              </div>
              
              {/* Two-Button CTA Layout */}
              <div className="flex flex-col sm:flex-row gap-4 mobile-spacing">
                <Button 
                  onClick={() => navigate('/choisir-statut')} 
                  size="lg"
                  className="btn-primary btn-touch-lg hover-scale shadow-primary text-white font-semibold btn-interactive focus-ring"
                >
                  <Sparkles className="mr-3 h-5 w-5" />
                  Commencer gratuitement
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="btn-touch-lg hover-scale border-2 font-semibold btn-interactive focus-ring"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Voir démo 2 min
                </Button>
              </div>

              {/* Animated Trust Indicators */}
              <div className="space-y-6">
                <div className="floating-card animate-float">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-6 w-6 text-success" />
                      <span className="font-semibold text-lg">3,247 entreprises créées cette année</span>
                    </div>
                    <Badge variant="secondary" className="animate-pulse">En direct</Badge>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 text-sm bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                    <Timer className="h-5 w-5 text-primary" />
                    <span className="font-medium">Moins de 15 minutes</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-medium">100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                    <Zap className="h-5 w-5 text-warning" />
                    <span className="font-medium">Kbis sous 48h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="relative animate-slide-in-right">
              {/* Main Image */}
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Professional French business registration" 
                  className="w-full h-auto rounded-2xl shadow-floating"
                />
              </div>

              {/* Floating Benefit Cards */}
              <div className="absolute -top-8 -left-8 floating-card animate-float w-48 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">48h</div>
                  <div className="text-sm text-muted-foreground">Délai moyen</div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 floating-card animate-float w-56 z-20" style={{animationDelay: '2s'}}>
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-warning fill-warning" />
                  <div>
                    <div className="font-bold">4.9/5</div>
                    <div className="text-sm text-muted-foreground">Note client</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 floating-card animate-float w-44 z-20" style={{animationDelay: '4s'}}>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">100%</div>
                  <div className="text-sm text-muted-foreground">Conforme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="section-padding bg-gradient-to-b from-accent/30 to-muted/50" id="services">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Processus simplifié
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus optimisé pour créer votre entreprise en <span className="font-semibold text-primary">moins de 15 minutes</span>
            </p>
          </div>

          {/* Enhanced Timeline Layout */}
          <div className="relative">
            {/* Timeline Steps */}
            <div className="grid md:grid-cols-3 gap-12 relative">
              
              {/* Step 1 */}
              <div className="relative group">
                <div className="text-center space-y-6 card-elegant p-10 hover-scale transition-all duration-500 group-hover:shadow-primary/20">
                  {/* Enhanced Icon */}
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
                      <Building2 className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Choisissez votre statut</h3>
                    <p className="text-muted-foreground text-lg">
                      Sélectionnez parmi SASU, SARL, EURL, SAS ou micro-entreprise avec notre guide intelligent
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Temps estimé</span>
                        <span className="font-semibold text-primary">2-3 min</span>
                      </div>
                      <div className="progress-indicator">
                        <div className="progress-bar w-[30%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Feature */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="sm" className="mt-4">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Essayer maintenant
                    </Button>
                  </div>
                </div>

                {/* Timeline Connector */}
                <div className="hidden md:block timeline-connector after:content-[''] after:absolute after:top-1/2 after:left-full after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transform after:-translate-y-1/2"></div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="text-center space-y-6 card-elegant p-10 hover-scale transition-all duration-500 group-hover:shadow-primary/20">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-secondary/40 transition-all duration-300">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Formulaire guidé</h3>
                    <p className="text-muted-foreground text-lg">
                      Nos experts vous accompagnent à chaque étape avec un assistant intelligent
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Temps estimé</span>
                        <span className="font-semibold text-secondary">8-10 min</span>
                      </div>
                      <div className="progress-indicator">
                        <div className="progress-bar w-[70%] bg-secondary"></div>
                      </div>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="sm" className="mt-4">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Voir l'aperçu
                    </Button>
                  </div>
                </div>

                <div className="hidden md:block timeline-connector after:content-[''] after:absolute after:top-1/2 after:left-full after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-secondary after:to-success after:transform after:-translate-y-1/2"></div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="text-center space-y-6 card-elegant p-10 hover-scale transition-all duration-500 group-hover:shadow-success/20">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-success to-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-success/40 transition-all duration-300">
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Recevez votre Kbis</h3>
                    <p className="text-muted-foreground text-lg">
                      Document officiel envoyé directement par le greffe sous 48-72h maximum
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Délai de réception</span>
                        <span className="font-semibold text-success">48-72h</span>
                      </div>
                      <div className="progress-indicator">
                        <div className="progress-bar w-full bg-success"></div>
                      </div>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="sm" className="mt-4">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Exemple de Kbis
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="floating-card max-w-md mx-auto">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold">Prêt à commencer ?</h4>
                  <p className="text-muted-foreground">Rejoignez les 3,247 entrepreneurs qui nous ont fait confiance cette année</p>
                  <Button 
                    onClick={() => navigate('/choisir-statut')} 
                    className="btn-primary w-full"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Démarrer maintenant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Structure Selector (Premium Cards) */}
      <section className="section-padding bg-muted" id="structures">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Choisissez votre structure
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Sélecteur de statut juridique</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comparez et choisissez la structure juridique parfaite pour votre projet entrepreneurial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mobile-grid">
            {legalStructures.map((structure, index) => {
              const IconComponent = structure.icon;
              return (
                <Card 
                  key={structure.name}
                  className={`relative card-hover-elevated cursor-pointer border-2 group focus-ring btn-interactive ${
                    structure.badge ? 'border-primary shadow-primary/20 ring-2 ring-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => navigate('/choisir-statut')}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate('/choisir-statut');
                    }
                  }}
                >
                  {structure.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 font-semibold shadow-lg animate-pulse-glow">
                        {structure.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center space-y-6 pb-6">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold">{structure.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {structure.fullName}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        À partir de {structure.price}
                      </div>
                      <p className="text-muted-foreground">{structure.description}</p>
                    </div>

                    {/* Ideal For Section */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Idéal pour :</h4>
                      <ul className="space-y-2">
                        {structure.idealFor.map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advantages Section */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Avantages :</h4>
                      <ul className="space-y-2">
                        {structure.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-warning fill-warning mr-2 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <Button 
                        className="w-full btn-primary btn-touch btn-interactive focus-ring"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/choisir-statut');
                        }}
                      >
                        Choisir {structure.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full btn-interactive focus-ring mobile-optimized"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Comparer functionality would go here
                        }}
                      >
                        Comparer les structures
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="floating-card max-w-lg mx-auto">
              <div className="space-y-4">
                <h4 className="text-xl font-bold">Besoin d'aide pour choisir ?</h4>
                <p className="text-muted-foreground">Nos experts vous conseillent gratuitement en 2 minutes</p>
                <Button variant="outline" className="hover-scale">
                  <Phone className="mr-2 h-4 w-4" />
                  Être rappelé gratuitement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section (Sales-Focused) */}
      <section className="section-padding" id="tarifs">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Offre spéciale
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Tarifs transparents et compétitifs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-semibold text-success">Économisez 500€ vs avocat traditionnel</span> • Prix moyen marché: 400€
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SASU/SARL/EURL/SAS Card */}
            <Card className="relative card-elegant p-8 hover-lift border-2 border-primary/20 shadow-primary/10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-success text-success-foreground px-6 py-2 font-semibold shadow-lg">
                  💰 Économisez 500€
                </Badge>
              </div>
              
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl">SASU / SARL / EURL / SAS</CardTitle>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-primary">129€</div>
                  <div className="text-sm text-muted-foreground line-through">Prix marché: 629€</div>
                  <CardDescription className="text-lg font-medium">TTC - Tout inclus • Satisfaction garantie</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Inclus dans le prix */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b border-border pb-2">✨ Inclus dans le prix</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Traitement complet du dossier par nos experts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Rédaction des statuts personnalisés</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Assistance téléphonique dédiée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Envoi sécurisé au greffe compétent</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Suivi en temps réel par email + SMS</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Garantie remboursement 30 jours</span>
                    </div>
                  </div>
                </div>

                {/* Guarantee Badge */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-success font-semibold">
                    <Shield className="h-5 w-5" />
                    <span>Garantie satisfait ou remboursé</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  className="w-full btn-primary text-lg py-6 animate-pulse-glow"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Créer ma société - 129€
                </Button>
              </CardContent>
            </Card>

            {/* Micro-entreprise Card */}
            <Card className="card-elegant p-8 hover-lift">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Micro-entreprise</CardTitle>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-primary">79€</div>
                  <div className="text-sm text-muted-foreground line-through">Prix marché: 179€</div>
                  <CardDescription className="text-lg font-medium">TTC - Démarrage express</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b border-border pb-2">🚀 Inclus dans le prix</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Immatriculation simplifiée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Support dédié par email</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Confirmation officielle</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Documents administratifs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span>Guide fiscal personnalisé</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/choisir-statut')}
                  variant="outline"
                  className="w-full text-lg py-6 border-2 hover:bg-primary hover:text-primary-foreground"
                  size="lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Créer ma micro-entreprise - 79€
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4">Pourquoi nous choisir ?</h3>
              <p className="text-muted-foreground">Comparaison avec les solutions traditionnelles</p>
            </div>

            <div className="floating-card">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                  <h4 className="font-semibold">Avocat traditionnel</h4>
                  <div className="text-muted-foreground space-y-1">
                    <div>Prix: 500-800€</div>
                    <div>Délai: 2-3 semaines</div>
                    <div>RDV physiques requis</div>
                  </div>
                </div>

                <div className="space-y-3 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-success text-success-foreground">Recommandé</Badge>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-primary">RCS Express</h4>
                  <div className="text-muted-foreground space-y-1">
                    <div className="font-semibold text-success">Prix: 129€ TTC</div>
                    <div className="font-semibold text-success">Délai: 48-72h</div>
                    <div className="font-semibold text-success">100% en ligne</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold">Faire soi-même</h4>
                  <div className="text-muted-foreground space-y-1">
                    <div>Prix: Frais de greffe</div>
                    <div>Délai: Imprévisible</div>
                    <div>Risque d'erreurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency CTA */}
          <div className="text-center mt-16">
            <div className="floating-card max-w-lg mx-auto">
              <div className="space-y-4">
                <Badge variant="secondary" className="animate-pulse">⏰ Offre limitée</Badge>
                <h4 className="text-xl font-bold">Prix préférentiel jusqu'au 31 janvier</h4>
                <p className="text-muted-foreground">
                  Profitez de notre tarif de lancement. <span className="font-semibold">Prix normal: 199€</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section (Trust Building) */}
      <section className="section-padding bg-accent">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Nos avantages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Pourquoi 9 entrepreneurs sur 10 nous choisissent
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plus de <span className="font-semibold text-primary">12,500 entreprises créées</span> avec un taux de satisfaction de 4.9/5
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Accompagnement expert 100% humain</h3>
              <p className="text-muted-foreground mb-4">Nos juristes spécialisés vous accompagnent de A à Z</p>
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Taux de satisfaction client</div>
            </div>

            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-primary rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <Clock className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Délais record garantis</h3>
              <p className="text-muted-foreground mb-4">Kbis reçu sous 48-72h ou remboursé</p>
              <div className="text-2xl font-bold text-success">48h</div>
              <div className="text-sm text-muted-foreground">Délai moyen de traitement</div>
            </div>

            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-warning to-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité & conformité totales</h3>
              <p className="text-muted-foreground mb-4">Données chiffrées, conforme RGPD</p>
              <div className="text-2xl font-bold text-warning">100%</div>
              <div className="text-sm text-muted-foreground">Dossiers conformes</div>
            </div>

            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-warning rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Garantie satisfait ou remboursé</h3>
              <p className="text-muted-foreground mb-4">30 jours pour changer d'avis</p>
              <div className="text-2xl font-bold text-primary">500€</div>
              <div className="text-sm text-muted-foreground">Économie vs avocat</div>
            </div>

            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-success rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <Phone className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Support client 6j/7</h3>
              <p className="text-muted-foreground mb-4">Une équipe dédiée à votre disposition</p>
              <div className="text-2xl font-bold text-secondary">9.1/10</div>
              <div className="text-sm text-muted-foreground">Note qualité support</div>
            </div>

            <div className="floating-card text-center group hover-scale">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-warning rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow transition-all duration-300">
                  <Star className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Leader du marché français</h3>
              <p className="text-muted-foreground mb-4">Plus de 12,500 entrepreneurs nous font confiance</p>
              <div className="text-2xl font-bold text-success">4.9/5</div>
              <div className="text-sm text-muted-foreground">Moyenne avis clients</div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="text-center">
            <div className="floating-card max-w-4xl mx-auto">
              <div className="space-y-6">
                <h4 className="text-xl font-bold">Ils nous recommandent</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                  <div className="text-lg font-semibold">• BPI France</div>
                  <div className="text-lg font-semibold">• CCI Paris</div>
                  <div className="text-lg font-semibold">• Réseau Entreprendre</div>
                  <div className="text-lg font-semibold">• APCE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials (Credibility Boost) */}
      <section className="section-padding" id="avis">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Témoignages clients
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment nos clients ont réussi leur création d'entreprise
            </p>
          </div>

          {/* Rotating Testimonials Carousel */}
          <div className="swipe-container md:grid md:grid-cols-3 gap-8 mb-16 flex md:flex-none overflow-x-auto md:overflow-visible snap-x snap-mandatory">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="floating-card card-hover-elevated group relative overflow-hidden swipe-item min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink mr-6 md:mr-0">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                />
                
                <CardContent className="relative z-10 p-8 space-y-6">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Result Highlight */}
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="text-success font-semibold text-sm">Résultat obtenu:</div>
                    <div className="text-success font-bold">{testimonial.result}</div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      <div className="text-xs text-primary">{testimonial.business}</div>
                    </div>
                    {/* LinkedIn Verification */}
                    <a 
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Badge variant="outline" className="text-xs">
                        ✓ LinkedIn
                      </Badge>
                    </a>
                  </div>

                  {/* Case Study Link */}
                  <Button 
                    variant="ghost" 
                    className="w-full btn-touch btn-interactive focus-ring opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Voir l'étude de cas complète
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-8">
            <div className="floating-card max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">12,500+</div>
                  <div className="text-muted-foreground">Entreprises créées</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-success">4.9/5</div>
                  <div className="text-muted-foreground">Note moyenne</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-warning">95%</div>
                  <div className="text-muted-foreground">Clients recommandent</div>
                </div>
              </div>
            </div>

            {/* CTA for More Reviews */}
            <div className="space-y-6 mobile-spacing">
              <p className="text-lg text-muted-foreground mobile-optimized">Vous voulez voir plus d'avis ?</p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Button variant="outline" className="btn-touch btn-interactive focus-ring hover-scale">
                  ⭐ Voir tous les avis Google
                </Button>
                <Button variant="outline" className="btn-touch btn-interactive focus-ring hover-scale">
                  💼 Avis Trustpilot
                </Button>
                <Button variant="outline" className="btn-touch btn-interactive focus-ring hover-scale">
                  📺 Témoignages vidéo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ (Conversion Optimization) */}
      <section className="section-padding bg-muted" id="faq">
        <div className="container-max">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="text-lg px-4 py-2 font-medium">
              Questions fréquentes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Tout ce que vous devez savoir
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous anticipons vos questions pour vous offrir une expérience sans friction
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* FAQ Categories */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {["Général", "Documents", "Délais", "Processus", "Tarifs", "Modifications"].map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  className="text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Enhanced FAQ Accordion */}
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon;
                return (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="floating-card border-none hover-lift"
                  >
                    <AccordionTrigger className="text-left font-semibold p-8 hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold">{faq.question}</div>
                          <div className="text-sm text-muted-foreground font-normal">
                            Catégorie: {faq.category}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-8">
                      <div className="space-y-4 pl-16">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Related Links */}
                        {index === 0 && (
                          <div className="bg-accent/50 rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2">Liens utiles:</div>
                            <div className="space-x-4">
                              <a href="#services" className="text-primary hover:underline text-sm">
                                → Comment ça marche
                              </a>
                              <a href="#structures" className="text-primary hover:underline text-sm">
                                → Choisir sa structure
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Special CTA for last question */}
                        {index === faqs.length - 1 && (
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-primary">Besoin d'aide pour les modifications ?</div>
                                <div className="text-sm text-muted-foreground">Nos experts vous accompagnent</div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Consulter
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Bottom CTA Section */}
            <div className="text-center mt-16">
              <div className="floating-card max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold">Vous avez encore des questions ?</h4>
                    <p className="text-muted-foreground">
                      Nos experts sont là pour vous accompagner dans votre projet entrepreneurial
                    </p>
                  </div>

                  {/* Multi-Channel Support */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 py-6 hover-scale"
                      onClick={() => {/* Chat integration */}}
                    >
                      <Users className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Chat en direct</div>
                        <div className="text-sm opacity-70">Réponse immédiate</div>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="flex-1 py-6 hover-scale"
                      onClick={() => {/* Phone consultation */}}
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Consultation téléphonique</div>
                        <div className="text-sm opacity-70">Gratuite • 15 min</div>
                      </div>
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button 
                      size="lg"
                      className="btn-primary w-full py-6"
                      onClick={() => navigate('/choisir-statut')}
                    >
                      <Sparkles className="mr-3 h-5 w-5" />
                      Je suis prêt(e) à commencer
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
