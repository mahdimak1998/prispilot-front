import React from 'react';
import '../CardLogos.css';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Zap, MapPin, Clock, Home, Mountain, Leaf, TrendingUp, ExternalLink } from 'lucide-react';
import { PowerOffer, calculateMonthlyCost, getDisplayPrice, formatConsumption, categorizeOffer } from '@/utils/powerUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PowerOfferCardProps {
  offer: PowerOffer;
  annualConsumption: number;
  onGetQuote: (offer: PowerOffer) => void;
  onProviderClick: (providerName: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'spot': return <TrendingUp className="w-4 h-4 text-blue-600" />;
    case 'fast': return <Zap className="w-4 h-4 text-green-600" />;
    case 'grønn': return <Leaf className="w-4 h-4 text-green-600" />;
    case 'bolig': return <Home className="w-4 h-4 text-purple-600" />;
    case 'hytte': return <Mountain className="w-4 h-4 text-amber-600" />;
    default: return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const PowerOfferCard: React.FC<PowerOfferCardProps> = ({
  offer,
  annualConsumption,
  onGetQuote,
  onProviderClick
}) => {
  const { t } = useLanguage();
  const monthlyCost = calculateMonthlyCost(offer, annualConsumption);
  const displayPrice = getDisplayPrice(offer);
  const category = categorizeOffer(offer);
  
  return (
    <article 
      className="offer-card-modern"
      role="region" 
      aria-labelledby={`power-card-${offer.id}`}
    >
      {/* Header Section - Logo and Provider Info */}
      <div className="card-header">
        <div className="logo-container">
          {offer.logo_url ? (
            <ImageWithFallback
              src={offer.logo_url}
              alt={`${offer.supplier_name} logo`}
              fallbackSrc="/placeholder.svg"
              className="h-12 w-auto object-contain"
            />
          ) : (
            <div className="logo-fallback">
              <Zap className="w-10 h-10" />
            </div>
          )}
        </div>
        <div className="provider-info">
          <h3 
            id={`power-card-${offer.id}`}
            onClick={() => onProviderClick(offer.supplier_name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onProviderClick(offer.supplier_name);
              }
            }}
          >
            {offer.supplier_name}
          </h3>
          <p className="product-subtitle">{offer.product_name}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="card-content">
        {/* Price Display */}
        <div className="price-display">
          <div className="price-main">
            <span className="price-amount">{monthlyCost}</span>
            <span className="price-period">/ mnd</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {t('power.estimated')}
          </div>
        </div>

        {/* Specifications */}
        <div className="card-specs">
          <div className="spec-row">
            <span className="spec-label">
              <Zap className="w-3 h-3" />
              {t('offer.markup')}
            </span>
            <span className="spec-value">
              {displayPrice.toFixed(1)} øre/kWh
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-label">
              <MapPin className="w-3 h-3" />
              {t('offer.municipality')}
            </span>
            <span className="spec-value">
              {offer.municipality_name}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-label">
              <Clock className="w-3 h-3" />
              {t('offer.type')}
            </span>
            <span className="spec-value flex items-center gap-1">
              {getCategoryIcon(category)}
              {offer.contract_length || category}
            </span>
          </div>

          {offer.additional_fees && offer.additional_fees > 0 && (
            <div className="spec-row">
              <span className="spec-label">
                {t('offer.additionalFees')}
              </span>
              <span className="spec-value text-orange-600">
                {offer.additional_fees} kr
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card-cta">
        <button 
          onClick={() => onGetQuote(offer)}
          className="cta-primary"
          type="button"
          aria-label={`${t('offer.switchNow')} - ${offer.supplier_name}`}
        >
          {t('offer.switchNow')}
        </button>
        {offer.url && (
          <button 
            onClick={() => window.open(offer.url, '_blank', 'noopener,noreferrer')}
            className="cta-secondary"
            type="button"
            aria-label={`Besøk ${offer.supplier_name} hjemmeside`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Calculation Info */}
      <div className="w-full bg-muted/50 rounded-lg p-2 mt-2">
        <div className="text-xs text-muted-foreground text-center">
          {t('offer.calculatedFor')} {formatConsumption(annualConsumption)} {t('offer.annualConsumption')}
        </div>
      </div>
    </article>
  );
};

export default PowerOfferCard;