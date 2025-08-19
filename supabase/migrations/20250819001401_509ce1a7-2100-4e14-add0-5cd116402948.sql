-- Create KBIS orders table for tracking document requests
CREATE TABLE public.kbis_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(12) UNIQUE NOT NULL DEFAULT ('KB' || LPAD(FLOOR(RANDOM() * 1000000000)::TEXT, 10, '0')),
  siren VARCHAR(9) NOT NULL,
  company_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  billing_address JSONB,
  service_type VARCHAR(10) NOT NULL DEFAULT 'standard', -- 'standard', 'express'
  delivery_method VARCHAR(10) NOT NULL DEFAULT 'email', -- 'email', 'postal'
  amount_paid INTEGER NOT NULL, -- in cents
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  stripe_payment_id TEXT,
  documents_delivered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.kbis_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for KBIS orders
CREATE POLICY "Users can view orders with their email" 
ON public.kbis_orders 
FOR SELECT 
USING (customer_email = auth.email());

CREATE POLICY "Anyone can create KBIS orders" 
ON public.kbis_orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update all orders" 
ON public.kbis_orders 
FOR UPDATE 
USING (true);

-- Create companies table for search results caching
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siren VARCHAR(9) UNIQUE NOT NULL,
  siret VARCHAR(14),
  company_name TEXT NOT NULL,
  legal_form TEXT,
  address TEXT,
  postal_code VARCHAR(5),
  city TEXT,
  activity_code VARCHAR(10),
  activity_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for companies table
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Companies are publicly readable for search functionality
CREATE POLICY "Companies are publicly readable" 
ON public.companies 
FOR SELECT 
USING (true);

-- Only system can insert/update company data
CREATE POLICY "System can manage companies" 
ON public.companies 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for KBIS orders
CREATE TRIGGER update_kbis_orders_updated_at
    BEFORE UPDATE ON public.kbis_orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for companies
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();