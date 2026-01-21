import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, Zap, Smartphone, Wifi, Shield, CreditCard, Home, Tv, Hammer, Brush, User, Building, TrendingUp, Pin, Leaf, Radio, Car, Plane, Heart, MapPin, Wrench, Eye, Star, Trophy, Construction, Lock, Clock, Mountain, Users, Cable, ArrowRightLeft, Flame, Droplets, Camera, Globe, Plus, Paintbrush, Sparkles, Calendar, ShoppingCart, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceFilter } from '@/config/ServiceFiltersConfig';

interface AnimatedServiceHoverCardProps {
  children: React.ReactNode;
  serviceName: string;
  serviceSlug: string;
  filters: ServiceFilter[];
  displayMode: 'full' | 'compact' | 'icons' | 'minimal';
}

const AnimatedServiceHoverCard: React.FC<AnimatedServiceHoverCardProps> = ({
  children,
  serviceName,
  serviceSlug,
  filters,
  displayMode
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const { t } = useLanguage();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilterClick = (filterValue: string, parentValue?: string) => {
    if (filterValue === 'all') {
      navigate(`/${serviceSlug}`, { replace: true });
    } else if (parentValue === 'fixed') {
      navigate(`/${serviceSlug}?type=fixed-${filterValue}`, { replace: true });
    } else if (parentValue) {
      navigate(`/${serviceSlug}?type=${parentValue}&duration=${filterValue}`, { replace: true });
    } else {
      navigate(`/${serviceSlug}?type=${filterValue}`, { replace: true });
    }
    setIsHovered(false);
  };

  const toggleExpanded = (filterValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedFilter(expandedFilter === filterValue ? null : filterValue);
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setExpandedFilter(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const getFilterIcon = (filterValue: string, serviceSlug?: string) => {
    const serviceIconMap: { [key: string]: { [key: string]: React.ComponentType<{ className?: string }> } } = {
      'strom': {
        'all': Zap,
        'spot': TrendingUp,
        'fixed': Lock,
        'variable': Clock,
        'green': Leaf,
        'residential': Home,
        'cabin': Mountain,
        'business': Briefcase
      },
      'mobil': {
        'all': Smartphone,
        'lavpris': Smartphone,
        'familie': Users,
        'ubegrenset': Zap,
        'bedrift': Briefcase
      },
      'internett': {
        'all': Wifi,
        'fiber': Wifi,
        'adsl': Cable,
        'mobilt': Smartphone,
        'bedrift': Briefcase
      },
      'forsikring': {
        'all': Shield,
        'bolig': Home,
        'kjoretoy': Car,
        'person': User,
        'dyr_fritid': Heart,
        'bedrift': Briefcase
      },
      'lan': {
        'all': CreditCard,
        'forbrukslan': CreditCard,
        'refinansiering': ArrowRightLeft,
        'boliglan': Home,
        'billan': Car,
        'bedrift': Briefcase
      },
      'boligalarm': {
        'all': Shield,
        'innbrudd': Shield,
        'brann': Flame,
        'vann': Droplets,
        'kamera': Camera,
        'smarthus': Home,
        'smartlås': Lock,
        'bedrift': Briefcase
      },
      'tv-pakker': {
        'all': Tv,
        'standard': Tv,
        'streaming': Wifi,
        'sport': Trophy,
        'flexible': Sparkles,
        'cabin': Home,
        'combo': Globe,
        'extras': Plus,
        'bedrift': Briefcase
      },
      'handverkere': {
        'all': Hammer,
        'renovation': Hammer,
        'repair': Wrench,
        'electrical': Zap,
        'plumbing': Home,
        'painting': Paintbrush,
        'bedrift': Briefcase
      },
      'renhold': {
        'all': Home,
        'bolig': Home,
        'kontor': Building,
        'storrengjoring': Sparkles,
        'fast_renhold': Calendar,
        'flytterengjoring': ShoppingCart,
        'bedrift': Briefcase
      }
    };
    
    return serviceIconMap[serviceSlug || '']?.[filterValue] || Zap;
  };

  const renderFilter = (filter: ServiceFilter, parentValue?: string) => {
    const hasNested = filter.nested && filter.nested.length > 0;
    const isExpanded = expandedFilter === filter.value;
    const Icon = getFilterIcon(filter.value, serviceSlug);

    return (
      <div key={filter.value} className="bg-background/50 hover:bg-background/80 rounded-lg border border-border/50 hover:border-border transition-all duration-200 group">
        <button
          onClick={(e) => {
            if (hasNested) {
              toggleExpanded(filter.value, e);
            } else {
              handleFilterClick(filter.value, parentValue);
            }
          }}
          className="w-full text-left p-4 flex items-center gap-3 group-hover:text-primary transition-colors duration-200"
          tabIndex={0}
          role="menuitem"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {t(filter.label)}
            </span>
            {filter.description && (
              <span className="block text-xs text-muted-foreground mt-1">
                {t(filter.description)}
              </span>
            )}
          </div>
          {hasNested && (
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          )}
        </button>
        
        {hasNested && isExpanded && (
          <div className="px-4 pb-4 space-y-2 border-t border-border/30 mt-2 pt-2">
            {filter.nested!.map((nestedFilter) => {
              const NestedIcon = getFilterIcon(nestedFilter.value, serviceSlug);
              return (
                <button
                  key={nestedFilter.value}
                  onClick={() => handleFilterClick(nestedFilter.value, filter.value)}
                  className="w-full text-left px-3 py-2 hover:bg-primary/10 transition-colors duration-200 flex items-center gap-3 group rounded-md"
                  tabIndex={0}
                  role="menuitem"
                >
                  <NestedIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {t(nestedFilter.label)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const getServiceIcon = () => {
    const serviceIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'strom': Zap,
      'mobil': Smartphone,
      'internett': Wifi,
      'forsikring': Shield,
      'lan': CreditCard,
      'boligalarm': Home,
      'tv-pakker': Tv,
      'handverkere': Hammer,
      'renhold': Brush
    };
    return serviceIcons[serviceSlug] || Zap;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Full-Width Professional Mega Dropdown */}
      <div 
        className={`fixed left-0 w-full top-full bg-card border-t border-border shadow-xl rounded-b-2xl z-30 transform origin-top transition-all duration-300 ease-out transform-gpu ${
          isHovered && filters.length > 0 ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
          <div className="container mx-auto px-6 py-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              {(() => {
                const ServiceIcon = getServiceIcon();
                return <ServiceIcon className="w-6 h-6 text-primary" />;
              })()}
              <div>
                <h3 className="font-semibold text-lg text-foreground">{serviceName}</h3>
                <p className="text-sm text-muted-foreground">
                  Velg kategori som passer dine behov
                </p>
              </div>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filters.map((filter) => renderFilter(filter))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default AnimatedServiceHoverCard;