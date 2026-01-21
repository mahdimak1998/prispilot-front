-- Fix remaining security issues

-- Fix 3: Materialized View in API - Move to private schema instead of just hiding
CREATE SCHEMA IF NOT EXISTS private;

-- Create the materialized view in private schema
DROP MATERIALIZED VIEW IF EXISTS public.unique_municipalities CASCADE;
CREATE MATERIALIZED VIEW private.unique_municipalities AS 
SELECT DISTINCT municipality_name 
FROM public.power_deals 
WHERE municipality_name IS NOT NULL;

-- Update the function to refresh from private schema
CREATE OR REPLACE FUNCTION public.refresh_unique_municipalities()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = private, public
AS $function$
BEGIN
    REFRESH MATERIALIZED VIEW private.unique_municipalities;
END;
$function$;

-- Create a secure function to access municipality data if needed
CREATE OR REPLACE FUNCTION public.get_municipalities()
 RETURNS TABLE(municipality_name text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = private, public
AS $function$
BEGIN
    RETURN QUERY 
    SELECT m.municipality_name 
    FROM private.unique_municipalities m
    ORDER BY m.municipality_name;
END;
$function$;