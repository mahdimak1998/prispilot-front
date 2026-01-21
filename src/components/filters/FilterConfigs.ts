import { FilterConfig, FilterOption } from './FilterConfig';
import { getUniqueProviders, getUniqueLoanTypes, getUniqueInsuranceTypes } from './FilterConfig';

// Helper function to get unique equipment types from boligalarm offers
const getUniqueEquipmentTypes = (offers: any[] = [], translate?: (key: string) => string): FilterOption[] => {
  const translateFn = translate || ((key: string) => key);
  
  // Extract all equipment from offers
  const allEquipment = offers.reduce((acc: string[], offer) => {
    if (offer.equipment_included && Array.isArray(offer.equipment_included)) {
      const equipmentStrings = offer.equipment_included.filter((item): item is string => 
        typeof item === 'string' && item.trim() !== ''
      );
      return [...acc, ...equipmentStrings];
    }
    return acc;
  }, [] as string[]);
  
  // Get unique equipment types and normalize them
  const uniqueEquipment = [...new Set(allEquipment)].map((equipment: string) => equipment.toLowerCase());
  
  // Map to consistent category names that match our icon categories
  const categoryMapping: { [key: string]: string } = {
    'innbrudd': 'innbrudd',
    'break-in': 'innbrudd',
    'brann': 'brann',
    'fire': 'brann',
    'vann': 'vann',
    'water': 'vann',
    'vannlekkasje': 'vann',
    'water leakage': 'vann',
    'kamera': 'kamera',
    'camera': 'kamera',
    'video': 'kamera',
    'smarthus': 'smarthus',
    'smart home': 'smarthus',
    'smart': 'smarthus',
    'smartlås': 'smartlås',
    'smart lock': 'smartlås',
    'app': 'app',
    'diy': 'diy',
    'proff': 'proff',
    'professional': 'proff',
    'vekter': 'vekter',
    'guard': 'vekter'
  };
  
  // Map equipment to categories and get unique categories
  const mappedCategories = new Set<string>();
  uniqueEquipment.forEach(equipment => {
    const mapped = categoryMapping[equipment] || equipment;
    mappedCategories.add(mapped);
  });
  
  return [
    { value: 'all', label: translateFn('filters.options.allEquipment') },
    ...Array.from(mappedCategories).map((equipment: string): FilterOption => ({ 
      value: equipment, 
      label: translateFn(`equipment.${equipment}`) || equipment 
    }))
  ];
};

export const getFilterConfigs = (category: string, providers: any[] = [], offers: any[] = [], t?: (key: string) => string): FilterConfig[] => {
  // Fallback function if t is not provided
  const translate = t || ((key: string) => key);
  
  switch (category) {
    case 'mobil':
      return [
        {
          type: 'select',
          key: 'operator',
          label: translate('filters.labels.operator'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.price'),
          min: 0,
          max: 1000,
          step: 50
        },
        {
          type: 'select',
          key: 'data_category',
          label: translate('filters.labels.data_category'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'small', label: translate('filters.options.dataSmall') },
            { value: 'medium', label: translate('filters.options.dataMedium') },
            { value: 'large', label: translate('filters.options.dataLarge') },
            { value: 'unlimited', label: translate('filters.options.dataUnlimited') }
          ]
        }
      ];
    
    case 'strom':
      return [
        {
          type: 'select',
          key: 'supplier_name',
          label: translate('filters.labels.supplier_name'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'search',
          key: 'municipality',
          label: translate('filters.labels.municipality'),
          placeholder: translate('filters.options.search')
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.priceElectricity'),
          min: 0,
          max: 200,
          step: 5
        },
        {
          type: 'select',
          key: 'contract_length',
          label: translate('filters.labels.contract_length'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'spot', label: translate('filters.options.spot') },
            { value: '12', label: translate('filters.options.months12') },
            { value: '24', label: translate('filters.options.months24') },
            { value: '36', label: translate('filters.options.months36') }
          ]
        }
      ];
    
    case 'internett':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'speed',
          label: translate('filters.labels.speed'),
          min: 10,
          max: 1000,
          step: 10
        },
        {
          type: 'range',
          key: 'price',
          label: translate('filters.labels.price'),
          min: 0,
          max: 1000,
          step: 50
        }
      ];
    
    case 'forsikring':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'select',
          key: 'insurance_type',
          label: translate('filters.labels.insurance_type'),
          options: [
            { value: 'all', label: translate('filters.options.allTypes') },
            ...getUniqueInsuranceTypes(offers).slice(1)
          ]
        },
        {
          type: 'range',
          key: 'monthly_premium',
          label: translate('filters.labels.monthly_premium'),
          min: 0,
          max: 2000,
          step: 100
        }
      ];
    
    case 'lan':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'effective_rate',
          label: translate('filters.labels.effective_rate'),
          min: 0,
          max: 30,
          step: 0.5
        }
      ];
    
    case 'boligalarm':
      // Check if any offers have monthly_price data
      const hasMonthlyPriceData = offers.some((offer: any) => 
        offer.monthly_price && offer.monthly_price > 0
      );
      
      const boligalarmFilters: FilterConfig[] = [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        }
      ];

      // Only add monthly price filter if there's price data available
      if (hasMonthlyPriceData) {
        boligalarmFilters.push({
          type: 'range',
          key: 'monthly_price',
          label: translate('filters.labels.monthly_price'),
          min: 0,
          max: 1000,
          step: 50
        });
      }

      boligalarmFilters.push(
        {
          type: 'select',
          key: 'equipment_type',
          label: translate('filters.labels.equipment_type'),
          options: getUniqueEquipmentTypes(offers, translate)
        },
        {
          type: 'select',
          key: 'price_range',
          label: translate('filters.labels.price_range'),
          options: [
            { value: 'all', label: translate('filters.options.allPrices') },
            { value: 'under_200', label: translate('filters.options.under200') },
            { value: '200_400', label: translate('filters.options.200to400') },
            { value: 'over_400', label: translate('filters.options.over400') }
          ]
        }
      );

      return boligalarmFilters;

    case 'tv-pakker':
      return [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        },
        {
          type: 'range',
          key: 'monthly_price',
          label: translate('filters.labels.monthly_price'),
          min: 0,
          max: 1000,
          step: 50
        },
        {
          type: 'range',
          key: 'channels_count',
          label: translate('filters.labels.channels_count'),
          min: 0,
          max: 200,
          step: 10
        }
      ];

    case 'handverkere':
      // Check if any offers have hourly_rate data
      const hasHourlyRateData = offers.some((offer: any) => 
        offer.hourly_rate && offer.hourly_rate > 0
      );
      
      const handverkereFilters: FilterConfig[] = [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        }
      ];

      // Only add hourly rate filter if there's price data available
      if (hasHourlyRateData) {
        handverkereFilters.push({
          type: 'range',
          key: 'hourly_rate',
          label: translate('filters.labels.hourly_rate'),
          min: 200,
          max: 1500,
          step: 50
        });
      }

      handverkereFilters.push(
        {
          type: 'select',
          key: 'service_type',
          label: translate('filters.labels.service_type'),
          options: [
            { value: 'all', label: translate('filters.options.allServices') },
            { value: 'renovation', label: translate('filters.options.serviceRenovation') },
            { value: 'repair', label: translate('filters.options.serviceRepair') },
            { value: 'electrical', label: translate('filters.options.serviceElectrical') },
            { value: 'plumbing', label: translate('filters.options.servicePlumbing') },
            { value: 'painting', label: translate('filters.options.servicePainting') }
          ]
        },
        {
          type: 'select',
          key: 'certification',
          label: translate('filters.labels.certification'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'true', label: translate('filters.options.certified') },
            { value: 'false', label: translate('filters.options.notCertified') }
          ]
        }
      );

      return handverkereFilters;

    case 'renhold':
      // Check if any offers have hourly_rate data
      const hasRenholdHourlyRateData = offers.some((offer: any) => 
        offer.hourly_rate && offer.hourly_rate > 0
      );
      
      const renholdFilters: FilterConfig[] = [
        {
          type: 'select',
          key: 'provider',
          label: translate('filters.labels.provider'),
          options: getUniqueProviders(category, offers, translate)
        }
      ];

      // Only add hourly rate filter if there's price data available
      if (hasRenholdHourlyRateData) {
        renholdFilters.push({
          type: 'range',
          key: 'hourly_rate',
          label: translate('filters.labels.hourly_rate'),
          min: 200,
          max: 800,
          step: 25
        });
      }

      renholdFilters.push(
        {
          type: 'select',
          key: 'service_type',
          label: translate('filters.labels.cleaning_type'),
          options: [
            { value: 'all', label: translate('filters.options.allTypes') },
            { value: 'home_cleaning', label: translate('filters.options.cleaningHome') },
            { value: 'office_cleaning', label: translate('filters.options.cleaningOffice') },
            { value: 'deep_cleaning', label: translate('filters.options.cleaningDeep') },
            { value: 'regular_cleaning', label: translate('filters.options.cleaningRegular') },
            { value: 'moving_cleaning', label: translate('filters.options.cleaningMoving') }
          ]
        },
        {
          type: 'select',
          key: 'equipment_included',
          label: translate('filters.labels.equipment_included'),
          options: [
            { value: 'all', label: translate('filters.options.all') },
            { value: 'true', label: translate('filters.options.equipmentIncluded') },
            { value: 'false', label: translate('filters.options.bringOwnEquipment') }
          ]
        }
      );

      return renholdFilters;
    
    default:
      return [];
  }
};
