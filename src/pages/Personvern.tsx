
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Personvern: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('privacy.backToHome')}
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Shield className="w-8 h-8" />
              {t('privacy.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="text-sm text-muted-foreground mb-6">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
            </div>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t('privacy.introduction.title')}</h2>
              <p className="text-muted-foreground">
                {t('privacy.introduction.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. {t('privacy.dataCollection.title')}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{t('privacy.dataCollection.userProvided.title')}</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>{t('privacy.dataCollection.userProvided.item1')}</li>
                    <li>{t('privacy.dataCollection.userProvided.item2')}</li>
                    <li>{t('privacy.dataCollection.userProvided.item3')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t('privacy.dataCollection.automatic.title')}</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>{t('privacy.dataCollection.automatic.item1')}</li>
                    <li>{t('privacy.dataCollection.automatic.item2')}</li>
                    <li>{t('privacy.dataCollection.automatic.item3')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. {t('privacy.dataUsage.title')}</h2>
              <p className="text-muted-foreground mb-3">{t('privacy.dataUsage.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.dataUsage.item1')}</li>
                <li>{t('privacy.dataUsage.item2')}</li>
                <li>{t('privacy.dataUsage.item3')}</li>
                <li>{t('privacy.dataUsage.item4')}</li>
                <li>{t('privacy.dataUsage.item5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. {t('privacy.dataSharing.title')}</h2>
              <p className="text-muted-foreground mb-3">
                {t('privacy.dataSharing.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.dataSharing.item1')}</li>
                <li>{t('privacy.dataSharing.item2')}</li>
                <li>{t('privacy.dataSharing.item3')}</li>
                <li>{t('privacy.dataSharing.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. {t('privacy.cookies.title')}</h2>
              <p className="text-muted-foreground mb-3">
                {t('privacy.cookies.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.cookies.item1')}</li>
                <li>{t('privacy.cookies.item2')}</li>
                <li>{t('privacy.cookies.item3')}</li>
                <li>{t('privacy.cookies.item4')}</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                {t('privacy.cookies.control')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. {t('privacy.dataSecurity.title')}</h2>
              <p className="text-muted-foreground">
                {t('privacy.dataSecurity.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. {t('privacy.rights.title')}</h2>
              <p className="text-muted-foreground mb-3">{t('privacy.rights.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.rights.item1')}</li>
                <li>{t('privacy.rights.item2')}</li>
                <li>{t('privacy.rights.item3')}</li>
                <li>{t('privacy.rights.item4')}</li>
                <li>{t('privacy.rights.item5')}</li>
                <li>{t('privacy.rights.item6')}</li>
                <li>{t('privacy.rights.item7')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. {t('privacy.dataRetention.title')}</h2>
              <p className="text-muted-foreground">
                {t('privacy.dataRetention.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. {t('privacy.policyChanges.title')}</h2>
              <p className="text-muted-foreground">
                {t('privacy.policyChanges.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. {t('privacy.contact.title')}</h2>
              <p className="text-muted-foreground mb-3">
                {t('privacy.contact.intro')}
              </p>
              <div className="bg-accent/50 p-4 rounded-lg border border-border">
                <p className="text-foreground"><strong>{t('privacy.contact.email')}:</strong> personvern@prispilot.no</p>
                <p className="text-foreground"><strong>{t('privacy.contact.phone')}:</strong> +47 123 45 678</p>
                <p className="text-foreground"><strong>{t('privacy.contact.address')}:</strong> PrisPilot AS, Postboks 123, 0001 Oslo</p>
              </div>
              <p className="text-muted-foreground mt-3">
                {t('privacy.contact.complaint')}
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Personvern;
