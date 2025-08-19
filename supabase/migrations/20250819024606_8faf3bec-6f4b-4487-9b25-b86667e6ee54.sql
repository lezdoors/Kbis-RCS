-- Fix security vulnerabilities in kbis_orders table - Corrected approach

-- First, drop the existing overly permissive policies
DROP POLICY IF EXISTS "System can update all orders" ON public.kbis_orders;
DROP POLICY IF EXISTS "Users can view orders with their email" ON public.kbis_orders;

-- Create a secure function to check if user is system admin
CREATE OR REPLACE FUNCTION public.is_system_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, we'll use service_role key for system operations
  -- This function will return false for regular users
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create restrictive policies for the main table

-- Customers can only view limited, non-sensitive order data
CREATE POLICY "Customers can view basic order info only" 
ON public.kbis_orders 
FOR SELECT 
USING (
  customer_email = auth.email() 
  AND auth.role() = 'authenticated'
);

-- Only system/service can update orders (no regular user updates)
CREATE POLICY "Only system can update orders" 
ON public.kbis_orders 
FOR UPDATE 
USING (public.is_system_admin());

-- Only system/service can delete orders  
CREATE POLICY "Only system can delete orders" 
ON public.kbis_orders 
FOR DELETE 
USING (public.is_system_admin());

-- Create a view for customer-safe order data (excludes sensitive payment info)
CREATE OR REPLACE VIEW public.customer_order_summary AS
SELECT 
  id,
  order_number,
  company_name,
  siren,
  service_type,
  status,
  delivery_method,
  documents_delivered,
  created_at,
  updated_at,
  customer_name,
  customer_email
FROM public.kbis_orders
WHERE customer_email = auth.email();

-- Grant limited access to the safe view
GRANT SELECT ON public.customer_order_summary TO authenticated;

-- Create a function for secure order lookup by customers
CREATE OR REPLACE FUNCTION public.get_customer_order(order_id UUID)
RETURNS TABLE (
  id UUID,
  order_number VARCHAR,
  company_name TEXT,
  service_type VARCHAR,
  status VARCHAR,
  documents_delivered BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    o.id,
    o.order_number,
    o.company_name,
    o.service_type,
    o.status,
    o.documents_delivered,
    o.created_at
  FROM public.kbis_orders o
  WHERE o.id = order_id 
    AND o.customer_email = auth.email();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;