import React, { Component, ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ErrorDisplay } from '@/components/ui/error-display';
import { createError, ErrorType } from '@/lib/errors';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global error boundary caught an error:', error, errorInfo);
    
    // Log to analytics or error reporting service
    if ((window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: true
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const appError = createError(
        ErrorType.SYSTEM, 
        'SERVER_ERROR',
        'Une erreur inattendue s\'est produite dans l\'application'
      );

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorDisplay 
              error={appError}
              onRetry={this.handleRetry}
              onContactSupport={() => window.open('mailto:support@example.com', '_blank')}
            />
            
            <div className="flex gap-3 mt-6 justify-center">
              <Button onClick={this.handleRetry} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Recharger la page
              </Button>
              <Button onClick={this.handleGoHome} variant="default">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </div>

            {/* Technical details for developers */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <summary className="cursor-pointer font-medium text-red-800">
                  Détails techniques (dev uniquement)
                </summary>
                <pre className="mt-2 text-xs text-red-700 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component for easier usage
export function withGlobalErrorBoundary<P extends object>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    return (
      <GlobalErrorBoundary>
        <Component {...props} />
      </GlobalErrorBoundary>
    );
  };
}