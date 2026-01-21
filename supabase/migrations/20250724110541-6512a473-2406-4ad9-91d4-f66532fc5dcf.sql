-- Remove the deductible column from insurance_plans table
ALTER TABLE public.insurance_plans DROP COLUMN IF EXISTS deductible;