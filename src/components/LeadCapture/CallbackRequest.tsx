import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallbackRequestProps {
  onClose?: () => void;
}

export const CallbackRequest = ({ onClose }: CallbackRequestProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    subject: '',
    message: ''
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
          type: 'callback'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Demande envoyée !",
        description: "Nous vous rappellerons dans les plus brefs délais.",
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

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Demande de rappel
        </CardTitle>
        <CardDescription>
          Nos experts vous rappellent gratuitement sous 2h (jours ouvrés)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="callback-name">Nom complet *</Label>
              <Input
                id="callback-name"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="callback-phone">Téléphone *</Label>
              <Input
                id="callback-phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="callback-email">Email *</Label>
            <Input
              id="callback-email"
              type="email"
              placeholder="contact@obtenirkbis.fr"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="callback-time">Horaire préféré</Label>
            <Select value={formData.preferredTime} onValueChange={(value) => setFormData({...formData, preferredTime: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un horaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Matin (9h-12h)</SelectItem>
                <SelectItem value="afternoon">Après-midi (14h-17h)</SelectItem>
                <SelectItem value="evening">Fin de journée (17h-19h)</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="callback-subject">Sujet *</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un sujet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creation">Création d'entreprise</SelectItem>
                <SelectItem value="status">Choix du statut juridique</SelectItem>
                <SelectItem value="devis">Demande de devis</SelectItem>
                <SelectItem value="support">Support technique</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="callback-message">Message (optionnel)</Label>
            <Textarea
              id="callback-message"
              placeholder="Décrivez votre demande..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi...' : 'Demander un rappel'}
            <Phone className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Rappel sous 2h en moyenne</span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            Service gratuit • Lundi-Vendredi 9h-18h
          </p>
        </div>
      </CardContent>
    </Card>
  );
};