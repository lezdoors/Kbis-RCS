import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ExitIntentPopup } from './ExitIntentPopup';
import { useToast } from '@/hooks/use-toast';

interface LeadCaptureContextType {
  showExitIntent: boolean;
  setShowExitIntent: (show: boolean) => void;
  showConsultationModal: boolean;
  setShowConsultationModal: (show: boolean) => void;
  showNewsletterModal: boolean;
  setShowNewsletterModal: (show: boolean) => void;
  showCallbackModal: boolean;
  setShowCallbackModal: (show: boolean) => void;
  showDocumentModal: boolean;
  setShowDocumentModal: (show: boolean) => void;
  submitLead: (email: string, type: string) => Promise<void>;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);
  if (!context) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
};

interface LeadCaptureProviderProps {
  children: ReactNode;
}

export const LeadCaptureProvider = ({ children }: LeadCaptureProviderProps) => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered) {
        setShowExitIntent(true);
        setExitIntentTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentTriggered]);

  const submitLead = async (email: string, type: string) => {
    try {
      // Send email via edge function
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'exit_intent'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      // Track this event in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_generated', {
          event_category: 'Lead Generation',
          event_label: type,
          value: 1
        });
      }
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  const value = {
    showExitIntent,
    setShowExitIntent,
    showConsultationModal,
    setShowConsultationModal,
    showNewsletterModal,
    setShowNewsletterModal,
    showCallbackModal,
    setShowCallbackModal,
    showDocumentModal,
    setShowDocumentModal,
    submitLead
  };

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      
      <ExitIntentPopup
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        onSubmit={(email) => submitLead(email, 'exit_intent')}
      />
    </LeadCaptureContext.Provider>
  );
};