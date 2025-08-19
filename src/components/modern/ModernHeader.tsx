import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

export const ModernHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header-modern">
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="font-bold text-xl text-primary">
              KBIS Express
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-feature text-foreground hover:text-primary transition-colors">
              Obtenir KBIS
            </a>
            <a href="#support" className="text-feature text-foreground hover:text-primary transition-colors">
              Support
            </a>
            <a href="#a-propos" className="text-feature text-foreground hover:text-primary transition-colors">
              À propos
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>01 23 45 67 89</span>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Se connecter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Commander
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-feature text-foreground hover:text-primary">
                Obtenir KBIS
              </a>
              <a href="#support" className="block px-3 py-2 text-feature text-foreground hover:text-primary">
                Support
              </a>
              <a href="#a-propos" className="block px-3 py-2 text-feature text-foreground hover:text-primary">
                À propos
              </a>
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Se connecter
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Commander
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};