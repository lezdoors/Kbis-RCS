export interface Lead {
  id?: string;
  company_name: string;
  legal_form?: string;
  siret?: string;
  contact_name?: string;
  contact_email: string;
  contact_phone?: string;
  notes?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  status?: 'new' | 'in_review' | 'submitted' | 'completed' | 'rejected';
  created_at?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  data?: Lead;
  error?: string;
}