import React from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const OfflineIndicator = () => {
  const networkStatus = useNetworkStatus();

  if (networkStatus.online) {
    return null;
  }

  return (
    <Alert className="fixed top-16 left-4 right-4 z-50 bg-yellow-50 border-yellow-200 md:left-auto md:right-4 md:max-w-sm">
      <WifiOff className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Mode hors ligne</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="ml-2 h-8 px-2 text-xs"
            aria-label="Actualiser la page"
          >
            <Wifi className="h-3 w-3 mr-1" />
            Actualiser
          </Button>
        </div>
        <p className="text-xs mt-1">
          Vos données seront synchronisées une fois la connexion rétablie.
        </p>
      </AlertDescription>
    </Alert>
  );
};