
-- Dropper alle eksisterende policies først
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.leads;

-- Lager en ny policy med riktig syntaks for anonymous brukere
CREATE POLICY "allow_anonymous_lead_inserts" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Sikrer at RLS er aktivert
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
