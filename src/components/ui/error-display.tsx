import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Phone, 
  Clock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { AppError, shouldShowFallback, isRetryable } from '@/lib/errors';

interface ErrorDisplayProps {
  error: AppError;
  onRetry?: () => void;
  onContactSupport?: () => void;
  onSelectAlternative?: (alternative: string) => void;
  className?: string;
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  onContactSupport, 
  onSelectAlternative,
  className 
}: ErrorDisplayProps) {
  return (
    <Card className={`border-destructive/20 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <CardTitle className="text-destructive text-lg">
              {error.userMessage}
            </CardTitle>
            {error.estimatedResolution && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Résolution estimée : {error.estimatedResolution}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Next Steps */}
        <div>
          <h4 className="font-medium text-sm mb-3">Que faire maintenant ?</h4>
          <ul className="space-y-2">
            {error.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isRetryable(error) && onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          )}
          
          {error.supportContact && onContactSupport && (
            <Button onClick={onContactSupport} variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contacter le support
            </Button>
          )}
        </div>

        {/* Alternative Options */}
        {shouldShowFallback(error) && error.alternatives && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Alternatives disponibles</h4>
            <div className="space-y-2">
              {error.alternatives.map((alternative, index) => (
                <button
                  key={index}
                  onClick={() => onSelectAlternative?.(alternative)}
                  className="flex items-center justify-between w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors text-left"
                >
                  <span className="text-sm font-medium">{alternative}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Code for Support */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Code d'erreur :</span>
            <Badge variant="secondary" className="text-xs">
              {error.code}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InlineErrorProps {
  error: AppError;
  onRetry?: () => void;
  className?: string;
}

export function InlineError({ error, onRetry, className }: InlineErrorProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription className="mt-2">
        <div className="space-y-2">
          <p>{error.userMessage}</p>
          {isRetryable(error) && onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="border-destructive/30 hover:border-destructive"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Réessayer
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}