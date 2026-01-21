import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Marquee from 'react-fast-marquee';
import { format } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Provider {
  id: string;
  navn: string;
  logo_url: string | null;
  kategori: string;
}

interface CategoryHeaderProps {
  categoryName: string;
  onBackClick: () => void;
  providers?: Provider[];
  offerCount?: number;
  onProviderClick?: (provider: Provider) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  categoryName, 
  onBackClick,
  providers = [],
  offerCount = 0,
  onProviderClick
}) => {
  const { currentLanguage, t } = useLanguage();
  
  // Convert URL format to translation key format
  const translationKey = categoryName === 'tv-pakker' ? 'tvPakker' : categoryName;

  const formatMonthYear = (language: string): string => {
    const locale = language === 'no' ? nb : enUS;
    return format(new Date(), 'MMMM yyyy', { locale });
  };

  const interpolateTemplate = (template: string, variables: Record<string, string>): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match);
  };

  const generateDynamicText = (): string | null => {
    const monthYear = formatMonthYear(currentLanguage.code);
    
    // Get top 3 providers for the category
    const topProviders = providers.slice(0, 3).map(p => p.navn).join(', ');
    
    // Get the dynamic description from translations
    const heroTextKey = `category.hero.${translationKey}.heroText`;
    const template = t(heroTextKey);
    
    // If no specific translation exists, return null
    if (template === heroTextKey) return null;
    
    // Use template interpolation
    return interpolateTemplate(template, {
      month: monthYear.split(' ')[0],
      year: monthYear.split(' ')[1],
      topProviders,
      count: offerCount.toString()
    });
  };

  // Enhanced unique providers filter with debugging and better fallback logic
  const getUniqueProviders = (providers: Provider[]): Provider[] => {
    const logoMap = new Map<string, Provider>();
    const nameMap = new Map<string, Provider>();
    
    providers.forEach(provider => {
      // Primary deduplication by logo_url
      if (provider.logo_url && !logoMap.has(provider.logo_url)) {
        logoMap.set(provider.logo_url, provider);
      } 
      // Secondary deduplication by name for providers without logos
      else if (!provider.logo_url && provider.navn && !nameMap.has(provider.navn)) {
        nameMap.set(provider.navn, provider);
      }
    });
    
    const uniqueProviders = [...logoMap.values(), ...nameMap.values()];
    // console.log(`Filtered ${providers.length} providers to ${uniqueProviders.length} unique items`);
    return uniqueProviders;
  };

  // Smart carousel creation with intelligent spacing and reduced threshold
  const createCarouselItems = (items: Provider[], minItems: number = 6): Provider[] => {
    if (items.length === 0) return [];
    if (items.length >= minItems) return items;
    
    // For very few items, don't duplicate at all to avoid obvious repetition
    if (items.length <= 2) return items;
    
    // For 3-5 items, create smart distribution without obvious clustering
    const result = [...items];
    
    // Only add minimal duplicates with spacing if really needed
    if (result.length < 4) {
      result.push(...items.slice(0, 1)); // Add just one repeat
    }
    
    return result;
  };

  // Get unique providers first, then conditionally show carousel or static grid
  const uniqueProviders = getUniqueProviders(providers);
  const shouldShowCarousel = uniqueProviders.length >= 4; // Increased threshold
  
  // For fewer than 4 unique providers, show static grid instead of carousel
  const firstHalf = shouldShowCarousel ? uniqueProviders.slice(0, Math.ceil(uniqueProviders.length / 2)) : uniqueProviders;
  const secondHalf = shouldShowCarousel ? uniqueProviders.slice(Math.ceil(uniqueProviders.length / 2)) : [];
  
  const firstCarouselProviders = shouldShowCarousel ? createCarouselItems(firstHalf) : [];
  const secondCarouselProviders = shouldShowCarousel ? createCarouselItems(secondHalf) : [];

  const dynamicText = generateDynamicText();
  
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
        <div className="app-container">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left side - Title and description */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold capitalize">
                {t(`category.hero.${translationKey}.title`) !== `category.hero.${translationKey}.title` 
                  ? t(`category.hero.${translationKey}.title`) 
                  : categoryName}
              </h1>
              <p className="text-xl text-blue-100 mt-1">
                {t(`category.hero.${translationKey}.subtitle`) !== `category.hero.${translationKey}.subtitle` 
                  ? t(`category.hero.${translationKey}.subtitle`) 
                  : t('navigation.compareAndFind')}
              </p>
              
              {/* Dynamic text for any category */}
              {dynamicText && (
                <p className="text-sm md:text-base text-blue-100 mt-3 leading-relaxed max-w-2xl">
                  {dynamicText}
                </p>
              )}
            </div>

            {/* Right side - Smart provider display based on count */}
            {uniqueProviders.length > 0 && (
              <div className="flex-shrink-0 lg:max-w-sm xl:max-w-md space-y-3">
                {shouldShowCarousel ? (
                  <>
                    {/* Upper Carousel - Left to Right */}
                    <div className="overflow-hidden">
                      <Marquee
                        direction="left"
                        speed={20}
                        gradient={false}
                        pauseOnHover
                        className="py-2"
                      >
                    {firstCarouselProviders.map((provider, index) => (
                      <div
                        key={`${provider.id}-${index}`}
                         className="mx-4 cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => onProviderClick?.(provider)}
                      >
                        <div className="w-16 h-10 md:w-20 md:h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                          {provider.logo_url ? (
                            <img
                              src={provider.logo_url}
                              alt={provider.navn}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                const sibling = target.nextElementSibling as HTMLElement;
                                target.style.display = 'none';
                                if (sibling) sibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-gray-800 text-xs font-medium text-center px-1"
                            style={{ display: provider.logo_url ? 'none' : 'flex' }}
                          >
                            {provider.navn}
                          </span>
                        </div>
                      </div>
                    ))}
                      </Marquee>
                    </div>

                    {/* Lower Carousel - Right to Left */}
                    {secondHalf.length > 0 && (
                      <div className="overflow-hidden">
                        <Marquee
                          direction="right"
                          speed={25}
                          gradient={false}
                          pauseOnHover
                          className="py-2"
                        >
                    {secondCarouselProviders.map((provider, index) => (
                      <div
                        key={`${provider.id}-${index}`}
                        className="mx-4 cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => onProviderClick?.(provider)}
                      >
                        <div className="w-16 h-10 md:w-20 md:h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                          {provider.logo_url ? (
                            <img
                              src={provider.logo_url}
                              alt={provider.navn}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                const sibling = target.nextElementSibling as HTMLElement;
                                target.style.display = 'none';
                                if (sibling) sibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-gray-800 text-xs font-medium text-center px-1"
                            style={{ display: provider.logo_url ? 'none' : 'flex' }}
                          >
                            {provider.navn}
                          </span>
                        </div>
                      </div>
                    ))}
                        </Marquee>
                      </div>
                    )}
                  </>
                ) : (
                  /* Static grid for few providers */
                  <div className="flex flex-wrap gap-3 justify-center">
                    {firstHalf.map((provider, index) => (
                      <div
                        key={`${provider.id}-${index}`}
                        className="cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => onProviderClick?.(provider)}
                      >
                        <div className="w-16 h-10 md:w-20 md:h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                          {provider.logo_url ? (
                            <img
                              src={provider.logo_url}
                              alt={provider.navn}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                const sibling = target.nextElementSibling as HTMLElement;
                                target.style.display = 'none';
                                if (sibling) sibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-gray-800 text-xs font-medium text-center px-1"
                            style={{ display: provider.logo_url ? 'none' : 'flex' }}
                          >
                            {provider.navn}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Back button moved outside and below the blue box */}
      <div className="app-container pt-4">
        <Button
          onClick={onBackClick}
          variant="ghost"
          className="text-muted-foreground hover:bg-muted/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('navigation.backToOverview')}
        </Button>
      </div>
    </>
  );
};

export default CategoryHeader;