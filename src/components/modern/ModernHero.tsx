import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/search/SearchInput";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export const ModernHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // Track analytics
    trackEvent({
      event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK,
      metadata: {
        action: 'search',
        search_query: query,
        source: 'hero_section'
      }
    });
    
    navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
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
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Nom d'entreprise, SIREN, SIRET ou adresse..."
              size="large"
            />
            
            <p className="text-sm text-muted-foreground mt-4">
              ex: 123456789, Apple France, ou SASU TECH INNOVATION
            </p>
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