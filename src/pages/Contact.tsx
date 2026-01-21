
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import { Mail, Phone, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openQuoteForm = () => {
    setIsQuoteFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted with data:', formData);
    
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: t('contact.toasts.missingInfo'),
          description: t('contact.toasts.fillFields'),
          variant: "destructive"
        });
        return;
      }

    setIsSubmitting(true);

    try {
      // Simulate form submission since leads table doesn't exist
      console.log('Contact form data:', {
        navn: formData.name,
        epost: formData.email,
        telefon: formData.phone || '',
        melding: formData.message,
        type: 'kontakt'
      });

        toast({
          title: t('contact.toasts.thankYou'),
          description: t('contact.toasts.contactSoon'),
        });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
        toast({
          title: t('contact.toasts.error'),
          description: t('contact.toasts.tryAgain'),
          variant: "destructive"
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMeldPaClick={openQuoteForm} />
      
      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-accent rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('contact.info.title')}</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">{t('contact.info.phone')}</div>
                    <div className="text-muted-foreground">+47 123 45 678</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">{t('contact.info.email')}</div>
                    <div className="text-muted-foreground">kontakt@prispilot.no</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">{t('contact.info.address')}</div>
                    <div className="text-muted-foreground">Gullhaug Torg 2, 0484 Oslo</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">{t('contact.info.hours')}</div>
                    <div className="text-muted-foreground">
                      {t('contact.info.hoursValue')}<br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('contact.info.quickHelp')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('contact.info.quickHelpText')}
                </p>
                <Button 
                  onClick={openQuoteForm}
                  className=""
                >
                  {t('contact.info.startComparison')}
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('contact.form.title')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    {t('contact.form.name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    {t('contact.form.email')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    {t('contact.form.phone')}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    {t('contact.form.message')} *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full disabled:opacity-50"
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            </div>
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

export default Contact;
