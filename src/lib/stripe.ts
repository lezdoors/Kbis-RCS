import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NODE_ENV === 'production' 
  ? 'pk_live_...' // Replace with your live publishable key
  : 'pk_test_...' // Replace with your test publishable key
);

export { stripePromise };

export interface PaymentData {
  companyName: string;
  siren: string;
  serviceType: string;
  servicePrice: number;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress?: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
    company?: string;
  };
}

export interface BillingAddress {
  name: string;
  email: string;
  line1: string;
  city: string;
  postal_code: string;
  country: string;
  company?: string;
}