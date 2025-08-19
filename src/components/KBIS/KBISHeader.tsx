import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const KBISHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/public/lovable-uploads/44d3fbcd-ea82-40a6-81b1-53e0f643dd45.png" 
              alt="Créez • Protégez • Lancez"
              className="h-8 w-auto"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
              }}
            />
            <div className="font-bold text-xl text-brand-blue hidden">
              Créez • Protégez • Lancez
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#"
              className="text-foreground hover:text-brand-blue font-medium transition-colors duration-200"
            >
              Obtenir KBIS
            </a>
            <a 
              href="#support"
              className="text-foreground hover:text-brand-blue font-medium transition-colors duration-200"
            >
              Support
            </a>
            <a 
              href="#a-propos"
              className="text-foreground hover:text-brand-blue font-medium transition-colors duration-200"
            >
              À propos
            </a>
            <div className="flex items-center space-x-3 text-brand-blue font-semibold">
              <Phone className="w-4 h-4" />
              <span className="text-sm">01 23 45 67 89</span>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              Se connecter
            </Button>
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
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