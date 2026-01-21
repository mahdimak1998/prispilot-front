-- Fix the get_municipalities RPC function to return correct data type
DROP FUNCTION IF EXISTS public.get_municipalities();

CREATE OR REPLACE FUNCTION public.get_municipalities()
RETURNS TABLE(municipality_name text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'private', 'public'
AS $$
BEGIN
    RETURN QUERY 
    SELECT DISTINCT power_deals.municipality_name::text 
    FROM public.power_deals 
    WHERE power_deals.municipality_name IS NOT NULL
    ORDER BY power_deals.municipality_name::text;
END;
$$;