-- Comprehensive security fixes for all identified issues

-- Fix 1: Remove SECURITY DEFINER from customer_order_summary view
-- Instead, we'll create it with proper RLS policies
DROP VIEW IF EXISTS public.customer_order_summary;

-- Recreate the view without SECURITY DEFINER (it uses RLS instead)
CREATE VIEW public.customer_order_summary AS
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
FROM public.kbis_orders;

-- Enable RLS on the view
ALTER VIEW public.customer_order_summary SET (security_invoker = on);

-- Grant access to authenticated users
GRANT SELECT ON public.customer_order_summary TO authenticated;

-- Create RLS policy for the view that filters by customer email
CREATE POLICY "Customers can view their own order summary" 
ON public.customer_order_summary 
FOR SELECT 
USING (customer_email = auth.email() AND auth.role() = 'authenticated');

-- Fix 2 & 3: Set search_path for security functions to prevent SQL injection
ALTER FUNCTION public.is_system_admin() SET search_path = '';
ALTER FUNCTION public.get_customer_order(UUID) SET search_path = '';

-- Additional security enhancement: Create a more restrictive function for customer order access
CREATE OR REPLACE FUNCTION public.get_customer_order_secure(order_id UUID)
RETURNS TABLE (
  id UUID,
  order_number VARCHAR,
  company_name TEXT,
  service_type VARCHAR,
  status VARCHAR,
  documents_delivered BOOLEAN,
  created_at TIMESTAMPTZ
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
BEGIN
  -- Extra validation: ensure the user is authenticated and owns the order
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
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
    AND o.customer_email = auth.email()
    AND auth.role() = 'authenticated';
END;
$$;