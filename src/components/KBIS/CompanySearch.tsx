import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Company {
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
}

interface CompanySearchProps {
  searchQuery: string;
}

export const CompanySearch = ({ searchQuery }: CompanySearchProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (searchQuery) {
      searchCompanies(searchQuery);
    }
  }, [searchQuery]);

  const searchCompanies = async (query: string) => {
    setLoading(true);
    try {
      // Search in our local companies table first
      const { data: localResults, error } = await supabase
        .from("companies")
        .select("*")
        .or(
          `siren.ilike.%${query}%,siret.ilike.%${query}%,company_name.ilike.%${query}%`
        )
        .limit(10);

      if (error) {
        console.error("Search error:", error);
        // For demo, add some mock companies
        const mockCompanies: Company[] = [
          {
            id: "1",
            siren: "123456789",
            siret: "12345678900001",
            company_name: "Apple France SARL",
            legal_form: "SARL",
            address: "114 Avenue Charles de Gaulle",
            postal_code: "92200",
            city: "Neuilly-sur-Seine",
            activity_code: "4651Z",
            activity_description: "Commerce de gros d'ordinateurs",
          },
          {
            id: "2",
            siren: "987654321",
            siret: "98765432100001",
            company_name: "Microsoft France SAS",
            legal_form: "SAS",
            address: "37 Quai du Président Roosevelt",
            postal_code: "92130",
            city: "Issy-les-Moulineaux",
            activity_code: "6201Z",
            activity_description: "Programmation informatique",
          },
        ].filter(company => 
          company.siren.includes(query) || 
          company.siret?.includes(query) ||
          company.company_name.toLowerCase().includes(query.toLowerCase())
        );
        setCompanies(mockCompanies);
      } else {
        setCompanies(localResults || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Erreur de recherche",
        description: "Impossible de rechercher les entreprises",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOrderKBIS = (company: Company, serviceType: "standard" | "express") => {
    setSelectedCompany(company);
    toast({
      title: "Commande KBIS",
      description: `Redirection vers la commande ${serviceType} pour ${company.company_name}`,
    });
    // TODO: Open KBIS order modal
  };

  const handleCreateCompany = () => {
    toast({
      title: "Créer une entreprise",
      description: "Redirection vers le processus de création d'entreprise",
    });
    // TODO: Redirect to RCS creation flow
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Recherche en cours...</span>
      </div>
    );
  }

  if (companies.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="space-y-2">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            Aucune entreprise trouvée
          </h3>
          <p className="text-gray-600">
            Aucun résultat pour "<strong>{searchQuery}</strong>"
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <h4 className="font-medium text-blue-900 mb-2">
            Entreprise non trouvée ?
          </h4>
          <p className="text-sm text-blue-700 mb-4">
            Créons votre entreprise ensemble en 24h
          </p>
          <Button
            onClick={handleCreateCompany}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Créer mon entreprise
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {companies.length} entreprise{companies.length > 1 ? "s" : ""} trouvée{companies.length > 1 ? "s" : ""}
        </h3>
        <p className="text-sm text-gray-600">
          Recherche : "{searchQuery}"
        </p>
      </div>

      <div className="grid gap-4">
        {companies.map((company) => (
          <Card key={company.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      {company.company_name}
                    </h4>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>SIREN: {company.siren}</span>
                      {company.siret && <span>SIRET: {company.siret}</span>}
                    </div>
                  </div>

                  {company.legal_form && (
                    <Badge variant="secondary">{company.legal_form}</Badge>
                  )}

                  {(company.address || company.city) && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {company.address && `${company.address}, `}
                        {company.postal_code} {company.city}
                      </span>
                    </div>
                  )}

                  {company.activity_description && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{company.activity_description}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                  <Button
                    onClick={() => handleOrderKBIS(company, "standard")}
                    className="w-full bg-destructive hover:bg-destructive/90 text-white"
                  >
                    KBIS Standard €39
                    <span className="block text-xs opacity-90">Livraison 4h</span>
                  </Button>
                  <Button
                    onClick={() => handleOrderKBIS(company, "express")}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    KBIS Express €59
                    <span className="block text-xs opacity-70">Livraison 2h</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {companies.length > 0 && (
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Vous ne trouvez pas votre entreprise ?
          </p>
          <Button
            onClick={handleCreateCompany}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Créer une nouvelle entreprise
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};