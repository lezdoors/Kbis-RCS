import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, FileText } from 'lucide-react';

interface CompanyInactiveWarningProps {
  companyName: string;
  onProceedAnyway?: () => void;
  onRequestHistoric?: () => void;
  className?: string;
}

export function CompanyInactiveWarning({ 
  companyName, 
  onProceedAnyway, 
  onRequestHistoric,
  className 
}: CompanyInactiveWarningProps) {
  return (
    <Alert variant="destructive" className={`border-orange-200 bg-orange-50 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Entreprise inactive détectée</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                Statut : Inactive
              </Badge>
            </div>
            <p className="text-sm">
              L'entreprise <strong>{companyName}</strong> semble être inactive ou fermée 
              selon nos dernières données.
            </p>
          </div>

          <div className="bg-orange-100 rounded-lg p-3 text-sm">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Que signifie "inactive" ?
            </h4>
            <ul className="space-y-1 text-orange-700 ml-6">
              <li>• L'entreprise a cessé son activité</li>
              <li>• Elle n'est plus inscrite au RCS</li>
              <li>• Le KBIS actuel peut être limité ou non disponible</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Options disponibles :</h4>
            <div className="flex flex-wrap gap-2">
              {onRequestHistoric && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onRequestHistoric}
                  className="border-orange-300 hover:bg-orange-100"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  KBIS historique
                </Button>
              )}
              
              {onProceedAnyway && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onProceedAnyway}
                  className="border-orange-300 hover:bg-orange-100"
                >
                  Continuer quand même
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('mailto:support@example.com', '_blank')}
                className="border-orange-300 hover:bg-orange-100"
              >
                Contacter le support
              </Button>
            </div>
          </div>

          <div className="text-xs text-orange-600 border-t border-orange-200 pt-2">
            💡 <strong>Conseil :</strong> Un KBIS historique peut être suffisant pour certaines démarches. 
            Vérifiez avec l'organisme demandeur.
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}