import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Gift, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export const ExitIntentPopup = ({ isOpen, onClose, onSubmit }: ExitIntentPopupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      toast({
        title: "Guide téléchargé !",
        description: "Consultez votre boîte mail pour accéder à votre guide gratuit.",
      });
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 animate-scale-in">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-center">
            <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl text-center">Attendez !</CardTitle>
            <CardDescription className="text-center">
              Obtenez notre guide gratuit avant de partir
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Guide gratuit: "Créer son entreprise en 2024"</h3>
            <p className="text-sm text-muted-foreground">
              ✓ Comparatif des statuts juridiques<br />
              ✓ Étapes de création détaillées<br />
              ✓ Optimisations fiscales<br />
              ✓ Checklist complète
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="exit-email">Email</Label>
              <Input
                id="exit-email"
                type="email"
                placeholder="contact@obtenirkbis.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              variant="institutional"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi...' : 'Télécharger gratuitement'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground text-center">
            Pas de spam. Désinscription en un clic.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};