import { 
  Shield, 
  Camera, 
  Flame, 
  Smartphone, 
  ShieldCheck, 
  Home, 
  Activity,
  Wifi,
  Bell,
  Lock,
  Zap,
  Eye,
  PhoneCall,
  Droplets
} from 'lucide-react';

export interface EquipmentCategory {
  id: string;
  name: string;
  icon: string;
  items: string[];
  color: string;
  description: string;
}

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    id: 'sensors',
    name: 'Sensorer',
    icon: 'Activity',
    items: ['dor_vindu', 'bevegelse', 'glassbruddsensor', 'magnetkontakt', 'innbrudd'],
    color: 'blue',
    description: 'Dør/vindu sensorer, bevegelsesdetektorer'
  },
  {
    id: 'cameras',
    name: 'Kamera & Overvåkning',
    icon: 'Camera',
    items: ['kamera', 'utendors_kamera', 'innendors_kamera', 'overvakningskamera'],
    color: 'purple',
    description: 'Overvåkningskameraer innendørs og utendørs'
  },
  {
    id: 'fire_safety',
    name: 'Brann & Røyk',
    icon: 'Flame',
    items: ['brann', 'royk_varsler', 'varmevarsler', 'co_varsler'],
    color: 'red',
    description: 'Røykvarslere og brannsikkerhet'
  },
  {
    id: 'water_safety',
    name: 'Vann & Lekkasje',
    icon: 'Droplets',
    items: ['vann', 'vannlekkasje', 'fuktighet'],
    color: 'cyan',
    description: 'Vannlekkasje og fuktighetssensorer'
  },
  {
    id: 'app_control',
    name: 'App & Styring',
    icon: 'Smartphone',
    items: ['app', 'appstyring', 'smarttelefonkontroll', 'push_varsling'],
    color: 'green',
    description: 'App-styring og mobile varsler'
  },
  {
    id: 'guard_services',
    name: 'Vektertjenester',
    icon: 'ShieldCheck',
    items: ['vekter', 'alarmstasjon', 'vekterutrykning', 'nokkeloppbevaring', 'proff'],
    color: 'orange',
    description: 'Profesjonelle vektertjenester'
  },
  {
    id: 'smart_home',
    name: 'Smarthus-integrasjon',
    icon: 'Home',
    items: ['smarthus', 'z_wave', 'homekit', 'google_home', 'alexa', 'smartlås'],
    color: 'indigo',
    description: 'Smarthus og integrasjoner'
  },
  {
    id: 'extras',
    name: 'Ekstrautstyr',
    icon: 'Bell',
    items: ['sirene', 'fjernkontroll', 'skilt', 'strom_backup', 'backup'],
    color: 'gray',
    description: 'Sirener og tilleggsutstyr'
  }
];

export const ALARM_ICONS = {
  Activity,
  Camera,
  Flame,
  Droplets,
  Smartphone,
  ShieldCheck,
  Home,
  Bell,
  Lock,
  Zap,
  Eye,
  PhoneCall
};

export interface CategorizedEquipment {
  categories: EquipmentCategory[];
  uncategorized: string[];
}

/**
 * Categorizes equipment_included array into structured categories
 */
export function categorizeEquipment(equipment: string[] = []): CategorizedEquipment {
  const foundCategories: EquipmentCategory[] = [];
  const uncategorized: string[] = [];

  // Convert equipment to lowercase for better matching
  const normalizedEquipment = equipment.map(item => item.toLowerCase().trim());

  EQUIPMENT_CATEGORIES.forEach(category => {
    const hasItems = category.items.some(item => 
      normalizedEquipment.some(eq => 
        eq.includes(item.toLowerCase()) || item.toLowerCase().includes(eq)
      )
    );

    if (hasItems) {
      foundCategories.push(category);
    }
  });

  // Find uncategorized items
  normalizedEquipment.forEach(item => {
    const isCategorized = EQUIPMENT_CATEGORIES.some(category =>
      category.items.some(catItem => 
        item.includes(catItem.toLowerCase()) || catItem.toLowerCase().includes(item)
      )
    );

    if (!isCategorized) {
      uncategorized.push(item);
    }
  });

  return {
    categories: foundCategories,
    uncategorized
  };
}

/**
 * Gets icon component by name
 */
export function getEquipmentIcon(iconName: string) {
  return ALARM_ICONS[iconName as keyof typeof ALARM_ICONS] || Bell;
}

/**
 * Gets equipment categories for filtering
 */
export function getEquipmentFilterOptions() {
  return [
    { value: 'all', label: 'Alle typer' },
    ...EQUIPMENT_CATEGORIES.map(cat => ({
      value: cat.id,
      label: cat.name
    }))
  ];
}

/**
 * Gets color class for category
 */
export function getCategoryColorClass(color: string, type: 'bg' | 'text' | 'border' = 'bg') {
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200'
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-200'
    },
    cyan: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-700',
      border: 'border-cyan-200'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200'
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-200'
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      border: 'border-indigo-200'
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-200'
    }
  };

  return colorMap[color as keyof typeof colorMap]?.[type] || colorMap.gray[type];
}

/**
 * Price categorization for boligalarm offers
 */
export function getPriceCategory(monthlyPrice: number): string {
  if (monthlyPrice < 200) return 'budget';
  if (monthlyPrice < 400) return 'standard';
  return 'premium';
}

/**
 * Service type detection from plan features
 */
export function getServiceType(offer: any): string {
  const hasGuard = offer.response_service === 'with_guard' || 
                   offer.monitoring_24_7 === true ||
                   (offer.equipment_included && offer.equipment_included.includes('vekter'));
  
  const isAppOnly = offer.response_service === 'without_guard' &&
                    offer.app_control === true &&
                    !hasGuard;

  if (hasGuard) return 'with_monitoring';
  if (isAppOnly) return 'app_only';
  return 'self_monitoring';
}

/**
 * Installation type detection
 */
export function getInstallationType(offer: any): string {
  if (offer.installation_type === 'professional' || offer.installation_included === true) {
    return 'professional';
  }
  return 'diy';
}