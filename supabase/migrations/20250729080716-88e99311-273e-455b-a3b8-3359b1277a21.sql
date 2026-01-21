-- Fix 1: Function Search Path Mutable - Set search_path for the function
CREATE OR REPLACE FUNCTION public.refresh_unique_municipalities()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
    REFRESH MATERIALIZED VIEW unique_municipalities;
END;
$function$;

-- Fix 2: Extension in Public - Move pg_trgm extension to extensions schema
CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA extensions;

-- Recreate the index with the correct schema reference
DROP INDEX IF EXISTS idx_power_deals_municipality_name;
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_name 
ON public.power_deals USING gin(municipality_name extensions.gin_trgm_ops);

-- Fix 3: Materialized View in API - Hide unique_municipalities from PostgREST
COMMENT ON MATERIALIZED VIEW public.unique_municipalities IS '@omit';

-- Alternative: Move to a private schema (uncomment if needed)
-- CREATE SCHEMA IF NOT EXISTS private;
-- DROP MATERIALIZED VIEW IF EXISTS public.unique_municipalities CASCADE;
-- CREATE MATERIALIZED VIEW private.unique_municipalities AS 
-- SELECT DISTINCT municipality_name FROM power_deals WHERE municipality_name IS NOT NULL;

-- Recreate the function to refresh from private schema if moved
-- CREATE OR REPLACE FUNCTION public.refresh_unique_municipalities()
--  RETURNS void
--  LANGUAGE plpgsql
--  SECURITY DEFINER
--  SET search_path = private, public
-- AS $function$
-- BEGIN
--     REFRESH MATERIALIZED VIEW private.unique_municipalities;
-- END;
-- $function$;