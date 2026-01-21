
-- Create policy to allow anonymous users to insert contact form submissions
CREATE POLICY "Allow anonymous contact form submissions" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);
