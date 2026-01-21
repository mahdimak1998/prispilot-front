
import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface NoOffersStateProps {
  onShowQuoteForm: () => void;
}

const NoOffersState = ({ onShowQuoteForm }: NoOffersStateProps) => {
  const { getFilterTranslation } = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-2xl mx-auto">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-subtle rounded-full flex items-center justify-center animate-pulse">
          <Search className="w-16 h-16 text-muted-foreground animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[ping_3s_ease-in-out_infinite]"></div>
        <div className="absolute inset-4 rounded-full border border-primary/10 animate-[ping_3s_ease-in-out_infinite_0.5s]"></div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-foreground animate-fade-in">
          {getFilterTranslation('offers.noOffers.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-md animate-fade-in">
          {getFilterTranslation('offers.noOffers.description')}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onShowQuoteForm}
        size="lg"
        className="px-8 py-4 text-lg font-semibold hover-scale shadow-elegant animate-fade-in"
      >
        {getFilterTranslation('offers.noOffers.button')}
      </Button>

      {/* Subtle decoration */}
      <div className="mt-12 opacity-30">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_0.1s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
        </div>
      </div>
    </div>
  );
};

export default NoOffersState;
