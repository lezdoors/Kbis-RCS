import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Official Inscription RCS logos - uploaded versions
const centerLogo = "/lovable-uploads/02f38eff-0bf3-4875-88a2-5fce416ad9e4.png"; // Centered logo for navbar

export const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
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
          </div>
        )}
      </div>
    </header>
  );
};