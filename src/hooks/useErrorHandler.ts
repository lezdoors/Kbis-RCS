import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { AppError, ErrorType, createError, ERROR_CODES } from '@/lib/errors';

interface UseErrorHandlerReturn {
  error: AppError | null;
  setError: (error: AppError | null) => void;
  handleError: (error: any, type: ErrorType, fallbackCode?: keyof typeof ERROR_CODES) => void;
  clearError: () => void;
  showErrorToast: (error: AppError) => void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((
    error: any, 
    type: ErrorType, 
    fallbackCode: keyof typeof ERROR_CODES = 'SERVER_ERROR'
  ) => {
    console.error('Error handled:', error);
    
    let appError: AppError;
    
    if (error.code && ERROR_CODES[error.code as keyof typeof ERROR_CODES]) {
      appError = createError(type, error.code as keyof typeof ERROR_CODES);
    } else if (error.message) {
      // Try to map common error messages to our error codes
      if (error.message.includes('not found') || error.message.includes('404')) {
        appError = createError(type, 'COMPANY_NOT_FOUND');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        appError = createError(type, 'NETWORK_ERROR');
      } else if (error.message.includes('payment') && error.message.includes('declined')) {
        appError = createError(type, 'PAYMENT_DECLINED');
      } else {
        appError = createError(type, fallbackCode, error.message);
      }
    } else {
      appError = createError(type, fallbackCode);
    }
    
    setError(appError);
    return appError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const showErrorToast = useCallback((error: AppError) => {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: error.userMessage,
      duration: 5000,
    });
  }, []);

  return {
    error,
    setError,
    handleError,
    clearError,
    showErrorToast,
  };
}

// Specific error handlers for different contexts
export function useSearchErrorHandler() {
  const { handleError, ...rest } = useErrorHandler();
  
  const handleSearchError = useCallback((error: any) => {
    return handleError(error, ErrorType.SEARCH, 'SEARCH_SERVICE_UNAVAILABLE');
  }, [handleError]);

  return {
    ...rest,
    handleSearchError,
  };
}

export function usePaymentErrorHandler() {
  const { handleError, ...rest } = useErrorHandler();
  
  const handlePaymentError = useCallback((error: any) => {
    return handleError(error, ErrorType.PAYMENT, 'PAYMENT_DECLINED');
  }, [handleError]);

  return {
    ...rest,
    handlePaymentError,
  };
}

export function useOrderErrorHandler() {
  const { handleError, ...rest } = useErrorHandler();
  
  const handleOrderError = useCallback((error: any) => {
    return handleError(error, ErrorType.ORDER, 'ORDER_PROCESSING_ERROR');
  }, [handleError]);

  return {
    ...rest,
    handleOrderError,
  };
}