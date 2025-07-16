import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsultationBookingProps {
  onClose?: () => void;
}

export const ConsultationBooking = ({ onClose }: ConsultationBookingProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
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
          type: 'consultation'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Consultation réservée !",
        description: "Nous vous contacterons dans les 24h pour confirmer votre rendez-vous.",
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Réserver une consultation gratuite
        </CardTitle>
        <CardDescription>
          Échangez avec un expert juridique pour définir la meilleure stratégie pour votre entreprise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@obtenirkbis.fr"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="businessType">Type d'entreprise</Label>
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
          </div>
          
          <div>
            <Label htmlFor="consultationType">Type de consultation</Label>
            <Select value={formData.consultationType} onValueChange={(value) => setFormData({...formData, consultationType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de consultation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creation">Création d'entreprise</SelectItem>
                <SelectItem value="status">Choix du statut juridique</SelectItem>
                <SelectItem value="fiscal">Optimisation fiscale</SelectItem>
                <SelectItem value="legal">Questions juridiques</SelectItem>
                <SelectItem value="general">Conseil général</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Date souhaitée</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <Label htmlFor="preferredTime">Heure souhaitée</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => setFormData({...formData, preferredTime: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une heure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Matin (9h-12h)</SelectItem>
                  <SelectItem value="afternoon">Après-midi (14h-17h)</SelectItem>
                  <SelectItem value="evening">Fin de journée (17h-19h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea
              id="message"
              placeholder="Décrivez brièvement votre projet ou vos questions..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Réservation...' : 'Réserver ma consultation gratuite'}
            <Calendar className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Ce qui vous attend :</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Analyse personnalisée de votre projet</li>
            <li>• Recommandations sur le statut juridique optimal</li>
            <li>• Conseils sur l'optimisation fiscale</li>
            <li>• Réponses à toutes vos questions</li>
            <li>• Accompagnement gratuit sans engagement</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};