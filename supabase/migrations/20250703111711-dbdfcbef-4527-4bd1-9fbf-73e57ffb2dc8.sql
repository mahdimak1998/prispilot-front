-- Drop existing tv_packages table
DROP TABLE IF EXISTS public.tv_packages CASCADE;

-- Create new tv_packages table with the user's specified schema
CREATE TABLE public.tv_packages (
  id SERIAL NOT NULL,
  provider VARCHAR(255) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  monthly_price INTEGER NOT NULL,
  channels_count INTEGER NULL,
  streaming_included BOOLEAN NULL DEFAULT false,
  sports_channels BOOLEAN NULL DEFAULT false,
  premium_channels BOOLEAN NULL DEFAULT false,
  logo_url TEXT NULL,
  url TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT tv_packages_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.tv_packages ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to tv packages" 
ON public.tv_packages 
FOR SELECT 
USING (true);

-- Insert some sample data
INSERT INTO public.tv_packages (provider, package_name, monthly_price, channels_count, streaming_included, sports_channels, premium_channels, logo_url, url) VALUES
('Telenor', 'TV Start', 299, 50, false, false, false, 'https://www.telenor.no/privat/img/telenor-logo.svg', 'https://www.telenor.no'),
('Get', 'TV Basis', 399, 80, true, false, false, 'https://www.get.no/img/get-logo.svg', 'https://www.get.no'),
('Canal Digital', 'TV Standard', 449, 100, true, true, false, 'https://www.canaldigital.no/img/canal-digital-logo.svg', 'https://www.canaldigital.no'),
('Viasport', 'Sport Pakke', 599, 120, true, true, true, 'https://www.viasport.no/img/viasat-logo.svg', 'https://www.viasport.no'),
('RiksTV', 'Familie Pakke', 349, 65, false, false, true, 'https://www.rikstv.no/img/rikstv-logo.svg', 'https://www.rikstv.no');