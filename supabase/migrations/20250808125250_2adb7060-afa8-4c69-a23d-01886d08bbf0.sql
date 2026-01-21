-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.get_unique_municipalities();

-- Create a new function to get unique municipalities
CREATE OR REPLACE FUNCTION public.get_unique_municipalities()
RETURNS TABLE(municipality_name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT DISTINCT pd.municipality_name::text as municipality_name
  FROM power_deals pd
  WHERE pd.municipality_name IS NOT NULL 
    AND pd.municipality_name != ''
    AND length(trim(pd.municipality_name)) > 0
  ORDER BY municipality_name;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.get_unique_municipalities() TO anon;
GRANT EXECUTE ON FUNCTION public.get_unique_municipalities() TO authenticated;