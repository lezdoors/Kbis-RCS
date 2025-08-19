import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ExitIntentPopup } from './ExitIntentPopup';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Lead, LeadSubmissionResult } from '@/types/lead';
import { leadSchema, type LeadFormData } from '@/lib/validations/lead';

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
  submitLeadData: (leadData: Partial<LeadFormData>) => Promise<LeadSubmissionResult>;
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

  const submitLeadData = async (leadData: Partial<LeadFormData>): Promise<LeadSubmissionResult> => {
    try {
      // Validate the lead data
      const validatedData = leadSchema.parse(leadData);
      
      // Get UTM parameters from URL if available
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source') || validatedData.utm_source,
        utm_campaign: urlParams.get('utm_campaign') || validatedData.utm_campaign,
        utm_medium: urlParams.get('utm_medium') || validatedData.utm_medium,
      };
      
      // Insert lead into Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...validatedData, ...utmData }])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return {
          ok: false,
          error: 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.'
        };
      }
      
      // Fire telemetry event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_submit', {
          form: 'kbis_lead',
          event_category: 'Lead Generation',
          event_label: 'form_submission',
          value: 1
        });
      }
      
      // Show success toast
      toast({
        title: "Demande enregistrée",
        description: "Nous vous recontactons rapidement.",
        duration: 5000,
      });
      
      return {
        ok: true,
        data: data as Lead
      };
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      
      let errorMessage = 'Une erreur inattendue est survenue.';
      
      if (error instanceof Error) {
        // Zod validation error
        if (error.message.includes('email')) {
          errorMessage = 'Veuillez vérifier votre adresse email.';
        } else if (error.message.includes('company_name')) {
          errorMessage = 'Le nom de l\'entreprise est requis.';
        }
      }
      
      // Show error toast
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      
      return {
        ok: false,
        error: errorMessage
      };
    }
  };

  const submitLead = async (email: string, type: string) => {
    // Convert legacy function to use new submitLeadData
    await submitLeadData({
      contact_email: email,
      company_name: 'Lead généré - ' + type,
      notes: `Lead généré via ${type}`,
      utm_source: type
    });
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
    submitLead,
    submitLeadData
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