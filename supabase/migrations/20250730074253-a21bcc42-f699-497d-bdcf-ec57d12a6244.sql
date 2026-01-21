-- Add indexes for better performance on power_deals table
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_name ON public.power_deals (municipality_name);
CREATE INDEX IF NOT EXISTS idx_power_deals_price ON public.power_deals (price);
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_price ON public.power_deals (municipality_name, price);