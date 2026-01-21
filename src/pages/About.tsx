
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import { CheckCircle, Users, Award, Shield, Target, Heart, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const { t } = useLanguage();

  const openQuoteForm = () => {
    setIsQuoteFormOpen(true);
  };


  const uniqueFeatures = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: t('about.unique.free'),
      description: t('about.unique.freeDescription')
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t('about.unique.transparent'),
      description: t('about.unique.transparentDescription')
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: t('about.unique.personal'),
      description: t('about.unique.personalDescription')
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: t('about.unique.response'),
      description: t('about.unique.responseDescription')
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: t('about.values.honesty'),
      description: t('about.values.honestyDescription')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: t('about.values.efficiency'),
      description: t('about.values.efficiencyDescription')
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: t('about.values.quality'),
      description: t('about.values.qualityDescription')
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: t('about.values.focus'),
      description: t('about.values.focusDescription')
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header onMeldPaClick={openQuoteForm} />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 pt-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
              <div className="mb-8">
                <img 
                  src="https://miro.medium.com/v2/resize:fit:1050/1*9m-WDdL_ji01bGbjEnutEw.gif" 
                  alt="Familie som bruker laptop"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('about.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Section: Vision, Mission, What Makes Us Unique, and Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          {/* Vision and Mission */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                {t('about.vision.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-accent/50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border">
                <div className="mb-4 flex justify-center">
                  <Lightbulb className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{t('about.vision.smart')}</h3>
                <p className="text-muted-foreground text-sm">{t('about.vision.smartDescription')}</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{t('about.vision.free')}</h3>
                <p className="text-muted-foreground text-sm">{t('about.vision.freeDescription')}</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border">
                <div className="mb-4 flex justify-center">
                  <Shield className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{t('about.vision.fast')}</h3>
                <p className="text-muted-foreground text-sm">{t('about.vision.fastDescription')}</p>
              </div>
            </div>
          </div>

          {/* What Makes Us Unique */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                {t('about.unique.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {uniqueFeatures.map((feature, index) => (
                <div key={index} className="bg-accent/50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                {t('about.values.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-accent/50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-border">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team and CTA Section - Side by Side */}
      <section className="relative py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Section */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center">
                <img 
                  src="https://miro.medium.com/v2/resize:fit:1400/0*pnPRuzHGCsD1g-qQ.gif"
                  alt="Team bak PrisPilot"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('about.team.title')}
                </h2>
                <p className="text-lg text-blue-100">
                  {t('about.team.description')}
                </p>
              </div>

              {/* CTA Section */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-in">
                  {t('about.cta.readyToSave')}
                  <div className="h-1 w-32 bg-white mx-auto mt-2 animate-pulse"></div>
                </h2>
                <p className="text-lg mb-6 text-blue-100 animate-fade-in">
                  {t('about.cta.getPersonalized')}
                </p>
                {/* GIF */}
                <div className="mt-6">
                  <img 
                    src="https://cdn.dribbble.com/userupload/23786927/file/original-cab3fffe0a17738e0cbfb9b0ac91b5a1.gif"
                    alt="Money saving animation"
                    className="w-full max-w-sm mx-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                {/* CTA Text under GIF */}
                <div className="mt-6 text-center">
                  <button 
                    onClick={openQuoteForm}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg animate-scale-in mb-4"
                  >
                    {t('about.cta.getQuote')}
                  </button>
                  <p className="text-sm text-blue-100 animate-fade-in">
                    {t('about.cta.benefits')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm 
        isOpen={isQuoteFormOpen} 
        onClose={() => setIsQuoteFormOpen(false)}
        selectedProvider={null}
      />
    </div>
  );
};

export default About;
