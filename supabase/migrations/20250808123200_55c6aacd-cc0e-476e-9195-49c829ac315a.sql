-- Fix security warning by setting search_path for get_unique_municipalities function
CREATE OR REPLACE FUNCTION get_unique_municipalities()
RETURNS TABLE(municipality_name text) 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT pd.municipality_name::text
  FROM power_deals pd
  WHERE pd.municipality_name IS NOT NULL 
    AND pd.municipality_name != ''
    AND length(trim(pd.municipality_name)) > 0
  ORDER BY pd.municipality_name;
END;
$$;