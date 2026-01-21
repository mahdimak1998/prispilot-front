-- Enable RLS on providers table
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for providers table
CREATE POLICY "Allow public read access to providers" 
ON public.providers 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can insert providers" 
ON public.providers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update providers" 
ON public.providers 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can delete providers" 
ON public.providers 
FOR DELETE 
TO authenticated
USING (true);

-- Enable trigram extension for better text searching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add performance indexes for power_deals table (after extension is enabled)
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_name 
ON public.power_deals USING gin(municipality_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_search 
ON public.power_deals (municipality_name);

CREATE INDEX IF NOT EXISTS idx_power_deals_price 
ON public.power_deals (price);

-- Add RLS policies for INSERT/UPDATE operations on existing tables
CREATE POLICY "Allow authenticated insert on mobile_plans" 
ON public.mobile_plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on mobile_plans" 
ON public.mobile_plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on power_deals" 
ON public.power_deals 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on power_deals" 
ON public.power_deals 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on internet_plans" 
ON public.internet_plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on internet_plans" 
ON public.internet_plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on insurance_plans" 
ON public.insurance_plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on insurance_plans" 
ON public.insurance_plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on bank_plans" 
ON public.bank_plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on bank_plans" 
ON public.bank_plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on home_security_plans" 
ON public.home_security_plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on home_security_plans" 
ON public.home_security_plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on tv_packages" 
ON public.tv_packages 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on tv_packages" 
ON public.tv_packages 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on handymen_services" 
ON public.handymen_services 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on handymen_services" 
ON public.handymen_services 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert on cleaning_services" 
ON public.cleaning_services 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on cleaning_services" 
ON public.cleaning_services 
FOR UPDATE 
TO authenticated
USING (true);