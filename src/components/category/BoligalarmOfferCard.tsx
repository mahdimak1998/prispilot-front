import React from 'react';
import '../CardLogos.css';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Shield, ExternalLink } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface BoligalarmOffer {
  id: string | number;
  provider: string;
  product_name: string;
  monthly_price: number;
  setup_fee?: number;
  plan_type: string;
  logo_url?: string;
  url?: string;
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

interface BoligalarmOfferCardProps {
  offer: BoligalarmOffer;
  onGetQuote: (offer: BoligalarmOffer) => void;
  onProviderClick: (providerName: string) => void;
}

const BoligalarmOfferCard: React.FC<BoligalarmOfferCardProps> = ({
  offer,
  onGetQuote,
  onProviderClick
}) => {
  const { getFilterTranslation } = useTranslations();

  return (
    <article 
      className="offer-card-modern"
      role="region" 
      aria-labelledby={`boligalarm-card-${offer.id}`}
    >
      <div className="card-header">
        <div className="logo-container">
          {offer.logo_url ? (
            <ImageWithFallback
              src={offer.logo_url}
              alt={`${offer.provider} logo`}
              fallbackSrc="/placeholder.svg"
              className="h-12 w-auto object-contain"
            />
          ) : (
            <div className="logo-fallback">
              <Shield className="w-10 h-10" />
            </div>
          )}
        </div>
        <div className="provider-info">
          <h3 
            id={`boligalarm-card-${offer.id}`}
            onClick={() => onProviderClick(offer.provider)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onProviderClick(offer.provider);
              }
            }}
          >
            {offer.provider}
          </h3>
          <p className="product-subtitle">{offer.product_name}</p>
        </div>
      </div>

      <div className="card-cta">
        <button 
          onClick={() => onGetQuote(offer)}
          className="cta-primary"
          type="button"
          aria-label={`Se tilbud - ${offer.provider}`}
        >
          Se tilbud
        </button>
        {offer.url && (
          <button 
            onClick={() => window.open(offer.url, '_blank', 'noopener,noreferrer')}
            className="cta-secondary"
            type="button"
            aria-label={`Besök ${offer.provider} hemsida`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

export default BoligalarmOfferCard;