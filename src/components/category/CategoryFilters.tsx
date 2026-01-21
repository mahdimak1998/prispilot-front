
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FilterPanel from '@/components/FilterPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';

interface CategoryFiltersProps {
  kategori: string;
  offers: any[];
  providers: any[];
  filters: { [key: string]: any };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  filteredOffersCount?: number;
  totalOffersCount?: number;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  kategori,
  offers,
  providers,
  filters,
  onFilterChange,
  onClearFilters,
  sortBy,
  onSortChange,
  isFilterOpen,
  onToggleFilter,
  filteredOffersCount = 0,
  totalOffersCount = 0
}) => {
  const { t } = useLanguage();
  const { getFilterTranslation } = useTranslations();
  
  const getSortOptions = () => {
    const baseOptions = [
      { value: 'bestMatch', label: getFilterTranslation('sorting.bestMatch') },
      { value: 'price_asc', label: getFilterTranslation('sorting.priceLowToHigh') },
      { value: 'price_desc', label: getFilterTranslation('sorting.priceHighToLow') }
    ];

    if (kategori === 'mobil') {
      baseOptions.push({ value: 'data_desc', label: getFilterTranslation('sorting.dataHighToLow') });
    }

    if (kategori === 'internett') {
      baseOptions.push({ value: 'speed_desc', label: getFilterTranslation('sorting.speedHighToLow') });
    }

    if (kategori === 'lan') {
      return [
        { value: 'bestMatch', label: getFilterTranslation('sorting.bestMatch') },
        { value: 'rate_asc', label: getFilterTranslation('sorting.rateLowToHigh') },
        { value: 'rate_desc', label: getFilterTranslation('sorting.rateHighToLow') }
      ];
    }

    return baseOptions;
  };

  const getDisplayValue = () => {
    const options = getSortOptions();
    const validSort = options.find(option => option.value === sortBy);
    return validSort ? sortBy : 'bestMatch';
  };

  return (
    <>
      {offers.length > 0 && (
        <FilterPanel
          category={kategori || ''}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          isOpen={isFilterOpen}
          onToggle={onToggleFilter}
          providers={providers}
          offers={offers}
          sortBy={sortBy}
          onSortChange={onSortChange}
          getSortOptions={getSortOptions}
          getDisplayValue={getDisplayValue}
          filteredOffersCount={filteredOffersCount}
          totalOffersCount={totalOffersCount}
          getFilterTranslation={getFilterTranslation}
        />
      )}
    </>
  );
};

export default CategoryFilters;
