import React from 'react';
import { Badge } from '@/components/ui/badge';
import { categorizeEquipment, getEquipmentIcon, getCategoryColorClass } from '@/utils/boligalarmUtils';

interface BoligalarmEquipmentIconsProps {
  equipment: string[];
  maxIcons?: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BoligalarmEquipmentIcons: React.FC<BoligalarmEquipmentIconsProps> = ({
  equipment = [],
  maxIcons = 6,
  showLabels = false,
  size = 'md'
}) => {
  const { categories } = categorizeEquipment(equipment);
  
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSize = sizeClasses[size];
  
  if (categories.length === 0) {
    return null;
  }

  const displayCategories = categories.slice(0, maxIcons);
  const remainingCount = Math.max(0, categories.length - maxIcons);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {displayCategories.map((category, index) => {
        const IconComponent = getEquipmentIcon(category.icon);
        const bgClass = getCategoryColorClass(category.color, 'bg');
        const textClass = getCategoryColorClass(category.color, 'text');

        if (showLabels) {
          return (
            <Badge 
              key={category.id}
              variant="secondary" 
              className={`${bgClass} ${textClass} flex items-center gap-1 text-xs font-medium`}
            >
              <IconComponent className={iconSize} />
              {category.name}
            </Badge>
          );
        }

        return (
          <div
            key={category.id}
            className={`
              ${bgClass} ${textClass} 
              p-2 rounded-lg flex items-center justify-center
              transition-all duration-200 hover:scale-110
            `}
            title={`${category.name}: ${category.description}`}
          >
            <IconComponent className={iconSize} />
          </div>
        );
      })}
      
      {remainingCount > 0 && (
        <div className="bg-gray-100 text-gray-600 p-2 rounded-lg flex items-center justify-center text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default BoligalarmEquipmentIcons;