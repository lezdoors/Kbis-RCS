-- Fix the remaining prevent_insecure_views function
CREATE OR REPLACE FUNCTION public.prevent_insecure_views()
RETURNS event_trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag = 'CREATE VIEW'
  LOOP
    -- Log view creation for monitoring
    RAISE NOTICE 'View created: %. Please ensure it has proper security policies.', obj.object_identity;
  END LOOP;
END;
$$;