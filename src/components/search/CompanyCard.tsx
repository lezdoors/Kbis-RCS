import { Building2, MapPin, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Company } from '@/hooks/useCompanySearch';
import { cn } from '@/lib/utils';

interface CompanyCardProps {
  company: Company;
  onOrderKBIS: (company: Company, serviceType: 'standard' | 'express') => void;
  className?: string;
}

export const CompanyCard = ({ company, onOrderKBIS, className }: CompanyCardProps) => {
  // Simulate active status (in real app, this would come from API)
  const isActive = true;
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className={cn('border border-border hover:shadow-lg transition-all duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-6">
          {/* Company information */}
          <div className="flex-1 space-y-4">
            {/* Company name and status */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  {company.company_name}
                </h3>
                <Badge 
                  variant={isActive ? 'default' : 'destructive'}
                  className="flex items-center gap-1"
                >
                  {isActive ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
              
              {/* SIREN/SIRET and legal form */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">SIREN: {company.siren}</span>
                {company.siret && (
                  <span>SIRET: {company.siret}</span>
                )}
                {company.legal_form && (
                  <Badge variant="outline" className="text-xs">
                    {company.legal_form}
                  </Badge>
                )}
              </div>
            </div>

            {/* Address */}
            {(company.address || company.city) && (
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  {company.address && (
                    <div>{company.address}</div>
                  )}
                  {(company.postal_code || company.city) && (
                    <div>
                      {company.postal_code} {company.city}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity description */}
            {company.activity_description && (
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Activité principale</div>
                  <div className="line-clamp-2">
                    {company.activity_description}
                    {company.activity_code && (
                      <span className="text-xs text-muted-foreground ml-2">
                        (Code APE: {company.activity_code})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Registration date */}
            {company.created_at && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>Immatriculée le {formatDate(company.created_at)}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 min-w-[200px]">
            <Button
              onClick={() => onOrderKBIS(company, 'express')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <div className="text-center">
                <div>Obtenir le KBIS</div>
                <div className="text-xs opacity-90">Express - 2h</div>
              </div>
            </Button>
            
            <Button
              onClick={() => onOrderKBIS(company, 'standard')}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <div className="text-center">
                <div>KBIS Standard</div>
                <div className="text-xs opacity-70">4h - Plus économique</div>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};