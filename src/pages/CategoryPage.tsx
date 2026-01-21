import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import PowerCalculator from '@/components/PowerCalculator';
import CategoryFilters from '@/components/category/CategoryFilters';
import LoadingSpinner from '@/components/LoadingSpinner';
import OffersGrid from '@/components/category/OffersGrid';
import CategoryPageHeader from '@/components/category/CategoryPageHeader';
import CategoryIconsRenderer from '@/components/category/CategoryIconsRenderer';
import ErrorState from '@/components/category/ErrorState';
import NoOffersState from '@/components/category/NoOffersState';
import NorwayPowerMap from '@/components/ulikeKomps/NorwayPowerMap';
import PowerPriceChart from '@/components/ulikeKomps/PowerPriceChart';
import PowerUsageCalculator from '@/components/ulikeKomps/PowerUsageCalculator';


import { useCategoryData } from '@/hooks/useCategoryData';
import { useFilteredOffers } from '@/hooks/useFilteredOffers';
import { useBoligalarmFilters } from '@/hooks/useBoligalarmFilters';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryPage = () => {
  const { kategori } = useParams<{ kategori: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [sortBy, setSortBy] = useState('bestMatch');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  
  // Category selection states
  const [selectedInsuranceCategory, setSelectedInsuranceCategory] = useState<string | null>(null);
  const [selectedTVCategory, setSelectedTVCategory] = useState<string | null>(null);
  const [selectedMobilCategory, setSelectedMobilCategory] = useState<string | null>(null);
  const [selectedInternetCategory, setSelectedInternetCategory] = useState<string | null>(null);
  const [selectedStromCategory, setSelectedStromCategory] = useState<string | null>(null);
  const [selectedLoanCategory, setSelectedLoanCategory] = useState<string | null>(null);
  const [selectedBoligalarmCategory, setSelectedBoligalarmCategory] = useState<string | null>(null);
  const [selectedHandverkereCategory, setSelectedHandverkereCategory] = useState<string | null>(null);
  const [selectedRenholdCategory, setSelectedRenholdCategory] = useState<string | null>(null);
  const [selectedVarmepumpeCategory, setSelectedVarmepumpeCategory] = useState<string | null>(null);

  const { offers, providers, loading, initialLoading, error, refetch, fetchMunicipalities } = useCategoryData(kategori || '');

  // Check if business category is selected
  const isBusinessSelected = () => {
    switch (kategori) {
      case 'forsikring': return selectedInsuranceCategory === 'bedrift';
      case 'tv-pakker': return selectedTVCategory === 'bedrift';
      case 'mobil': return selectedMobilCategory === 'bedrift';
      case 'internett': return selectedInternetCategory === 'bedrift';
      case 'strom': return selectedStromCategory === 'business';
      case 'lan': return selectedLoanCategory === 'bedrift';
      case 'boligalarm': return selectedBoligalarmCategory === 'bedrift';
      case 'handverkere': return selectedHandverkereCategory === 'bedrift';
      case 'renhold': return selectedRenholdCategory === 'bedrift';
      case 'varmepumpe': return selectedVarmepumpeCategory === 'bedrift';
      default: return false;
    }
  };

  // Handle business form display for strom category
  useEffect(() => {
    if (kategori === 'strom') {
      setShowBusinessForm(selectedStromCategory === 'business');
    }
  }, [selectedStromCategory, kategori]);

  // Enhanced URL query parameters handling for all categories including boligalarm
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    const durationParam = searchParams.get('duration');
    
    if (kategori) {
      // Handle "all" or no type parameter - clear everything EXCEPT for strom municipality filters
      if (!typeParam || typeParam === 'all') {
        if (kategori === 'strom') {
          // For strom, preserve municipality filter but clear category
          setSelectedStromCategory(null);
          setShowBusinessForm(false);
          // Don't clear municipality filter
        } else {
          setFilters({});
          setSortBy('bestMatch');
          setShowBusinessForm(false);
          setSelectedInsuranceCategory(null);
          setSelectedTVCategory(null);
          setSelectedMobilCategory(null);
          setSelectedInternetCategory(null);
          setSelectedLoanCategory(null);
          setSelectedBoligalarmCategory(null);
          setSelectedHandverkereCategory(null);
          setSelectedRenholdCategory(null);
          setSelectedVarmepumpeCategory(null);
        }
        return;
      }
      
      // Check if business category is selected (update for strom)
      const isBusinessCategory = (kategori === 'strom' && typeParam === 'business') || 
                                 (kategori !== 'strom' && typeParam === 'bedrift');
      setShowBusinessForm(isBusinessCategory);
      
      if (typeParam) {
        const newFilters: { [key: string]: any } = { ...filters };
        
        switch (kategori) {
          case 'mobil':
            if (['lavpris', 'familie', 'ubegrenset', 'bedrift'].includes(typeParam)) {
              setSelectedMobilCategory(typeParam);
            }
            break;
            
          case 'strom':
            // Set selected strom category based on type parameter
            if (['spot', 'fixed', 'variable', 'green', 'residential', 'cabin', 'business'].includes(typeParam) || 
                typeParam.startsWith('fixed-')) {
              setSelectedStromCategory(typeParam);
            }
            break;
            
          case 'internett':
            if (['fiber', 'adsl', 'mobilt', 'bedrift'].includes(typeParam)) {
              setSelectedInternetCategory(typeParam);
            }
            break;
            
          case 'forsikring':
            if (['bolig', 'kjoretoy', 'person', 'dyr_fritid', 'bedrift'].includes(typeParam)) {
              setSelectedInsuranceCategory(typeParam);
            }
            break;
            
          case 'boligalarm':
            // Fixed boligalarm URL parameter handling - removed automatic filter opening
            if (['innbrudd', 'brann', 'vann', 'kamera', 'smarthus', 'smartlås', 'bedrift'].includes(typeParam)) {
              console.log('Setting boligalarm category from URL:', typeParam);
              setSelectedBoligalarmCategory(typeParam);
            }
            break;
            
          case 'handverkere':
            if (['renovation', 'electrical', 'plumbing', 'painting', 'bedrift'].includes(typeParam)) {
              newFilters.service_type = typeParam;
              setSelectedHandverkereCategory(typeParam);
              setFilters(newFilters);
            }
            break;
            
          case 'renhold':
            setSelectedRenholdCategory(typeParam);
            
            if (typeParam === 'bolig') {
              newFilters.service_type = 'home';
              setFilters(newFilters);
            } else if (typeParam === 'kontor') {
              newFilters.service_type = 'office';
              setFilters(newFilters);
            } else if (typeParam === 'storrengjoring') {
              newFilters.service_type = 'deep';
              setFilters(newFilters);
            } else if (typeParam === 'fast_renhold') {
              newFilters.service_type = 'regular';
              setFilters(newFilters);
            } else if (typeParam === 'flytterengjoring') {
              newFilters.service_type = 'moving';
              setFilters(newFilters);
            } else if (typeParam === 'bedrift') {
              newFilters.service_type = 'business';
              setFilters(newFilters);
            }
            break;
            
          case 'lan':
            if (['forbrukslan', 'boliglan', 'refinansiering', 'billan', 'bedrift'].includes(typeParam)) {
              setSelectedLoanCategory(typeParam);
            }
            break;
            
          case 'varmepumpe':
            if (['luft-til-luft', 'luft-til-vann', 'bergvarme', 'hybridlosninger', 'bedrift'].includes(typeParam)) {
              setSelectedVarmepumpeCategory(typeParam);
            }
            break;
            
          case 'tv-pakker':
            if (['standard', 'streaming', 'sport', 'flexible', 'cabin', 'combo', 'extras', 'bedrift'].includes(typeParam)) {
              setSelectedTVCategory(typeParam);
            }
            break;
        }
      }
    }
  }, [location.search, kategori]);

  // Close filter when navigating to a new category
  useEffect(() => {
    setIsFilterOpen(false);
  }, [kategori]);

  const handleCategoryChange = (category: string, newCategory: string | null) => {
    console.log('Category change requested:', { category, newCategory });
    if (newCategory === null) {
      // Reset to main category page
      navigate(`/${kategori}`, { replace: true });
    } else {
      // Navigate to specific category
      navigate(`/${kategori}?type=${newCategory}`, { replace: true });
    }
  };

  const getCategoryName = (category: string) => {
    const translations: { [key: string]: string } = {
      'mobil': t('categoryName.mobil'),
      'strom': t('categoryName.strom'),
      'internett': t('categoryName.internett'),
      'forsikring': t('categoryName.forsikring'),
      'lan': t('categoryName.lan'),
      'boligalarm': t('categoryName.boligalarm'),
      'tv-pakker': t('categoryName.tv-pakker'),
      'handverkere': t('categoryName.handverkere'),
      'renhold': t('categoryName.renhold'),
      'varmepumpe': t('categoryName.varmepumpe')
    };
    return translations[category] || category;
  };

  const getSelectedCategory = () => {
    switch (kategori) {
      case 'forsikring': return selectedInsuranceCategory;
      case 'tv-pakker': return selectedTVCategory;
      case 'mobil': return selectedMobilCategory;
      case 'internett': return selectedInternetCategory;
      case 'strom': return selectedStromCategory;
      case 'lan': return selectedLoanCategory;
      case 'boligalarm': return selectedBoligalarmCategory;
      case 'handverkere': return selectedHandverkereCategory;
      case 'renhold': return selectedRenholdCategory;
      case 'varmepumpe': return selectedVarmepumpeCategory;
      default: return null;
    }
  };

  // Use specialized boligalarm filtering or fallback to general filtering
  const boligalarmFilteredOffers = useBoligalarmFilters(offers, filters, selectedBoligalarmCategory);
  const generalFilteredOffers = useFilteredOffers(
    offers, 
    filters, 
    sortBy, 
    kategori || '', 
    getSelectedCategory()
  );

  // Choose the appropriate filtered offers based on category
  const filteredOffers = kategori === 'boligalarm' ? boligalarmFilteredOffers : generalFilteredOffers;

  const getLoadingMessage = (category: string) => {
    const messages: { [key: string]: string } = {
      'mobil': 'Finner de beste mobilabonnementene...',
      'strom': 'Finner de beste strømavtalene...',
      'internett': 'Finner de beste internettilbudene...',
      'forsikring': 'Finner de beste forsikringene...',
      'lan': 'Finner de beste lånetilbudene...',
      'boligalarm': 'Finner de beste alarmsystemene...',
      'tv-pakker': 'Finner de beste TV-pakkene...',
      'handverkere': 'Finner de beste håndverkerne...',
      'renhold': 'Finner de beste renholdstjenestene...',
      'varmepumpe': 'Finner de beste varmepumpene...'
    };
    return messages[category] || 'Laster tilbud...';
  };

  const handleBackClick = () => navigate('/');
  const handleGetQuote = (offer: any) => {
    setSelectedProvider(null);
    setShowQuoteForm(true);
  };
  const handleProviderClick = (providerName: string) => {
    const provider = providers.find(p => p.navn === providerName);
    setSelectedProvider(provider || { navn: providerName });
  };
  const handleMeldPaClick = () => setShowQuoteForm(true);

  const handleFilterChange = (key: string, value: any) => {
    console.log('Filter change:', { key, value });
    setFilters(prev => ({ ...prev, [key]: value }));
    if (kategori === 'strom' && key === 'municipality' && value && value.trim()) {
      refetch(kategori, { municipality: value });
    }
  };

  const handleMunicipalityChange = (municipality: string) => {
    if (kategori === 'strom' && municipality) {
      setFilters(prev => ({ ...prev, municipality }));
      refetch(kategori, { municipality });
      setIsFilterOpen(false); // Close filter panel after selection
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setSortBy('bestMatch');
    // Also clear category selection for boligalarm
    if (kategori === 'boligalarm') {
      setSelectedBoligalarmCategory(null);
    }
    navigate(location.pathname, { replace: true });
  };

  const handleSortChange = (newSortValue: string) => {
    setSortBy(newSortValue);
  };

  const validCategories = ['mobil', 'strom', 'internett', 'forsikring', 'lan', 'boligalarm', 'tv-pakker', 'handverkere', 'renhold', 'varmepumpe'];
  if (!kategori || !validCategories.includes(kategori)) {
    return (
      <div className="min-h-screen bg-background">
        <CategoryPageHeader 
          categoryName="Kategori ikke funnet"
          onBackClick={handleBackClick}
          onMeldPaClick={handleMeldPaClick}
        />
      <div className="app-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Kategori ikke funnet</h1>
          <button onClick={handleBackClick} className="mt-4 text-blue-600 hover:underline">
            Gå tilbake til forsiden
          </button>
        </div>
      </div>
      </div>
    );
  }

  if (error && offers.length === 0 && !loading && !initialLoading) {
    return (
      <ErrorState
        categoryName={getCategoryName(kategori)}
        error={error}
        onBackClick={handleBackClick}
        onMeldPaClick={handleMeldPaClick}
        onRetry={() => refetch(kategori)}
      />
    );
  }

  const shouldShowQuoteFormOption = !initialLoading && !loading && offers.length === 0 && kategori !== 'strom' && !error;

  return (
    <div className="min-h-screen bg-background">
      <CategoryPageHeader 
        categoryName={kategori}
        onBackClick={handleBackClick}
        onMeldPaClick={handleMeldPaClick}
        providers={providers}
        offerCount={offers.length}
        onProviderClick={(provider) => handleProviderClick(provider.navn)}
      />

      <main className="pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {kategori === 'strom' ? (
          <>
            {/* Norway Power Map - Full width and larger */}
            <div className="mb-8">
              <NorwayPowerMap />
            </div>
            
            <CategoryIconsRenderer
              kategori={kategori}
              selectedInsuranceCategory={selectedInsuranceCategory}
              setSelectedInsuranceCategory={(cat) => {
                setSelectedInsuranceCategory(cat);
                handleCategoryChange('forsikring', cat);
              }}
              selectedTVCategory={selectedTVCategory}
              setSelectedTVCategory={(cat) => {
                setSelectedTVCategory(cat);
                handleCategoryChange('tv-pakker', cat);
              }}
              selectedMobilCategory={selectedMobilCategory}
              setSelectedMobilCategory={(cat) => {
                setSelectedMobilCategory(cat);
                handleCategoryChange('mobil', cat);
              }}
              selectedInternetCategory={selectedInternetCategory}
              setSelectedInternetCategory={(cat) => {
                setSelectedInternetCategory(cat);
                handleCategoryChange('internett', cat);
              }}
              selectedStromCategory={selectedStromCategory}
              setSelectedStromCategory={(cat) => {
                setSelectedStromCategory(cat);
                handleCategoryChange('strom', cat);
              }}
              selectedLoanCategory={selectedLoanCategory}
              setSelectedLoanCategory={(cat) => {
                setSelectedLoanCategory(cat);
                handleCategoryChange('lan', cat);
              }}
              selectedBoligalarmCategory={selectedBoligalarmCategory}
              setSelectedBoligalarmCategory={(cat) => {
                setSelectedBoligalarmCategory(cat);
                handleCategoryChange('boligalarm', cat);
              }}
              selectedHandverkereCategory={selectedHandverkereCategory}
              setSelectedHandverkereCategory={(cat) => {
                setSelectedHandverkereCategory(cat);
                handleCategoryChange('handverkere', cat);
              }}
              selectedRenholdCategory={selectedRenholdCategory}
              setSelectedRenholdCategory={(cat) => {
                setSelectedRenholdCategory(cat);
                handleCategoryChange('renhold', cat);
              }}
              selectedVarmepumpeCategory={selectedVarmepumpeCategory}
              setSelectedVarmepumpeCategory={(cat) => {
                setSelectedVarmepumpeCategory(cat);
                handleCategoryChange('varmepumpe', cat);
              }}
            />

            {!showBusinessForm && (
              <>
                <PowerCalculator 
                  offers={offers}
                  onGetQuote={handleGetQuote}
                  onProviderClick={handleProviderClick}
                  loading={loading}
                  onMunicipalityChange={handleMunicipalityChange}
                  selectedStromCategory={selectedStromCategory}
                />
                
                {/* CategoryFilters section for strom */}
                {!showBusinessForm && (
                  <CategoryFilters
                    kategori={kategori}
                    offers={offers}
                    providers={providers}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    isFilterOpen={isFilterOpen}
                    onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                    filteredOffersCount={filteredOffers.length}
                    totalOffersCount={offers.length}
                  />
                )}
                
                {/* Offers grid for strom */}
                {!showBusinessForm && (
                  <>
                    {filteredOffers.length === 0 && !loading ? (
                      <></>
                    ) : (
                      <>
                        <OffersGrid
                          offers={filteredOffers}
                          onGetQuote={handleGetQuote}
                          onProviderClick={handleProviderClick}
                          category={kategori}
                          loading={loading}
                        />
                      </>
                    )}
                  </>
                )}
                
                {/* Other power analysis components */}
                <div className="mt-6 space-y-6">
                  {/* <PowerPriceChart /> */}
                  <PowerUsageCalculator />
                </div>
              </>
            )}

            {showBusinessForm && (
              <div className="mt-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t('business.formTitle')} {getCategoryName(kategori)}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('business.formDescription')}
                  </p>
                  <QuoteForm 
                    selectedProvider={null}
                    preSelectedCategory={getCategoryName(kategori)}
                    preselectedUserType="bedrift"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {initialLoading ? (
              <LoadingSpinner 
                message={getLoadingMessage(kategori)}
                size="lg"
                className="py-16"
              />
            ) : shouldShowQuoteFormOption ? (
              <NoOffersState onShowQuoteForm={() => setShowQuoteForm(true)} />
            ) : (
              <>
                <CategoryIconsRenderer
                  kategori={kategori}
                  selectedInsuranceCategory={selectedInsuranceCategory}
                  setSelectedInsuranceCategory={(cat) => {
                    setSelectedInsuranceCategory(cat);
                    handleCategoryChange('forsikring', cat);
                  }}
                  selectedTVCategory={selectedTVCategory}
                  setSelectedTVCategory={(cat) => {
                    setSelectedTVCategory(cat);
                    handleCategoryChange('tv-pakker', cat);
                  }}
                  selectedMobilCategory={selectedMobilCategory}
                  setSelectedMobilCategory={(cat) => {
                    setSelectedMobilCategory(cat);
                    handleCategoryChange('mobil', cat);
                  }}
                  selectedInternetCategory={selectedInternetCategory}
                  setSelectedInternetCategory={(cat) => {
                    setSelectedInternetCategory(cat);
                    handleCategoryChange('internett', cat);
                  }}
                  selectedStromCategory={selectedStromCategory}
                  setSelectedStromCategory={(cat) => {
                    setSelectedStromCategory(cat);
                    handleCategoryChange('strom', cat);
                  }}
                  selectedLoanCategory={selectedLoanCategory}
                  setSelectedLoanCategory={(cat) => {
                    setSelectedLoanCategory(cat);
                    handleCategoryChange('lan', cat);
                  }}
                  selectedBoligalarmCategory={selectedBoligalarmCategory}
                  setSelectedBoligalarmCategory={(cat) => {
                    console.log('Setting boligalarm category from icons:', cat);
                    setSelectedBoligalarmCategory(cat);
                    handleCategoryChange('boligalarm', cat);
                  }}
                  selectedHandverkereCategory={selectedHandverkereCategory}
                  setSelectedHandverkereCategory={(cat) => {
                    setSelectedHandverkereCategory(cat);
                    handleCategoryChange('handverkere', cat);
                  }}
                  selectedRenholdCategory={selectedRenholdCategory}
                  setSelectedRenholdCategory={(cat) => {
                    setSelectedRenholdCategory(cat);
                    handleCategoryChange('renhold', cat);
                  }}
                  selectedVarmepumpeCategory={selectedVarmepumpeCategory}
                  setSelectedVarmepumpeCategory={(cat) => {
                    setSelectedVarmepumpeCategory(cat);
                    handleCategoryChange('varmepumpe', cat);
                  }}
                />


                {!showBusinessForm && (
                  <CategoryFilters
                    kategori={kategori}
                    offers={offers}
                    providers={providers}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    isFilterOpen={isFilterOpen}
                    onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                    filteredOffersCount={filteredOffers.length}
                    totalOffersCount={offers.length}
                  />
                )}

                {showBusinessForm ? (
                  <div className="mt-8">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {t('business.formTitle')} {getCategoryName(kategori)}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {t('business.formDescription')}
                      </p>
                      <QuoteForm 
                        selectedProvider={null}
                        preSelectedCategory={getCategoryName(kategori)}
                        preselectedUserType="bedrift"
                      />
                    </div>
                  </div>
                ) : filteredOffers.length === 0 && !loading ? (
                  <></>
                ) : (
                  <>
                    <OffersGrid
                      offers={filteredOffers}
                      onGetQuote={handleGetQuote}
                      onProviderClick={handleProviderClick}
                      category={kategori}
                      loading={loading}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
        </div>
      </main>

      {showQuoteForm && (
        <QuoteForm 
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
          selectedProvider={selectedProvider}
          preSelectedCategory={getCategoryName(kategori)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
