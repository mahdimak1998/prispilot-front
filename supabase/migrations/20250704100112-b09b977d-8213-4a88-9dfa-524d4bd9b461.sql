-- Create indexes for better performance on power_deals table
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_name ON power_deals(municipality_name);
CREATE INDEX IF NOT EXISTS idx_power_deals_price ON power_deals(price);
CREATE INDEX IF NOT EXISTS idx_power_deals_municipality_price ON power_deals(municipality_name, price);

-- Create a materialized view for unique municipalities with cleaned names
CREATE MATERIALIZED VIEW IF NOT EXISTS unique_municipalities AS
SELECT DISTINCT 
    municipality_name as original_name,
    CASE 
        WHEN municipality_name LIKE '%-%' THEN TRIM(SPLIT_PART(municipality_name, '-', 1))
        WHEN municipality_name LIKE '%(%' THEN TRIM(SPLIT_PART(municipality_name, '(', 1))
        ELSE municipality_name
    END as clean_name,
    COUNT(*) as offer_count
FROM power_deals 
WHERE municipality_name IS NOT NULL 
GROUP BY municipality_name
ORDER BY clean_name;

-- Create index on the materialized view
CREATE INDEX IF NOT EXISTS idx_unique_municipalities_clean_name ON unique_municipalities(clean_name);
CREATE INDEX IF NOT EXISTS idx_unique_municipalities_original_name ON unique_municipalities(original_name);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_unique_municipalities()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW unique_municipalities;
END;
$$ LANGUAGE plpgsql;