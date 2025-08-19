import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ModernHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Recherche terminée",
      description: `Résultats trouvés pour "${searchQuery}"`,
    });
    
    navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container-modern pt-24 pb-32">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          {/* Main headline */}
          <div className="space-y-6">
            <h1 className="text-hero">
              Obtenez votre KBIS 
              <span className="block text-primary">en 2 heures</span>
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              Service premium certifié • Le plus rapide de France
              <span className="block text-lg text-foreground font-medium mt-2">
                Documents officiels • Support 7j/7 • Prix transparent
              </span>
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <div className="card-modern p-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center flex-1 gap-3 px-4">
                      <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SIREN, SIRET ou nom d'entreprise"
                        className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-0 p-0"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!searchQuery.trim() || isLoading}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-xl"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Recherche...
                        </div>
                      ) : (
                        <>
                          Rechercher
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ex: 123456789, Apple France, ou SASU TECH INNOVATION
              </p>
            </form>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="font-semibold text-foreground">50,000+</span>
              <span className="text-muted-foreground">documents traités</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="font-semibold text-foreground">2h</span>
              <span className="text-muted-foreground">livraison garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="font-semibold text-foreground">Premium</span>
              <span className="text-muted-foreground">service certifié</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};