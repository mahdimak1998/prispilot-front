import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, MapPin, Zap, Filter, Home, Mountain, Leaf, Clock, Briefcase } from 'lucide-react';
import MunicipalitySearch from '@/components/MunicipalitySearch';
import { POWER_CATEGORIES, formatConsumption } from '@/utils/powerUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PowerFiltersProps {
  annualConsumption: number[];
  onConsumptionChange: (value: number[]) => void;
  municipalities: string[];
  selectedMunicipality: string;
  onMunicipalitySelect: (municipality: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filteredOffersCount: number;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  showFilterButtons: boolean;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'Clock': return <Clock className="w-4 h-4" />;
    case 'Leaf': return <Leaf className="w-4 h-4" />;
    case 'Home': return <Home className="w-4 h-4" />;
    case 'Mountain': return <Mountain className="w-4 h-4" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

const PowerFilters: React.FC<PowerFiltersProps> = ({
  annualConsumption,
  onConsumptionChange,
  municipalities,
  selectedMunicipality,
  onMunicipalitySelect,
  selectedCategory,
  onCategoryChange,
  filteredOffersCount,
  onApplyFilters,
  onResetFilters,
  showFilterButtons
}) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Consumption Slider */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-primary" />
          <label className="text-lg font-semibold text-foreground">
            {t('power.howMuchElectricity')}
          </label>
        </div>
        <div className="space-y-4">
          <Slider
            value={annualConsumption}
            onValueChange={onConsumptionChange}
            max={50000}
            min={2000}
            step={100}
            className="w-full"
          />
          <div className="text-center">
            <span className="text-3xl font-bold text-primary">
              {formatConsumption(annualConsumption[0])}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {t('power.averageConsumption')}
            </p>
          </div>
        </div>
      </div>

      {/* Municipality Search */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-primary" />
          <label className="text-lg font-semibold text-foreground">
            {t('power.selectMunicipality')}
          </label>
        </div>
        <MunicipalitySearch
          municipalities={municipalities}
          selectedMunicipality={selectedMunicipality}
          onMunicipalitySelect={onMunicipalitySelect}
          placeholder={t('power.searchMunicipality')}
          className="w-full"
        />
      </div>


      {/* Filter Action Buttons */}
      {showFilterButtons && filteredOffersCount > 0 && (
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={onApplyFilters}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Filter className="w-5 h-5 mr-2" />
              {t('power.showMatchingOffers').replace('{{count}}', filteredOffersCount.toString())}
            </Button>
            <Button 
              onClick={onResetFilters}
              variant="outline"
              className="px-6 py-3"
            >
              {t('power.resetFilters')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerFilters;