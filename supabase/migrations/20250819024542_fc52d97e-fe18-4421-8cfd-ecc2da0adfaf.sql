-- Fix security vulnerabilities in kbis_orders table

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

-- Create a view for customer-safe order data (excludes sensitive payment info)
CREATE OR REPLACE VIEW public.customer_orders AS
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
  -- Include customer's own contact info but not billing details
  customer_name,
  customer_email
FROM public.kbis_orders;

-- Enable RLS on the view
ALTER VIEW public.customer_orders SET (security_invoker = true);

-- Create restrictive policies for the main table

-- Customers can only view basic order info through the view, not the main table
CREATE POLICY "Customers cannot directly access orders table" 
ON public.kbis_orders 
FOR SELECT 
USING (FALSE);

-- Only system/service can update orders
CREATE POLICY "Only system can update orders" 
ON public.kbis_orders 
FOR UPDATE 
USING (public.is_system_admin());

-- Only system/service can delete orders  
CREATE POLICY "Only system can delete orders" 
ON public.kbis_orders 
FOR DELETE 
USING (public.is_system_admin());

-- Create policies for the customer view
CREATE POLICY "Customers can view their own orders" 
ON public.customer_orders 
FOR SELECT 
USING (customer_email = auth.email());

-- Grant access to the view
GRANT SELECT ON public.customer_orders TO authenticated;
GRANT SELECT ON public.customer_orders TO anon;

-- Revoke direct access to sensitive columns for regular users
REVOKE ALL ON public.kbis_orders FROM authenticated;
REVOKE ALL ON public.kbis_orders FROM anon;

-- Only allow INSERT for order creation (payment processing)
GRANT INSERT ON public.kbis_orders TO authenticated;
GRANT INSERT ON public.kbis_orders TO anon;