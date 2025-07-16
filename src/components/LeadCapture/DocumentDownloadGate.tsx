import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentDownloadGateProps {
  documentTitle: string;
  documentDescription: string;
  onClose?: () => void;
}

export const DocumentDownloadGate = ({ 
  documentTitle, 
  documentDescription, 
  onClose 
}: DocumentDownloadGateProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    company: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email via edge function
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'document',
          documentTitle
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Téléchargement démarré !",
        description: "Le document a été envoyé à votre adresse email.",
      });
      
      if (onClose) onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const documentFeatures = [
    "Format PDF haute qualité",
    "Mise à jour 2024",
    "Exemples concrets",
    "Checklist incluse",
    "Téléchargement immédiat"
  ];

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Téléchargement gratuit
        </CardTitle>
        <CardDescription>
          Accédez instantanément à votre document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">{documentTitle}</h3>
          <p className="text-sm text-blue-800 mb-3">{documentDescription}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Ce que vous obtiendrez :</h4>
            <ul className="space-y-1">
              {documentFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="download-email">Email *</Label>
            <Input
              id="download-email"
              type="email"
              placeholder="contact@obtenirkbis.fr"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="download-firstName">Prénom *</Label>
            <Input
              id="download-firstName"
              placeholder="Votre prénom"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="download-company">Entreprise (optionnel)</Label>
            <Input
              id="download-company"
              placeholder="Nom de votre entreprise"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="download-businessType">Type d'entreprise</Label>
            <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sasu">SASU</SelectItem>
                <SelectItem value="sarl">SARL</SelectItem>
                <SelectItem value="eurl">EURL</SelectItem>
                <SelectItem value="sas">SAS</SelectItem>
                <SelectItem value="micro">Micro-entreprise</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Téléchargement...' : 'Télécharger gratuitement'}
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
            ))}
            <span className="text-sm font-medium ml-2">4.8/5</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Noté par +10 000 entrepreneurs
          </p>
        </div>
      </CardContent>
    </Card>
  );
};