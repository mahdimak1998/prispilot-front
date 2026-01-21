
import { useMemo } from 'react';

interface BoligalarmOffer {
  id: string | number;
  provider: string;
  product_name: string;
  monthly_price: number;
  setup_fee?: number;
  plan_type: string;
  logo_url?: string;
  url?: string;
  equipment_included?: string[];
  monitoring_24_7?: boolean;
  app_control?: boolean;
  installation_included?: boolean;
  installation_type?: string;
  response_service?: string;
  response_time_minutes?: number;
  contract_months?: number;
  smart_features?: string[];
}

interface FilterValues {
  provider?: string;
  monthly_price?: number[];
  equipment_type?: string;
  price_range?: string;
}

// Fisher-Yates shuffle algorithm for random sorting
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useBoligalarmFilters = (offers: BoligalarmOffer[], filters: FilterValues, selectedCategory?: string | null, sortBy: string = 'bestMatch') => {
  return useMemo(() => {
    if (!offers.length) return [];

  // Removed console.log spam

    let filtered = offers.filter(offer => {
      // Provider filter
      if (filters.provider && filters.provider !== 'all' && offer.provider !== filters.provider) {
        return false;
      }

      // Monthly price range filter
      if (filters.monthly_price && filters.monthly_price.length === 2) {
        const [min, max] = filters.monthly_price;
        if (offer.monthly_price < min || offer.monthly_price > max) {
          return false;
        }
      }

      // Price range filter
      if (filters.price_range && filters.price_range !== 'all') {
        switch (filters.price_range) {
          case 'under_200':
            if (offer.monthly_price >= 200) return false;
            break;
          case '200_400':
            if (offer.monthly_price < 200 || offer.monthly_price >= 400) return false;
            break;
          case 'over_400':
            if (offer.monthly_price < 400) return false;
            break;
        }
      }

      // Category filter from category icons (this takes precedence and unifies with equipment filtering)
      if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== null) {
        const equipment = offer.equipment_included || [];
        const smartFeatures = offer.smart_features || [];
        
        // Enhanced equipment matching with fuzzy logic
        const hasRequiredEquipment = [...equipment, ...smartFeatures].some(item => {
          const itemLower = item.toLowerCase();
          const categoryLower = selectedCategory.toLowerCase();
          
          // Direct match
          if (itemLower === categoryLower) return true;
          
          // Enhanced fuzzy matching for similar terms
          switch (selectedCategory) {
            case 'innbrudd':
              return itemLower.includes('innbrudd') || 
                     itemLower.includes('break') || 
                     itemLower.includes('inntrenging') ||
                     itemLower.includes('tyveri') ||
                     itemLower.includes('sensor') ||
                     itemLower.includes('dør') ||
                     itemLower.includes('vindu');
                     
            case 'brann':
              return itemLower.includes('brann') || 
                     itemLower.includes('fire') || 
                     itemLower.includes('røyk') ||
                     itemLower.includes('smoke') ||
                     itemLower.includes('flamme');
                     
            case 'vann':
              return itemLower.includes('vann') || 
                     itemLower.includes('water') || 
                     itemLower.includes('lekkasje') ||
                     itemLower.includes('leak') ||
                     itemLower.includes('fukt') ||
                     itemLower.includes('moisture');
                     
            case 'kamera':
              return itemLower.includes('kamera') || 
                     itemLower.includes('camera') || 
                     itemLower.includes('video') ||
                     itemLower.includes('overvåk') ||
                     itemLower.includes('surveillance') ||
                     itemLower.includes('webcam');
                     
            case 'smarthus':
              return itemLower.includes('smarthus') || 
                     itemLower.includes('smart') || 
                     itemLower.includes('home') ||
                     itemLower.includes('hjem') ||
                     itemLower.includes('automatisering') ||
                     itemLower.includes('automation') ||
                     itemLower.includes('iot');
                     
            case 'smartlås':
              return itemLower.includes('smartlås') || 
                     itemLower.includes('smart') && itemLower.includes('lås') || 
                     itemLower.includes('lock') ||
                     itemLower.includes('digital') && itemLower.includes('lås') ||
                     itemLower.includes('keypad') ||
                     itemLower.includes('fingerprint') ||
                     itemLower.includes('dørlås');
                     
            default:
              return false;
          }
        });
        
        if (!hasRequiredEquipment) {
          // Removed console.log spam
          return false;
        }
      }

      // Equipment type filter from filter panel (only applied if no category is selected)
      if (!selectedCategory && filters.equipment_type && filters.equipment_type !== 'all') {
        const equipment = offer.equipment_included || [];
        const smartFeatures = offer.smart_features || [];
        const hasEquipmentType = [...equipment, ...smartFeatures].some(item => {
          const equipmentLower = item.toLowerCase();
          const filterLower = filters.equipment_type!.toLowerCase();
          
          // Direct match or contains match
          return equipmentLower === filterLower || equipmentLower.includes(filterLower);
        });
        
        if (!hasEquipmentType) {
          return false;
        }
      }

      return true;
    });

    console.log(`Filtered to ${filtered.length} offers for category: ${selectedCategory || 'all'}`);
  // Removed console.log spam

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.monthly_price - b.monthly_price;

        case 'price_desc':
          return b.monthly_price - a.monthly_price;

        case 'bestMatch':
        case 'random':
        default:
          return 0;
      }
    });

    if (sortBy === 'random' || sortBy === 'bestMatch') {
      filtered = shuffleArray(filtered);
    }

    return filtered;
  }, [offers, filters, selectedCategory, sortBy]);
};
