import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ModernHeader } from '@/components/modern/ModernHeader';
import { ModernFooter } from '@/components/modern/ModernFooter';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { useCompanySearch } from '@/hooks/useCompanySearch';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(page);
  
  const { companies, loading, error, totalResults, searchCompanies } = useCompanySearch();
  
  const resultsPerPage = 10;

  // Perform search when component mounts or query changes
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchCompanies(query, resultsPerPage, (currentPage - 1) * resultsPerPage);
      
      // Track search analytics
      trackEvent({
        event_type: ANALYTICS_EVENTS.PAGE_VIEW,
        metadata: {
          page: 'search_results',
          search_query: query,
          page_number: currentPage
        }
      });
    }
  }, [query, currentPage, searchCompanies]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
    
    // Update URL with new search query
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('q', newQuery);
    setSearchParams(newSearchParams);
    
    // Track search
    trackEvent({
      event_type: ANALYTICS_EVENTS.HERO_CTA_CLICK,
      metadata: {
        action: 'search',
        search_query: newQuery,
        source: 'search_results_page'
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    // Update URL with new page
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('q', query);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      
      <main className="container-modern pt-24 pb-20">
        {/* Search header */}
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Recherche d'entreprises
              </h1>
              <p className="text-muted-foreground">
                Trouvez toutes les informations officielles des entreprises françaises
              </p>
            </div>
            
            {/* Search input */}
            <div className="max-w-2xl mx-auto">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                size="large"
                autoFocus={!query}
              />
            </div>
            
            {/* Back to home link */}
            <button
              onClick={handleBackToHome}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ← Retour à l'accueil
            </button>
          </div>

          {/* Search results */}
          {query && (
            <div className="border-t border-border pt-8">
              <SearchResults
                companies={companies}
                loading={loading}
                error={error}
                searchQuery={query}
                totalResults={totalResults}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                resultsPerPage={resultsPerPage}
              />
            </div>
          )}
          
          {/* No query state */}
          {!query && (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">
                Commencez votre recherche en saisissant un nom d'entreprise, SIREN, SIRET ou adresse
              </p>
              <p className="text-sm text-muted-foreground">
                Exemples : "Apple France", "123456789", ou "Paris"
              </p>
            </div>
          )}
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default SearchResultsPage;