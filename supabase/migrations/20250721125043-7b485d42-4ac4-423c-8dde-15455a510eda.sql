
-- Add missing columns to leads table for business users
ALTER TABLE public.leads 
ADD COLUMN organisasjonsnummer TEXT,
ADD COLUMN antall_ansatte TEXT,
ADD COLUMN bransje TEXT;
