
-- Create leverandorer table for storing service providers
CREATE TABLE public.leverandorer (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  navn TEXT NOT NULL,
  logo_url TEXT,
  kategori TEXT NOT NULL,
  beskrivelse TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for leverandorer table
ALTER TABLE public.leverandorer ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to leverandorer
CREATE POLICY "Anyone can view leverandorer" 
  ON public.leverandorer 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

-- Policy to allow authenticated users to manage leverandorer (for admin)
CREATE POLICY "Authenticated users can manage leverandorer" 
  ON public.leverandorer 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Insert some sample leverandører data
INSERT INTO public.leverandorer (navn, kategori, logo_url, beskrivelse) VALUES
  ('Telenor', 'mobil', 'https://logo.clearbit.com/telenor.no', 'Norges største mobiloperatør'),
  ('Telia', 'mobil', 'https://logo.clearbit.com/telia.no', 'Mobiloperatør og internettleverandør'),
  ('Ice', 'mobil', 'https://logo.clearbit.com/ice.no', 'Rimelig mobiloperatør'),
  ('Altibox', 'internett', 'https://logo.clearbit.com/altibox.no', 'Fiber internett'),
  ('Get', 'internett', 'https://logo.clearbit.com/get.no', 'Kabel-TV og internett'),
  ('Hafslund', 'strom', 'https://logo.clearbit.com/hafslund.no', 'Strømleverandør'),
  ('Tibber', 'strom', 'https://logo.clearbit.com/tibber.com', 'Smart strøm'),
  ('If', 'forsikring', 'https://logo.clearbit.com/if.no', 'Forsikringsselskap'),
  ('Tryg', 'forsikring', 'https://logo.clearbit.com/tryg.no', 'Forsikring'),
  ('DNB', 'bank', 'https://logo.clearbit.com/dnb.no', 'Bank og finans'),
  ('Sbanken', 'bank', 'https://logo.clearbit.com/sbanken.no', 'Digitalbank'),
  ('Santander', 'lan', 'https://logo.clearbit.com/santander.no', 'Forbrukslån'),
  ('Sector Alarm', 'boligalarm', 'https://logo.clearbit.com/sectoralarm.com', 'Boligalarm');
