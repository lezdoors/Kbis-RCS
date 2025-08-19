import { Button } from "@/components/ui/button";
import { Phone, Building2 } from "lucide-react";

export const KBISHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <div className="font-bold text-xl text-primary">
                KBIS Express
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              Obtenir KBIS
            </a>
            <a 
              href="#tarifs"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              Tarifs
            </a>
            <a 
              href="#support"
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              Support
            </a>
            <div className="flex items-center space-x-3 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              <span className="text-sm">01 XX XX XX XX</span>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Se connecter
            </Button>
            <Button 
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Commander
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};