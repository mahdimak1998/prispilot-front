import React from 'react';
import { Wifi, Cable, Smartphone, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface InternetCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}


const InternetCategoryIcons: React.FC<InternetCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'all',
      label: t('internet.all'),
      icon: null,
      description: t('internet.allDescription')
    },
    {
      id: 'fiber',
      label: t('internet.fiber'),
      icon: Wifi,
      description: t('internet.fiberDescription')
    },
    {
      id: 'adsl',
      label: t('internet.adsl'),
      icon: Cable,
      description: t('internet.adslDescription')
    },
    {
      id: 'mobilt',
      label: t('internet.mobile'),
      icon: Smartphone,
      description: t('internet.mobileDescription')
    },
    {
      id: 'bedrift',
      label: t('internet.business'),
      icon: Briefcase,
      description: t('internet.businessDescription')
    }
  ];

  return (
    <div className="mb-6 sm:mb-8 max-w-full overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 px-1">{t('internet.selectCategory')}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 max-w-full">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id || (selectedCategory === null && category.id === 'all');
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
              className={`
                p-2 sm:p-3 lg:p-4 rounded-xl border-2 transition-all duration-300 group min-w-0 w-full
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
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 transition-colors flex-shrink-0 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`} 
                  />
                ) : (
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 transition-colors flex-shrink-0 ${
                    isSelected ? 'border-primary bg-primary/20' : 'border-muted-foreground group-hover:border-primary'
                  }`} />
                )}
                <div className="text-center min-w-0 w-full">
                  <div className={`font-semibold text-xs sm:text-sm transition-colors truncate ${
                    isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {category.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate hidden sm:block">
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

export default InternetCategoryIcons;