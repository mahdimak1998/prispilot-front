import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslations = () => {
  const { currentLanguage } = useLanguage();
  const language = currentLanguage.code;

  const getFilterTranslation = (key: string) => {
    const translations = {
      // Filter labels
      'filters.labels.provider': {
        no: 'Leverandør',
        en: 'Provider'
      },
      'filters.labels.speed': {
        no: 'Hastighet',
        en: 'Speed'
      },
      'filters.labels.price': {
        no: 'Pris',
        en: 'Price'
      },
      'filters.labels.operator': {
        no: 'Operatør',
        en: 'Operator'
      },
      'filters.labels.data_category': {
        no: 'Datakategori',
        en: 'Data category'
      },
      'filters.labels.monthly_price': {
        no: 'Månedspris',
        en: 'Monthly price'
      },
      'filters.labels.channels_count': {
        no: 'Antall kanaler',
        en: 'Channels count'
      },
      'filters.labels.insurance_type': {
        no: 'Forsikringstype',
        en: 'Insurance type'
      },
      'filters.labels.monthly_premium': {
        no: 'Månedspremie',
        en: 'Monthly premium'
      },
      'filters.labels.effective_rate': {
        no: 'Effektiv rente',
        en: 'Effective rate'
      },
      'filters.labels.equipment_type': {
        no: 'Utstyrstype',
        en: 'Equipment type'
      },
      'filters.labels.price_range': {
        no: 'Prisspenn',
        en: 'Price range'
      },
      'filters.labels.hourly_rate': {
        no: 'Timepris',
        en: 'Hourly rate'
      },
      'filters.labels.service_type': {
        no: 'Tjenestetype',
        en: 'Service type'
      },
      'filters.labels.certification': {
        no: 'Sertifisering',
        en: 'Certification'
      },
      'filters.labels.cleaning_type': {
        no: 'Rengjøringstype',
        en: 'Cleaning type'
      },
      'filters.labels.equipment_included': {
        no: 'Utstyr inkludert',
        en: 'Equipment included'
      },
      'filters.labels.supplier_name': {
        no: 'Leverandør',
        en: 'Supplier'
      },
      'filters.labels.municipality': {
        no: 'Kommune',
        en: 'Municipality'
      },
      'filters.labels.priceElectricity': {
        no: 'Strømpris',
        en: 'Electricity price'
      },
      'filters.labels.contract_length': {
        no: 'Kontraktslengde',
        en: 'Contract length'
      },
      
      // Filter options
      'filters.options.all': {
        no: 'Alle',
        en: 'All'
      },
      'filters.options.allProviders': {
        no: 'Alle leverandører',
        en: 'All providers'
      },
      'filters.options.allEquipment': {
        no: 'Alt utstyr',
        en: 'All equipment'
      },
      'filters.options.allTypes': {
        no: 'Alle typer',
        en: 'All types'
      },
      'filters.options.allServices': {
        no: 'Alle tjenester',
        en: 'All services'
      },
      'filters.options.allPrices': {
        no: 'Alle priser',
        en: 'All prices'
      },
      'filters.options.under200': {
        no: 'Under 200 kr',
        en: 'Under 200 NOK'
      },
      'filters.options.200to400': {
        no: '200-400 kr',
        en: '200-400 NOK'
      },
      'filters.options.over400': {
        no: 'Over 400 kr',
        en: 'Over 400 NOK'
      },
      'filters.options.selectProvider': {
        no: 'Velg leverandør',
        en: 'Select provider'
      },
      'filters.options.search': {
        no: 'Søk',
        en: 'Search'
      },
      'filters.options.searchHint': {
        no: 'Søk etter din kommune for å få nøyaktige priser',
        en: 'Search for your municipality to get accurate prices'
      },
      'filters.options.dataSmall': {
        no: 'Lite data (0-2 GB)',
        en: 'Small data (0-2 GB)'
      },
      'filters.options.dataMedium': {
        no: 'Medium data (3-10 GB)',
        en: 'Medium data (3-10 GB)'
      },
      'filters.options.dataLarge': {
        no: 'Mye data (11-50 GB)',
        en: 'Large data (11-50 GB)'
      },
      'filters.options.dataUnlimited': {
        no: 'Ubegrenset data',
        en: 'Unlimited data'
      },
      'filters.options.spot': {
        no: 'Spotpris',
        en: 'Spot price'
      },
      'filters.options.months12': {
        no: '12 måneder',
        en: '12 months'
      },
      'filters.options.months24': {
        no: '24 måneder',
        en: '24 months'
      },
      'filters.options.months36': {
        no: '36 måneder',
        en: '36 months'
      },
      'filters.options.certified': {
        no: 'Sertifisert',
        en: 'Certified'
      },
      'filters.options.notCertified': {
        no: 'Ikke sertifisert',
        en: 'Not certified'
      },
      'filters.options.serviceRenovation': {
        no: 'Renovering',
        en: 'Renovation'
      },
      'filters.options.serviceRepair': {
        no: 'Reparasjon',
        en: 'Repair'
      },
      'filters.options.serviceElectrical': {
        no: 'Elektriker',
        en: 'Electrical'
      },
      'filters.options.servicePlumbing': {
        no: 'Rørlegger',
        en: 'Plumbing'
      },
      'filters.options.servicePainting': {
        no: 'Maling',
        en: 'Painting'
      },
      'filters.options.cleaningHome': {
        no: 'Hjemmerengjøring',
        en: 'Home cleaning'
      },
      'filters.options.cleaningOffice': {
        no: 'Kontorrengjøring',
        en: 'Office cleaning'
      },
      'filters.options.cleaningDeep': {
        no: 'Dyprengjøring',
        en: 'Deep cleaning'
      },
      'filters.options.cleaningRegular': {
        no: 'Vanlig rengjøring',
        en: 'Regular cleaning'
      },
      
      // Business form fields
      'quote.fields.orgNumber': {
        no: 'Organisasjonsnummer',
        en: 'Organization number'
      },
      'quote.fields.industry': {
        no: 'Bransje',
        en: 'Industry'
      },
      'quote.fields.employees': {
        no: 'Antall ansatte',
        en: 'Number of employees'
      },
      
      // Cleaning specific translations
      'cleaning.equipmentIncluded': {
        no: 'Utstyr inkludert her',
        en: 'Equipment included here'
      },
      
      // Sorting options
      'filters.sort': {
        no: 'Sorter etter',
        en: 'Sort by'
      },
      'sorting.bestMatch': {
        no: 'Beste match',
        en: 'Best match'
      },
      'sorting.priceLowToHigh': {
        no: 'Pris lav til høy',
        en: 'Price low to high'
      },
      'sorting.priceHighToLow': {
        no: 'Pris høy til lav',
        en: 'Price high to low'
      },
      'sorting.dataHighToLow': {
        no: 'Data høy til lav',
        en: 'Data high to low'
      },
      'sorting.speedHighToLow': {
        no: 'Hastighet høy til lav',
        en: 'Speed high to low'
      },
      'sorting.rateLowToHigh': {
        no: 'Rente lav til høy',
        en: 'Rate low to high'
      },
      'sorting.rateHighToLow': {
        no: 'Rente høy til lav',
        en: 'Rate high to low'
      },
      
      // Navigation and general
      'nav.services': {
        no: 'Tjenester',
        en: 'Services'
      },
      'offer.loadingOffers': {
        no: 'Laster tilbud...',
        en: 'Loading offers...'
      },
      'offer.noOffersFound': {
        no: 'Ingen tilbud funnet',
        en: 'No offers found'
      },
      
      // Equipment type translations - using consistent database values
      'equipment.innbrudd': {
        no: 'Innbrudd',
        en: 'Break-in'
      },
      'equipment.brann': {
        no: 'Brann',
        en: 'Fire'
      },
      'equipment.vann': {
        no: 'Vannlekkasje',
        en: 'Water leakage'
      },
      'equipment.kamera': {
        no: 'Kamera',
        en: 'Camera'
      },
      'equipment.app': {
        no: 'App-styring',
        en: 'App control'
      },
      'equipment.diy': {
        no: 'Gjør-det-selv',
        en: 'DIY'
      },
      'equipment.proff': {
        no: 'Profesjonell',
        en: 'Professional'
      },
      'equipment.vekter': {
        no: 'Vektertjeneste',
        en: 'Guard service'
      },
      'equipment.smarthus': {
        no: 'Smarthus',
        en: 'Smart home'
      },
      'equipment.smartlås': {
        no: 'Smartlås',
        en: 'Smart lock'
      },
      
      // Alarm category translations that match the icon categories
      'alarm.all': {
        no: 'Alle alarmer',
        en: 'All alarms'
      },
      'alarm.allDescription': {
        no: 'Se alle tilgjengelige boligalarmer',
        en: 'View all available home alarms'
      },
      'alarm.intrusion': {
        no: 'Innbrudd',
        en: 'Break-in'
      },
      'alarm.intrusionDescription': {
        no: 'Beskyttelse mot innbrudd',
        en: 'Protection against break-ins'
      },
      'alarm.fire': {
        no: 'Brann',
        en: 'Fire'
      },
      'alarm.fireDescription': {
        no: 'Branndeteksjon og alarm',
        en: 'Fire detection and alarm'
      },
      'alarm.water': {
        no: 'Vannlekkasje',
        en: 'Water leakage'
      },
      'alarm.waterDescription': {
        no: 'Deteksjon av vannlekkasjer',
        en: 'Water leak detection'
      },
      'alarm.camera': {
        no: 'Kamera',
        en: 'Camera'
      },
      'alarm.cameraDescription': {
        no: 'Videoovervåking',
        en: 'Video surveillance'
      },
      'alarm.smart': {
        no: 'Smarthus',
        en: 'Smart home'
      },
      'alarm.smartDescription': {
        no: 'Smart hjem-integrasjon',
        en: 'Smart home integration'
      },
      'alarm.smartlock': {
        no: 'Smartlås',
        en: 'Smart lock'
      },
      'alarm.smartlockDescription': {
        no: 'Digitale dørlåser',
        en: 'Digital door locks'
      },
      'alarm.selectCategory': {
        no: 'Velg alarmtype',
        en: 'Select alarm type'
      },
      
      // New business category translations
      'loan.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'loan.businessDescription': {
        no: 'Bedriftslån og finansiering',
        en: 'Business loans and financing'
      },
      'insurance.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'insurance.businessDescription': {
        no: 'Bedriftsforsikring',
        en: 'Business insurance'
      },
      'tv.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'tv.businessDescription': {
        no: 'TV-pakker for bedrifter',
        en: 'TV packages for businesses'
      },
      'alarm.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'alarm.businessDescription': {
        no: 'Bedriftssikkerhet',
        en: 'Business security'
      },
      'handworkmen.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'handworkmen.businessDescription': {
        no: 'Bedriftshåndverkere',
        en: 'Business handymen'
      },
      'cleaning.business': {
        no: 'Bedrift',
        en: 'Business'
      },
      'cleaning.businessDescription': {
        no: 'Bedriftsrengjøring',
        en: 'Business cleaning'
      },
      
      // Card data translations
      'card.getOffer': {
        no: 'Få tilbud',
        en: 'Get offer'
      },
      'common.getOffer': {
        no: 'Få tilbud',
        en: 'Get offer'
      },
      'common.visit': {
        no: 'Besøk',
        en: 'Visit'
      },
      'card.productName': {
        no: 'Produktnavn',
        en: 'Product name'
      },
      'card.productSubtitle': {
        no: 'Produktbeskrivelse',
        en: 'Product subtitle'
      },
      'card.effectiveRate': {
        no: 'Effektiv rente',
        en: 'Effective rate'
      },
      'card.monthly': {
        no: 'Månedlig',
        en: 'Monthly'
      },
      'card.type': {
        no: 'Type',
        en: 'Type'
      },
      'card.unlimited': {
        no: 'Ubegrenset',
        en: 'Unlimited'
      },
      'card.calls': {
        no: 'Samtaler',
        en: 'Calls'
      },
      'card.data': {
        no: 'Data',
        en: 'Data'
      },
      'card.sms': {
        no: 'SMS',
        en: 'SMS'
      },
      'card.channels': {
        no: 'kanaler',
        en: 'channels'
      },
      'card.from': {
        no: 'Fra',
        en: 'From'
      },
      'card.perMonth': {
        no: 'pr. mnd',
        en: '/month'
      },
      'card.perHour': {
        no: 'pr. time',
        en: '/hour'
      },
      'card.category': {
        no: 'Kategori',
        en: 'Category'
      },
      
      // Power specific translations
      'power.additionalFees': {
        no: 'Påslag',
        en: 'Additional fees'
      },
      'power.estimated': {
        no: 'Estimert',
        en: 'Estimated'
      },
      
      // Insurance specific translations  
      'insurance.coverage': {
        no: 'Dekning',
        en: 'Coverage'
      },
      
      // Insurance types
      'insurance.reiseforsikring': {
        no: 'Reiseforsikring',
        en: 'Travel insurance'
      },
      'insurance.bilforsikring': {
        no: 'Bilforsikring',
        en: 'Car insurance'
      },
      'insurance.husforsikring': {
        no: 'Husforsikring',
        en: 'Home insurance'
      },
      'insurance.innboforsikring': {
        no: 'Innboforsikring',
        en: 'Contents insurance'
      },
      'insurance.familie': {
        no: 'familie',
        en: 'family'
      },
      'insurance.enkelt': {
        no: 'enkelt',
        en: 'single'
      },
      
      // Loan types
      'loan.refinansiering': {
        no: 'Refinansiering',
        en: 'Refinancing'
      },
      'loan.forbrukslån': {
        no: 'Forbrukslån',
        en: 'Consumer loan'
      },
      'loan.kredittkort': {
        no: 'Kredittkort',
        en: 'Credit card'
      },
      
      // No offers state
      'offers.noOffers.title': {
        no: 'Ingen tilbud tilgjengelig',
        en: 'No offers available'
      },
      'offers.noOffers.description': {
        no: 'Vi har ikke tilbud for denne tjenesten ennå, men du kan melde deg på for å få tilbud.',
        en: 'We don\'t have offers for this service yet, but you can sign up to get offers.'
      },
      'offers.noOffers.button': {
        no: 'Meld deg på for tilbud',
        en: 'Sign up for offers'
      }
    };

    return translations[key as keyof typeof translations]?.[language] || key;
  };

  return { getFilterTranslation };
};
