
-- Create handymen_services table
CREATE TABLE public.handymen_services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider text NOT NULL,
  service_name text NOT NULL,
  service_type text NOT NULL,
  hourly_rate integer NOT NULL,
  logo_url text,
  url text,
  specialties text[] DEFAULT '{}',
  location text,
  rating numeric(2,1),
  certification boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create cleaning_services table
CREATE TABLE public.cleaning_services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider text NOT NULL,
  service_name text NOT NULL,
  service_type text NOT NULL,
  hourly_rate integer NOT NULL,
  logo_url text,
  url text,
  service_areas text[] DEFAULT '{}',
  frequency_options text[] DEFAULT '{}',
  equipment_included boolean DEFAULT false,
  location text,
  rating numeric(2,1),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add new columns to home_security_plans for advanced filtering
ALTER TABLE public.home_security_plans 
ADD COLUMN alarm_types text[] DEFAULT '{}',
ADD COLUMN installation_type text DEFAULT 'professional',
ADD COLUMN response_service text DEFAULT 'without_guard',
ADD COLUMN smart_features text[] DEFAULT '{}',
ADD COLUMN response_time_minutes integer;

-- Enable RLS on new tables
ALTER TABLE public.handymen_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cleaning_services ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for handymen_services
CREATE POLICY "Allow public read access to handymen services" 
ON public.handymen_services 
FOR SELECT 
USING (true);

CREATE POLICY "Allow delete for all handymen services" 
ON public.handymen_services 
FOR DELETE 
USING (true);

-- Create RLS policies for cleaning_services
CREATE POLICY "Allow public read access to cleaning services" 
ON public.cleaning_services 
FOR SELECT 
USING (true);

CREATE POLICY "Allow delete for all cleaning services" 
ON public.cleaning_services 
FOR DELETE 
USING (true);

-- Insert example data for handymen_services
INSERT INTO public.handymen_services (
  provider, service_name, service_type, hourly_rate, logo_url, url, 
  specialties, location, rating, certification
) VALUES 
(
  'Norsk Håndverk AS', 
  'Komplett Renoveringspakke', 
  'renovation', 
  850, 
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
  'https://example.com/norsk-handverk',
  ARRAY['maleri', 'elektro', 'rørlegger', 'snekker'],
  'Oslo',
  4.8,
  true
),
(
  'Håndverkerne', 
  'Akutt Reparasjon 24/7', 
  'repair', 
  950, 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
  'https://example.com/handverkerne',
  ARRAY['akutt', 'rørlegger', 'elektro'],
  'Bergen',
  4.6,
  true
);

-- Insert example data for cleaning_services
INSERT INTO public.cleaning_services (
  provider, service_name, service_type, hourly_rate, logo_url, url,
  service_areas, frequency_options, equipment_included, location, rating
) VALUES 
(
  'Renhold Express', 
  'Totalrengjøring Bolig', 
  'home_cleaning', 
  450, 
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
  'https://example.com/renhold-express',
  ARRAY['bolig', 'kjøkken', 'bad', 'vinduer'],
  ARRAY['ukentlig', 'månedlig', 'engangs'],
  true,
  'Oslo',
  4.7
),
(
  'Blankepuss AS', 
  'Kontorrenhold Profesjonell', 
  'office_cleaning', 
  380, 
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop',
  'https://example.com/blankepuss',
  ARRAY['kontor', 'fellesarealer', 'sanitær'],
  ARRAY['daglig', 'ukentlig'],
  true,
  'Trondheim',
  4.5
);

-- Update existing home_security_plans with example advanced filtering data
UPDATE public.home_security_plans 
SET 
  alarm_types = ARRAY['innbrudd', 'brann'],
  installation_type = 'professional',
  response_service = 'with_guard',
  smart_features = ARRAY['app_control', 'google_home'],
  response_time_minutes = 15
WHERE plan_type = 'premium';

UPDATE public.home_security_plans 
SET 
  alarm_types = ARRAY['innbrudd'],
  installation_type = 'diy',
  response_service = 'without_guard',
  smart_features = ARRAY['app_control'],
  response_time_minutes = null
WHERE plan_type = 'basic';
