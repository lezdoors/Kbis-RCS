import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KBISSearchTabsProps {
  onSearch?: (query: string) => void;
}

export const KBISSearchTabs = ({ onSearch }: KBISSearchTabsProps) => {
  const [activeTab, setActiveTab] = useState<"kbis" | "rcs">("kbis");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleRCSRedirect = () => {
    navigate("/choisir-statut");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("kbis")}
          className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
            activeTab === "kbis"
              ? "bg-white text-primary shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Search className="inline-block w-4 h-4 mr-2" />
          Obtenir un KBIS
        </button>
        <button
          onClick={() => setActiveTab("rcs")}
          className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
            activeTab === "rcs"
              ? "bg-white text-primary shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Building2 className="inline-block w-4 h-4 mr-2" />
          Créer mon entreprise
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {activeTab === "kbis" ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Rechercher une entreprise
              </h3>
              <p className="text-gray-600">
                Saisissez le SIREN, SIRET ou nom de l'entreprise
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ex: 123456789 ou Apple France"
                  className="w-full h-14 pl-12 pr-4 text-lg border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-destructive hover:bg-destructive/90 text-white"
                disabled={!searchQuery.trim()}
              >
                Rechercher
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-500">
              <span className="inline-flex items-center">
                KBIS dès €39 • Livraison 2h • Documents certifiés
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Créer votre entreprise
              </h3>
              <p className="text-gray-600">
                SASU, SARL, micro-entreprise - Obtenez votre Kbis en 48-72h
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">01</div>
                <div className="text-sm font-medium">Choix du statut</div>
                <div className="text-xs text-gray-500">2 minutes</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">02</div>
                <div className="text-sm font-medium">Dossier complet</div>
                <div className="text-xs text-gray-500">24-48h</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">03</div>
                <div className="text-sm font-medium">Kbis reçu</div>
                <div className="text-xs text-gray-500">48-72h</div>
              </div>
            </div>
            
            <Button
              onClick={handleRCSRedirect}
              className="w-full h-12 text-lg font-semibold bg-destructive hover:bg-destructive/90 text-white"
            >
              Commencer maintenant
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              <span className="inline-flex items-center">
                RCS dès €129 • Support expert • 300,000+ entreprises créées
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};