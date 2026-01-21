import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { User, Phone, Mail, Building, UserCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeOrgNumber } from '@/utils/sanitization';

interface QuoteFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedProvider?: {
    id: number;
    navn: string;
    kategori: string;
  } | null;
  preSelectedCategory?: string;
  preselectedUserType?: 'privat' | 'bedrift';
}

interface FormData {
  navn: string;
  telefon: string;
  epost: string;
  brukertype: 'privat' | 'bedrift';
  tjeneste: string;
  leverandor: string;
  samtykke: boolean;
  organisasjonsnummer?: string;
  bransje?: string;
  antallAnsatte?: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ 
  isOpen, 
  onClose, 
  selectedProvider, 
  preSelectedCategory, 
  preselectedUserType 
}) => {
  const { t } = useLanguage();
  const { getFilterTranslation } = useTranslations();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    navn: '',
    telefon: '',
    epost: '',
    brukertype: preselectedUserType || 'privat',
    tjeneste: '',
    leverandor: '',
    samtykke: false,
    organisasjonsnummer: '',
    bransje: '',
    antallAnsatte: '',
  });

  useEffect(() => {
    if (selectedProvider) {
      setFormData(prev => ({
        ...prev,
        tjeneste: selectedProvider.kategori,
        leverandor: selectedProvider.navn,
        brukertype: preselectedUserType || prev.brukertype
      }));
    } else if (preSelectedCategory) {
      setFormData(prev => ({
        ...prev,
        tjeneste: preSelectedCategory,
        leverandor: '',
        brukertype: preselectedUserType || prev.brukertype
      }));
    }
  }, [selectedProvider, preSelectedCategory, preselectedUserType]);

  const tjenester = [
    'Strøm',
    'Internett', 
    'Mobil',
    'Forsikring',
    'Bank',
    'Lån',
    'Boligalarm',
    'Håndverkere',
    'Renhold'
  ];

  const leverandorer = {
    'Strøm': ['Hafslund', 'Tibber', 'Fortum', 'Fjordkraft', 'Lyse'],
    'Internett': ['Altibox', 'Telenor', 'Telia', 'Get', 'Bredbandsfylket'],
    'Mobil': ['Telenor', 'Telia', 'Ice', 'OneCall', 'MyCall'],
    'Forsikring': ['If', 'Tryg', 'Gjensidige', 'SpareBank 1', 'Fremtind'],
    'Bank': ['DNB', 'Nordea', 'SpareBank 1', 'Handelsbanken', 'Sbanken'],
    'Lån': ['Santander', 'Bank Norwegian', 'Komplett Bank', 'Folkefinans'],
    'Boligalarm': ['Sector Alarm', 'Verisure', 'G4S', 'SecuriNor'],
    'Håndverkere': ['Ikke relevant'],
    'Renhold': ['Ikke relevant']
  };

  const getIndustryOptions = () => [
    { key: 'industry.it', value: 'IT og teknologi' },
    { key: 'industry.retail', value: 'Handel og service' },
    { key: 'industry.construction', value: 'Bygg og anlegg' },
    { key: 'industry.healthcare', value: 'Helse og omsorg' },
    { key: 'industry.education', value: 'Utdanning' },
    { key: 'industry.transport', value: 'Transport og logistikk' },
    { key: 'industry.finance', value: 'Finansielle tjenester' },
    { key: 'industry.manufacturing', value: 'Industri og produksjon' },
    { key: 'industry.other', value: 'Annet' }
  ];

  const getEmployeeOptions = () => [
    { key: 'employees.1-5', value: '1-5 ansatte' },
    { key: 'employees.6-20', value: '6-20 ansatte' },
    { key: 'employees.21-50', value: '21-50 ansatte' },
    { key: 'employees.51-100', value: '51-100 ansatte' },
    { key: 'employees.100+', value: 'Over 100 ansatte' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep1 = (): boolean => {
    const sanitizedName = sanitizeString(formData.navn);
    const sanitizedPhone = sanitizePhone(formData.telefon);
    
    if (!sanitizedName || sanitizedName.length < 2) {
      toast({
        title: t('quote.validation.fields'),
        description: 'Navn må være minst 2 tegn',
        variant: "destructive"
      });
      return false;
    }
    
    if (!sanitizedPhone) {
      toast({
        title: t('quote.validation.fields'),
        description: 'Ugyldig telefonnummer format',
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.epost && !sanitizeEmail(formData.epost)) {
      toast({
        title: t('quote.validation.fields'),
        description: 'Ugyldig e-post format',
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.brukertype === 'bedrift' && formData.organisasjonsnummer && !sanitizeOrgNumber(formData.organisasjonsnummer)) {
      toast({
        title: t('quote.validation.fields'),
        description: 'Ugyldig organisasjonsnummer format',
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    
    if (currentStep === 2 && !formData.tjeneste) {
      toast({
        title: t('quote.validation.service'),
        description: t('quote.validation.serviceDesc'),
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && !formData.leverandor && !['håndverkere', 'renhold'].includes(formData.tjeneste)) {
      toast({
        title: t('quote.validation.provider'),
        description: t('quote.validation.providerDesc'),
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.samtykke) {
      toast({
        title: t('quote.validation.consent'),
        description: t('quote.validation.consentDesc'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Sanitize all input data before saving
      const sanitizedData = {
        navn: sanitizeString(formData.navn),
        telefon: sanitizePhone(formData.telefon),
        epost: formData.epost ? sanitizeEmail(formData.epost) : null,
        brukertype: formData.brukertype,
        tjeneste: sanitizeString(formData.tjeneste),
        leverandor: formData.leverandor ? sanitizeString(formData.leverandor) : null,
        samtykke: formData.samtykke,
        ...(formData.brukertype === 'bedrift' && {
          organisasjonsnummer: formData.organisasjonsnummer ? sanitizeOrgNumber(formData.organisasjonsnummer) : null,
          bransje: formData.bransje ? sanitizeString(formData.bransje) : null,
          antall_ansatte: formData.antallAnsatte ? sanitizeString(formData.antallAnsatte) : null
        })
      };

      // Validate required fields after sanitization
      if (!sanitizedData.navn || !sanitizedData.telefon || !sanitizedData.tjeneste) {
        throw new Error('Required fields are invalid after sanitization');
      }

      // Save lead to Supabase
      const { error } = await supabase
        .from('leads')
        .insert(sanitizedData);

      if (error) {
        throw error;
      }

      toast({
        title: t('quote.success.title'),
        description: t('quote.success.desc'),
      });

      // Reset form and close
      setFormData({
        navn: '',
        telefon: '',
        epost: '',
        brukertype: preselectedUserType || 'privat',
        tjeneste: '',
        leverandor: '',
        samtykke: false,
        organisasjonsnummer: '',
        bransje: '',
        antallAnsatte: '',
      });
      setCurrentStep(1);
      onClose?.();

    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: t('quote.error.title'),
        description: t('quote.error.desc'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label htmlFor="navn" className="flex items-center text-foreground font-medium mb-2">
                <User className="mr-2 h-4 w-4" />
                {t('quote.fields.name')}
              </Label>
              <Input
                id="navn"
                value={formData.navn}
                onChange={(e) => handleInputChange('navn', e.target.value)}
                placeholder={t('quote.fields.namePlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-11"
              />
            </div>
            <div>
              <Label htmlFor="telefon" className="flex items-center text-foreground font-medium mb-2">
                <Phone className="mr-2 h-4 w-4" />
                {t('quote.fields.phone')}
              </Label>
              <Input
                id="telefon"
                value={formData.telefon}
                onChange={(e) => handleInputChange('telefon', e.target.value)}
                placeholder={t('quote.fields.phonePlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-11"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="epost" className="flex items-center text-foreground font-medium mb-2">
                <Mail className="mr-2 h-4 w-4" />
                {t('quote.fields.email')}
              </Label>
              <Input
                id="epost"
                type="email"
                value={formData.epost}
                onChange={(e) => handleInputChange('epost', e.target.value)}
                placeholder={t('quote.fields.emailPlaceholder')}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-11"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="flex items-center text-foreground font-medium mb-3">
                <UserCheck className="mr-2 h-4 w-4" />
                {t('quote.fields.userType')}
              </Label>
              <ToggleGroup 
                type="single" 
                value={formData.brukertype} 
                onValueChange={(value) => value && handleInputChange('brukertype', value)}
                className="grid w-full grid-cols-2 bg-muted rounded-lg p-1"
                disabled={!!preselectedUserType}
              >
                <ToggleGroupItem 
                  value="privat" 
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground hover:bg-accent"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{t('quote.fields.private')}</span>
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="bedrift" 
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=off]:text-muted-foreground hover:bg-accent"
                >
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{t('quote.fields.business')}</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {formData.brukertype === 'bedrift' && (
              <>
                <div>
                  <Label htmlFor="organisasjonsnummer" className="flex items-center text-foreground font-medium mb-2">
                    <Building className="mr-2 h-4 w-4" />
                    {t('quote.fields.orgNumber')}
                  </Label>
                  <Input
                    id="organisasjonsnummer"
                    value={formData.organisasjonsnummer}
                    onChange={(e) => handleInputChange('organisasjonsnummer', e.target.value)}
                    placeholder="123 456 789"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="bransje" className="flex items-center text-foreground font-medium mb-2">
                    <Building className="mr-2 h-4 w-4" />
                    {t('quote.fields.industry')}
                  </Label>
                  <Select value={formData.bransje} onValueChange={(value) => handleInputChange('bransje', value)}>
                    <SelectTrigger className="bg-background border-border text-foreground h-11">
                      <SelectValue placeholder={t('quote.placeholder.selectIndustry')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {getIndustryOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.key)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="antallAnsatte" className="flex items-center text-foreground font-medium mb-2">
                    <User className="mr-2 h-4 w-4" />
                    {t('quote.fields.employees')}
                  </Label>
                  <Select value={formData.antallAnsatte} onValueChange={(value) => handleInputChange('antallAnsatte', value)}>
                    <SelectTrigger className="bg-background border-border text-foreground h-11">
                      <SelectValue placeholder={t('quote.placeholder.selectEmployees')} />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {getEmployeeOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.key)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium mb-2 block">{t('quote.service.title')}</Label>
              <Select value={formData.tjeneste} onValueChange={(value) => handleInputChange('tjeneste', value)}>
                <SelectTrigger className="bg-background border-border text-foreground h-11">
                  <SelectValue placeholder={t('quote.service.placeholder')} />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {tjenester.map((tjeneste) => (
                    <SelectItem key={tjeneste} value={tjeneste.toLowerCase()}>
                      {tjeneste}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        const currentService = tjenester.find(t => t.toLowerCase() === formData.tjeneste);
        const isServiceWithoutProviders = ['håndverkere', 'renhold'].includes(formData.tjeneste);
        
        if (isServiceWithoutProviders) {
          // Skip step 3 for services without providers
          setCurrentStep(4);
          return null;
        }

        return (
          <div className="space-y-4">
            <div>
              <Label className="text-foreground font-medium mb-2 block">{t('quote.provider.title')}</Label>
              <Select value={formData.leverandor} onValueChange={(value) => handleInputChange('leverandor', value)}>
                <SelectTrigger className="bg-background border-border text-foreground h-11">
                  <SelectValue placeholder={t('quote.provider.placeholder')} />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {currentService && leverandorer[currentService]?.map((leverandor) => (
                    <SelectItem key={leverandor} value={leverandor}>
                      {leverandor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-foreground">{t('quote.summary.title')}</h4>
              <p className="text-foreground"><strong>Navn:</strong> {formData.navn}</p>
              <p className="text-foreground"><strong>Telefon:</strong> {formData.telefon}</p>
              {formData.epost && <p className="text-foreground"><strong>E-post:</strong> {formData.epost}</p>}
              <p className="text-foreground"><strong>Brukertype:</strong> {formData.brukertype === 'privat' ? 'Privat' : 'Bedrift'}</p>
              {formData.brukertype === 'bedrift' && (
                <>
                  {formData.organisasjonsnummer && <p className="text-foreground"><strong>Organisasjonsnummer:</strong> {formData.organisasjonsnummer}</p>}
                  {formData.bransje && <p className="text-foreground"><strong>Bransje:</strong> {formData.bransje}</p>}
                  {formData.antallAnsatte && <p className="text-foreground"><strong>Antall ansatte:</strong> {formData.antallAnsatte}</p>}
                </>
              )}
              <p className="text-foreground"><strong>Tjeneste:</strong> {tjenester.find(t => t.toLowerCase() === formData.tjeneste)}</p>
              {formData.leverandor && formData.leverandor !== 'Ikke relevant' && (
                <p className="text-foreground"><strong>Nåværende leverandør:</strong> {formData.leverandor}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="samtykke"
                checked={formData.samtykke}
                onCheckedChange={(checked) => handleInputChange('samtykke', checked as boolean)}
                className="border-border"
              />
              <Label htmlFor="samtykke" className="text-sm text-foreground leading-5">
                {t('quote.consent')}
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // For inline display (when shown within business category)
  if (!isOpen && !onClose) {
    return (
      <div className="space-y-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t('quote.step')} {currentStep} {t('quote.of')} 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              {t('quote.back')}
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button onClick={handleNext} variant="default" className="ml-auto">
              {t('quote.next')}
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !formData.samtykke}
              variant="default"
              className="ml-auto"
            >
              {isLoading ? t('quote.submitting') : t('quote.submit')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Regular dialog display
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-card border border-border shadow-lg p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {t('quote.title')}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t('quote.description') || 'Fyll ut skjemaet for å motta tilbud.'}
        </DialogDescription>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t('quote.step')} {currentStep} {t('quote.of')} 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              {t('quote.back')}
            </Button>
          )}
          {currentStep < 4 ? (
            <Button onClick={handleNext} variant="default" className="ml-auto">
              {t('quote.next')}
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !formData.samtykke}
              variant="default"
              className="ml-auto"
            >
              {isLoading ? t('quote.submitting') : t('quote.submit')}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteForm;
