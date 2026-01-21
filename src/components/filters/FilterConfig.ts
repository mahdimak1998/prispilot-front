
export interface FilterOption {
  value: string;
  label: string;
  icon?: string | null;
}

export interface FilterConfig {
  type: 'select' | 'range' | 'multiselect' | 'search';
  key: string;
  label: string;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export const getLoanTypeIcon = (loanType: string) => {
  switch (loanType) {
    case 'Boliglån':
      return 'house';
    case 'Billån':
      return 'car';
    case 'Forbrukslån':
      return 'credit-card';
    case 'Refinansieringslån':
      return 'arrow-right-left';
    default:
      return null;
  }
};

export const getUniqueProviders = (category: string, offers: any[] = [], t?: (key: string) => string) => {
  const translate = t || ((key: string) => key);
  let uniqueProviders: string[] = [];
  
  if (category === 'mobil') {
    uniqueProviders = [...new Set(offers.map(offer => offer.operator).filter(Boolean))];
  } else if (category === 'strom') {
    uniqueProviders = [...new Set(offers.map(offer => offer.supplier_name).filter(Boolean))];
  } else {
    uniqueProviders = [...new Set(offers.map(offer => offer.provider).filter(Boolean))];
  }
  
  return [
    { value: 'all', label: translate('filters.options.allProviders') },
    ...uniqueProviders.map(provider => ({ value: provider, label: provider }))
  ];
};

export const getUniqueLoanTypes = (offers: any[] = []) => {
  const uniqueTypes = [...new Set(offers.map(offer => offer.loan_type).filter(Boolean))];
  return [
    { value: 'all', label: 'Alle typer', icon: null },
    ...uniqueTypes
      .filter(type => ['Boliglån', 'Forbrukslån', 'Refinansieringslån', 'Billån'].includes(type))
      .map(type => ({ 
        value: type, 
        label: type,
        icon: getLoanTypeIcon(type)
      }))
  ];
};

export const getUniqueInsuranceTypes = (offers: any[] = []) => {
  const uniqueTypes = [...new Set(offers.map(offer => offer.insurance_type).filter(Boolean))];
  return [
    { value: 'all', label: 'Alle typer' },
    ...uniqueTypes.map(type => ({ value: type, label: type }))
  ];
};
