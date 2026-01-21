
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, onClick, className = "" }) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className={`category-card p-4 sm:p-6 text-center group cursor-pointer rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Se priser for ${t(title as any) || title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-3 sm:mb-4 text-primary group-hover:text-primary-dark transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {t(title as any) || title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
