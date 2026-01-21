-- Fix RPC function to resolve ORDER BY issue
CREATE OR REPLACE FUNCTION get_unique_municipalities()
RETURNS TABLE(municipality_name text) 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT pd.municipality_name::text as municipality_name
  FROM power_deals pd
  WHERE pd.municipality_name IS NOT NULL 
    AND pd.municipality_name != ''
    AND length(trim(pd.municipality_name)) > 0
  ORDER BY municipality_name;
END;
$$;