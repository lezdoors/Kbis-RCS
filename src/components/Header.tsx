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
            <a href="#comment-ca-marche" className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105">
              Comment ça marche ?
            </a>
            <a href="#pourquoi-nous" className="text-foreground hover:text-primary font-medium text-base tracking-wide transition-colors duration-200 hover:scale-105">
              Pourquoi nous ?
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg min-h-[44px] transition-all duration-200 hover:scale-105"
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
                <a href="#comment-ca-marche" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200">
                  Comment ça marche ?
                </a>
                <a href="#pourquoi-nous" className="block text-foreground hover:text-primary text-base font-medium py-3 px-4 tracking-wide transition-colors duration-200">
                  Pourquoi nous ?
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full min-h-[44px] transition-all duration-200"
                >
                  Se connecter
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/choisir-statut');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full min-h-[44px] transition-all duration-200"
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