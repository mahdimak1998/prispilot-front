
import React from 'react';
import { Tv, Wifi, Trophy, Sparkles, Home, Globe, Plus, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TVCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const TVCategoryIcons: React.FC<TVCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'all',
      label: t('tv.all'),
      icon: null,
      description: t('tv.allDescription')
    },
    {
      id: 'standard',
      label: t('tv.standard'),
      icon: Tv,
      description: t('tv.standardDescription')
    },
    {
      id: 'streaming',
      label: t('tv.streaming'),
      icon: Wifi,
      description: t('tv.streamingDescription')
    },
    {
      id: 'sport',
      label: t('tv.sport'),
      icon: Trophy,
      description: t('tv.sportDescription')
    },
    {
      id: 'flexible',
      label: t('tv.flexible'),
      icon: Sparkles,
      description: t('tv.flexibleDescription')
    },
    {
      id: 'cabin',
      label: t('tv.cabin'),
      icon: Home,
      description: t('tv.cabinDescription')
    },
    {
      id: 'combo',
      label: t('tv.combo'),
      icon: Globe,
      description: t('tv.comboDescription')
    },
    {
      id: 'extras',
      label: t('tv.extras'),
      icon: Plus,
      description: t('tv.extrasDescription')
    },
    {
      id: 'bedrift',
      label: t('tv.business'),
      icon: Briefcase,
      description: t('tv.businessDescription')
    }
  ];

  return (
    <div className="mb-6 sm:mb-8 max-w-full overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 px-1">{t('tv.selectCategory')}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-2 sm:gap-3 max-w-full">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id || (selectedCategory === null && category.id === 'all');
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
              className={`
                p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 group min-w-0 w-full
                hover:scale-105 hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0">
                {IconComponent ? (
                  <IconComponent 
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors flex-shrink-0 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`} 
                  />
                ) : (
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-colors flex-shrink-0 ${
                    isSelected ? 'border-primary bg-primary/20' : 'border-muted-foreground group-hover:border-primary'
                  }`} />
                )}
                <div className="text-center min-w-0 w-full">
                  <div className={`font-semibold text-xs sm:text-sm transition-colors truncate ${
                    isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {category.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight truncate hidden sm:block">
                    {category.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TVCategoryIcons;
