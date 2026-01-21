import { useMemo } from 'react';
import InfoBox from './InfoBox';
import { 
  ElectricityIcon, 
  MobileIcon, 
  InternetIcon, 
  InsuranceIcon, 
  BankIcon, 
  SecurityIcon,
  TvIcon,
  HandverkerIcon
} from './CategoryIcons';

interface MobileCountersProps {
  startAnimation: boolean;
}

interface ServiceType {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  minSavings: number;
  maxSavings: number;
}

const norwegianServices: ServiceType[] = [
  {
    title: 'Strøm spart',
    icon: ElectricityIcon,
    color: '#22c55e',
    minSavings: 1500,
    maxSavings: 4500
  },
  {
    title: 'Mobil spart',
    icon: MobileIcon,
    color: '#3b82f6',
    minSavings: 800,
    maxSavings: 2400
  },
  {
    title: 'Internett spart',
    icon: InternetIcon,
    color: '#8b5cf6',
    minSavings: 1200,
    maxSavings: 3600
  },
  {
    title: 'Forsikring spart',
    icon: InsuranceIcon,
    color: '#ef4444',
    minSavings: 2000,
    maxSavings: 6000
  },
  {
    title: 'Bank spart',
    icon: BankIcon,
    color: '#f59e0b',
    minSavings: 500,
    maxSavings: 2000
  },
  {
    title: 'Boligalarm spart',
    icon: SecurityIcon,
    color: '#06b6d4',
    minSavings: 400,
    maxSavings: 1500
  },
  {
    title: 'TV spart',
    icon: TvIcon,
    color: '#84cc16',
    minSavings: 600,
    maxSavings: 2200
  },
  {
    title: 'Håndverker spart',
    icon: HandverkerIcon,
    color: '#f97316',
    minSavings: 1000,
    maxSavings: 5000
  }
];

const getRandomServices = (count: number) => {
  const shuffled = [...norwegianServices].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((service, index) => ({
    ...service,
    value: Math.floor(Math.random() * (service.maxSavings - service.minSavings + 1)) + service.minSavings,
    delay: index * 400
  }));
};

const MobileCounters = ({ startAnimation }: MobileCountersProps) => {
  const serviceData = useMemo(() => {
    // Generate exactly 4 random services
    return getRandomServices(4);
  }, [startAnimation]); // Regenerate when animation restarts

  return (
    <div className="mobile-counters">
      {serviceData.map((service, index) => (
        <InfoBox
          key={`${service.title}-${index}`}
          title={service.title}
          value={service.value}
          icon={service.icon}
          color={service.color}
          delay={service.delay}
          startAnimation={startAnimation}
          duration={2000}
        />
      ))}
    </div>
  );
};

export default MobileCounters;