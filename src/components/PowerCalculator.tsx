
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, MapPin } from 'lucide-react';
import MunicipalitySearch from '@/components/MunicipalitySearch';
import PowerOffersList from '@/components/power/PowerOffersList';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMunicipalityData } from '@/hooks/category/useMunicipalityData';
import { 
  PowerOffer, 
  filterOffers, 
  sortOffersByPrice,
  hasValidPricing,
  formatConsumption 
} from '@/utils/powerUtils';

interface PowerCalculatorProps {
  offers: PowerOffer[];
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
  loading?: boolean;
  onMunicipalityChange?: (municipality: string) => void;
  selectedStromCategory?: string | null;
}

const PowerCalculator: React.FC<PowerCalculatorProps> = ({ 
  offers, 
  onGetQuote, 
  onProviderClick, 
  loading = false,
  onMunicipalityChange,
  selectedStromCategory 
}) => {
  const { t } = useLanguage();
  const [annualConsumption, setAnnualConsumption] = useState<number[]>([16000]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [municipalities, setMunicipalities] = useState<{ clean_name: string; original_name: string }[]>([]);
  const { fetchMunicipalities } = useMunicipalityData();

  // Load municipalities using the hook
  useEffect(() => {
    const loadMunicipalities = async () => {
      try {
  // console.log('Loading municipalities for power calculator...');
        const municipalityData = await fetchMunicipalities();
  // console.log(`Loaded ${municipalityData.length} municipalities`);
        setMunicipalities(municipalityData);
      } catch (error) {
        console.error('Error loading municipalities:', error);
        setMunicipalities([]);
      }
    };
    loadMunicipalities();
  }, [fetchMunicipalities]);

  // Sync selected category from StromCategoryIcons but don't auto-filter
  useEffect(() => {
    if (selectedStromCategory) {
      setSelectedCategory(selectedStromCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [selectedStromCategory]);

  // Filter and sort offers with better logging
  const filteredOffers = React.useMemo(() => {
  // console.log(`PowerCalculator: filtering ${offers.length} offers for municipality "${selectedMunicipality}", category "${selectedCategory}"`);
    const filtered = filterOffers(offers, selectedMunicipality, selectedCategory);
    const sorted = sortOffersByPrice(filtered, annualConsumption[0]);
  // console.log(`PowerCalculator result: ${sorted.length} sorted offers`);
    return sorted;
  }, [offers, selectedMunicipality, selectedCategory, annualConsumption]);

  const handleMunicipalitySelect = (municipality: string) => {
    setSelectedMunicipality(municipality);
    setHasSearched(true);
    if (onMunicipalityChange) {
      onMunicipalityChange(municipality);
    }
  };

  const handleFilterApply = () => {
    setShowFilteredResults(true);
  };

  const handleResetFilters = () => {
    setSelectedMunicipality('');
    setSelectedCategory('all');
    setShowFilteredResults(false);
    setHasSearched(false);
  };

  const handleShowAllOffers = () => {
    setShowFilteredResults(true);
  };

  // Always show all filtered results when municipality is selected
  const displayOffers = selectedMunicipality ? filteredOffers : [];
  const shouldShowFiltered = Boolean(selectedMunicipality);

  return (
    <div className="space-y-6">
      {/* Interactive Controls - Side by side layout */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                onValueChange={setAnnualConsumption}
                max={50000}
                min={2000}
                step={100}
                className="w-full"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">
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
              municipalities={municipalities.map(m => m.clean_name)}
              selectedMunicipality={selectedMunicipality}
              onMunicipalitySelect={handleMunicipalitySelect}
              placeholder={t('power.searchMunicipality')}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Results Counter */}
      {hasSearched && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border">
            <span className="text-sm font-medium text-card-foreground">
              {`${filteredOffers.length} ${t('power.offersFound')}`}
            </span>
          </div>
        </div>
      )}

      {/* Power Offers List */}
      <PowerOffersList
        offers={displayOffers}
        annualConsumption={annualConsumption[0]}
        onGetQuote={onGetQuote}
        onProviderClick={onProviderClick}
        loading={loading}
        hasSearched={Boolean(shouldShowFiltered)}
        showFilteredResults={showFilteredResults}
        onShowAllOffers={handleShowAllOffers}
        totalOffersCount={displayOffers.length}
      />
    </div>
  );
};

export default PowerCalculator;
