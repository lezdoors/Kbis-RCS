-- Fix remaining functions to have proper search_path
CREATE OR REPLACE FUNCTION public.get_customer_order(order_id uuid)
RETURNS TABLE(id uuid, order_number character varying, company_name text, service_type character varying, status character varying, documents_delivered boolean, created_at timestamp with time zone)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.get_customer_order_secure(order_id uuid)
RETURNS TABLE(id uuid, order_number character varying, company_name text, service_type character varying, status character varying, documents_delivered boolean, created_at timestamp with time zone)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.get_customer_order_summary()
RETURNS TABLE(id uuid, order_number character varying, company_name text, siren character varying, service_type character varying, status character varying, delivery_method character varying, documents_delivered boolean, created_at timestamp with time zone, updated_at timestamp with time zone, customer_name text, customer_email text)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
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

CREATE OR REPLACE FUNCTION public.is_system_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- For now, we'll use service_role key for system operations
  -- This function will return false for regular users
  RETURN FALSE;
END;
$$;