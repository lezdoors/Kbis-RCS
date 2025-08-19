import { useState } from 'react';
import { Building2, AlertTriangle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Company, SearchError } from '@/hooks/useCompanySearch';
import { CompanyCard } from './CompanyCard';
import { useToast } from '@/hooks/use-toast';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

interface SearchResultsProps {
  companies: Company[];
  loading: boolean;
  error: SearchError | null;
  searchQuery: string;
  totalResults: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  resultsPerPage?: number;
}

export const SearchResults = ({
  companies,
  loading,
  error,
  searchQuery,
  totalResults,
  currentPage = 1,
  onPageChange,
  resultsPerPage = 10
}: SearchResultsProps) => {
  const { toast } = useToast();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleOrderKBIS = (company: Company, serviceType: 'standard' | 'express') => {
    // Track analytics
    trackEvent({
      event_type: ANALYTICS_EVENTS.ENTITY_SELECTED,
      entity_type: serviceType,
      metadata: {
        company_name: company.company_name,
        siren: company.siren,
        service_type: serviceType
      }
    });

    toast({
      title: 'Commande KBIS',
      description: `Redirection vers la commande ${serviceType} pour ${company.company_name}`,
    });
    
    // TODO: Navigate to order flow
    console.log('Order KBIS:', { company, serviceType });
  };

  const handleCreateCompany = () => {
    trackEvent({
      event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK,
      metadata: {
        action: 'create_company',
        search_query: searchQuery
      }
    });

    toast({
      title: 'Création d\'entreprise',
      description: 'Redirection vers le processus de création d\'entreprise',
    });
    
    // TODO: Navigate to company creation flow
    console.log('Create company for query:', searchQuery);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">Recherche en cours...</p>
          <p className="text-sm text-muted-foreground">
            Recherche pour "{searchQuery}"
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && error.type !== 'no_results') {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="space-y-4">
          <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Erreur de recherche
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {error.message}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
          <Button onClick={() => window.history.back()}>
            Retour
          </Button>
        </div>
      </div>
    );
  }

  // No results state
  if (companies.length === 0) {
    return (
      <div className="text-center py-16 space-y-8">
        <div className="space-y-4">
          <Building2 className="mx-auto h-16 w-16 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Aucune entreprise trouvée
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Aucun résultat pour <strong>"{searchQuery}"</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Vérifiez l'orthographe ou essayez avec le numéro SIREN
            </p>
          </div>
        </div>
        
        <Card className="max-w-md mx-auto border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Entreprise non trouvée ?
              </h4>
              <p className="text-sm text-muted-foreground">
                Créons votre entreprise ensemble en 24h
              </p>
            </div>
            <Button
              onClick={handleCreateCompany}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer mon entreprise
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results display
  return (
    <div className="space-y-8">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {totalResults} entreprise{totalResults > 1 ? 's' : ''} trouvée{totalResults > 1 ? 's' : ''}
          </h2>
          <p className="text-muted-foreground">
            Recherche pour "<span className="font-medium">{searchQuery}</span>"
          </p>
        </div>
        
        {totalPages > 1 && (
          <div className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </div>
        )}
      </div>

      {/* Company cards */}
      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onOrderKBIS={handleOrderKBIS}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Précédent
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Create company CTA */}
      <div className="text-center py-8 border-t border-border">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Vous ne trouvez pas votre entreprise ?
          </p>
          <Button
            onClick={handleCreateCompany}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Créer une nouvelle entreprise
          </Button>
        </div>
      </div>
    </div>
  );
};