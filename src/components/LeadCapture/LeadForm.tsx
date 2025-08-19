import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormProgress } from '@/components/ui/form-progress';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useLeadCapture } from './LeadCaptureProvider';
import { type LeadFormData } from '@/lib/validations/lead';
import { type Result } from '@/lib/result';

export const LeadForm = () => {
  const { submitLeadData } = useLeadCapture();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    company_name: '',
    legal_form: '',
    siret: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitLeadData(formData);
      if (result.ok) {
        // Reset form on success
        setFormData({
          company_name: '',
          legal_form: '',
          siret: '',
          contact_name: '',
          contact_email: '',
          contact_phone: '',
          notes: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate current step based on filled fields
  const filledFields = Object.values(formData).filter(value => value?.trim()).length;
  const totalFields = 7;
  const currentStep = Math.min(filledFields + 1, totalFields);

  return (
    <ErrorBoundary>
      <div className="max-w-md mx-auto">
        {/* Sticky progress indicator */}
        <div className="sticky top-0 z-10 bg-[hsl(var(--bg-page))] py-3 border-b border-[hsl(var(--border-soft))] md:relative md:top-auto md:z-auto md:bg-transparent md:py-0 md:border-b-0">
          <FormProgress current={currentStep} total={totalFields} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl border border-[hsl(var(--border-soft))] mt-4 md:mt-6">
          <div className="space-y-2">
        <Label htmlFor="company_name">Nom de l'entreprise *</Label>
        <Input
          id="company_name"
          value={formData.company_name || ''}
          onChange={(e) => handleInputChange('company_name', e.target.value)}
          placeholder="SARL Example"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="legal_form">Forme juridique</Label>
        <Select value={formData.legal_form || ''} onValueChange={(value) => handleInputChange('legal_form', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une forme juridique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sarl">SARL</SelectItem>
            <SelectItem value="sas">SAS</SelectItem>
            <SelectItem value="sasu">SASU</SelectItem>
            <SelectItem value="eurl">EURL</SelectItem>
            <SelectItem value="auto-entrepreneur">Auto-entrepreneur</SelectItem>
            <SelectItem value="association">Association</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siret">SIRET</Label>
        <Input
          id="siret"
          value={formData.siret || ''}
          onChange={(e) => handleInputChange('siret', e.target.value)}
          placeholder="12345678901234"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_name">Nom du contact</Label>
        <Input
          id="contact_name"
          value={formData.contact_name || ''}
          onChange={(e) => handleInputChange('contact_name', e.target.value)}
          placeholder="Jean Dupont"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_email">Email *</Label>
        <Input
          id="contact_email"
          type="email"
          value={formData.contact_email || ''}
          onChange={(e) => handleInputChange('contact_email', e.target.value)}
          placeholder="jean@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_phone">Téléphone</Label>
        <Input
          id="contact_phone"
          type="tel"
          value={formData.contact_phone || ''}
          onChange={(e) => handleInputChange('contact_phone', e.target.value)}
          placeholder="01 23 45 67 89"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Message (optionnel)</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Décrivez votre demande..."
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !formData.company_name || !formData.contact_email}
        className="w-full h-12 bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90 text-[hsl(var(--brand-primary-contrast))]"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
      </Button>
    </form>
      </div>
    </ErrorBoundary>
  );
};