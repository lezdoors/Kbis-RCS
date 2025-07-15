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
      {/* Modern Header with Glass Effect */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect border-b border-white/20 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container-max flex h-20 items-center justify-between px-6">
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
            <Button variant="outline" className="font-medium">
              <Play className="w-4 h-4 mr-2" />
              Voir démo
            </Button>
            <Button onClick={() => navigate('/choisir-statut')} className="btn-primary animate-pulse-glow">
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
          <div className="md:hidden glass-effect border-t border-white/20">
            <div className="container-max px-6 py-6 space-y-4">
              <nav className="space-y-3">
                <a href="#services" className="block text-foreground/80 hover:text-primary transition-colors font-medium">Services</a>
                <a href="#tarifs" className="block text-foreground/80 hover:text-primary transition-colors font-medium">Tarifs</a>
                <a href="#avis" className="block text-foreground/80 hover:text-primary transition-colors font-medium">Avis clients</a>
                <a href="#faq" className="block text-foreground/80 hover:text-primary transition-colors font-medium">FAQ</a>
              </nav>
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <Button variant="outline" className="justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Voir démo 2 min
                </Button>
                <Button onClick={() => navigate('/choisir-statut')} className="btn-primary justify-center">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Revolutionary Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
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
        
        <div className="container-max relative z-10">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/choisir-statut')} 
                  size="lg"
                  className="btn-primary text-lg px-10 py-6 hover-scale shadow-primary text-white font-semibold"
                >
                  <Sparkles className="mr-3 h-5 w-5" />
                  Commencer gratuitement
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 hover-scale border-2 font-semibold"
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
