import { z } from 'zod';

export const leadSchema = z.object({
  company_name: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  legal_form: z.string().optional(),
  siret: z.string().optional(),
  contact_name: z.string().optional(),
  contact_email: z.string().email('Adresse email invalide'),
  contact_phone: z.string().optional(),
  notes: z.string().optional(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_medium: z.string().optional(),
  status: z.enum(['new', 'in_review', 'submitted', 'completed', 'rejected']).default('new'),
});

export type LeadFormData = z.infer<typeof leadSchema>;