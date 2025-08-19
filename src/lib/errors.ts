export interface AppError {
  type: ErrorType;
  code: string;
  message: string;
  userMessage: string;
  nextSteps: string[];
  alternatives?: string[];
  supportContact?: boolean;
  estimatedResolution?: string;
  retryable?: boolean;
}

export enum ErrorType {
  SEARCH = 'search',
  ORDER = 'order',
  PAYMENT = 'payment',
  DELIVERY = 'delivery',
  SYSTEM = 'system',
}

export const ERROR_CODES = {
  // Search errors
  COMPANY_NOT_FOUND: 'COMPANY_NOT_FOUND',
  COMPANY_INACTIVE: 'COMPANY_INACTIVE',
  MULTIPLE_COMPANIES: 'MULTIPLE_COMPANIES',
  SEARCH_SERVICE_UNAVAILABLE: 'SEARCH_SERVICE_UNAVAILABLE',
  INVALID_SIREN: 'INVALID_SIREN',
  
  // Order errors
  PAYMENT_DECLINED: 'PAYMENT_DECLINED',
  COMPANY_INFO_CHANGED: 'COMPANY_INFO_CHANGED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  ORDER_PROCESSING_ERROR: 'ORDER_PROCESSING_ERROR',
  
  // Delivery errors
  EMAIL_DELIVERY_FAILED: 'EMAIL_DELIVERY_FAILED',
  DOCUMENT_GENERATION_ERROR: 'DOCUMENT_GENERATION_ERROR',
  OFFICIAL_SOURCE_UNAVAILABLE: 'OFFICIAL_SOURCE_UNAVAILABLE',
  POSTAL_DELIVERY_ISSUE: 'POSTAL_DELIVERY_ISSUE',
  
  // System errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export const ERROR_DEFINITIONS: Record<string, Omit<AppError, 'type'>> = {
  [ERROR_CODES.COMPANY_NOT_FOUND]: {
    code: ERROR_CODES.COMPANY_NOT_FOUND,
    message: 'Company not found in official registry',
    userMessage: 'Aucune entreprise trouvée pour ce numéro SIREN',
    nextSteps: [
      'Vérifiez le numéro SIREN saisi',
      'Essayez avec le nom de l\'entreprise',
      'Contactez-nous si l\'entreprise existe'
    ],
    alternatives: [
      'Recherche par nom d\'entreprise',
      'Création manuelle d\'entreprise'
    ],
    supportContact: true,
    retryable: true,
  },
  
  [ERROR_CODES.COMPANY_INACTIVE]: {
    code: ERROR_CODES.COMPANY_INACTIVE,
    message: 'Company is inactive or closed',
    userMessage: 'Cette entreprise est inactive ou fermée',
    nextSteps: [
      'Vérifiez le statut de l\'entreprise',
      'Contactez l\'entreprise directement',
      'Demandez un KBIS historique si nécessaire'
    ],
    alternatives: [
      'KBIS historique disponible',
      'Recherche d\'entreprises similaires'
    ],
    supportContact: true,
    retryable: false,
  },
  
  [ERROR_CODES.PAYMENT_DECLINED]: {
    code: ERROR_CODES.PAYMENT_DECLINED,
    message: 'Payment was declined by bank',
    userMessage: 'Votre paiement a été refusé par votre banque',
    nextSteps: [
      'Vérifiez les détails de votre carte',
      'Contactez votre banque',
      'Essayez avec une autre carte de paiement'
    ],
    alternatives: [
      'Autre moyen de paiement',
      'Paiement différé disponible'
    ],
    supportContact: true,
    retryable: true,
  },
  
  [ERROR_CODES.EMAIL_DELIVERY_FAILED]: {
    code: ERROR_CODES.EMAIL_DELIVERY_FAILED,
    message: 'Failed to deliver document by email',
    userMessage: 'Impossible d\'envoyer le document par email',
    nextSteps: [
      'Vérifiez votre adresse email',
      'Consultez vos spams/courriers indésirables',
      'Nous renvoyons automatiquement dans 1h'
    ],
    alternatives: [
      'Livraison postale gratuite',
      'Téléchargement direct disponible',
      'Envoi vers une autre adresse'
    ],
    supportContact: true,
    estimatedResolution: '1 heure',
    retryable: true,
  },
  
  [ERROR_CODES.SEARCH_SERVICE_UNAVAILABLE]: {
    code: ERROR_CODES.SEARCH_SERVICE_UNAVAILABLE,
    message: 'Company search service temporarily unavailable',
    userMessage: 'Service de recherche temporairement indisponible',
    nextSteps: [
      'Réessayez dans quelques minutes',
      'Utilisez notre formulaire de création manuelle',
      'Contactez notre support pour assistance'
    ],
    alternatives: [
      'Création manuelle d\'entreprise',
      'Rappel automatique quand disponible'
    ],
    supportContact: true,
    estimatedResolution: '15 minutes',
    retryable: true,
  },
  
  [ERROR_CODES.DOCUMENT_GENERATION_ERROR]: {
    code: ERROR_CODES.DOCUMENT_GENERATION_ERROR,
    message: 'Error generating official document',
    userMessage: 'Erreur lors de la génération du document',
    nextSteps: [
      'Nouvelle tentative automatique en cours',
      'Traitement prioritaire activé',
      'Notification par SMS dès résolution'
    ],
    alternatives: [
      'Traitement manuel par nos équipes',
      'Remboursement intégral si échec'
    ],
    supportContact: true,
    estimatedResolution: '2 heures',
    retryable: false,
  },
};

export function createError(
  type: ErrorType,
  code: keyof typeof ERROR_CODES,
  customMessage?: string
): AppError {
  const definition = ERROR_DEFINITIONS[code];
  
  if (!definition) {
    return {
      type: ErrorType.SYSTEM,
      code: 'UNKNOWN_ERROR',
      message: 'Unknown error occurred',
      userMessage: 'Une erreur inattendue s\'est produite',
      nextSteps: ['Réessayez dans quelques instants', 'Contactez notre support'],
      supportContact: true,
      retryable: true,
    };
  }
  
  return {
    type,
    ...definition,
    userMessage: customMessage || definition.userMessage,
  };
}

export function shouldShowFallback(error: AppError): boolean {
  return Boolean(error.alternatives && error.alternatives.length > 0);
}

export function isRetryable(error: AppError): boolean {
  return error.retryable === true;
}