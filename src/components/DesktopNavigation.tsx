
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, Home, UserPlus, Search, LogIn, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggler from './ThemeToggler';
import SearchBar from './SearchBar';
import AnimatedServiceHoverCard from './AnimatedServiceHoverCard';
import { getServiceFilters } from '@/config/ServiceFiltersConfig';

interface Service {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DesktopNavigationProps {
  services: Service[];
  onCategoryClick: (slug: string) => void;
  onAboutClick: (section: string) => void;
  activeDropdown: string | null;
  onDropdownToggle: (dropdown: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onHomeClick: () => void;
  onMeldPaClick: () => void;
  onLoginClick?: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  services,
  onCategoryClick,
  onAboutClick,
  activeDropdown,
  onDropdownToggle,
  dropdownRef,
  onHomeClick,
  onMeldPaClick,
  onLoginClick
}) => {
  const { t } = useLanguage();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };
  const [displayMode, setDisplayMode] = useState<'full' | 'compact' | 'icons' | 'minimal'>('full');
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced collision detection with better spacing calculations
  const checkCollision = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const availableWidth = container.clientWidth;
    const padding = 80; // Increased padding for better spacing
    const usableWidth = availableWidth - padding;
    
    // More accurate width calculations
    const baseServiceWidth = 150; // Increased base width
    const iconServiceWidth = 90;   // Increased icon width for better spacing
    const utilityWidth = 350;      // More accurate utility controls width including action buttons
    
    // Better calculation based on actual text rendering
    const fullModeWidth = services.reduce((total, service) => {
      const nameLength = service.name.length;
      // More conservative estimation with better spacing
      const estimatedWidth = Math.max(baseServiceWidth, nameLength * 10 + 70); 
      return total + estimatedWidth;
    }, 0) + utilityWidth;
    
    const iconModeWidth = (services.length * iconServiceWidth) + utilityWidth;
    const minimalModeWidth = 450; // Increased minimal width
    
  // console.log('Navigation collision check:', {
  // {
  //   availableWidth,
  //   usableWidth,
  //   fullModeWidth,
  //   iconModeWidth,
  //   serviceCount: services.length,
  //   selectedMode: usableWidth >= fullModeWidth + 120 ? 'full' : 
  //                usableWidth >= iconModeWidth + 80 ? 'icons' : 'minimal'
  // }
    
    // More conservative thresholds to prevent overlapping
    if (usableWidth >= fullModeWidth + 120) { // Add bigger buffer
      setDisplayMode('full');
    } else if (usableWidth >= iconModeWidth + 80) {
      setDisplayMode('icons');  
    } else {
      setDisplayMode('minimal');
    }
  }, [services]);

  useEffect(() => {
    checkCollision();
    const resizeObserver = new ResizeObserver(checkCollision);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [checkCollision]);

  const getServiceButtonClass = () => {
    const baseClass = "flex items-center bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:text-primary hover:border-primary/40 transition-all duration-200 ease-out rounded-xl font-medium text-sm backdrop-blur-sm";
    
    switch (displayMode) {
      case 'full':
        return `${baseClass} px-4 gap-2 h-11 whitespace-nowrap shadow-sm hover:shadow-md`;
      case 'icons':
        return `${baseClass} justify-center w-11 h-11 shadow-sm hover:shadow-md`;
      case 'minimal':
        return `${baseClass} justify-center w-11 h-11 shadow-sm hover:shadow-md`;
      default:
        return baseClass;
    }
  };

  const getUtilityButtonClass = () => {
    const baseClass = "flex items-center justify-center h-11 bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:text-primary hover:border-primary/40 transition-all duration-200 ease-out rounded-xl font-medium text-sm backdrop-blur-sm shadow-sm hover:shadow-md";
    
    switch (displayMode) {
      case 'full':
        return `${baseClass} px-4 gap-2 whitespace-nowrap`;
      case 'icons':
        return `${baseClass} px-3 gap-1 min-w-[90px]`;
      case 'minimal':
        return `${baseClass} w-11`;
      default:
        return baseClass;
    }
  };

  const getHomeButtonClass = () => {
    return "flex items-center justify-center h-11 w-11 bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:text-primary hover:border-primary/40 transition-all duration-200 ease-out rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm";
  };

    return (
    <div ref={containerRef} className="flex items-center w-full gap-2 navbar-container">
      {/* Services - takes up available space */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {services.map((service) => {
          const IconComponent = service.icon;
          const serviceFilters = getServiceFilters(service.slug);
          
          return (
            <AnimatedServiceHoverCard
              key={service.slug}
              serviceName={service.name}
              serviceSlug={service.slug}
              filters={serviceFilters}
              displayMode={displayMode}
            >
              <button
                onClick={() => onCategoryClick(service.slug)}
                className={getServiceButtonClass()}
                title={service.name}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {displayMode === 'full' && (
                  <span className="text-xs">
                    {service.name}
                  </span>
                )}
              </button>
            </AnimatedServiceHoverCard>
          );
        })}
      </div>
      
      {/* Utility Controls - fixed width, always on the right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* About Dropdown */}
        {displayMode !== 'minimal' && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => onDropdownToggle('about')}
              className={getUtilityButtonClass()}
            >
              {(displayMode === 'full' || displayMode === 'icons') && (
                <span className="text-xs">{t('nav.more')}</span>
              )}
              <ChevronDown className="w-5 h-5 flex-shrink-0" />
            </button>
            <div className={`absolute top-full mt-3 w-56 bg-[hsl(var(--nav-glass))] backdrop-blur-xl rounded-2xl shadow-2xl border border-[hsl(var(--nav-border))] py-3 z-50 transition-all duration-300 ease-out origin-top-right ${activeDropdown === 'about' ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
                 style={{
                   right: '0',
                   transform: activeDropdown === 'about' ? 'translateY(0)' : 'translateY(-10px)',
                   maxWidth: 'calc(100vw - 2rem)'
                 }}>
              <button 
                onClick={() => onAboutClick('om-prispilot')} 
                className="block w-full text-left px-5 py-3 text-sm font-medium text-foreground hover:bg-[hsl(var(--nav-hover))] hover:text-primary transition-all duration-200 ease-out whitespace-nowrap rounded-lg mx-2"
              >
                {t('nav.aboutPrisPilot')}
              </button>
              <button 
                onClick={() => onAboutClick('hvordan-det-fungerer')} 
                className="block w-full text-left px-5 py-3 text-sm font-medium text-foreground hover:bg-[hsl(var(--nav-hover))] hover:text-primary transition-all duration-200 ease-out whitespace-nowrap rounded-lg mx-2"
              >
                {t('nav.howItWorks')}
              </button>
              <button 
                onClick={() => onAboutClick('kontakt-oss')} 
                className="block w-full text-left px-5 py-3 text-sm font-medium text-foreground hover:bg-[hsl(var(--nav-hover))] hover:text-primary transition-all duration-200 ease-out whitespace-nowrap rounded-lg mx-2"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}

        {/* Blog Button */}
        {displayMode !== 'minimal' && (
          <button
            onClick={() => onAboutClick('blogg')}
            className={getUtilityButtonClass()}
          >
            {displayMode === 'full' && (
              <span className="text-xs">{t('nav.blog')}</span>
            )}
            {displayMode === 'icons' && (
              <span className="text-xs font-semibold">{t('nav.blog')}</span>
            )}
          </button>
        )}

        {/* Integrated Search Bar - Always visible and open */}
        {displayMode !== 'minimal' && (
          <div className="w-64">
            <SearchBar className="w-full" />
          </div>
        )}

        {/* Language Selector */}
        <LanguageSelector isMobile={displayMode === 'icons' || displayMode === 'minimal'} />

        {/* Theme Toggle */}
        <ThemeToggler />

        {/* Registrer Button */}
        <button
          onClick={onMeldPaClick}
          className="flex items-center justify-center gap-2 h-11 px-4 bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:text-primary hover:border-primary/40 transition-all duration-200 ease-out rounded-xl font-medium text-sm backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-xs font-semibold">{t('cta.signUp')}</span>
        </button>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="flex items-center justify-center gap-1 h-11 px-3 bg-white/60 dark:bg-white/5 text-muted-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:text-primary hover:border-primary/40 transition-all duration-200 ease-out rounded-xl font-medium text-sm backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <LogIn className="w-4 h-4" />
          <span className="text-xs">{t('nav.login')}</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopNavigation;
