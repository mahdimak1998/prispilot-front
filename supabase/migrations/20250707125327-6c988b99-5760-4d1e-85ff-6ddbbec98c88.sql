-- Add SELECT policies to allow public reading of data tables

-- Allow public read access to mobile plans
CREATE POLICY "Allow public read access to mobile plans" 
ON public.mobile_plans 
FOR SELECT 
USING (true);

-- Allow public read access to power deals
CREATE POLICY "Allow public read access to power deals" 
ON public.power_deals 
FOR SELECT 
USING (true);

-- Allow public read access to internet plans
CREATE POLICY "Allow public read access to internet plans" 
ON public.internet_plans 
FOR SELECT 
USING (true);

-- Allow public read access to bank plans
CREATE POLICY "Allow public read access to bank plans" 
ON public.bank_plans 
FOR SELECT 
USING (true);