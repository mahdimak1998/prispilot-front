
-- Create TV packages table
CREATE TABLE public.tv_packages (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(255) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  monthly_price INTEGER NOT NULL,
  channels_count INTEGER,
  streaming_included BOOLEAN DEFAULT false,
  sports_channels BOOLEAN DEFAULT false,
  premium_channels BOOLEAN DEFAULT false,
  logo_url TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for better performance on power_deals
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality 
ON public.power_deals(municipality_name);

-- Add index for supplier names to improve filtering
CREATE INDEX IF NOT EXISTS idx_power_deals_supplier 
ON public.power_deals(supplier_name);

-- Enable RLS on tv_packages table (consistent with other tables)
ALTER TABLE public.tv_packages ENABLE ROW LEVEL SECURITY;

-- Create a simple read policy for tv_packages (public data)
CREATE POLICY "Anyone can view TV packages" 
ON public.tv_packages 
FOR SELECT 
USING (true);
