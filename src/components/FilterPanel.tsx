
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { FilterRenderer } from '@/components/filters/FilterRenderer';
import { getFilterConfigs } from '@/components/filters/FilterConfigs';
import OfferCountDisplay from '@/components/category/OfferCountDisplay';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterPanelProps {
  category: string;
  filters: { [key: string]: any };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  providers?: any[];
  offers?: any[];
  sortBy?: string;
  onSortChange?: (value: string) => void;
  getSortOptions?: () => { value: string; label: string }[];
  getDisplayValue?: () => string;
  filteredOffersCount?: number;
  totalOffersCount?: number;
  getFilterTranslation?: (key: string) => any;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  category,
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onToggle,
  providers = [],
  offers = [],
  sortBy,
  onSortChange,
  getSortOptions,
  getDisplayValue,
  filteredOffersCount = 0,
  totalOffersCount = 0,
  getFilterTranslation
}) => {
  const { t } = useLanguage();
  const filterConfigs = getFilterConfigs(category, providers, offers, getFilterTranslation || t);

  if (!isOpen) {
    return (
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 w-full max-w-full overflow-hidden">
          {/* Left side: Filter button */}
          <Button 
            onClick={onToggle} 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm min-w-0 flex-shrink-0"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span className="truncate">{t('filters.title')}</span>
          </Button>
          
          {/* Right side: Offer count and sort dropdown */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-initial overflow-hidden">
            <OfferCountDisplay 
              filteredOffersCount={filteredOffersCount}
              totalOffersCount={totalOffersCount}
            />
            
            {sortBy && onSortChange && getSortOptions && getDisplayValue && (
              <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-md border border-border/50 p-1 min-w-0 flex-shrink-0">
                <Select value={getDisplayValue()} onValueChange={onSortChange}>
                  <SelectTrigger className="w-28 sm:w-40 h-8 border-0 shadow-none focus:ring-0 text-foreground bg-transparent text-xs">
                    <SelectValue placeholder={getFilterTranslation ? getFilterTranslation('filters.sort') : t('filters.sort')} />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg z-50">
                    {getSortOptions().map(option => (
                      <SelectItem key={option.value} value={option.value} className="hover:bg-accent text-foreground text-xs">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-6">
      {/* Top controls - always visible */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 w-full max-w-full overflow-hidden">
        {/* Left side: Filter button */}
        <Button 
          onClick={onToggle} 
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm min-w-0 flex-shrink-0"
        >
          <Filter className="w-4 h-4 mr-2" />
          <span className="truncate">{t('filters.title')}</span>
        </Button>
        
        {/* Right side: Offer count and sort dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-initial overflow-hidden">
          <OfferCountDisplay 
            filteredOffersCount={filteredOffersCount}
            totalOffersCount={totalOffersCount}
          />
          
          {sortBy && onSortChange && getSortOptions && getDisplayValue && (
            <div className="bg-card/90 backdrop-blur-sm rounded-lg shadow-md border border-border/50 p-1 min-w-0 flex-shrink-0">
              <Select value={getDisplayValue()} onValueChange={onSortChange}>
                <SelectTrigger className="w-28 sm:w-40 h-8 border-0 shadow-none focus:ring-0 text-foreground bg-transparent text-xs">
                  <SelectValue placeholder={getFilterTranslation ? getFilterTranslation('filters.sort') : t('filters.sort')} />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg z-50">
                  {getSortOptions().map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-accent text-foreground text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Filter panel with compact styling */}
      <Card className="shadow-lg border border-border/30 bg-card/95 backdrop-blur-md rounded-lg overflow-hidden max-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-3">
          <CardTitle className="text-base font-semibold truncate min-w-0">{t('filters.title')}</CardTitle>
          <div className="flex gap-1 flex-shrink-0">
            <Button onClick={onClearFilters} variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 font-medium rounded-md text-xs px-2 py-1">
              <span className="hidden sm:inline">{t('filters.clear')}</span>
              <span className="sm:hidden">Tøm</span>
            </Button>
            <Button onClick={onToggle} variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 rounded-md p-1">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-3 bg-gradient-to-br from-card/90 to-card/95 max-w-full overflow-hidden">
          {filterConfigs.map(config => (
            <div key={config.key} className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-border/30 shadow-sm max-w-full overflow-hidden">
              <FilterRenderer
                config={config}
                value={filters[config.key]}
                onValueChange={(value) => onFilterChange(config.key, value)}
                getFilterTranslation={getFilterTranslation}
                category={category}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
