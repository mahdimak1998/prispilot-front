export interface PowerOffer {
  id: number;
  supplier_name: string;
  product_name: string;
  price: number;
  price_unit: string;
  contract_length: string;
  municipality_name: string;
  logo_url?: string;
  url?: string;
  additional_fees?: number;
  total_price?: number;
}

export interface CategoryInfo {
  key: string;
  label: string;
  labelKey: string;
  icon: string;
  color: string;
}

export const POWER_CATEGORIES: CategoryInfo[] = [
  { key: 'all', label: 'Alle', labelKey: 'power.contractTypes.all', icon: 'Zap', color: 'gray' },
  { key: 'spot', label: 'Spotpris', labelKey: 'power.contractTypes.spot', icon: 'TrendingUp', color: 'blue' },
  { key: 'fixed', label: 'Fastpris', labelKey: 'power.contractTypes.fixed', icon: 'Zap', color: 'green' },
  { key: 'variable', label: 'Variabel', labelKey: 'power.contractTypes.variable', icon: 'Clock', color: 'orange' },
  { key: 'green', label: 'Grønn strøm', labelKey: 'power.contractTypes.green', icon: 'Leaf', color: 'emerald' },
  { key: 'residential', label: 'Boligstrøm', labelKey: 'power.contractTypes.residential', icon: 'Home', color: 'purple' },
  { key: 'cabin', label: 'Hyttestrøm', labelKey: 'power.contractTypes.cabin', icon: 'Mountain', color: 'amber' },
  { key: 'business', label: 'Bedriftsstrøm', labelKey: 'power.contractTypes.business', icon: 'Briefcase', color: 'indigo' }
];

// Calculate monthly cost based on consumption and offer data
export const calculateMonthlyCost = (offer: PowerOffer, consumption: number): number => {
  // Use total_price if available, otherwise calculate from price
  let pricePerKwh = offer.price || 0;
  
  // If total_price exists and price is 0 or null, use total_price as øre/kWh
  if (offer.total_price && (!offer.price || offer.price === 0)) {
    pricePerKwh = offer.total_price;
  }
  
  return Math.round((consumption * pricePerKwh / 100) / 12);
};

// Get display price - use total_price if price is 0 or null
export const getDisplayPrice = (offer: PowerOffer): number => {
  return (offer.price && offer.price > 0) ? offer.price : (offer.total_price || 0);
};

// Check if offer has valid pricing data
export const hasValidPricing = (offer: PowerOffer): boolean => {
  return (offer.price && offer.price > 0) || (offer.total_price && offer.total_price > 0);
};

// Categorize offer based on product name and contract length
export const categorizeOffer = (offer: PowerOffer): string => {
  const productLower = offer.product_name?.toLowerCase() || '';
  const contractLower = offer.contract_length?.toLowerCase() || '';
  
  // Check product name first for more accurate categorization based on actual data
  if (productLower.includes('spot') || productLower.includes('markedskraft') || productLower.includes('timespot')) return 'spot';
  
  // Handle fastpris with specific durations
  if (productLower.includes('fast') || productLower.includes('fastpris')) {
    if (productLower.includes('6 mnd') || productLower.includes('6 måneder')) return 'fixed-6';
    if (productLower.includes('12 måneder') || productLower.includes('1 år')) return 'fixed-12';
    if (productLower.includes('18 måneder')) return 'fixed-18';
    if (productLower.includes('24 måneder') || productLower.includes('2 år')) return 'fixed-24';
    if (productLower.includes('36 måneder') || productLower.includes('3 år')) return 'fixed-36';
    if (productLower.includes('5 år')) return 'fixed-60';
    if (productLower.includes('10 år')) return 'fixed-120';
    return 'fixed'; // Default fixed if no specific duration found
  }
  
  if (productLower.includes('grønn') || productLower.includes('groen') || productLower.includes('fornybar') || productLower.includes('sol')) return 'green';
  if (productLower.includes('hytte') || productLower.includes('hyttekraft') || productLower.includes('hyttestrøm')) return 'cabin';
  if (productLower.includes('bolig') || productLower.includes('boligstrøm') || productLower.includes('boligpakka')) return 'residential';
  if (productLower.includes('bedrift') || productLower.includes('business')) return 'business';
  if (productLower.includes('variabel') || productLower.includes('plusskunde') || productLower.includes('pluss')) return 'variable';
  if (productLower.includes('varmepumpe')) return 'residential'; // Varmepumpestrøm categorized as residential
  
  // Check contract length as fallback
  if (contractLower.includes('spot')) return 'spot';
  if (contractLower.includes('fast')) return 'fixed';
  if (contractLower.includes('variabel')) return 'variable';
  if (contractLower.includes('grønn')) return 'green';
  
  return 'all';
};

// Get contract badge color
export const getContractBadgeColor = (category: string): string => {
  switch (category) {
    case 'spot': return 'bg-blue-100 text-blue-800';
    case 'fixed': return 'bg-green-100 text-green-800';
    case 'green': return 'bg-emerald-100 text-emerald-800';
    case 'residential': return 'bg-purple-100 text-purple-800';
    case 'cabin': return 'bg-amber-100 text-amber-800';
    case 'business': return 'bg-indigo-100 text-indigo-800';
    case 'variable': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Format consumption value
export const formatConsumption = (value: number): string => {
  return value.toLocaleString('no-NO') + ' kWh';
};

// Filter offers by category and municipality
export const filterOffers = (
  offers: PowerOffer[], 
  selectedMunicipality: string, 
  selectedCategory: string
): PowerOffer[] => {
  // console.log(`Starting filterOffers with ${offers.length} offers, municipality: "${selectedMunicipality}", category: "${selectedCategory}"`);
  
  let filtered = offers.filter(hasValidPricing); // Only show offers with valid pricing
  // console.log(`After filtering for valid pricing: ${filtered.length} offers`);

  // Filter by municipality with improved case-insensitive matching
  if (selectedMunicipality) {
    const searchTerm = selectedMunicipality.toLowerCase().trim();
    const beforeMunicipalityFilter = filtered.length;
    
    filtered = filtered.filter(offer => {
      if (!offer.municipality_name) return false;
      
      const municipalityName = offer.municipality_name.toLowerCase();
      
      // Simplified matching - exact match or contains
      const matches = municipalityName === searchTerm || 
                     municipalityName.includes(searchTerm) ||
                     searchTerm.includes(municipalityName);
      
      return matches;
    });
    
  // console.log(`Municipality filter "${selectedMunicipality}": ${beforeMunicipalityFilter} -> ${filtered.length} offers`);
  }

  // Filter by category - only if category is specified and not 'all'
  if (selectedCategory && selectedCategory !== 'all') {
    const beforeCategoryFilter = filtered.length;
    
    filtered = filtered.filter(offer => {
      const offerCategory = categorizeOffer(offer);
      
      // Handle fixed sub-categories - if general 'fixed' is selected, show all fixed types
      if (selectedCategory === 'fixed') {
        return offerCategory === 'fixed' || offerCategory.startsWith('fixed-');
      }
      
      // For specific fixed sub-categories, match exactly
      return offerCategory === selectedCategory;
    });
    
  // console.log(`Category filter "${selectedCategory}": ${beforeCategoryFilter} -> ${filtered.length} offers`);
  }

  // console.log(`Final filtered result: ${filtered.length} offers`);
  return filtered;
};

// Sort offers by monthly cost
export const sortOffersByPrice = (offers: PowerOffer[], consumption: number): PowerOffer[] => {
  return [...offers].sort((a, b) => {
    const costA = calculateMonthlyCost(a, consumption);
    const costB = calculateMonthlyCost(b, consumption);
    return costA - costB;
  });
};