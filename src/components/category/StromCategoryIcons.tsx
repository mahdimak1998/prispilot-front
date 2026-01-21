import React, { useEffect, useMemo } from 'react';
import { Zap, Lock, Leaf, Briefcase, Home, Mountain, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StromCategoryIconsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const StromCategoryIcons: React.FC<StromCategoryIconsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t } = useLanguage();

  const categories = useMemo(() => [
    {
      id: 'all',
      label: t('power.contractTypes.all'),
      icon: null,
      description: t('electricity.allDescription')
    },
    {
      id: 'spot',
      label: t('power.contractTypes.spot'),
      icon: TrendingUp,
      description: t('electricity.spotDescription')
    },
    {
      id: 'fixed',
      label: t('power.contractTypes.fixed'),
      icon: Lock,
      description: t('electricity.fixedDescription'),
      hasSubCategories: true
    },
    {
      id: 'variable',
      label: t('power.contractTypes.variable'),
      icon: Clock,
      description: t('electricity.variableDescription')
    },
    {
      id: 'green',
      label: t('power.contractTypes.green'),
      icon: Leaf,
      description: t('electricity.greenDescription')
    },
    {
      id: 'residential',
      label: t('power.contractTypes.residential'),
      icon: Home,
      description: t('electricity.residentialDescription')
    },
    {
      id: 'cabin',
      label: t('power.contractTypes.cabin'),
      icon: Mountain,
      description: t('electricity.cabinDescription')
    },
    {
      id: 'business',
      label: t('power.contractTypes.business'),
      icon: Briefcase,
      description: t('electricity.businessDescription')
    }
  ], [t]);

  const fixedSubCategories = useMemo(() => [
    {
      id: 'fixed-6',
      label: t('power.contractTypes.fixed6'),
      description: t('power.contractTypes.fixed6Description')
    },
    {
      id: 'fixed-12',
      label: t('power.contractTypes.fixed12'),
      description: t('power.contractTypes.fixed12Description')
    },
    {
      id: 'fixed-18',
      label: t('power.contractTypes.fixed18'),
      description: t('power.contractTypes.fixed18Description')
    },
    {
      id: 'fixed-24',
      label: t('power.contractTypes.fixed24'),
      description: t('power.contractTypes.fixed24Description')
    },
    {
      id: 'fixed-36',
      label: t('power.contractTypes.fixed36'),
      description: t('power.contractTypes.fixed36Description')
    },
    {
      id: 'fixed-60',
      label: t('power.contractTypes.fixed60'),
      description: t('power.contractTypes.fixed60Description')
    },
    {
      id: 'fixed-120',
      label: t('power.contractTypes.fixed120'),
      description: t('power.contractTypes.fixed120Description')
    }
  ], [t]);

  const showSubCategories = selectedCategory?.startsWith('fixed');

  return (
    <div className="mb-6 sm:mb-8 max-w-full overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 px-1">{t('electricity.selectCategory')}</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 max-w-full">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id || 
                           (selectedCategory === null && category.id === 'all') ||
                           selectedCategory?.startsWith(category.id + '-');
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => {
                const newCategory = category.id === 'all' ? null : category.id;
                onCategoryChange(newCategory);
              }}
              className={`
                p-2 sm:p-3 lg:p-4 rounded-xl border-2 transition-all duration-300 group min-w-0 w-full
                hover:scale-105 hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' 
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

      {/* Fixed Price Sub-Categories */}
      {showSubCategories && (
        <div className="bg-muted/50 rounded-xl p-3 sm:p-4 max-w-full overflow-hidden">
          <h4 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3 text-center">
            {t('power.contractTypes.fixed')}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 max-w-full">
            {fixedSubCategories.map((subCategory) => {
              const isSelected = selectedCategory === subCategory.id;
              
              return (
                <button
                  key={subCategory.id}
                  onClick={() => onCategoryChange(subCategory.id)}
                  className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 text-left hover:scale-105 min-w-0 w-full ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="text-center min-w-0">
                    <h5 className="font-medium text-xs sm:text-sm text-card-foreground truncate">
                      {subCategory.label}
                    </h5>
                    <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate hidden sm:block">
                      {subCategory.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StromCategoryIcons;