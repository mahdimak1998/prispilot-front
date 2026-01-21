
import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import OfferToUniversalCardAdapter from '@/components/adapters/OfferToUniversalCardAdapter';
import './OffersGrid.css';

interface Offer {
  id: string | number;
  provider?: string;
  supplier_name?: string;
  operator?: string;
  product_name?: string;
  plan?: string;
  package_name?: string;
  monthly_rate?: number;
  price?: number;
  monthly_price?: number;
  monthly_premium?: number;
  monthly_payment?: string;
  price_nok?: number;
  effective_rate?: string;
  logo_url?: string;
  url?: string;
  data_gb?: number;
  data_included_mb?: number;
  speed?: number;
  channels_count?: number;
  contract_length?: string;
  insurance_type?: string;
  loan_type?: string;
  plan_type?: string;
  type?: string;
  coverage_amount?: number;
  deductible?: number;
  features?: string[];
  // Boligalarm specific fields
  setup_fee?: number;
  equipment_included?: string[];
  monitoring_24_7?: boolean;
  app_control?: boolean;
  installation_included?: boolean;
  installation_type?: string;
  response_service?: string;
  response_time_minutes?: number;
  contract_months?: number;
  smart_features?: string[];
}

interface OffersGridProps {
  offers: Offer[];
  onGetQuote: (offer: Offer) => void;
  onProviderClick: (providerName: string) => void;
  loading?: boolean;
  category?: string;
}

const OffersGrid: React.FC<OffersGridProps> = ({ offers, onGetQuote, onProviderClick, loading = false, category }) => {
  const { t } = useLanguage();


  if (loading) {
    return <LoadingSpinner message={t('offer.loadingOffers')} size="lg" className="py-16" />;
  }

  if (offers.length === 0) {
  return null;
  }


  // Determine service type from category
  const getServiceType = () => {
    if (!category) return undefined;
    
    const categoryMap: Record<string, string> = {
      'mobil': 'mobil',
      'internett': 'internett', 
      'strom': 'strom',
      'forsikring': 'forsikring',
      'tv': 'tv',
      'loan': 'loan',
      'boligalarm': 'boligalarm',
      'handverkere': 'handverkere',
      'renhold': 'renhold'
    };
    
    return categoryMap[category] as any;
  };

  return (
    <div className="professional-cards-grid">
      {offers.map((offer) => (
        <OfferToUniversalCardAdapter
          key={offer.id}
          offer={offer as any}
          onGetQuote={onGetQuote}
          onProviderClick={onProviderClick}
          serviceType={getServiceType()}
        />
      ))}
    </div>
  );
};

export default OffersGrid;
