import { useState } from "react";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { KBISSearchTabs } from "@/components/KBIS/KBISSearchTabs";
import { CompanySearch } from "@/components/KBIS/CompanySearch";

export const KBISHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  return (
    <section id="kbis" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden pt-20">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Headlines */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Obtenez votre KBIS en 2h
              <span className="block text-primary">ou créez votre entreprise en 24h</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Le seul service français qui combine documents d'entreprise + création RCS.
              SASU, SARL, micro-entreprise - Service expert et sécurisé.
            </p>
          </div>

          {/* KBIS Search Tabs */}
          <div className="mb-8">
            <KBISSearchTabs onSearch={handleSearch} />
          </div>

          {/* Search Results */}
          {showResults && searchQuery && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
              <CompanySearch searchQuery={searchQuery} />
            </div>
          )}

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">300,000+</span>
              <span className="text-muted-foreground">entreprises créées</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">4.5/5</span>
              <span className="text-muted-foreground">sur Trustpilot</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Certifié RGPD</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Livraison 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};