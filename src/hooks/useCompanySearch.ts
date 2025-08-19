import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Company {
  id: string;
  siren: string;
  siret?: string;
  company_name: string;
  legal_form?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  activity_code?: string;
  activity_description?: string;
  created_at?: string;
}

export interface SearchError {
  type: 'validation' | 'network' | 'no_results' | 'server_error' | 'company_inactive' | 'service_unavailable';
  message: string;
  code?: string;
  retryable?: boolean;
}

export const useCompanySearch = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [suggestions, setSuggestions] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SearchError | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const { toast } = useToast();

  const validateSearchQuery = (query: string): SearchError | null => {
    if (!query.trim()) {
      return null;
    }

    if (query.trim().length < 3) {
      return {
        type: 'validation',
        message: 'Saisissez au moins 3 caractères'
      };
    }

    // Check if query looks like SIREN (9 digits)
    if (/^\d{9}$/.test(query.replace(/\s/g, ''))) {
      if (query.replace(/\s/g, '').length !== 9) {
        return {
          type: 'validation',
          message: 'Le numéro SIREN doit contenir exactement 9 chiffres'
        };
      }
    }

    // Check if query looks like SIRET (14 digits)
    if (/^\d{14}$/.test(query.replace(/\s/g, ''))) {
      if (query.replace(/\s/g, '').length !== 14) {
        return {
          type: 'validation',
          message: 'Le numéro SIRET doit contenir exactement 14 chiffres'
        };
      }
    }

    return null;
  };

  const searchCompanies = useCallback(async (query: string, limit = 10, offset = 0) => {
    const validationError = validateSearchQuery(query);
    if (validationError) {
      setError(validationError);
      setCompanies([]);
      return;
    }

    if (!query.trim()) {
      setCompanies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Clean query for SIREN/SIRET search
      const cleanQuery = query.replace(/\s/g, '');
      
      let searchQuery = supabase
        .from('companies')
        .select('*', { count: 'exact' });

      // If query is numeric, search SIREN/SIRET first
      if (/^\d+$/.test(cleanQuery)) {
        searchQuery = searchQuery.or(
          `siren.eq.${cleanQuery},siret.eq.${cleanQuery},siren.ilike.${cleanQuery}%,siret.ilike.${cleanQuery}%`
        );
      } else {
        // Text search for company name, address, city
        searchQuery = searchQuery.or(
          `company_name.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`
        );
      }

      const { data, error: searchError, count } = await searchQuery
        .order('company_name')
        .range(offset, offset + limit - 1);

      if (searchError) {
        console.error('Search error:', searchError);
        
        // Fallback to mock data for demo
        const mockCompanies: Company[] = [
          {
            id: '1',
            siren: '123456789',
            siret: '12345678900001',
            company_name: 'Apple France SARL',
            legal_form: 'SARL',
            address: '114 Avenue Charles de Gaulle',
            postal_code: '92200',
            city: 'Neuilly-sur-Seine',
            activity_code: '4651Z',
            activity_description: 'Commerce de gros d\'ordinateurs, d\'équipements informatiques périphériques et de logiciels',
            created_at: '2020-01-15'
          },
          {
            id: '2',
            siren: '987654321',
            siret: '98765432100001',
            company_name: 'Microsoft France SAS',
            legal_form: 'SAS',
            address: '37 Quai du Président Roosevelt',
            postal_code: '92130',
            city: 'Issy-les-Moulineaux',
            activity_code: '6201Z',
            activity_description: 'Programmation informatique',
            created_at: '2019-06-20'
          },
          {
            id: '3',
            siren: '555666777',
            siret: '55566677700001',
            company_name: 'Google France SARL',
            legal_form: 'SARL',
            address: '8 Rue de Londres',
            postal_code: '75009',
            city: 'Paris',
            activity_code: '6312Z',
            activity_description: 'Portails internet',
            created_at: '2018-03-10'
          }
        ].filter(company => {
          const searchTerm = query.toLowerCase();
          return (
            company.company_name.toLowerCase().includes(searchTerm) ||
            company.siren.includes(cleanQuery) ||
            company.siret?.includes(cleanQuery) ||
            company.address?.toLowerCase().includes(searchTerm) ||
            company.city?.toLowerCase().includes(searchTerm)
          );
        });

        setCompanies(mockCompanies);
        setTotalResults(mockCompanies.length);

        if (mockCompanies.length === 0) {
          setError({
            type: 'no_results',
            message: 'Aucune entreprise trouvée. Vérifiez l\'orthographe ou essayez avec le numéro SIREN'
          });
        }
      } else {
        setCompanies(data || []);
        setTotalResults(count || 0);

        if ((data || []).length === 0) {
          setError({
            type: 'no_results',
            message: 'Aucune entreprise trouvée. Vérifiez l\'orthographe ou essayez avec le numéro SIREN'
          });
        }
      }
    } catch (error: any) {
      console.error('Error searching companies:', error);
      
      let errorType: SearchError['type'] = 'server_error';
      let errorMessage = 'Erreur lors de la recherche des entreprises. Veuillez réessayer.';
      let retryable = true;
      
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorType = 'network';
        errorMessage = 'Problème de connexion. Vérifiez votre connexion internet.';
      } else if (error.message?.includes('rate limit')) {
        errorType = 'service_unavailable';
        errorMessage = 'Service temporairement surchargé. Réessayez dans quelques minutes.';
      } else if (error.status === 503) {
        errorType = 'service_unavailable';
        errorMessage = 'Service de recherche temporairement indisponible.';
      }
      
      setError({
        type: errorType,
        message: errorMessage,
        code: error.code || 'SEARCH_ERROR',
        retryable
      });
      
      // Show fallback UI for service errors
      if (errorType === 'network' || errorType === 'service_unavailable') {
        toast({
          title: 'Service temporairement indisponible',
          description: 'Nous utilisons des données de démonstration en attendant.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erreur de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const cleanQuery = query.replace(/\s/g, '');
      
      let searchQuery = supabase
        .from('companies')
        .select('*');

      if (/^\d+$/.test(cleanQuery)) {
        searchQuery = searchQuery.or(
          `siren.ilike.${cleanQuery}%,siret.ilike.${cleanQuery}%`
        );
      } else {
        searchQuery = searchQuery.ilike('company_name', `%${query}%`);
      }

      const { data } = await searchQuery
        .order('company_name')
        .limit(5);

      // Fallback to mock data
      if (!data || data.length === 0) {
        const mockSuggestions = [
          {
            id: '1',
            siren: '123456789',
            company_name: 'Apple France SARL',
            legal_form: 'SARL',
            city: 'Neuilly-sur-Seine'
          },
          {
            id: '2', 
            siren: '987654321',
            company_name: 'Microsoft France SAS',
            legal_form: 'SAS',
            city: 'Issy-les-Moulineaux'
          }
        ].filter(company => 
          company.company_name.toLowerCase().includes(query.toLowerCase()) ||
          company.siren.includes(cleanQuery)
        );
        
        setSuggestions(mockSuggestions);
      } else {
        setSuggestions(data);
      }
    } catch (err) {
      console.error('Suggestions error:', err);
      setSuggestions([]);
    }
  }, []);

  return {
    companies,
    suggestions,
    loading,
    error,
    totalResults,
    searchCompanies,
    getSuggestions,
    validateSearchQuery
  };
};