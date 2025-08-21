import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setIsModalOpen(true);
    
    // Simulate search API call
    setTimeout(() => {
      // Mock search results
      setSearchResults([
        {
          name: "APPLE FRANCE",
          siren: "542105118",
          siret: "54210511800012",
          address: "114 AVENUE CHARLES DE GAULLE, 92200 NEUILLY-SUR-SEINE",
          status: "Active"
        },
        {
          name: "TECH INNOVATION SAS",
          siren: "123456789",
          siret: "12345678900015",
          address: "15 RUE DE LA PAIX, 75001 PARIS",
          status: "Active"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Nom d'entreprise, SIREN ou SIRET..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-14 text-lg px-6 border-2 border-gray-200 focus:border-primary rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl flex items-center gap-2 min-w-[140px]"
              disabled={!searchQuery.trim()}
            >
              <Search className="w-5 h-5" />
              Rechercher
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm mt-4 text-center">
            ex: 123456789, Apple France, ou SASU TECH INNOVATION
          </p>
        </div>
      </div>

      {/* Search Results Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Résultats de recherche pour "{searchQuery}"
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Recherche en cours...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((company, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {company.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">SIREN:</span> {company.siren}
                      </div>
                      <div>
                        <span className="font-medium">SIRET:</span> {company.siret}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Adresse:</span> {company.address}
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <Button variant="default" size="sm">
                        Obtenir le KBIS
                      </Button>
                      <Button variant="outline" size="sm">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                ))}
                
                {searchResults.length === 0 && !isLoading && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun résultat trouvé pour cette recherche.
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};