import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, PaymentData } from '@/lib/stripe';
import { OrderSummary } from '@/components/payment/OrderSummary';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<PaymentData | null>(null);
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    // Get order data from URL params or localStorage
    const companyName = searchParams.get('company');
    const siren = searchParams.get('siren');
    const serviceType = searchParams.get('service');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    // Try to get full order data from localStorage if available
    const savedOrderData = localStorage.getItem('orderData');
    
    if (savedOrderData) {
      try {
        const parsedData = JSON.parse(savedOrderData) as PaymentData;
        setOrderData(parsedData);
        createPaymentIntent(parsedData);
      } catch (error) {
        console.error('Error parsing saved order data:', error);
        redirectToServiceSelection();
      }
    } else if (companyName && siren && serviceType && email) {
      // Create order data from URL params
      const data: PaymentData = {
        companyName,
        siren,
        serviceType,
        servicePrice: getServicePrice(serviceType),
        customerEmail: email,
        customerPhone: phone || undefined,
      };
      setOrderData(data);
      createPaymentIntent(data);
    } else {
      redirectToServiceSelection();
    }
  }, [searchParams]);

  const getServicePrice = (serviceType: string): number => {
    switch (serviceType) {
      case 'express': return 59;
      case 'postal': return 44;
      default: return 39;
    }
  };

  const redirectToServiceSelection = () => {
    toast({
      title: "Données manquantes",
      description: "Veuillez d'abord sélectionner un service.",
      variant: "destructive"
    });
    navigate('/');
  };

  const createPaymentIntent = async (data: PaymentData) => {
    try {
      // In a real app, this would call your backend to create a payment intent
      // For now, we'll simulate this with a client secret
      setClientSecret('pi_test_client_secret_placeholder');
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'initialiser le paiement. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSuccess = () => {
    // Clear order data and redirect to success page
    localStorage.removeItem('orderData');
    navigate('/payment-success');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Chargement des informations de commande...</p>
        </div>
      </div>
    );
  }

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: 'hsl(var(--primary))',
        colorBackground: 'hsl(var(--background))',
        colorText: 'hsl(var(--foreground))',
        colorDanger: 'hsl(var(--destructive))',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    },
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finaliser votre commande</h1>
              <p className="text-muted-foreground">Paiement sécurisé en quelques clics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary - Left side */}
          <div className="order-2 lg:order-1">
            <OrderSummary orderData={orderData} />
          </div>

          {/* Payment Form - Right side */}
          <div className="order-1 lg:order-2">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <PaymentForm 
                  orderData={orderData} 
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground">Initialisation du paiement sécurisé...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}