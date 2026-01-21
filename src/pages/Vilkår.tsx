
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Vilkår: React.FC = () => {
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
            {t('terms.backToHome')}
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-3">
              <FileText className="w-8 h-8" />
              {t('terms.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="text-sm text-muted-foreground mb-6">
              {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
            </div>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. {t('terms.acceptance.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.acceptance.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. {t('terms.serviceDescription.title')}</h2>
              <p className="text-muted-foreground mb-3">
                {t('terms.serviceDescription.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('terms.serviceDescription.feature1')}</li>
                <li>{t('terms.serviceDescription.feature2')}</li>
                <li>{t('terms.serviceDescription.feature3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. {t('terms.userResponsibility.title')}</h2>
              <p className="text-muted-foreground mb-3">{t('terms.userResponsibility.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('terms.userResponsibility.item1')}</li>
                <li>{t('terms.userResponsibility.item2')}</li>
                <li>{t('terms.userResponsibility.item3')}</li>
                <li>{t('terms.userResponsibility.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. {t('terms.informationAccuracy.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.informationAccuracy.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. {t('terms.thirdPartyServices.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.thirdPartyServices.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. {t('terms.limitationOfLiability.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.limitationOfLiability.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. {t('terms.changes.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.changes.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. {t('terms.contact.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.contact.intro')}
              </p>
              <div className="mt-2 text-muted-foreground">
                <p>{t('terms.contact.email')}: kontakt@prispilot.no</p>
                <p>{t('terms.contact.phone')}: +47 123 45 678</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. {t('terms.applicableLaw.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.applicableLaw.content')}
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vilkår;
