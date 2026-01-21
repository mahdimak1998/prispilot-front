-- Refresh the municipality data materialized view to ensure it's up to date
SELECT public.refresh_unique_municipalities();