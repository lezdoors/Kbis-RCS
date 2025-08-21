import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Download, ArrowLeft, Loader2, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // Track page visit
    trackEvent({
      event_type: ANALYTICS_EVENTS.PAYMENT_SUCCESS,
      metadata: {
        page: 'payment-success',
        timestamp: Date.now()
      }
    });

    if (sessionId && orderId) {
      verifyPayment();
    } else {
      // If no session/order params, show generic success (for backward compatibility)
      setIsVerifying(false);
      setPaymentStatus('paid');
    }
  }, [sessionId, orderId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          session_id: sessionId,
          order_id: orderId
        }
      });

      if (error) {
        console.error('Payment verification error:', error);
        toast({
          title: "Erreur de vérification",
          description: "Impossible de vérifier le statut du paiement",
          variant: "destructive",
        });
        return;
      }

      setPaymentStatus(data.payment_status);
      setOrder(data.order);

      if (data.payment_status === 'paid') {
        toast({
          title: "Paiement confirmé",
          description: "Votre commande a été traitée avec succès",
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Vérification du paiement...</h2>
          <p className="text-muted-foreground">Veuillez patienter pendant que nous confirmons votre paiement</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center p-4">
      {paymentStatus === 'paid' ? (
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              Paiement confirmé !
            </CardTitle>
            <p className="text-muted-foreground">
              Votre commande d'extrait KBIS a été traitée avec succès
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {order && (
              <div className="bg-secondary/30 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg mb-4">Détails de la commande</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Numéro de commande:</span>
                    <p className="text-primary font-mono font-bold">{order.order_number}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Entreprise:</span>
                    <p className="font-medium">{order.company_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">SIREN:</span>
                    <p>{order.siren}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Service:</span>
                    <p className="capitalize">{order.service_type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Client:</span>
                    <p>{order.customer_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Email:</span>
                    <p>{order.customer_email}</p>
                  </div>
                </div>
              </div>
            )}

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

            <div className="text-xs text-muted-foreground bg-secondary/30 rounded p-3">
              <p className="font-medium mb-1">📧 Prochaines étapes</p>
              <ul className="space-y-1 text-left">
                <li>• Vous recevrez un email de confirmation sous quelques minutes</li>
                <li>• Votre extrait KBIS sera traité selon les délais de livraison choisis</li>
                <li>• Un nouveau email vous sera envoyé avec le document dès qu'il sera prêt</li>
                <li>• Conservez votre numéro de commande pour le suivi</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 gap-2"
              >
                <Download className="w-4 h-4" />
                Suivre ma commande
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-8 h-8 text-destructive" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Problème avec le paiement</h1>
              <p className="text-muted-foreground">
                Le paiement n'a pas pu être confirmé
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Si vous pensez qu'il s'agit d'une erreur, veuillez nous contacter avec votre numéro de commande.
            </p>
            
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full gap-2"
            >
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}