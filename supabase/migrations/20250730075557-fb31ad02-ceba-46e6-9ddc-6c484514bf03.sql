-- Add connection_type column to internet_plans table
ALTER TABLE public.internet_plans 
ADD COLUMN connection_type TEXT;

-- Update existing records with appropriate connection types based on plan names
-- You can update these later with actual data
UPDATE public.internet_plans 
SET connection_type = 
  CASE 
    WHEN LOWER(plan) LIKE '%fiber%' OR LOWER(plan) LIKE '%fibre%' THEN 'fiber'
    WHEN LOWER(plan) LIKE '%adsl%' OR LOWER(plan) LIKE '%dsl%' THEN 'adsl'
    WHEN LOWER(plan) LIKE '%mobil%' OR LOWER(plan) LIKE '%mobile%' THEN 'mobilt'
    WHEN LOWER(plan) LIKE '%bedrift%' OR LOWER(plan) LIKE '%business%' THEN 'bedrift'
    ELSE 'fiber'
  END;