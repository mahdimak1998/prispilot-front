import { useMemo, useState, useEffect } from 'react';
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

interface DesktopCountersProps {
  startAnimation: boolean;
  isMobileMenuOpen?: boolean;
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
    delay: index * 600 // Staggered delay for falling animation
  }));
};

const DesktopCounters = ({ startAnimation, isMobileMenuOpen = false }: DesktopCountersProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const serviceData = useMemo(() => {
    return getRandomServices(8);
  }, [startAnimation]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 500);
      
      return () => clearTimeout(exitTimer);
    }
  }, [startAnimation]);

  // ENKEL REGEL: Ikke vis på mobile/tablet størrelser hvor hamburger menu kan eksistere
  if (windowWidth < 1000 || (!isVisible && !isExiting)) {
    return null;
  }

  return (
    <div className={`desktop-counters ${isExiting ? 'desktop-counters-exit' : ''}`}>
      {serviceData.map((service, index) => (
        <InfoBox
          key={`desktop-${service.title}-${index}`}
          title={service.title}
          value={service.value}
          icon={service.icon}
          color={service.color}
          delay={service.delay}
          startAnimation={startAnimation && !isExiting}
          duration={2000}
        />
      ))}
    </div>
  );
};

export default DesktopCounters;