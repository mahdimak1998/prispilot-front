
-- Create leads table for storing customer inquiries
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  navn TEXT NOT NULL,
  telefon TEXT NOT NULL,
  epost TEXT,
  brukertype TEXT NOT NULL CHECK (brukertype IN ('privat', 'bedrift')),
  tjeneste TEXT,
  leverandor TEXT,
  samtykke BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert leads (for the contact form)
CREATE POLICY "Anyone can insert leads" 
  ON public.leads 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Policy to allow authenticated users to view leads (for admin purposes)
CREATE POLICY "Authenticated users can view leads" 
  ON public.leads 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Fix the existing lev table by renaming the misspelled column
ALTER TABLE public.lev RENAME COLUMN catogory TO category;
