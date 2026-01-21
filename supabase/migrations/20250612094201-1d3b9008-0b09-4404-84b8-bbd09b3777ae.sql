
-- Først, sletter vi eksisterende policy som ikke fungerer
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.leads;

-- Oppretter en ny policy som tillater alle anonyme brukere å sette inn data
CREATE POLICY "Allow anonymous inserts" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Sikrer at RLS er aktivert
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
