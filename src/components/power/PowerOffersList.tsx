
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import OfferToUniversalCardAdapter from '@/components/adapters/OfferToUniversalCardAdapter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PowerOffer } from '@/utils/powerUtils';

interface PowerOffersListProps {
  offers: PowerOffer[];
  annualConsumption: number;
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
  loading: boolean;
  hasSearched: boolean;
  showFilteredResults: boolean;
  onShowAllOffers: () => void;
  totalOffersCount: number;
}

const PowerOffersList: React.FC<PowerOffersListProps> = ({
  offers,
  annualConsumption,
  onGetQuote,
  onProviderClick,
  loading,
  hasSearched,
  showFilteredResults,
  onShowAllOffers,
  totalOffersCount
}) => {
  // Remove extra loading spinner; only show main spinner in CategoryPage
  if (loading) {
    return null;
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <div className="space-y-4">
      {offers.length === 0 ? (
        // Don't show "no offers found" message - just return empty
        null
      ) : (
        <>
          <div className="professional-cards-grid">
            {offers.map((offer) => (
              <OfferToUniversalCardAdapter
                key={offer.id}
                offer={offer as any}
                onGetQuote={onGetQuote}
                onProviderClick={onProviderClick}
                serviceType="strom"
              />
            ))}
          </div>

          {!hasSearched && totalOffersCount > offers.length && (
            <div className="text-center mt-8">
              <Button 
                onClick={onShowAllOffers}
                variant="outline"
                className="px-8 py-3 text-lg"
              >
                Vis alle {totalOffersCount} tilbud
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PowerOffersList;
