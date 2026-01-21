
import { useState, useEffect, useCallback } from 'react';
import { useProviderData } from './category/useProviderData';
import { useOfferData } from './category/useOfferData';
import { useMunicipalityData } from './category/useMunicipalityData';

export const useCategoryData = (kategori: string) => {
  const [initialLoading, setInitialLoading] = useState(true);
  
  const { providers, fetchProviders } = useProviderData();
  const { offers, loading, error, fetchOffers } = useOfferData();
  const { fetchMunicipalities } = useMunicipalityData();

  // Stable callback that won't change on every render
  const handleDataLoad = useCallback(async (category: string) => {
    if (!category) return;
    
    // console.log(`Category changed to: ${category} - CLEARING ALL PREVIOUS OFFERS`);
    setInitialLoading(true);
    
    try {
      // CRITICAL: Clear offers first to prevent cross-contamination
      // This ensures offers from previous category don't leak into new category
      
      // Load providers first
      await fetchProviders(category);
      
      // For power category, only load providers initially and clear offers
      if (category === 'strom') {
      // console.log('STROM CATEGORY: Clearing offers and waiting for municipality selection');
        // Clear any existing offers for strom category
        await fetchOffers('strom', { clearOnly: true });
        setInitialLoading(false);
      } else {
        // For all other categories, load offers automatically
      // console.log(`NON-STROM CATEGORY (${category}): Loading offers automatically`);
        await fetchOffers(category);
        setInitialLoading(false);
      }
    } catch (error) {
      console.error('Error in loadData:', error);
      setInitialLoading(false);
    }
  }, [fetchProviders, fetchOffers]);

  // Fixed useEffect with stable dependencies
  useEffect(() => {
    handleDataLoad(kategori);
  }, [kategori, handleDataLoad]);

  // Memoized stable callback for refetch
  const refetch = useCallback((category: string, options?: any) => {
    return fetchOffers(category, options);
  }, [fetchOffers]);

  return {
    providers,
    offers,
    loading,
    initialLoading,
    error,
    refetch,
    fetchMunicipalities
  };
};
