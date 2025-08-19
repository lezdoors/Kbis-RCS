import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompanySearch, Company } from '@/hooks/useCompanySearch';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'default' | 'large';
  className?: string;
  autoFocus?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "Nom d'entreprise, SIREN, SIRET ou adresse...",
  size = 'default',
  className,
  autoFocus = false
}: SearchInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { suggestions, getSuggestions, loading, error, validateSearchQuery } = useCompanySearch();

  // Debounced suggestions
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      if (value.trim().length >= 2) {
        getSuggestions(value);
      }
    }, 300);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, getSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.trim().length >= 2);
  };

  const handleInputFocus = () => {
    if (value.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (company: Company) => {
    onChange(company.company_name);
    setShowSuggestions(false);
    onSearch(company.company_name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setShowSuggestions(false);
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const validationError = validateSearchQuery(value);
  const hasError = validationError && value.trim().length > 0;

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className={cn(
          'relative flex items-center',
          size === 'large' ? 'card-modern p-2' : 'border border-input rounded-lg bg-background'
        )}>
          <div className="flex items-center flex-1 gap-3 px-4">
            <Search className={cn(
              'flex-shrink-0 text-muted-foreground',
              size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
            )} />
            <Input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              autoFocus={autoFocus}
              className={cn(
                'flex-1 border-0 bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-0 p-0',
                size === 'large' ? 'text-lg' : 'text-base',
                hasError && 'text-destructive'
              )}
            />
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-auto p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {size === 'large' && (
            <Button
              type="submit"
              disabled={!value.trim() || hasError || loading}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Recherche...
                </div>
              ) : (
                'Rechercher'
              )}
            </Button>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p className="text-sm text-destructive mt-2">
            {validationError.message}
          </p>
        )}
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="absolute top-full left-0 right-0 z-50 mt-2">
          <Card className="border border-border shadow-lg">
            <div className="p-2 space-y-1">
              {suggestions.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSuggestionClick(company)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {company.company_name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>SIREN: {company.siren}</span>
                      {company.city && (
                        <span>• {company.city}</span>
                      )}
                    </div>
                  </div>
                  {company.legal_form && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {company.legal_form}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};