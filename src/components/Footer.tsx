import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Smartphone, 
  Shield, 
  Wifi, 
  CreditCard, 
  Home, 
  Tv, 
  Wrench, 
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const services = [
    { name: t('footer.services.strom'), href: '/strom', icon: Zap },
    { name: t('footer.services.mobil'), href: '/mobil', icon: Smartphone },
    { name: t('footer.services.forsikring'), href: '/forsikring', icon: Shield },
    { name: t('footer.services.internett'), href: '/internett', icon: Wifi },
    { name: t('footer.services.lan'), href: '/lan', icon: CreditCard },
    { name: t('footer.services.boligalarm'), href: '/boligalarm', icon: Home },
    { name: t('footer.services.tvPakker'), href: '/tv-pakker', icon: Tv },
    { name: t('footer.services.handverkere'), href: '/handverkere', icon: Wrench },
    { name: t('footer.services.renhold'), href: '/renhold', icon: Sparkles }
  ];

  const company = [
    { name: t('footer.company.about'), href: '/about' },
    { name: t('footer.company.howItWorks'), href: '/how-it-works' },
    { name: t('footer.company.blog'), href: '/blog' },
    { name: t('footer.company.career'), href: '/career' }
  ];

  const legal = [
    { name: t('footer.legal.privacy'), href: '/personvern' },
    { name: t('footer.legal.terms'), href: '/vilkår' }
  ];

  const socialMedia = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ];

  return (
    <footer id="footer" className="bg-slate-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Company Info - More Compact */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-3">
              {t('footer.company.title')}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t('footer.company.description')}
            </p>
            
            {/* Contact Info - Compact */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-slate-300 text-sm">
                <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>{t('footer.contact.location')}</span>
              </div>
            </div>

            {/* Support guarantee - Compact */}
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-primary">{t('footer.support.title')}</span><br />
                {t('footer.support.description')}
              </p>
            </div>
          </div>

          {/* Services - Compact Grid */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.services.title')}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {services.slice(0, 6).map((service, index) => (
                <Link 
                  key={index}
                  to={service.href}
                  className="flex items-center text-slate-300 hover:text-primary transition-colors duration-200 group text-sm py-1"
                >
                  <service.icon className="w-3 h-3 mr-2 group-hover:text-primary transition-colors flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {service.name}
                  </span>
                </Link>
              ))}
              {services.length > 6 && (
                <div className="grid grid-cols-1 gap-2">
                  {services.slice(6).map((service, index) => (
                    <Link 
                      key={index + 6}
                      to={service.href}
                      className="flex items-center text-slate-300 hover:text-primary transition-colors duration-200 group text-sm py-1"
                    >
                      <service.icon className="w-3 h-3 mr-2 group-hover:text-primary transition-colors flex-shrink-0" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Company & Social - Combined */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.company.sectionTitle')}
            </h3>
            <ul className="space-y-2 mb-6">
              {company.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href}
                    className="text-slate-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block transform text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media - Compact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {t('footer.company.followUs')}
              </h4>
              <div className="flex space-x-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal & Newsletter - Combined */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.legal.title')}
            </h3>
            <ul className="space-y-2 mb-6">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href}
                    className="text-slate-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block transform text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter signup - Compact */}
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold text-white mb-2">
                {t('footer.newsletter.title')}
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                {t('footer.newsletter.description')}
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded-l-md text-white text-xs focus:outline-none focus:border-primary"
                />
                <button className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-r-md transition-colors text-xs font-medium">
                  {t('footer.newsletter.subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              {t('footer.bottom.rights')}
            </div>
            <div className="text-sm text-slate-400 text-center md:text-right">
              {t('footer.bottom.help')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;