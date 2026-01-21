-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.tv_packages CASCADE;
DROP TABLE IF EXISTS public.insurance_plans CASCADE;

-- Create tv_packages table
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

-- Create insurance_plans table
CREATE TABLE public.insurance_plans (
  id uuid not null default gen_random_uuid(),
  provider text not null,
  product_name text not null,
  insurance_type text not null,
  monthly_premium integer not null,
  deductible integer null default 0,
  coverage_amount integer null,
  features text[] null,
  age_limit integer null,
  url text null,
  logo_url text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint insurance_plans_pkey primary key (id)
);

-- Enable RLS for both tables
ALTER TABLE public.tv_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read access to tv packages" 
ON public.tv_packages 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to insurance plans" 
ON public.insurance_plans 
FOR SELECT 
USING (true);

-- Insert TV packages sample data
INSERT INTO public.tv_packages (provider, package_name, monthly_price, channels_count, streaming_included, sports_channels, premium_channels, logo_url, url) VALUES
('Telenor', 'TV Start', 299, 50, false, false, false, 'https://www.telenor.no/privat/img/telenor-logo.svg', 'https://www.telenor.no'),
('Get', 'TV Basis', 399, 80, true, false, false, 'https://www.get.no/img/get-logo.svg', 'https://www.get.no'),
('Canal Digital', 'TV Standard', 449, 100, true, true, false, 'https://www.canaldigital.no/img/canal-digital-logo.svg', 'https://www.canaldigital.no'),
('Viasport', 'Sport Pakke', 599, 120, true, true, true, 'https://www.viasport.no/img/viasat-logo.svg', 'https://www.viasport.no'),
('RiksTV', 'Familie Pakke', 349, 65, false, false, true, 'https://www.rikstv.no/img/rikstv-logo.svg', 'https://www.rikstv.no');

-- Insert insurance plans sample data
INSERT INTO public.insurance_plans (provider, product_name, insurance_type, monthly_premium, deductible, coverage_amount, features, age_limit, logo_url, url) VALUES
('If Skadeforsikring', 'Bilforsikring Komplett', 'bilforsikring', 850, 8000, 5000000, ARRAY['Kasko', 'Ansvar', 'Veihjelp', 'Servicebil'], null, 'https://www.if.no/content/dam/if-no/logo/if-logo.svg', 'https://www.if.no'),
('Tryg', 'Innboforsikring Plus', 'innboforsikring', 295, 4000, 2000000, ARRAY['Innbo', 'Ansvar', 'Rådgivning', 'Identitetstyveri'], null, 'https://www.tryg.no/content/dam/tryg-no/logo/tryg-logo.svg', 'https://www.tryg.no'),
('Storebrand', 'Reiseforsikring Familie', 'reiseforsikring', 449, 1000, 10000000, ARRAY['Reiseulykke', 'Reisesyke', 'Avbestilling', 'Bagasje'], null, 'https://www.storebrand.no/site/stb.nsf/Images/SB_Logo_Pos_RGB_png/$file/SB_Logo_Pos_RGB.png', 'https://www.storebrand.no'),
('Gjensidige', 'Husforsikring Standard', 'husforsikring', 650, 10000, 15000000, ARRAY['Bygning', 'Innbo', 'Ansvar', 'Rørskade'], null, 'https://www.gjensidige.no/content/dam/gjensidige-no/logo/gjensidige-logo.svg', 'https://www.gjensidige.no'),
('SpareBank 1', 'Livsforsikring Basis', 'livsforsikring', 1200, 0, 1000000, ARRAY['Dødsfall', 'Uførhet', 'Kritisk sykdom'], 67, 'https://www.sparebank1.no/content/dam/sparebank1/logo/sb1-logo.svg', 'https://www.sparebank1.no'),
('DNB', 'Ulykkesforsikring', 'ulykkesforsikring', 180, 0, 2000000, ARRAY['Dødsfall ved ulykke', 'Medisinsk invaliditet', 'Kosmetisk skade'], 70, 'https://www.dnb.no/content/dam/dnb/logo/dnb-logo.svg', 'https://www.dnb.no');