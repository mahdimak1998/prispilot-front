
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X, Shield, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    functional: true,
    analytics: true,
    marketing: true
  });

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) {
      // Show banner after 2 second delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveCookiePreferences = (consentType: 'accepted' | 'customized' | 'declined', customPreferences?: CookiePreferences) => {
    const cookieData = {
      status: consentType,
      categories: customPreferences || {
        necessary: true,
        functional: consentType === 'accepted',
        analytics: consentType === 'accepted',
        marketing: consentType === 'accepted'
      },
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(cookieData));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveCookiePreferences('accepted');
  };

  const handleDecline = () => {
    saveCookiePreferences('declined');
  };

  const handleSavePreferences = () => {
    saveCookiePreferences('customized', preferences);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'necessary') return; // Cannot change necessary cookies
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const cookieCategories = [
    {
      key: 'necessary' as keyof CookiePreferences,
      name: t('cookie.necessary'),
      description: t('cookie.necessaryDesc'),
      required: true
    },
    {
      key: 'functional' as keyof CookiePreferences,
      name: t('cookie.functional'),
      description: t('cookie.functionalDesc'),
      required: false
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      name: t('cookie.analytics'),
      description: t('cookie.analyticsDesc'),
      required: false
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      name: t('cookie.marketing'),
      description: t('cookie.marketingDesc'),
      required: false
    }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Card className="max-w-4xl mx-auto bg-card shadow-2xl border-t-4 border-primary">
        <div className="p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Lukk cookie-banner"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 
                id="cookie-banner-title"
                className="text-lg font-bold text-card-foreground mb-2"
              >
                {t('cookie.newTitle')}
              </h3>
              <p 
                id="cookie-banner-description"
                className="text-sm text-muted-foreground mb-3"
              >
                {t('cookie.newDescription')}
              </p>
              <p className="text-xs text-primary/80 mb-4 flex items-center gap-1">
                {t('cookie.socialProof')}
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link 
                  to="/personvern" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  {t('cookie.readMore')}
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/vilkår" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  {t('cookie.termsOfUse')}
                </Link>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="mb-6 animate-fade-in">
              <div className="border border-border rounded-lg p-4 bg-accent/20">
                <h4 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Cookie-innstillinger
                </h4>
                <div className="space-y-4">
                  {cookieCategories.map((category) => (
                    <div key={category.key} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-sm text-card-foreground">
                            {category.name}
                          </h5>
                          {category.required && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              Påkrevd
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <Switch
                        checked={preferences[category.key]}
                        disabled={category.required}
                        onCheckedChange={(checked) => 
                          handlePreferenceChange(category.key, checked)
                        }
                        aria-label={`${category.required ? 'Påkrevd' : 'Valgfri'} - ${category.name}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            {/* Main action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="outline"
                className="border-border text-muted-foreground hover:bg-accent order-3 sm:order-1"
              >
                {showAdvanced ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    {t('cookie.hideAdvanced')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    {t('cookie.customizeButton')}
                  </>
                )}
              </Button>
              
              {showAdvanced && (
                <Button
                  onClick={handleSavePreferences}
                  variant="secondary"
                  className="order-2"
                >
                  {t('cookie.savePreferences')}
                </Button>
              )}
              
              <Button
                onClick={handleDecline}
                variant="outline"
                className="border-border text-muted-foreground hover:bg-accent order-4 sm:order-3"
              >
                {t('cookie.decline')}
              </Button>
              
              <Button
                onClick={handleAcceptAll}
                className="bg-primary hover:bg-primary/90 text-primary-foreground order-1 sm:order-4"
              >
                {t('cookie.primaryCta')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
