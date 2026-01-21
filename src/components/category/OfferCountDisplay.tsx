
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OfferCountDisplayProps {
  filteredOffersCount: number;
  totalOffersCount: number;
}

const OfferCountDisplay = ({ filteredOffersCount, totalOffersCount }: OfferCountDisplayProps) => {
  const { t } = useLanguage();
  if (totalOffersCount === 0) return null;

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-accent to-accent/50 border border-border rounded-lg px-2 sm:px-4 py-1 sm:py-2 min-w-0 flex-shrink-0">
      <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">
        {filteredOffersCount}
      </div>
      <div className="min-w-0">
        <p className="text-foreground font-medium text-xs sm:text-sm truncate">
          {filteredOffersCount} {t('filters.offersFound')}
        </p>
        {filteredOffersCount !== totalOffersCount && (
          <p className="text-muted-foreground text-xs truncate hidden sm:block">
            av totalt {totalOffersCount} tilgjengelige
          </p>
        )}
      </div>
    </div>
  );
};

export default OfferCountDisplay;
