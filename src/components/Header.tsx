import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, UserPlus } from 'lucide-react';
import { PlaneIcon, ElectricityIcon, InternetIcon, MobileIcon, InsuranceIcon, BankIcon, SecurityIcon, TvIcon, HandverkerIcon, RenholdIcon, HeatPumpIcon } from '@/components/CategoryIcons';
import { supabase } from '@/integrations/supabase/client';
import MobileMenuOverlay from './MobileMenuOverlay';
import DesktopNavigation from './DesktopNavigation';
import MobileMenuButton from './MobileMenuButton';
import LanguageSelector from './LanguageSelector';
import ThemeToggler from './ThemeToggler';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  onMeldPaClick?: () => void;
  onMobileMenuToggle?: (isOpen: boolean) => void;
  isMobileMenuOpen?: boolean;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMeldPaClick, onMobileMenuToggle, onLoginClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [categoryProviders, setCategoryProviders] = useState<{ [key: string]: boolean }>({});
  const [customerType, setCustomerType] = useState<string>('privat');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: t('services.strom'), slug: 'strom', icon: ElectricityIcon },
    { name: t('services.internett'), slug: 'internett', icon: InternetIcon },
    { name: t('services.mobil'), slug: 'mobil', icon: MobileIcon },
    { name: t('services.tv-pakker'), slug: 'tv-pakker', icon: TvIcon },
    { name: t('services.forsikring'), slug: 'forsikring', icon: InsuranceIcon },
    { name: t('services.lan'), slug: 'lan', icon: BankIcon },
    { name: t('services.boligalarm'), slug: 'boligalarm', icon: SecurityIcon },
    { name: t('services.handverkere'), slug: 'handverkere', icon: HandverkerIcon },
    { name: t('services.renhold'), slug: 'renhold', icon: RenholdIcon },
    { name: t('services.varmepumpe'), slug: 'varmepumpe', icon: HeatPumpIcon },
  ];

  useEffect(() => {
    checkProvidersForCategories();
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const checkProvidersForCategories = async () => {
    try {
      const categoryChecks: { [key: string]: boolean } = {};
      
      for (const service of services) {
        let hasData = false;
        
        try {
          // Check different tables based on category
          switch (service.slug) {
            case 'mobil':
              const { data: mobileData } = await supabase
                .from('mobile_plans')
                .select('id')
                .limit(1);
              hasData = !!(mobileData && mobileData.length > 0);
              break;
              
            case 'strom':
              const { data: powerData } = await supabase
                .from('power_deals')
                .select('id')
                .limit(1);
              hasData = !!(powerData && powerData.length > 0);
              break;
              
            case 'internett':
              const { data: internetData } = await supabase
                .from('internet_plans')
                .select('id')
                .limit(1);
              hasData = !!(internetData && internetData.length > 0);
              break;
              
            case 'tv-pakker':
              const { data: tvData } = await supabase
                .from('tv_packages')
                .select('id')
                .limit(1);
              hasData = !!(tvData && tvData.length > 0);
              break;
              
            case 'forsikring':
              const { data: insuranceData } = await supabase
                .from('insurance_plans')
                .select('id')
                .limit(1);
              hasData = !!(insuranceData && insuranceData.length > 0);
              break;
              
            case 'lan':
              const { data: bankData } = await supabase
                .from('bank_plans')
                .select('id')
                .limit(1);
              hasData = !!(bankData && bankData.length > 0);
              break;
              
            case 'boligalarm':
              const { data: securityData } = await supabase
                .from('home_security_plans')
                .select('id')
                .limit(1);
              hasData = !!(securityData && securityData.length > 0);
              break;
              
            case 'handverkere':
              const { data: handverkerData } = await supabase
                .from('handymen_services')
                .select('id')
                .limit(1);
              hasData = !!(handverkerData && handverkerData.length > 0);
              break;
              
            case 'renhold':
              const { data: renholdData } = await supabase
                .from('cleaning_services')
                .select('id')
                .limit(1);
              hasData = !!(renholdData && renholdData.length > 0);
              break;
              
            case 'varmepumpe':
              // For now, varmepumpe category is available but will redirect to quote form
              hasData = false;
              break;
              
            default:
              hasData = false;
          }
        } catch (error) {
          console.error(`Error checking ${service.slug}:`, error);
          hasData = false;
        }

        categoryChecks[service.slug] = hasData;
      }

      setCategoryProviders(categoryChecks);
    } catch (error) {
      console.error('Error checking providers:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleMeldPaClick = () => {
    if (onMeldPaClick) {
      onMeldPaClick();
    }
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleCategoryClick = (slug: string) => {
    if (categoryProviders[slug]) {
      navigate(`/${slug}`);
    } else {
      const service = services.find(s => s.slug === slug);
      if (service && onMeldPaClick) {
        onMeldPaClick();
      }
    }
    setActiveDropdown(null);
  };

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    console.log('Header: handleMobileMenuToggle called. Old state:', isMobileMenuOpen, 'New state:', newState);
    setIsMobileMenuOpen(newState);
    if (newState) {
      setMobileAboutOpen(false);
    }
    onMobileMenuToggle?.(newState);
    console.log('Header: onMobileMenuToggle called with:', newState);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    setMobileAboutOpen(false);
    onMobileMenuToggle?.(false);
  };

  const handleAboutClick = (section: string) => {
    let path = '/';
    switch (section) {
      case 'om-prispilot':
        path = '/om-prispilot';
        break;
      case 'hvordan-det-fungerer':
        path = '/hvordan-det-fungerer';
        break;
      case 'kontakt-oss':
        path = '/kontakt-oss';
        break;
      case 'blogg':
        path = '/blogg';
        break;
    }
    navigate(path);
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-background/60 backdrop-blur-md shadow-sm border-b border-border/30 fixed top-0 w-full z-50">
        <div className="app-container">
          <div className="flex items-center h-16 lg:h-18 w-full gap-4">
            {/* Logo Section - Fixed width to prevent squashing */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 lg:space-x-3 cursor-pointer plane-hover flex-shrink-0"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <PlaneIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground whitespace-nowrap">PrisPilot</span>
            </div>

            {/* Desktop Navigation Menu - Takes available space */}
            <div className="hidden lg:flex flex-1 min-w-0">
              <DesktopNavigation
                services={services}
                onCategoryClick={handleCategoryClick}
                onAboutClick={handleAboutClick}
                activeDropdown={activeDropdown}
                onDropdownToggle={handleDropdownToggle}
                dropdownRef={dropdownRef}
                onHomeClick={handleHomeClick}
                onMeldPaClick={handleMeldPaClick}
                onLoginClick={onLoginClick}
              />
            </div>


            {/* Mobile Menu Controls - Fixed width */}
            <div className="lg:hidden flex items-center gap-2 flex-shrink-0 ml-auto">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onToggle={handleMobileMenuToggle}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        services={services}
        onCategoryClick={handleCategoryClick}
        onAboutClick={handleAboutClick}
        onMeldPaClick={handleMeldPaClick}
        onHomeClick={handleHomeClick}
        mobileAboutOpen={mobileAboutOpen}
        setMobileAboutOpen={setMobileAboutOpen}
        onLoginClick={onLoginClick}
      />
    </>
  );
};

export default Header;
