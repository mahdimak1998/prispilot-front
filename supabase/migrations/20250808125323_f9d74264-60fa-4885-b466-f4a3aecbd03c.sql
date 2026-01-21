-- Fix the function to have proper search path
CREATE OR REPLACE FUNCTION public.get_unique_municipalities()
RETURNS TABLE(municipality_name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT pd.municipality_name::text as municipality_name
  FROM power_deals pd
  WHERE pd.municipality_name IS NOT NULL 
    AND pd.municipality_name != ''
    AND length(trim(pd.municipality_name)) > 0
  ORDER BY municipality_name;
$$;