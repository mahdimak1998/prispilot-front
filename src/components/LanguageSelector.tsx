
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import NorwegianFlag from '@/components/flags/NorwegianFlag';
import BritishFlag from '@/components/flags/BritishFlag';

// Import languages from context to ensure consistency
import { languages } from '@/contexts/LanguageContext';

// Component to render flag with fallback
const FlagDisplay = ({ flagComponent }: { flagComponent: string }) => {
  const flagProps = { className: "w-5 h-5" };
  
  switch (flagComponent) {
    case 'norwegian':
      return <NorwegianFlag {...flagProps} />;
    case 'british':
      return <BritishFlag {...flagProps} />;
    default:
      return <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />;
  }
};

const LanguageSelector: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Find current language with fallback to ensure flag display
  const currentLang = languages.find(lang => lang.code === currentLanguage.code) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: typeof languages[0]) => {
    console.log('🌍 Language changed to:', language.name, language.code);
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 h-11 bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-white/80 dark:hover:bg-white/10 hover:text-foreground hover:border-border/50 backdrop-blur-sm shadow-lg transition-all duration-300 rounded-lg font-medium text-sm ${
          isMobile ? 'px-3' : 'px-3'
        }`}
      >
        <FlagDisplay flagComponent={currentLang.flagComponent} />
        <span className="font-medium text-foreground">{currentLang.name}</span>
        {!isMobile && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 min-w-[160px] bg-card border border-border shadow-xl rounded-lg py-2 z-[110] ${
          isMobile ? 'right-0' : 'left-0'
        }`}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent transition-colors ${
                currentLanguage.code === language.code ? 'bg-accent text-primary font-semibold' : 'text-card-foreground'
              }`}
            >
              <FlagDisplay flagComponent={language.flagComponent} />
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
