import { supabase } from '@/integrations/supabase/client';

export const useMunicipalityData = () => {
  const fetchMunicipalities = async () => {
    try {
  // Fjernet console.log spam
      
      // Use the existing Supabase function to get unique municipalities
      const { data, error } = await supabase.rpc('get_unique_municipalities');
      
      if (error) {
    // Beholder kun reelle feil for debugging
        throw error;
      }
      
  // Fjernet console.log spam
      
      if (!data || data.length === 0) {
        return [];
      }
      
      // Filter out any null or empty values and sort
      const municipalities = data
        .map(item => item.municipality_name)
        .filter(name => name && typeof name === 'string' && name.trim().length > 0)
        .sort((a, b) => a.localeCompare(b, 'no'));
      
  // Fjernet console.log spam
      
      // Returner i korrekt format
      return municipalities.map(name => ({
        clean_name: name,
        original_name: name
      }));
    } catch (error) {
  // Beholder kun reelle feil for debugging
      return [];
    }
  };

  return { fetchMunicipalities };
};