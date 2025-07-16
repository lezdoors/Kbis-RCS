import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSignupProps {
  variant?: 'default' | 'inline' | 'popup';
  onClose?: () => void;
}

export const NewsletterSignup = ({ variant = 'default', onClose }: NewsletterSignupProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    interests: {
      creation: false,
      legal: false,
      fiscal: false,
      news: false
    }
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
          type: 'newsletter',
          interests: Object.entries(formData.interests)
            .filter(([_, value]) => value)
            .map(([key, _]) => key)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Inscription confirmée !",
        description: "Vous recevrez nos conseils d'experts directement dans votre boîte mail.",
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

  const benefits = [
    "Conseils exclusifs d'experts juridiques",
    "Actualités légales et fiscales",
    "Guides pratiques et templates",
    "Invitations aux webinaires gratuits"
  ];

  const content = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="newsletter-email">Email *</Label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="contact@obtenirkbis.fr"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="newsletter-firstName">Prénom</Label>
          <Input
            id="newsletter-firstName"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium mb-3 block">Vos centres d'intérêt :</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="creation"
              checked={formData.interests.creation}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                interests: {...formData.interests, creation: checked as boolean}
              })}
            />
            <Label htmlFor="creation" className="text-sm">Création d'entreprise</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="legal"
              checked={formData.interests.legal}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                interests: {...formData.interests, legal: checked as boolean}
              })}
            />
            <Label htmlFor="legal" className="text-sm">Juridique</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fiscal"
              checked={formData.interests.fiscal}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                interests: {...formData.interests, fiscal: checked as boolean}
              })}
            />
            <Label htmlFor="fiscal" className="text-sm">Optimisation fiscale</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="news"
              checked={formData.interests.news}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                interests: {...formData.interests, news: checked as boolean}
              })}
            />
            <Label htmlFor="news" className="text-sm">Actualités</Label>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Inscription...' : 'S\'inscrire à la newsletter'}
        <Mail className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Restez informé</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Recevez nos conseils d'experts et les dernières actualités entrepreneuriales
        </p>
        {content}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Newsletter RCS Express
        </CardTitle>
        <CardDescription>
          Rejoignez +50 000 entrepreneurs qui nous font confiance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-semibold">Ce que vous recevrez :</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        {content}
        
        <p className="text-xs text-muted-foreground text-center">
          Désinscription en un clic. Vos données sont protégées.
        </p>
      </CardContent>
    </Card>
  );
};