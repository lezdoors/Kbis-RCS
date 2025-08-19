import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SecurityBadges } from "@/components/SecurityBadges";
import { LoadingSpinner } from "@/components/LoadingComponents";
import { Shield, Lock, CreditCard } from "lucide-react";
import { PaymentData, BillingAddress } from "@/lib/stripe";
import { useToast } from "@/hooks/use-toast";
import { usePaymentErrorHandler } from "@/hooks/useErrorHandler";
import { ErrorDisplay } from "@/components/ui/error-display";

interface PaymentFormProps {
  orderData: PaymentData;
  onPaymentSuccess: () => void;
}

export const PaymentForm = ({ orderData, onPaymentSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { error: paymentError, handlePaymentError, clearError, showErrorToast } = usePaymentErrorHandler();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    name: '',
    email: orderData.customerEmail,
    line1: orderData.deliveryAddress?.street || '',
    city: orderData.deliveryAddress?.city || '',
    postal_code: orderData.deliveryAddress?.postalCode || '',
    country: 'FR',
    company: orderData.deliveryAddress?.company || ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Erreur",
        description: "Le système de paiement n'est pas encore chargé. Veuillez réessayer.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Conditions requises",
        description: "Vous devez accepter les conditions générales de vente pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    clearError();

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          billingAddress: useDifferentBilling ? billingAddress : undefined
        }),
      });

      if (!response.ok) {
        throw { code: 'ORDER_PROCESSING_ERROR', message: 'Erreur lors de la création de la commande' };
      }

      const { client_secret } = await response.json();

      // Confirm payment with Stripe
      const result = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: billingAddress.name,
              email: billingAddress.email,
              address: {
                line1: billingAddress.line1,
                city: billingAddress.city,
                postal_code: billingAddress.postal_code,
                country: billingAddress.country,
              }
            }
          }
        },
        redirect: 'if_required'
      });

      if (result.error) {
        if (result.error.type === "card_error") {
          throw { code: 'PAYMENT_DECLINED', message: result.error.message };
        } else if (result.error.type === "validation_error") {
          throw { code: 'PAYMENT_DECLINED', message: 'Informations de carte invalides' };
        } else {
          throw { code: 'ORDER_PROCESSING_ERROR', message: result.error.message };
        }
      } else {
        toast({
          title: "Paiement réussi",
          description: "Votre commande a été confirmée. Vous recevrez votre KBIS par email.",
        });
        onPaymentSuccess();
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      handlePaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryPayment = () => {
    clearError();
    // Create a synthetic event for retry
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleContactSupport = () => {
    // Navigate to support or open contact modal
    window.open('mailto:support@example.com?subject=Erreur de paiement&body=Code erreur: ' + paymentError?.code, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Payment Error Display */}
      {paymentError && (
        <ErrorDisplay 
          error={paymentError}
          onRetry={handleRetryPayment}
          onContactSupport={handleContactSupport}
        />
      )}

      {/* Security Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-success" />
          <h2 className="text-xl font-semibold text-foreground">Paiement sécurisé</h2>
        </div>
        <SecurityBadges />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Element */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Informations de paiement</h3>
          </div>
          
          <PaymentElement 
            options={{
              layout: 'tabs',
              fields: {
                billingDetails: 'never'
              }
            }}
          />
        </Card>

        {/* Billing Information */}
        <Card className="p-6 border-border bg-card">
          <h3 className="font-medium text-foreground mb-4">Informations de facturation</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="different-billing"
                checked={useDifferentBilling}
                onCheckedChange={(checked) => setUseDifferentBilling(checked as boolean)}
              />
              <Label htmlFor="different-billing" className="text-sm text-foreground">
                Utiliser une adresse de facturation différente
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billing-name" className="text-foreground">Nom du titulaire *</Label>
                <Input
                  id="billing-name"
                  value={billingAddress.name}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-background border-border"
                />
              </div>
              
              <div>
                <Label htmlFor="billing-company" className="text-foreground">Entreprise (optionnel)</Label>
                <Input
                  id="billing-company"
                  value={billingAddress.company}
                  onChange={(e) => setBillingAddress(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
            </div>

            {useDifferentBilling && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <Label htmlFor="billing-address" className="text-foreground">Adresse *</Label>
                  <Input
                    id="billing-address"
                    value={billingAddress.line1}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, line1: e.target.value }))}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billing-postal" className="text-foreground">Code postal *</Label>
                    <Input
                      id="billing-postal"
                      value={billingAddress.postal_code}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="billing-city" className="text-foreground">Ville *</Label>
                    <Input
                      id="billing-city"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Legal Requirements */}
        <Card className="p-6 border-border bg-card">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="accept-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="accept-terms" className="text-sm text-foreground leading-relaxed">
                J'accepte les{' '}
                <a href="/cgv" className="text-primary hover:underline" target="_blank">
                  Conditions Générales de Vente
                </a>{' '}
                et la{' '}
                <a href="/politique-rgpd" className="text-primary hover:underline" target="_blank">
                  Politique de confidentialité
                </a>
              </Label>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Conformité RGPD - Vos données sont protégées</p>
              <p>• Droit de rétractation de 14 jours</p>
              <p>• Paiement sécurisé par Stripe</p>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing || !acceptTerms}
          className="w-full h-12 text-lg font-semibold"
          variant="default"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span>Traitement du paiement en cours...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Confirmer le paiement</span>
            </div>
          )}
        </Button>
      </form>

      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>🔒 SSL 256-bit</span>
          <span>💳 Stripe</span>
          <span>🛡️ RGPD</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Paiement sécurisé et conforme aux normes bancaires européennes
        </p>
      </div>
    </div>
  );
};