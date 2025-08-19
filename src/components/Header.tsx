import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TrustBar } from "@/components/TrustBar";

// Updated logo
const logoUrl = "https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/sign/logo/logo%20(Website)-4.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80OGI5ZTJjOS1mNDNhLTQwM2ItOGQ4Zi0yYmZhMDViMmRkYzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL2xvZ28gKFdlYnNpdGUpLTQucG5nIiwiaWF0IjoxNzUyNjIxNzY1LCJleHAiOjE3ODQxNTc3NjV9.60JyyfwBu1udHkcxoTpXE1yw0ZSnDZ4BxWYKZAOrlwc";

export const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logoUrl} alt="RCS Express" className="h-10 w-auto md:h-16 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <button 
              onClick={() => navigate('/#kbis')}
              className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105"
            >
              Obtenir KBIS
            </button>
            <button 
              onClick={() => navigate('/choisir-statut')}
              className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105"
            >
              Inscription RCS
            </button>
            <a href="#tarifs" className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105">
              Tarifs
            </a>
            <a href="#faq" className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105">
              Questions fréquentes
            </a>
            <div className="flex items-center space-x-3 text-primary font-semibold">
              <Phone className="w-5 h-5" />
              <span className="text-base tracking-wide">01 XX XX XX XX</span>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              onClick={() => navigate('/login')} 
              variant="navy"
              size="touch"
              className="min-h-[44px]"
            >
              Se connecter
            </Button>
            <Button 
              onClick={() => navigate('/choisir-statut')} 
              variant="institutional"
              size="touch"
              className="min-h-[44px]"
            >
              Commencer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="py-6 space-y-6">
              <nav className="space-y-2">
                <button 
                  onClick={() => {
                    navigate('/#kbis');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200 w-full text-left"
                >
                  Obtenir KBIS
                </button>
                <button 
                  onClick={() => {
                    navigate('/choisir-statut');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200 w-full text-left"
                >
                  Inscription RCS
                </button>
                <a href="#tarifs" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200">
                  Tarifs
                </a>
                <a href="#faq" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200">
                  Questions fréquentes
                </a>
                <div className="flex items-center space-x-3 text-primary font-semibold py-3 px-4">
                  <Phone className="w-5 h-5" />
                  <span className="text-base tracking-wide">01 XX XX XX XX</span>
                </div>
              </nav>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="navy"
                  size="touch"
                  className="w-full min-h-[44px]"
                >
                  Se connecter
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/choisir-statut');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="institutional"
                  size="touch"
                  className="w-full min-h-[44px]"
                >
                  Commencer
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </header>
      <TrustBar />
    </>
  );
};