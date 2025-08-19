import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Track successful payment
    trackEvent({
      event_type: ANALYTICS_EVENTS.PAYMENT_SUCCESS,
      metadata: {
        page: 'payment-success',
        timestamp: Date.now()
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Paiement réussi !</h1>
            <p className="text-muted-foreground">
              Votre commande a été confirmée avec succès.
            </p>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-foreground">Email de confirmation envoyé</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Download className="w-4 h-4 text-primary" />
            <span className="text-foreground">KBIS livré selon le service choisi</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Vous recevrez votre extrait KBIS par email dans les délais annoncés.
            Un email de confirmation avec les détails de votre commande vous a été envoyé.
          </p>
          
          <div className="text-xs text-muted-foreground bg-secondary/30 rounded p-3">
            <p className="font-medium mb-1">Que faire maintenant ?</p>
            <ul className="space-y-1 text-left">
              <li>• Vérifiez votre boîte email (et vos spams)</li>
              <li>• Conservez votre numéro de commande</li>
              <li>• Contactez-nous en cas de question</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')} 
            className="w-full gap-2"
            variant="default"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Button>
          
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline" 
            className="w-full"
          >
            Suivre ma commande
          </Button>
        </div>
      </Card>
    </div>
  );
}