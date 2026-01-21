
import React from 'react';
import { 
  Zap, 
  Smartphone, 
  Shield, 
  Wifi, 
  CreditCard, 
  Home,
  Tv,
  Hammer,
  Sparkles,
  FileText,
  Gift,
  PiggyBank,
  Plane,
  Lock,
  Thermometer
} from 'lucide-react';

interface IconProps {
  className?: string;
}

export const PlaneIcon: React.FC<IconProps> = ({ className }) => (
  <Plane className={className} />
);

export const ElectricityIcon: React.FC<IconProps> = ({ className }) => (
  <Zap className={className} />
);

export const MobileIcon: React.FC<IconProps> = ({ className }) => (
  <Smartphone className={className} />
);

export const InsuranceIcon: React.FC<IconProps> = ({ className }) => (
  <Shield className={className} />
);

export const InternetIcon: React.FC<IconProps> = ({ className }) => (
  <Wifi className={className} />
);

export const BankIcon: React.FC<IconProps> = ({ className }) => (
  <CreditCard className={className} />
);

export const SecurityIcon: React.FC<IconProps> = ({ className }) => (
  <Home className={className} />
);

export const TvIcon: React.FC<IconProps> = ({ className }) => (
  <Tv className={className} />
);

export const HandverkerIcon: React.FC<IconProps> = ({ className }) => (
  <Hammer className={className} />
);

export const RenholdIcon: React.FC<IconProps> = ({ className }) => (
  <Sparkles className={className} />
);

export const FormIcon: React.FC<IconProps> = ({ className }) => (
  <FileText className={className} />
);

export const OfferIcon: React.FC<IconProps> = ({ className }) => (
  <Gift className={className} />
);

export const PiggyBankIcon: React.FC<IconProps> = ({ className }) => (
  <PiggyBank className={className} />
);

export const SmartLockIcon: React.FC<IconProps> = ({ className }) => (
  <Lock className={className} />
);

export const HeatPumpIcon: React.FC<IconProps> = ({ className }) => (
  <Thermometer className={className} />
);
