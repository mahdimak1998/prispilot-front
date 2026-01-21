import React from 'react';
import './CardLogos.css';
import ImageWithFallback from '@/components/ImageWithFallback';
import { ExternalLink, Smartphone, Phone, MessageSquare, Infinity, Zap, Wifi, Shield, CreditCard, Home, Tv, Hammer, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface BaseOffer {
  id: string | number;
  provider?: string;
  operator?: string;
  supplier_name?: string;
  logo_url?: string;
  url?: string;
}

interface MobileOffer extends BaseOffer {
  type: 'mobile';
  product_name: string;
  price_nok: number;
  data_included_mb: number;
  data_gb?: number;
  minutes_included: number;
  sms_included: number;
  is_unlimited_talk?: boolean;
  is_unlimited_sms?: boolean;
}

interface PowerOffer extends BaseOffer {
  type: 'power';
  product_name: string;
  price: number;
  price_unit: string;
  contract_length: string;
  municipality_name: string;
  additional_fees?: number;
  total_price?: number;
}

interface InternetOffer extends BaseOffer {
  type: 'internet';
  plan: string;
  price: number;
  speed: number;
  data_gb?: number;
  connection_type?: string;
}

interface InsuranceOffer extends BaseOffer {
  type: 'insurance';
  product_name: string;
  insurance_type: string;
  monthly_premium: number;
  coverage_amount?: number;
  features?: string[];
}

interface BankOffer extends BaseOffer {
  type: 'bank';
  loan_type: string;
  monthly_payment: string;
  effective_rate: string;
}

interface SecurityOffer extends BaseOffer {
  type: 'security';
  product_name: string;
  plan_type?: string;
  plan?: string;
  type_name?: string;
  monthly_price: number;
  setup_fee?: number;
  equipment_included?: string[];
  monitoring_24_7?: boolean;
  app_control?: boolean;
}

interface TVOffer extends BaseOffer {
  type: 'tv';
  product_name?: string;
  plan?: string;
  monthly_price?: number;
  total_channels?: number;
  hd_channels?: number;
}

interface HandymanOffer extends BaseOffer {
  type: 'handyman';
  product_name?: string;
  type_name?: string;
}

interface CleaningOffer extends BaseOffer {
  type: 'cleaning';
  product_name?: string;
  type_name?: string;
}

type Offer = MobileOffer | PowerOffer | InternetOffer | InsuranceOffer | BankOffer | SecurityOffer | TVOffer | HandymanOffer | CleaningOffer;

interface PriceComparisonCardProps {
  offer: Offer;
  onGetQuote?: (offer: Offer) => void;
  onProviderClick?: (providerName: string) => void;
}

const getProviderName = (offer: Offer): string => {
  const rawName = offer.provider || offer.operator || offer.supplier_name || 'Ukjent leverandør';
  
  // For bank loans, use aggressive shortening
  if (offer.type === 'bank') {
    let cleanName = rawName;
    
    // Handle specific well-known banks first
    if (cleanName.toLowerCase().includes('nordea')) return 'Nordea';
    if (cleanName.toLowerCase().includes('dnb')) return 'DNB';
    if (cleanName.toLowerCase().includes('sparebank 1')) return 'SpareBank 1';
    if (cleanName.toLowerCase().includes('storebrand bank')) return 'Storebrand';
    if (cleanName.toLowerCase().includes('kredittbanken')) return 'Kredittbanken';
    if (cleanName.toLowerCase().includes('bank norwegian')) return 'Bank Norwegian';
    if (cleanName.toLowerCase().includes('lea bank')) return 'Lea Bank';
    if (cleanName.toLowerCase().includes('komplett bank')) return 'Komplett Bank';
    if (cleanName.toLowerCase().includes('santander')) return 'Santander';
    if (cleanName.toLowerCase().includes('monobank')) return 'Monobank';
    
    // Generic aggressive cleaning for other banks
    cleanName = cleanName
      .split(',')[0] // Everything before first comma
      .split(' - ')[0] // Everything before first " - "
      .split('(')[0] // Everything before first parenthesis
      .split('/')[0] // Everything before first slash
      .trim();
    
    // Remove all corporate suffixes aggressively
    cleanName = cleanName
      .replace(/\s*AB\s*\(publ\).*$/gi, '')
      .replace(/\s*\(publ\).*$/gi, '')
      .replace(/\s*AB\s*NUF$/gi, '')
      .replace(/\s*NUF$/gi, '')
      .replace(/\s*ASA$/gi, '')
      .replace(/\s*AB$/gi, '')
      .replace(/\s*ABP$/gi, '')
      .replace(/,?\s*FILIAL\s*I\s*NORGE$/gi, '')
      .replace(/,?\s*Norway\s*Branch$/gi, '')
      .replace(/\s*en\s*filial\s*av.*$/gi, '')
      .replace(/\s*del\s*av.*$/gi, '')
      .trim();
    
    // If still too long, take first word only (max 12 characters)
    if (cleanName.length > 12) {
      cleanName = cleanName.split(' ')[0];
    }
    
    return cleanName;
  }
  
  // For other offer types, use original logic
  let cleanName = rawName;
  
  cleanName = cleanName
    .split(',')[0]
    .split(' - ')[0]
    .split('(')[0]
    .trim();
  
  cleanName = cleanName
    .replace(/\s*AB\s*\(publ\).*$/gi, '')
    .replace(/\s*\(publ\).*$/gi, '')
    .replace(/\s*AB\s*NUF$/gi, '')
    .replace(/\s*NUF$/gi, '')
    .replace(/\s*ASA$/gi, '')
    .replace(/\s*AB$/gi, '')
    .replace(/\s*ABP$/gi, '')
    .replace(/,?\s*FILIAL\s*I\s*NORGE$/gi, '')
    .replace(/,?\s*Norway\s*Branch$/gi, '')
    .trim();
  
  return cleanName;
};

const formatPrice = (price: number | string, unit?: string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (unit) {
    return `${Math.round(numPrice)} ${unit}`;
  }
  return `${Math.round(numPrice)} kr/mnd`;
};

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({ offer, onGetQuote, onProviderClick }) => {
  const { getFilterTranslation } = useTranslations();
  const providerName = getProviderName(offer);
  
  const getServiceIcon = () => {
    switch (offer.type) {
      case 'mobile': return <Smartphone className="service-icon" />;
      case 'power': return <Zap className="service-icon" />;
      case 'internet': return <Wifi className="service-icon" />;
      case 'insurance': return <Shield className="service-icon" />;
      case 'bank': return <CreditCard className="service-icon" />;
      case 'security': return <Home className="service-icon" />;
      case 'tv': return <Tv className="service-icon" />;
      case 'handyman': return <Hammer className="service-icon" />;
      case 'cleaning': return <Sparkles className="service-icon" />;
      default: return null;
    }
  };
  
  const translateInsuranceType = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('reiseforsikring')) {
      const hasFamily = lowerType.includes('familie');
      return hasFamily 
        ? `${getFilterTranslation('insurance.reiseforsikring')} ${getFilterTranslation('insurance.familie')}`
        : getFilterTranslation('insurance.reiseforsikring');
    }
    if (lowerType.includes('bilforsikring')) return getFilterTranslation('insurance.bilforsikring');
    if (lowerType.includes('husforsikring')) return getFilterTranslation('insurance.husforsikring');
    if (lowerType.includes('innboforsikring')) return getFilterTranslation('insurance.innboforsikring');
    return type;
  };
  
  const translateLoanType = (loanType: string) => {
    const lowerType = loanType.toLowerCase();
    if (lowerType.includes('refinansiering')) return getFilterTranslation('loan.refinansiering');
    if (lowerType.includes('forbrukslån')) return getFilterTranslation('loan.forbrukslån');
    if (lowerType.includes('kredittkort')) return getFilterTranslation('loan.kredittkort');
    return loanType;
  };

  const handleProviderClick = () => {
    if (onProviderClick) {
      onProviderClick(providerName);
    }
  };

  const renderOfferDetails = () => {
    switch (offer.type) {
      case 'mobile':
        // Enhanced regex check for unlimited data indicators
        const productName = 'product_name' in offer ? offer.product_name?.toLowerCase() : '';
        const unlimitedDataRegex = /fri\s*data|ubegrenset|unlimited/i;
        const hasUnlimitedData = unlimitedDataRegex.test(productName || '') || offer.data_included_mb === -1;
        
        const dataDisplay = hasUnlimitedData ? 
          <span className="flex items-center gap-1 text-2xl font-bold text-primary" aria-label="ubegrenset data">
            &#8734;
          </span> :
          offer.data_gb && offer.data_gb > 0 ? `${offer.data_gb} GB` : 
          offer.data_included_mb > 0 ? `${offer.data_included_mb} MB` : null;
        
        return (
          <>
            {dataDisplay && (
              <div className="spec-row-enhanced">
                <span className="spec-label">
                  <Smartphone className="w-4 h-4" />
                  <span className="font-semibold">{getFilterTranslation('card.data')}</span>
                </span>
                <span className="spec-value text-lg font-bold">{dataDisplay}</span>
              </div>
            )}
            {(offer.is_unlimited_talk || offer.minutes_included > 0) && (
              <div className="spec-row-enhanced">
                <span className="spec-label">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">{getFilterTranslation('card.calls')}</span>
                </span>
                <span className="spec-value text-lg font-bold">
                  {offer.is_unlimited_talk ? <span className="text-2xl font-bold text-primary" aria-label="ubegrenset samtaler">&#8734;</span> : `${offer.minutes_included} min`}
                </span>
              </div>
            )}
            {(offer.is_unlimited_sms || offer.sms_included > 0) && (
              <div className="spec-row-enhanced">
                <span className="spec-label">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold">{getFilterTranslation('card.sms')}</span>
                </span>
                <span className="spec-value text-lg font-bold">
                  {offer.is_unlimited_sms ? <span className="text-2xl font-bold text-primary" aria-label="ubegrenset SMS">&#8734;</span> : `${offer.sms_included} stk`}
                </span>
              </div>
            )}
          </>
        );
      
      case 'power':
        return (
          <>
            <div className="spec-row-enhanced">
              <span className="spec-label">{getFilterTranslation('filters.labels.contract_length')}</span>
              <span className="spec-value">{offer.contract_length}</span>
            </div>
            <div className="spec-row-enhanced">
              <span className="spec-label">{getFilterTranslation('filters.labels.municipality')}</span>
              <span className="spec-value">{offer.municipality_name}</span>
            </div>
            {offer.additional_fees && (
              <div className="spec-row-enhanced">
                <span className="spec-label">{getFilterTranslation('power.additionalFees')}</span>
                <span className="spec-value">{formatPrice(offer.additional_fees)}</span>
              </div>
            )}
          </>
        );
      
      case 'internet':
        const isMobileInternet = offer.connection_type?.toLowerCase() === 'mobilt' || 
                                offer.connection_type?.toLowerCase() === 'mobile' ||
                                offer.plan?.toLowerCase().includes('mobilt');
        
        if (isMobileInternet && offer.data_gb && offer.data_gb > 0) {
          return (
            <div className="spec-row-enhanced">
              <span className="spec-label">{getFilterTranslation('card.data')}</span>
              <span className="spec-value">{offer.data_gb} GB</span>
            </div>
          );
        } else if (offer.speed > 0) {
          return (
            <div className="spec-row-enhanced">
              <span className="spec-label">{getFilterTranslation('filters.labels.speed')}</span>
              <span className="spec-value">{offer.speed} Mbps</span>
            </div>
          );
        }
        return null;
      
      case 'insurance':
        return (
          <>
            {offer.insurance_type && offer.insurance_type !== '0' && offer.insurance_type.trim() !== '' && !offer.insurance_type.toLowerCase().includes('reiseforsikring') && (
              <div className="spec-row-enhanced">
                <span className="spec-label">{getFilterTranslation('card.type')}</span>
                <span className="spec-value">{translateInsuranceType(offer.insurance_type)}</span>
              </div>
            )}
            {offer.coverage_amount && offer.coverage_amount > 0 && (
              <div className="spec-row-enhanced">
                <span className="spec-label">{getFilterTranslation('insurance.coverage')}</span>
                <span className="spec-value">kr {Math.round(offer.coverage_amount)}</span>
              </div>
            )}
          </>
        );
      
      case 'bank':
        // Don't show specs for bank since rate is already shown as main price
        return null;
      
      case 'security':
        return (
          <>
            {offer.type_name && offer.type_name !== '0' && offer.type_name.trim() !== '' && (
              <div className="spec-row-enhanced">
                <span className="spec-label">{getFilterTranslation('card.type')}</span>
                <span className="spec-value">{offer.type_name}</span>
              </div>
            )}
          </>
        );

      case 'tv':
        return (
          <>
            {offer.total_channels && offer.total_channels > 0 && (
              <div className="spec-row-enhanced">
                <span className="spec-label">{getFilterTranslation('card.channels')}</span>
                <span className="spec-value">{offer.total_channels}</span>
              </div>
            )}
            {offer.hd_channels && offer.hd_channels > 0 && (
              <div className="spec-row-enhanced">
                <span className="spec-label">HD-{getFilterTranslation('card.channels')}</span>
                <span className="spec-value">{offer.hd_channels}</span>
              </div>
            )}
          </>
        );

      case 'handyman':
      case 'cleaning':
        // Remove all specs to match handyman design
        return null;
      
      default:
        return null;
    }
  };

  // Get price for display - extract number and format properly
  const getMainPrice = () => {
    switch (offer.type) {
      case 'mobile':
        return offer.price_nok > 0 ? offer.price_nok : null;
      case 'power':
        return offer.price > 0 ? offer.price : null;
      case 'internet':
        return offer.price > 0 ? offer.price : null;
      case 'insurance':
        return offer.monthly_premium > 0 ? offer.monthly_premium : null;
      case 'bank':
        const effectiveRate = offer.effective_rate;
        if (effectiveRate) {
          const cleanRate = effectiveRate.replace(/%/g, '');
          const rateNumber = parseFloat(cleanRate);
          if (!isNaN(rateNumber) && rateNumber > 0) {
            return `${getFilterTranslation('card.effectiveRate')} ${rateNumber}%`;
          }
        }
        return null;
      case 'security':
        return offer.monthly_price > 0 ? offer.monthly_price : null;
      case 'tv':
        return offer.monthly_price && offer.monthly_price > 0 ? offer.monthly_price : null;
      case 'handyman':
      case 'cleaning':
        return null; // No price shown for these
      default:
        return null;
    }
  };
  
  const shouldShowPrice = () => {
    const price = getMainPrice();
    return price !== null;
  };

  const renderPriceDisplay = () => {
    const price = getMainPrice();
    
    if (price === null) return null;
    
    // Special handling for bank rates
    if (offer.type === 'bank') {
      return (
        <div className="price-display">
          <div className="price-main">
            <span className="price-amount">{price}</span>
          </div>
        </div>
      );
    }
    
    // Regular price display with horizontal layout
    return (
      <div className="price-display">
        <div className="price-main">
          <span className="price-amount">kr {price}</span>
          <span className="price-period">/ mnd</span>
        </div>
      </div>
    );
  };

  // Helper functions for conditional rendering
  const hasValidData = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '' && value !== '0' && value !== 0;
  };

  const renderConditional = (condition: boolean, content: React.ReactNode): React.ReactNode => {
    return condition ? content : null;
  };

  return (
    <article 
      className="offer-card-modern card-auto" 
      role="region" 
      aria-labelledby={`card-${offer.id}`}
    >
      <div className="card-header">
        <div className="logo-container">
          {offer.logo_url ? (
            <ImageWithFallback
              src={offer.logo_url}
              alt={`${providerName} logo`}
              fallbackSrc="/placeholder.svg"
              className="h-12 w-auto object-contain"
            />
          ) : (
            <div className="logo-fallback">{getServiceIcon()}</div>
          )}
        </div>
        <div className="provider-info">
          <h3 
            id={`card-${offer.id}`}
            onClick={handleProviderClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProviderClick();
              }
            }}
          >
            {providerName}
          </h3>
          {renderConditional((() => {
            const subtitle = 'product_name' in offer ? offer.product_name : 
                           'plan' in offer && offer.type !== 'tv' ? offer.plan : 
                           'loan_type' in offer ? translateLoanType(offer.loan_type) : '';
            return hasValidData(subtitle);
          })(), (() => {
            const subtitle = 'product_name' in offer ? offer.product_name : 
                           'plan' in offer && offer.type !== 'tv' ? offer.plan : 
                           'loan_type' in offer ? translateLoanType(offer.loan_type) : '';
            return <p className="product-subtitle">{subtitle}</p>;
          })())}
        </div>
      </div>

      {/* Content Section - Only render if has price or specs */}
      {(() => {
        const hasPrice = shouldShowPrice();
        const offerDetails = renderOfferDetails();
        const hasSpecs = offerDetails && React.Children.count(offerDetails) > 0;
        
        if (!hasPrice && !hasSpecs) return null;
        
        return (
          <div className="card-content">
            {hasPrice && (
              <div className={`price-section-wrapper ${hasSpecs ? 'with-specs' : ''}`}>
                {renderPriceDisplay()}
              </div>
            )}
            {hasSpecs && (
              <div className="card-specs">{offerDetails}</div>
            )}
          </div>
        );
      })()}

      <div className="card-cta">
        <button 
          onClick={() => onGetQuote?.(offer)} 
          className="cta-primary"
          type="button"
          aria-label={`${getFilterTranslation('card.getOffer')} från ${providerName}`}
        >
          {getFilterTranslation('card.getOffer')}
        </button>
        {offer.url && (
          <button 
            onClick={() => window.open(offer.url, '_blank', 'noopener,noreferrer')}
            className="cta-secondary"
            type="button"
            aria-label={`Besök ${providerName} hemsida`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

export default PriceComparisonCard;