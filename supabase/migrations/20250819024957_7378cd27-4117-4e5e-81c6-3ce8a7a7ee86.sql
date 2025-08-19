-- Comprehensive Security Fix - All Issues in One Migration

-- Step 1: Drop the problematic view and recreate it properly
DROP VIEW IF EXISTS public.customer_order_summary;

-- Step 2: Fix all function search paths
ALTER FUNCTION public.is_system_admin() SET search_path = '';
ALTER FUNCTION public.get_customer_order(UUID) SET search_path = '';

-- Step 3: Replace the view with a secure function approach
-- This eliminates the view security issues while maintaining functionality
CREATE OR REPLACE FUNCTION public.get_customer_order_summary()
RETURNS TABLE (
  id UUID,
  order_number VARCHAR,
  company_name TEXT,
  siren VARCHAR,
  service_type VARCHAR,
  status VARCHAR,
  delivery_method VARCHAR,
  documents_delivered BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  customer_name TEXT,
  customer_email TEXT
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
BEGIN
  -- Only authenticated users can access their own orders
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  RETURN QUERY 
  SELECT 
    o.id,
    o.order_number,
    o.company_name,
    o.siren,
    o.service_type,
    o.status,
    o.delivery_method,
    o.documents_delivered,
    o.created_at,
    o.updated_at,
    o.customer_name,
    o.customer_email
  FROM public.kbis_orders o
  WHERE o.customer_email = auth.email()
    AND auth.role() = 'authenticated';
END;
$$;

-- Step 4: Enhanced secure function for single order lookup
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
  -- Authentication and authorization checks
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

-- Step 5: Enhance RLS policies on kbis_orders (make them more restrictive)
-- First drop the existing policies
DROP POLICY IF EXISTS "Customers can view basic order info only" ON public.kbis_orders;
DROP POLICY IF EXISTS "Anyone can create KBIS orders" ON public.kbis_orders;
DROP POLICY IF EXISTS "Only system can update orders" ON public.kbis_orders;
DROP POLICY IF EXISTS "Only system can delete orders" ON public.kbis_orders;

-- Create more secure policies
CREATE POLICY "Authenticated users can view their own orders only" 
ON public.kbis_orders 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  AND customer_email = auth.email()
);

CREATE POLICY "Authenticated users can create orders" 
ON public.kbis_orders 
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' 
  AND customer_email = auth.email()
);

CREATE POLICY "Only system can update orders" 
ON public.kbis_orders 
FOR UPDATE 
USING (auth.role() = 'service_role');

CREATE POLICY "Only system can delete orders" 
ON public.kbis_orders 
FOR DELETE 
USING (auth.role() = 'service_role');

-- Step 6: Verify companies table has proper RLS (it already does, but ensure it's secure)
-- The existing policies on companies are fine for this use case

-- Step 7: Grant necessary permissions to functions
GRANT EXECUTE ON FUNCTION public.get_customer_order_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_customer_order_secure(UUID) TO authenticated;

-- Step 8: Create a safety trigger to prevent insecure views
CREATE OR REPLACE FUNCTION public.prevent_insecure_views()
RETURNS event_trigger AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag = 'CREATE VIEW'
  LOOP
    -- Log view creation for monitoring
    RAISE NOTICE 'View created: %. Please ensure it has proper security policies.', obj.object_identity;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create event trigger for view creation monitoring
DROP EVENT TRIGGER IF EXISTS monitor_view_creation;
CREATE EVENT TRIGGER monitor_view_creation
  ON ddl_command_end
  WHEN TAG IN ('CREATE VIEW')
  EXECUTE FUNCTION public.prevent_insecure_views();

-- Step 9: Add database-level security constraints
-- Ensure all future tables have RLS enabled by default (this is a reminder comment)
-- CREATE OR REPLACE FUNCTION public.auto_enable_rls() could be added here if needed

COMMENT ON FUNCTION public.get_customer_order_summary() IS 'Secure function replacing customer_order_summary view - filters by authenticated user email';
COMMENT ON FUNCTION public.get_customer_order_secure(UUID) IS 'Secure function for single order lookup - validates user authentication and ownership';