
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useOfferData = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async (category: string, filters?: any) => {
    if (!category) return;
    
    // Handle clearing offers only (for strom category initialization)
    if (filters?.clearOnly) {
      setOffers([]);
      setError(null);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // CRITICAL: Always clear existing offers first to prevent contamination
      setOffers([]);

      let offers: any[] = [];

      switch (category) {
        case 'mobil':
          offers = await fetchMobileOffers();
          break;
        case 'strom':
          offers = await fetchPowerOffers(filters);
          break;
        case 'internett':
          offers = await fetchInternetOffers();
          break;
        case 'forsikring':
          offers = await fetchInsuranceOffers();
          break;
        case 'tv-pakker':
          offers = await fetchTVOffers();
          break;
        case 'lan':
          offers = await fetchBankOffers();
          break;
        case 'boligalarm':
          offers = await fetchSecurityOffers();
          break;
        case 'handverkere':
          offers = await fetchHandymenOffers();
          break;
        case 'renhold':
          offers = await fetchCleaningOffers();
          break;
        default:
          console.warn(`Unknown category: ${category}`);
          offers = [];
      }
      
      setOffers(offers);
      
    } catch (error: any) {
      console.error(`ERROR fetching offers for ${category}:`, error);
      setOffers([]);
      setError('Det oppstod en feil ved lasting av tilbud');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMobileOffers = async () => {
    const { data, error } = await supabase.from('mobile_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'mobile' }));
  };

  const fetchPowerOffers = async (filters?: any) => {
    if (!filters || !filters.municipality) {
      return [];
    }
    
    // Use original search term without lowercasing to maintain case sensitivity for matching
    const searchTerm = filters.municipality.trim().replace(/[%_]/g, '\\$&');
    
    if (searchTerm.length < 2) {
      return [];
    }
    
    try {
      
      // Use case-insensitive match directly since municipalities should match exactly
      const { data, error } = await supabase
        .from('power_deals')
        .select('*')
        .ilike('municipality_name', searchTerm)
        .order('price', { ascending: true });
      
      if (error) {
        console.error('Power deals query error:', error);
        throw error;
      }
      
      
      if (!data || data.length === 0) {
        return [];
      }
      
      // Map offers med korrekt struktur
      const powerOffers = data.map((offer: any) => ({ 
        ...offer, 
        type: 'power',
        category: 'strom'
      }));
      
      return powerOffers;
    } catch (error) {
      console.error('Error fetching power offers:', error);
      throw new Error('Failed to fetch power offers');
    }
  };

  const fetchInternetOffers = async () => {
    const { data, error } = await supabase.from('internet_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'internet' }));
  };

  const fetchInsuranceOffers = async () => {
    const { data, error } = await supabase.from('insurance_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'insurance' }));
  };

  const fetchTVOffers = async () => {
    const { data, error } = await supabase.from('tv_packages').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'tv' }));
  };

  const fetchBankOffers = async () => {
    const { data, error } = await supabase
      .from('bank_plans')
      .select('*')
      .order('effective_rate', { ascending: true });
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'bank' }));
  };

  const fetchSecurityOffers = async () => {
    const { data, error } = await supabase.from('home_security_plans').select('*');
    if (error) throw error;
    return (data || []).map((offer: any) => ({ ...offer, type: 'security' }));
  };

  const fetchHandymenOffers = async () => {
    const { data, error } = await supabase.from('handymen_services').select('*');
    
    if (error) {
      console.error('Handymen fetch error:', error);
      throw error;
    }
    return (data || []).map((offer: any) => ({ ...offer, type: 'handymen' }));
  };

  const fetchCleaningOffers = async () => {
    const { data, error } = await supabase.from('cleaning_services').select('*');
    
    if (error) {
      console.error('Cleaning fetch error:', error);
      throw error;
    }
    return (data || []).map((offer: any) => ({ ...offer, type: 'cleaning' }));
  };

  return { offers, loading, error, fetchOffers };
};
