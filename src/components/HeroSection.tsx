import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, UserCheck, Phone, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { toast } from "sonner";
import MobileAnimationWithCounters from './MobileAnimationWithCounters';
import DesktopCounters from './DesktopCounters';

interface HeroSectionProps {
  onGetStarted: () => void;
  isMobileMenuOpen?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, isMobileMenuOpen = false }) => {
  // console.log('HeroSection render:', { isMobileMenuOpen });
  const [userType, setUserType] = useState<string>('private');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [startDesktopAnimation, setStartDesktopAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showMobileAnimation, setShowMobileAnimation] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkIfDataExists();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop counter animation logic
  useEffect(() => {
    if (windowWidth < 1400 && windowWidth >= 768 && !isMobileMenuOpen) {
      // Start animation loop for desktop counters
      const startAnimation = () => {
        setStartDesktopAnimation(true);
        
        // Reset after 8 seconds to simulate same timing as mobile
        setTimeout(() => {
          setStartDesktopAnimation(false);
        }, 8000);
      };

      // Start first animation after a short delay
      const initialDelay = setTimeout(startAnimation, 1000);
      
      // Then repeat every 13.5 seconds (same as mobile animation)
      const interval = setInterval(startAnimation, 13500);

      return () => {
        clearTimeout(initialDelay);
        clearInterval(interval);
      };
    } else {
      // Stop animation immediately when mobile menu opens or on mobile screens
      setStartDesktopAnimation(false);
    }
  }, [windowWidth, isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkIfDataExists = async () => {
    setHasData(true);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !phone.trim()) {
      toast.error('Vennligst fyll ut alle felt');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            navn: fullName,
            telefon: phone,
            brukertype: userType
          }
        ]);

      if (error) throw error;

      toast.success('Takk! Vi kontakter deg snart.');
      setIsFormSubmitted(true);
      
      // Animate form out before clearing
      setTimeout(() => {
        setFullName('');
        setPhone('');
        setIsFormSubmitted(false);
        onGetStarted();
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Noe gikk galt. Prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (query: string) => {
    // Simplified - no search functionality for now
    setSearchResults([]);
    setShowResults(false);
  };

  const handleProviderClick = (provider: any) => {
    if (window.location.pathname === '/') {
      navigate(`/category/${provider.kategori}`);
    } else {
      const element = document.getElementById(provider.kategori);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowResults(false);
    setSearchTerm('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    },
    exit: { 
      opacity: 0, 
      y: -20
    }
  };

  return (
    <div className="relative w-full h-full flex items-center">
      <div className="relative z-10 container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {windowWidth >= 1400 ? (
          // Layout with mobile animation (3 columns)
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[300px_1fr_350px] gap-8 lg:gap-12 items-center"
          >
            {/* Left side - Space for mobile animation */}
            <div className="hidden lg:block"></div>
            
            {/* Middle - Hero content */}
            <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                 <motion.h1 
                   variants={itemVariants}
                   className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary"
                 >
                    {t('index.dataTitle')}
                 </motion.h1>
                <motion.div 
                  variants={itemVariants}
                  className="hero-container backdrop-blur-xl bg-white/95 dark:bg-slate-800/95 rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-2xl relative"
                >
                   <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-800 dark:text-white leading-relaxed font-medium mb-4">
                     {t('index.dataDescription')}
                   </p>
                   <p className="text-sm text-slate-500 dark:text-slate-400">
                     {t('index.dataPrivacy')}
                   </p>
                  {windowWidth < 1400 && windowWidth >= 768 && !isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 z-30 mt-2">
                      <DesktopCounters startAnimation={startDesktopAnimation} isMobileMenuOpen={isMobileMenuOpen} />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isFormSubmitted && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                  aria-live="polite"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="hero-container backdrop-blur-xl bg-white/95 dark:bg-slate-800/95 rounded-2xl p-4 border border-white/20 dark:border-slate-700/30 shadow-2xl"
                  >
                    <motion.div variants={itemVariants} className="mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-slate-800 dark:text-white mb-2">{t('hero.form.title')}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm lg:text-base leading-relaxed">
                        {t('hero.form.subtitle')}
                      </p>
                    </motion.div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-800 dark:text-white block flex items-center">
                          <UserCheck className="mr-1 h-3 w-3" />
                          {t('hero.form.usertype')}
                        </Label>
                        <ToggleGroup 
                          type="single" 
                          value={userType} 
                          onValueChange={(value) => value && setUserType(value)}
                          className="grid grid-cols-2 gap-2 w-full"
                        >
                          <ToggleGroupItem 
                            value="private" 
                            className="text-xs py-2 px-3 bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-white border-2 border-slate-300/60 dark:border-white/30 hover:border-slate-400/80 dark:hover:border-white/50 hover:bg-slate-200/80 dark:hover:bg-white/20 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 shadow-sm"
                          >
                            {t('hero.form.private')}
                          </ToggleGroupItem>
                          <ToggleGroupItem 
                            value="business" 
                            className="text-xs py-2 px-3 bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-white border-2 border-slate-300/60 dark:border-white/30 hover:border-slate-400/80 dark:hover:border-white/50 hover:bg-slate-200/80 dark:hover:bg-white/20 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 shadow-sm"
                          >
                            {t('hero.form.business')}
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="fullName" className="text-xs font-semibold text-slate-800 dark:text-white block flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {t('hero.form.name')}
                        </Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ditt navn"
                          className="bg-slate-100/80 dark:bg-white/10 border-2 border-slate-300/60 dark:border-white/30 hover:border-slate-400/80 dark:hover:border-white/50 focus:border-primary text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-white/20 h-9 text-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-lg shadow-sm"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-semibold text-slate-800 dark:text-white block flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {t('hero.form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+47 123 45 678"
                          className="bg-slate-100/80 dark:bg-white/10 border-2 border-slate-300/60 dark:border-white/30 hover:border-slate-400/80 dark:hover:border-white/50 focus:border-primary text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-white/20 h-9 text-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-lg shadow-sm"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="default"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-primary hover:border-primary/90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 shadow-lg hover:shadow-xl h-10 mt-3"
                        >
                          {isSubmitting ? t('hero.form.submitting') : t('hero.form.submit')}
                        </Button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <p className="text-xs text-slate-500 dark:text-gray-400 text-center leading-relaxed mt-2">
                          {t('hero.form.consent')}{' '}
                          <Link to="/vilkår" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">{t('hero.form.terms')}</Link>
                          {' '}{t('hero.form.and')}{' '}
                          <Link to="/personvern" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">{t('hero.form.privacy')}</Link>
                        </p>
                      </motion.div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Layout without mobile animation (compact layout for smaller screens)
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8 items-start"
          >
            {/* Hero content - Left side when no animation */}
            <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
              <div className="space-y-3">
                 <motion.h1 
                   variants={itemVariants}
                   className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-primary"
                 >
                   {t('index.dataTitle')}
                 </motion.h1>
                <motion.div 
                  variants={itemVariants}
                  className="hero-container backdrop-blur-xl bg-white/95 dark:bg-slate-800/95 rounded-2xl p-4 lg:p-6 border border-white/20 dark:border-slate-700/30 shadow-2xl relative"
                >
                   <p className="text-lg md:text-xl lg:text-2xl text-slate-800 dark:text-white leading-relaxed font-medium mb-4">
                     {t('index.dataDescription')}
                   </p>
                   <p className="text-sm text-slate-500 dark:text-slate-400">
                     {t('index.dataPrivacy')}
                   </p>
                  {windowWidth < 1400 && windowWidth >= 768 && !isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 z-30 mt-2">
                      <DesktopCounters startAnimation={startDesktopAnimation} isMobileMenuOpen={isMobileMenuOpen} />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Registration form - Right side when no animation */}
            <AnimatePresence mode="wait">
              {!isFormSubmitted && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                  aria-live="polite"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="hero-container backdrop-blur-xl bg-white/95 dark:bg-slate-800/95 rounded-2xl p-4 border border-white/20 dark:border-slate-700/30 shadow-2xl"
                  >
                    <motion.div variants={itemVariants} className="mb-3">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{t('hero.form.title')}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {t('hero.form.subtitle')}
                      </p>
                    </motion.div>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label className="text-xs font-semibold text-gray-900 dark:text-white block flex items-center">
                          <UserCheck className="mr-1 h-3 w-3" />
                          {t('hero.form.usertype')}
                        </Label>
                        <ToggleGroup 
                          type="single" 
                          value={userType} 
                          onValueChange={(value) => value && setUserType(value)}
                          className="grid grid-cols-2 gap-2 w-full"
                        >
                          <ToggleGroupItem 
                            value="private" 
                            className="text-xs py-2 px-3 bg-white/10 text-gray-900 dark:text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/20 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary rounded-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-sm"
                          >
                            {t('hero.form.private')}
                          </ToggleGroupItem>
                          <ToggleGroupItem 
                            value="business" 
                            className="text-xs py-2 px-3 bg-white/10 text-gray-900 dark:text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/20 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary rounded-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-sm"
                          >
                            {t('hero.form.business')}
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="fullName2" className="text-xs font-semibold text-gray-900 dark:text-white block flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {t('hero.form.name')}
                        </Label>
                        <Input
                          id="fullName2"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ditt navn"
                          className="bg-white/10 border-2 border-white/30 hover:border-white/50 focus:border-white/70 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:bg-white/20 h-9 text-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg shadow-sm"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="phone2" className="text-xs font-semibold text-gray-900 dark:text-white block flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {t('hero.form.phone')}
                        </Label>
                        <Input
                          id="phone2"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+47 123 45 678"
                          className="bg-white/10 border-2 border-white/30 hover:border-white/50 focus:border-white/70 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:bg-white/20 h-9 text-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg shadow-sm"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="default"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-primary hover:border-primary/90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-lg hover:shadow-xl h-10 mt-3"
                        >
                          {isSubmitting ? t('hero.form.submitting') : t('hero.form.submit')}
                        </Button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed mt-2">
                          {t('hero.form.consent')}{' '}
                          <Link to="/vilkår" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">{t('hero.form.terms')}</Link>
                          {' '}{t('hero.form.and')}{' '}
                          <Link to="/personvern" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">{t('hero.form.privacy')}</Link>
                        </p>
                      </motion.div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Mobile Animation - Repositioned higher to avoid carousel overlap */}
        {windowWidth >= 1400 && (
          <div className="absolute top-8 lg:top-12 left-4 lg:left-8 xl:left-12 z-10 lg:block" style={{ transform: 'scale(0.8)' }}>
            <MobileAnimationWithCounters isMobileMenuOpen={isMobileMenuOpen} />
          </div>
        )}
      </div>
      
      {/* Fixed positioned search dropdown */}
      {showResults && searchResults.length > 0 && (
        <div 
          ref={dropdownRef}
          className="fixed bg-card backdrop-blur-sm rounded-lg shadow-xl border border-border z-[9999]"
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
    </div>
  );
};

export default HeroSection;