import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Shield, CheckCircle, Building2, FileText, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const KBISHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Recherche terminée",
      description: `Résultats trouvés pour "${searchQuery}"`,
    });
    
    // Navigate to search results
    navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-50 via-background to-gold-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              Obtenez votre KBIS
              <span className="block text-secondary">en 2 heures</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Service rapide, sécurisé et moins cher que la concurrence.
              <span className="block font-medium text-foreground mt-2">
                Documents certifiés • Livraison garantie • Prix transparent
              </span>
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SIREN, SIRET ou nom d'entreprise"
                  className="w-full h-16 pl-14 pr-6 text-lg border-2 border-border rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 bg-white shadow-lg"
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                disabled={!searchQuery.trim() || isLoading}
                className="w-full h-14 text-lg font-semibold bg-destructive hover:bg-destructive/90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Recherche en cours...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher maintenant
                  </>
                )}
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground mt-3">
              ex: 123456789, Apple France, ou SASU TECH INNOVATION
            </p>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-semibold text-primary">50,000+</span>
              </div>
              <span className="text-muted-foreground">KBIS traités</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-success" />
                <span className="font-semibold text-primary">2h</span>
              </div>
              <span className="text-muted-foreground">Livraison garantie</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="font-semibold text-primary">€39</span>
              </div>
              <span className="text-muted-foreground">Prix transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};