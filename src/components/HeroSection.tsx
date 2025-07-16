import { Button } from "@/components/ui/button";
import { Star, ArrowRight, TrendingUp, Award, Shield, Clock, Users, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className = "" }: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    trackEvent({
      event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK
    });
    navigate('/choisir-statut');
  };

  return (
    <section className={`min-h-screen flex items-center py-8 md:py-16 ${className}`} style={{ background: 'var(--gradient-subtle)' }}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-black leading-[0.9] text-foreground animate-fade-in">
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Créez votre entreprise en 24h
              </span>
              <br />
              <span className="text-accent font-black">
                Garanti ou remboursé
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-semibold max-w-2xl mx-auto lg:mx-0 animate-slide-down" style={{ animationDelay: '0.1s' }}>
              3x plus rapide que LegalPlace et LegalStart.
              <br className="hidden sm:block" />
              <span className="text-primary font-bold">Technologie 2025, résultats garantis.</span>
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-lg">4.9/5 étoiles</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="font-semibold">Plus de 10,000 entreprises créées</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-success" />
                <span className="font-semibold">Certifié greffes tribunaux</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Button
                onClick={handleCTAClick}
                className="text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-2xl text-lg md:text-xl w-full sm:w-auto min-h-[56px] md:min-h-[64px] relative overflow-hidden transition-smooth hover-shadow-lift animate-shimmer group"
                style={{ 
                  background: 'linear-gradient(to right, #EA580C, #DC2626)',
                  boxShadow: 'var(--shadow-xl)',
                  animation: 'pulse 2s infinite'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Commencer maintenant - 2 min
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-fast" />
                </span>
              </Button>
              
              {/* Urgency indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-sm font-medium text-muted-foreground">
                <motion.div 
                  className="w-3 h-3 bg-success rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>Traitement immédiat - Garantie 24h</span>
              </div>
            </div>

            {/* Additional trust elements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Express 24h</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-sm font-semibold">Qualité premium</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-semibold">100% légal</span>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Animation */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-60" style={{ background: 'var(--gradient-primary)' }} />
            
            {/* Main 3D Scene Container */}
            <div className="relative z-10 aspect-square max-w-lg mx-auto">
              
              {/* 3D Businessman climbing stairs */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Blue stairs - stepped animation */}
                <div className="absolute inset-0 flex items-end justify-center">
                  {[1, 2, 3, 4, 5].map((step, index) => (
                    <motion.div
                      key={step}
                      className="rounded-t-lg shadow-lg"
                      style={{
                        width: '60px',
                        height: `${(step) * 40}px`,
                        marginRight: index === 4 ? '0' : '4px',
                        background: 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary-glow)))'
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </div>

                {/* Businessman figure */}
                <motion.div
                  className="absolute top-1/4 right-1/4 w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"
                  animate={{ 
                    x: [0, 20, 40, 60, 80],
                    y: [40, 30, 20, 10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>

              {/* Floating success elements */}
              <motion.div
                className="absolute top-8 right-8 rounded-full p-3 shadow-lg"
                style={{ background: 'linear-gradient(to right, hsl(var(--success)), hsl(var(--success-foreground))' }}
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute top-16 left-8 rounded-full p-3 shadow-lg"
                style={{ background: 'linear-gradient(to right, hsl(var(--warning)), #f59e0b)' }}
                animate={{ 
                  y: [5, -5, 5],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-16 left-12 rounded-full p-2 shadow-lg"
                style={{ background: 'linear-gradient(to right, #a855f7, #9333ea)' }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  y: [-3, 3, -3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Star className="w-5 h-5 text-white fill-current" />
              </motion.div>

              {/* Floating text badges */}
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2"
                style={{ boxShadow: 'var(--shadow-soft)' }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold text-primary">24h garanties</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 right-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1"
                style={{ boxShadow: 'var(--shadow-soft)' }}
                animate={{ 
                  y: [6, -6, 6],
                  x: [-2, 2, -2]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <span className="text-xs font-semibold text-success">Succès ✓</span>
              </motion.div>
            </div>
            
            {/* Additional floating orbs */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full blur-xl"
              style={{ background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))' }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-xl"
              style={{ background: 'linear-gradient(to top right, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.3))' }}
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};