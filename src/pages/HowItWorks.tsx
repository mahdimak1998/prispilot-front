
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import { FormIcon, OfferIcon, PiggyBankIcon } from '@/components/CategoryIcons';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const openQuoteForm = () => {
    setIsQuoteFormOpen(true);
  };

  const steps = [
    {
      number: 1,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      icon: <FormIcon className="w-12 h-12" />,
      details: [
        t('howItWorks.step1.detail1'),
        t('howItWorks.step1.detail2'),
        t('howItWorks.step1.detail3')
      ]
    },
    {
      number: 2,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      icon: <OfferIcon className="w-12 h-12" />,
      details: [
        t('howItWorks.step2.detail1'),
        t('howItWorks.step2.detail2'),
        t('howItWorks.step2.detail3')
      ]
    },
    {
      number: 3,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      icon: <PiggyBankIcon className="w-12 h-12" />,
      details: [
        t('howItWorks.step3.detail1'),
        t('howItWorks.step3.detail2'),
        t('howItWorks.step3.detail3')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMeldPaClick={openQuoteForm} />
      
      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col lg:flex-row items-center gap-8">
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm text-primary font-semibold">STEG {step.number}</div>
                        <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-primary mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-8 h-64 flex items-center justify-center border border-border">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground mx-auto mb-4">
                        {React.cloneElement(step.icon, { className: "w-16 h-16" })}
                      </div>
                      <div className="text-4xl font-bold text-primary">{step.number}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-primary-foreground text-center border border-border">
            <h2 className="text-3xl font-bold mb-4">{t('howItWorks.cta.title')}</h2>
            <p className="text-xl mb-6 opacity-90">
              {t('howItWorks.cta.subtitle')}
            </p>
            <button 
              onClick={openQuoteForm}
              className="bg-background text-foreground hover:bg-accent px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-border"
            >
              {t('howItWorks.cta.button')}
            </button>
          </div>
        </div>
      </div>

      <QuoteForm 
        isOpen={isQuoteFormOpen} 
        onClose={() => setIsQuoteFormOpen(false)}
        selectedProvider={null}
      />
    </div>
  );
};

export default HowItWorks;
