import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, Clock, Shield } from "lucide-react";
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Recherche terminée",
      description: `Résultats trouvés pour "${searchQuery}"`,
    });
    
    navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Side - Content (60%) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight">
                Obtenez votre KBIS
                <span className="block text-brand-red">en 2 heures</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Service premium certifié
                <span className="block font-semibold text-brand-blue mt-1">
                  Le plus rapide de France
                </span>
              </p>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SIREN, SIRET ou nom d'entreprise"
                    className="w-full h-14 pl-12 pr-6 text-lg border-2 border-gray-200 rounded-xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 bg-white shadow-sm"
                    disabled={isLoading}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!searchQuery.trim() || isLoading}
                  className="w-full h-12 text-lg font-semibold bg-brand-red hover:bg-brand-red/90 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
              
              <p className="text-sm text-gray-500">
                ex: 123456789, Apple France, ou SASU TECH INNOVATION
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-brand-blue">50,000+</span>
                <span className="text-sm text-gray-600">KBIS traités</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-brand-blue">2h</span>
                <span className="text-sm text-gray-600">maximum</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-brand-blue">Prix</span>
                <span className="text-sm text-gray-600">transparent</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element (40%) */}
          <div className="lg:col-span-2 relative">
            <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 shadow-lg border border-gray-100">
              {/* Visual Elements */}
              <div className="space-y-6">
                {/* French Flag Colors Accent */}
                <div className="flex justify-center space-x-2">
                  <div className="w-4 h-16 bg-blue-700 rounded-sm"></div>
                  <div className="w-4 h-16 bg-white border border-gray-200 rounded-sm"></div>
                  <div className="w-4 h-16 bg-red-600 rounded-sm"></div>
                </div>
                
                {/* Trust Badges */}
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-700">2h</div>
                    <div className="text-sm text-green-600">Livraison garantie</div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-700">50,000+</div>
                    <div className="text-sm text-blue-600">Documents traités</div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-700">Premium</div>
                    <div className="text-sm text-red-600">Service certifié</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};