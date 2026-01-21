export interface ServiceFilter {
  value: string;
  label: string;
  description: string;
  nested?: ServiceFilter[];
}

interface ServiceFiltersConfig {
  [key: string]: ServiceFilter[];
}

export const serviceFiltersConfig: ServiceFiltersConfig = {
  mobil: [
    {
      value: 'all',
      label: 'serviceFilters.mobil.all.label',
      description: 'serviceFilters.mobil.all.description'
    },
    {
      value: 'lavpris',
      label: 'serviceFilters.mobil.lavpris.label',
      description: 'serviceFilters.mobil.lavpris.description'
    },
    {
      value: 'familie',
      label: 'serviceFilters.mobil.familie.label',
      description: 'serviceFilters.mobil.familie.description'
    },
    {
      value: 'ubegrenset',
      label: 'serviceFilters.mobil.ubegrenset.label',
      description: 'serviceFilters.mobil.ubegrenset.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.mobil.bedrift.label',
      description: 'serviceFilters.mobil.bedrift.description'
    }
  ],
  strom: [
    {
      value: 'all',
      label: 'serviceFilters.strom.all.label',
      description: 'serviceFilters.strom.all.description'
    },
    {
      value: 'spot',
      label: 'serviceFilters.strom.spot.label',
      description: 'serviceFilters.strom.spot.description'
    },
    {
      value: 'fixed',
      label: 'serviceFilters.strom.fixed.label',
      description: 'serviceFilters.strom.fixed.description',
      nested: [
        {
          value: '6',
          label: 'serviceFilters.strom.fixed.6months.label',
          description: 'serviceFilters.strom.fixed.6months.description'
        },
        {
          value: '12',
          label: 'serviceFilters.strom.fixed.12months.label',
          description: 'serviceFilters.strom.fixed.12months.description'
        },
        {
          value: '18',
          label: 'serviceFilters.strom.fixed.18months.label',
          description: 'serviceFilters.strom.fixed.18months.description'
        },
        {
          value: '24',
          label: 'serviceFilters.strom.fixed.24months.label',
          description: 'serviceFilters.strom.fixed.24months.description'
        },
        {
          value: '36',
          label: 'serviceFilters.strom.fixed.36months.label',
          description: 'serviceFilters.strom.fixed.36months.description'
        },
        {
          value: '60',
          label: 'serviceFilters.strom.fixed.60months.label',
          description: 'serviceFilters.strom.fixed.60months.description'
        },
        {
          value: '120',
          label: 'serviceFilters.strom.fixed.120months.label',
          description: 'serviceFilters.strom.fixed.120months.description'
        }
      ]
    },
    {
      value: 'variable',
      label: 'serviceFilters.strom.variable.label',
      description: 'serviceFilters.strom.variable.description'
    },
    {
      value: 'green',
      label: 'serviceFilters.strom.green.label',
      description: 'serviceFilters.strom.green.description'
    },
    {
      value: 'residential',
      label: 'serviceFilters.strom.residential.label',
      description: 'serviceFilters.strom.residential.description'
    },
    {
      value: 'cabin',
      label: 'serviceFilters.strom.cabin.label',
      description: 'serviceFilters.strom.cabin.description'
    },
    {
      value: 'business',
      label: 'serviceFilters.strom.business.label',
      description: 'serviceFilters.strom.business.description'
    }
  ],
  internett: [
    {
      value: 'all',
      label: 'serviceFilters.internett.all.label',
      description: 'serviceFilters.internett.all.description'
    },
    {
      value: 'fiber',
      label: 'serviceFilters.internett.fiber.label',
      description: 'serviceFilters.internett.fiber.description'
    },
    {
      value: 'adsl',
      label: 'serviceFilters.internett.adsl.label',
      description: 'serviceFilters.internett.adsl.description'
    },
    {
      value: 'mobilt',
      label: 'serviceFilters.internett.mobilt.label',
      description: 'serviceFilters.internett.mobilt.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.internett.bedrift.label',
      description: 'serviceFilters.internett.bedrift.description'
    }
  ],
  forsikring: [
    {
      value: 'all',
      label: 'serviceFilters.forsikring.all.label',
      description: 'serviceFilters.forsikring.all.description'
    },
    {
      value: 'bolig',
      label: 'serviceFilters.forsikring.bolig.label',
      description: 'serviceFilters.forsikring.bolig.description'
    },
    {
      value: 'kjoretoy',
      label: 'serviceFilters.forsikring.kjoretoy.label',
      description: 'serviceFilters.forsikring.kjoretoy.description'
    },
    {
      value: 'person',
      label: 'serviceFilters.forsikring.person.label',
      description: 'serviceFilters.forsikring.person.description'
    },
    {
      value: 'dyr_fritid',
      label: 'serviceFilters.forsikring.dyr_fritid.label',
      description: 'serviceFilters.forsikring.dyr_fritid.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.forsikring.bedrift.label',
      description: 'serviceFilters.forsikring.bedrift.description'
    }
  ],
  lan: [
    {
      value: 'all',
      label: 'serviceFilters.lan.all.label',
      description: 'serviceFilters.lan.all.description'
    },
    {
      value: 'forbrukslan',
      label: 'serviceFilters.lan.forbrukslan.label',
      description: 'serviceFilters.lan.forbrukslan.description'
    },
    {
      value: 'refinansiering',
      label: 'serviceFilters.lan.refinansiering.label',
      description: 'serviceFilters.lan.refinansiering.description'
    },
    {
      value: 'boliglan',
      label: 'serviceFilters.lan.boliglan.label',
      description: 'serviceFilters.lan.boliglan.description'
    },
    {
      value: 'billan',
      label: 'serviceFilters.lan.billan.label',
      description: 'serviceFilters.lan.billan.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.lan.bedrift.label',
      description: 'serviceFilters.lan.bedrift.description'
    }
  ],
  boligalarm: [
    {
      value: 'all',
      label: 'serviceFilters.boligalarm.all.label',
      description: 'serviceFilters.boligalarm.all.description'
    },
    {
      value: 'innbrudd',
      label: 'serviceFilters.boligalarm.innbrudd.label',
      description: 'serviceFilters.boligalarm.innbrudd.description'
    },
    {
      value: 'brann',
      label: 'serviceFilters.boligalarm.brann.label',
      description: 'serviceFilters.boligalarm.brann.description'
    },
    {
      value: 'vann',
      label: 'serviceFilters.boligalarm.vann.label',
      description: 'serviceFilters.boligalarm.vann.description'
    },
    {
      value: 'kamera',
      label: 'serviceFilters.boligalarm.kamera.label',
      description: 'serviceFilters.boligalarm.kamera.description'
    },
    {
      value: 'smarthus',
      label: 'serviceFilters.boligalarm.smarthus.label',
      description: 'serviceFilters.boligalarm.smarthus.description'
    },
    {
      value: 'smartlås',
      label: 'serviceFilters.boligalarm.smartlås.label',
      description: 'serviceFilters.boligalarm.smartlås.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.boligalarm.bedrift.label',
      description: 'serviceFilters.boligalarm.bedrift.description'
    }
  ],
  'tv-pakker': [
    {
      value: 'all',
      label: 'serviceFilters.tv-pakker.all.label',
      description: 'serviceFilters.tv-pakker.all.description'
    },
    {
      value: 'standard',
      label: 'serviceFilters.tv-pakker.standard.label',
      description: 'serviceFilters.tv-pakker.standard.description'
    },
    {
      value: 'streaming',
      label: 'serviceFilters.tv-pakker.streaming.label',
      description: 'serviceFilters.tv-pakker.streaming.description'
    },
    {
      value: 'sport',
      label: 'serviceFilters.tv-pakker.sport.label',
      description: 'serviceFilters.tv-pakker.sport.description'
    },
    {
      value: 'flexible',
      label: 'serviceFilters.tv-pakker.flexible.label',
      description: 'serviceFilters.tv-pakker.flexible.description'
    },
    {
      value: 'cabin',
      label: 'serviceFilters.tv-pakker.cabin.label',
      description: 'serviceFilters.tv-pakker.cabin.description'
    },
    {
      value: 'combo',
      label: 'serviceFilters.tv-pakker.combo.label',
      description: 'serviceFilters.tv-pakker.combo.description'
    },
    {
      value: 'extras',
      label: 'serviceFilters.tv-pakker.extras.label',
      description: 'serviceFilters.tv-pakker.extras.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.tv-pakker.bedrift.label',
      description: 'serviceFilters.tv-pakker.bedrift.description'
    }
  ],
  handverkere: [
    {
      value: 'all',
      label: 'serviceFilters.handverkere.all.label',
      description: 'serviceFilters.handverkere.all.description'
    },
    {
      value: 'renovation',
      label: 'serviceFilters.handverkere.renovation.label',
      description: 'serviceFilters.handverkere.renovation.description'
    },
    {
      value: 'electrical',
      label: 'serviceFilters.handverkere.electrical.label',
      description: 'serviceFilters.handverkere.electrical.description'
    },
    {
      value: 'plumbing',
      label: 'serviceFilters.handverkere.plumbing.label',
      description: 'serviceFilters.handverkere.plumbing.description'
    },
    {
      value: 'painting',
      label: 'serviceFilters.handverkere.painting.label',
      description: 'serviceFilters.handverkere.painting.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.handverkere.bedrift.label',
      description: 'serviceFilters.handverkere.bedrift.description'
    }
  ],
  renhold: [
    {
      value: 'all',
      label: 'serviceFilters.renhold.all.label',
      description: 'serviceFilters.renhold.all.description'
    },
    {
      value: 'bolig',
      label: 'serviceFilters.renhold.bolig.label',
      description: 'serviceFilters.renhold.bolig.description'
    },
    {
      value: 'kontor',
      label: 'serviceFilters.renhold.kontor.label',
      description: 'serviceFilters.renhold.kontor.description'
    },
    {
      value: 'storrengjoring',
      label: 'serviceFilters.renhold.storrengjoring.label',
      description: 'serviceFilters.renhold.storrengjoring.description'
    },
    {
      value: 'fast_renhold',
      label: 'serviceFilters.renhold.fast_renhold.label',
      description: 'serviceFilters.renhold.fast_renhold.description'
    },
    {
      value: 'flytterengjoring',
      label: 'serviceFilters.renhold.flytterengjoring.label',
      description: 'serviceFilters.renhold.flytterengjoring.description'
    },
    {
      value: 'bedrift',
      label: 'serviceFilters.renhold.bedrift.label',
      description: 'serviceFilters.renhold.bedrift.description'
    }
  ]
};

export const getServiceFilters = (serviceSlug: string): ServiceFilter[] => {
  return serviceFiltersConfig[serviceSlug] || [];
};
