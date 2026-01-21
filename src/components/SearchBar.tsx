import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    const handleScrollOrResize = () => {
      if (showResults) {
        calculateDropdownPosition();
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScrollOrResize);
      window.addEventListener('resize', handleScrollOrResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [showResults]);

  const calculateDropdownPosition = () => {
    if (searchInputRef.current) {
      const rect = searchInputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      calculateDropdownPosition();
      
      try {
        const searches = await Promise.allSettled([
          supabase.from('mobile_plans').select('*').ilike('operator', `%${term}%`).limit(3),
          supabase.from('internet_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('insurance_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('bank_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('home_security_plans').select('*').ilike('provider', `%${term}%`).limit(3),
          supabase.from('tv_packages').select('*').ilike('provider', `%${term}%`).limit(3)
        ]);

        const allResults: any[] = [];
        
        searches.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.data) {
            const categoryMap = ['mobil', 'internett', 'forsikring', 'lan', 'boligalarm', 'tv-pakker'];
            result.value.data.forEach((item: any) => {
              allResults.push({
                ...item,
                kategori: categoryMap[index],
                navn: item.operator || item.provider || item.supplier_name || 'Ukjent'
              });
            });
          }
        });

        setSearchResults(allResults);
        setShowResults(true);
      } catch (error) {
        setSearchResults([]);
      }
    } else {
      setShowResults(false);
    }
  };

  const handleProviderClick = (provider: any) => {
    if (provider.kategori) {
      if (window.location.pathname === '/') {
        setShowResults(false);
        setSearchTerm('');
        
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          
          setTimeout(() => {
            const categoryCard = document.querySelector(`[data-category="${provider.kategori}"]`);
            if (categoryCard) {
              categoryCard.classList.add('ring-4', 'ring-primary', 'ring-opacity-50');
              setTimeout(() => {
                categoryCard.classList.remove('ring-4', 'ring-primary', 'ring-opacity-50');
              }, 3000);
            }
          }, 800);
        }
      } else {
        navigate(`/${provider.kategori}`);
        setShowResults(false);
        setSearchTerm('');
      }
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={t('nav.searchPlaceholder') || "Søk etter leverandør..."}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm.length > 0) {
              scrollToServices();
            }
          }}
          className="pl-9 pr-3 h-11 w-full bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-[hsl(var(--nav-hover))] hover:border-primary/40 transition-all duration-200 ease-out rounded-xl font-medium text-sm backdrop-blur-sm shadow-sm hover:shadow-md placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Fixed positioned search dropdown */}
      {showResults && searchResults.length > 0 && (
        <div 
          className="fixed bg-card backdrop-blur-sm rounded-lg shadow-xl border border-border z-[40]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          {searchResults.map((result, index) => (
            <div 
              key={`${result.kategori}-${result.id || index}`} 
              className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0 flex items-center gap-3"
              onClick={() => handleProviderClick(result)}
            >
              {result.logo_url && (
                <img
                  src={result.logo_url}
                  alt={result.navn}
                  className="w-8 h-8 object-contain flex-shrink-0 dark:bg-white/90 dark:rounded-md dark:p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1">
                <div className="font-semibold text-foreground">{result.navn}</div>
                <div className="text-sm text-muted-foreground capitalize">{result.kategori}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;