import React from 'react';
import UniversalCard from '@/components/UniversalCard';
import { Smartphone, Wifi, Zap, Shield, Car, Home, Heart, Briefcase, Tv, CreditCard, Users, Wrench } from 'lucide-react';

// Base offer interface
interface BaseOffer {
  id: string | number;
  provider?: string;
  supplier_name?: string;
  operator?: string;
  logo_url?: string;
  url?: string;
}

// Specific offer types
interface MobileOffer extends BaseOffer {
  product_name?: string;
  plan?: string;
  monthly_rate?: number;
  price?: number;
  data_gb?: number;
  data_included_mb?: number;
  minutes?: number;
  sms?: number;
  minutes_included?: number;
  sms_included?: number;
}

interface InternetOffer extends BaseOffer {
  product_name?: string;
  package_name?: string;
  monthly_price?: number;
  price?: number;
  speed?: number;
  speed_unit?: string;
  connection_type?: string;
}

interface PowerOffer extends BaseOffer {
  product_name?: string;
  monthly_rate?: number;
  price?: number;
  price_nok?: number;
  markup?: number;
  municipality?: string;
  contract_type?: string;
  plan_type?: string;
}

interface InsuranceOffer extends BaseOffer {
  product_name?: string;
  insurance_type?: string;
  monthly_premium?: number;
  price?: number;
  coverage_amount?: number;
  deductible?: number;
}

interface TVOffer extends BaseOffer {
  product_name?: string;
  package_name?: string;
  monthly_price?: number;
  price?: number;
  channels_count?: number;
}

interface LoanOffer extends BaseOffer {
  product_name?: string;
  loan_type?: string;
  effective_rate?: string;
  monthly_payment?: string;
}

interface BoligalarmOffer extends BaseOffer {
  product_name?: string;
  monthly_price?: number;
  setup_fee?: number;
  monitoring_24_7?: boolean;
  installation_included?: boolean;
  contract_months?: number;
}

interface HandverkereOffer extends BaseOffer {
  product_name?: string;
}

interface RenholdOffer extends BaseOffer {
  product_name?: string;
}

type Offer = MobileOffer | InternetOffer | PowerOffer | InsuranceOffer | TVOffer | LoanOffer | BoligalarmOffer | HandverkereOffer | RenholdOffer;

interface OfferAdapterProps {
  offer: Offer;
  onGetQuote: (offer: Offer) => void;
  onProviderClick: (providerName: string) => void;
  serviceType?: 'mobil' | 'internett' | 'strom' | 'forsikring' | 'tv' | 'loan' | 'boligalarm' | 'handverkere' | 'renhold';
}

const OfferToUniversalCardAdapter: React.FC<OfferAdapterProps> = ({
  offer,
  onGetQuote,
  onProviderClick,
  serviceType
}) => {
  // Get provider name
  const getProviderName = (): string => {
    return offer.provider || offer.supplier_name || offer.operator || 'Unknown Provider';
  };

  // Get price information
  const getPrice = () => {
    let price: number | undefined;
    
    // Type-safe price extraction
    if ('monthly_rate' in offer) price = offer.monthly_rate;
    else if ('monthly_price' in offer) price = offer.monthly_price;
    else if ('monthly_premium' in offer) price = offer.monthly_premium;
    else if ('price' in offer) price = offer.price;
    else if ('price_nok' in offer) price = offer.price_nok;
    
    if (!price && !('effective_rate' in offer)) return undefined;
    
    return price ? {
      amount: price,
      currency: 'kr',
      period: 'mnd'
    } : undefined;
  };

  // Get effective rate for loans
  const getEffectiveRate = (): string | undefined => {
    if ('effective_rate' in offer) {
      return offer.effective_rate;
    }
    return undefined;
  };

  // Get specifications based on offer type
  const getSpecifications = () => {
    const specs: Array<{ label: string; value: string | number | boolean; icon?: React.ReactNode }> = [];

    // Mobile specifications
    if ('data_gb' in offer || 'data_included_mb' in offer || 'minutes_included' in offer || 'sms_included' in offer) {
      if (offer.data_gb) {
        const dataValue = offer.data_gb === 999999 ? 'Ubegrenset data' : `Data: ${offer.data_gb} GB`;
        specs.push({
          label: dataValue,
          value: offer.data_gb === 999999 ? '∞' : `${offer.data_gb} GB`,
          icon: <Smartphone className="w-4 h-4" />
        });
      } else if ('data_included_mb' in offer && offer.data_included_mb) {
        const gb = Math.round(offer.data_included_mb / 1024);
        specs.push({
          label: `Data: ${gb} GB`,
          value: `${gb} GB`,
          icon: <Smartphone className="w-4 h-4" />
        });
      }

      if ('minutes_included' in offer && offer.minutes_included) {
        const minutesValue = offer.minutes_included === 999999 ? 'Ubegrenset tale' : `Tale: ${offer.minutes_included} min`;
        specs.push({
          label: minutesValue,
          value: offer.minutes_included === 999999 ? '∞' : `${offer.minutes_included} min`,
          icon: <Smartphone className="w-4 h-4" />
        });
      } else if ('minutes' in offer && offer.minutes) {
        const minutesValue = offer.minutes === 999999 ? 'Ubegrenset tale' : `Tale: ${offer.minutes} min`;
        specs.push({
          label: minutesValue,
          value: offer.minutes === 999999 ? '∞' : `${offer.minutes} min`,
          icon: <Smartphone className="w-4 h-4" />
        });
      }

      if ('sms_included' in offer && offer.sms_included) {
        const smsValue = offer.sms_included === 999999 ? 'Ubegrenset SMS' : `SMS: ${offer.sms_included} stk`;
        specs.push({
          label: smsValue,
          value: offer.sms_included === 999999 ? '∞' : `${offer.sms_included} stk`,
          icon: <Users className="w-4 h-4" />
        });
      } else if ('sms' in offer && offer.sms) {
        const smsValue = offer.sms === 999999 ? 'Ubegrenset SMS' : `SMS: ${offer.sms} stk`;
        specs.push({
          label: smsValue,
          value: offer.sms === 999999 ? '∞' : `${offer.sms} stk`,
          icon: <Users className="w-4 h-4" />
        });
      }
    }

    // Internet specifications
    if ('speed' in offer && offer.speed) {
      const unit = 'speed_unit' in offer ? offer.speed_unit || 'Mbps' : 'Mbps';
      specs.push({
        label: `Hastighet: ${offer.speed} ${unit}`,
        value: `${offer.speed} ${unit}`,
        icon: <Wifi className="w-4 h-4" />
      });
    }

    if ('connection_type' in offer && offer.connection_type) {
      specs.push({
        label: `Type: ${offer.connection_type}`,
        value: String(offer.connection_type),
        icon: <Wifi className="w-4 h-4" />
      });
    }

    // Power specifications
    if ('markup' in offer && offer.markup !== undefined) {
      specs.push({
        label: 'Påslag',
        value: `${offer.markup} øre/kWh`,
        icon: <Zap className="w-3 h-3" />
      });
    }

    if ('municipality' in offer && offer.municipality) {
      specs.push({
        label: 'Kommune',
        value: offer.municipality
      });
    }

    if ('contract_type' in offer && offer.contract_type) {
      specs.push({
        label: 'Type',
        value: offer.contract_type
      });
    }

    // Insurance specifications
    if ('coverage_amount' in offer && offer.coverage_amount) {
      specs.push({
        label: 'Dekning',
        value: `${offer.coverage_amount.toLocaleString()} kr`,
        icon: <Shield className="w-3 h-3" />
      });
    }

    if ('deductible' in offer && offer.deductible) {
      specs.push({
        label: 'Egenandel',
        value: `${offer.deductible.toLocaleString()} kr`
      });
    }

    // TV specifications
    if ('channels_count' in offer && offer.channels_count) {
      specs.push({
        label: 'Kanaler',
        value: `${offer.channels_count} stk`,
        icon: <Tv className="w-3 h-3" />
      });
    }

    // Boligalarm specifications
    if ('setup_fee' in offer && offer.setup_fee) {
      specs.push({
        label: 'Oppstartsgebyr',
        value: `${offer.setup_fee} kr`
      });
    }

    if ('monitoring_24_7' in offer && offer.monitoring_24_7) {
      specs.push({
        label: 'Overvåking 24/7',
        value: 'Ja'
      });
    }

    if ('contract_months' in offer && offer.contract_months) {
      specs.push({
        label: 'Bindingstid',
        value: `${offer.contract_months} mnd`
      });
    }

    return specs;
  };

  return (
    <UniversalCard
      providerName={getProviderName()}
      logoUrl={offer.logo_url}
      productName={
        ('product_name' in offer ? offer.product_name : undefined) || 
        ('plan' in offer ? offer.plan : undefined) || 
        ('package_name' in offer ? offer.package_name : undefined)
      }
      productSubtitle={('insurance_type' in offer ? offer.insurance_type : undefined) || ('loan_type' in offer ? offer.loan_type : undefined)}
      price={getPrice()}
      effectiveRate={getEffectiveRate()}
      features={getSpecifications()}
      category={serviceType}
      visitUrl={offer.url}
      onGetQuote={() => onGetQuote(offer)}
      onProviderClick={() => onProviderClick(getProviderName())}
    />
  );
};

export default OfferToUniversalCardAdapter;