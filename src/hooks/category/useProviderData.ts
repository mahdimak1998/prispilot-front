import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProviderData = () => {
  const [providers, setProviders] = useState<any[]>([]);

  // Memoized stable callback
  const fetchProviders = useCallback(async (category: string) => {
    try {
      let uniqueProviders: any[] = [];
      
      switch (category) {
        case 'mobil':
          const { data: mobileData } = await supabase
            .from('mobile_plans')
            .select('operator, logo_url')
            .not('operator', 'is', null);
          
          if (mobileData) {
            const providerMap = new Map();
            mobileData.forEach(item => {
              if (!providerMap.has(item.operator)) {
                providerMap.set(item.operator, {
                  id: `mobile-${item.operator}`,
                  navn: item.operator,
                  logo_url: item.logo_url,
                  kategori: 'mobil'
                });
              }
            });
            uniqueProviders = Array.from(providerMap.values());
          }
          break;

        case 'internett':
          const { data: internetData } = await supabase
            .from('internet_plans')
            .select('provider, logo_url')
            .not('provider', 'is', null);
          
          if (internetData) {
            const providerMap = new Map();
            internetData.forEach(item => {
              if (!providerMap.has(item.provider)) {
                providerMap.set(item.provider, {
                  id: `internet-${item.provider}`,
                  navn: item.provider,
                  logo_url: item.logo_url,
                  kategori: 'internett'
                });
              }
            });
            uniqueProviders = Array.from(providerMap.values());
          }
          break;

        case 'forsikring':
          uniqueProviders = await fetchInsuranceProviders();
          break;

        case 'tv-pakker':
          uniqueProviders = await fetchTVProviders();
          break;

        case 'strom':
          uniqueProviders = await fetchPowerProviders();
          break;

        case 'lan':
          uniqueProviders = await fetchBankProviders();
          break;

        case 'boligalarm':
          uniqueProviders = await fetchSecurityProviders();
          break;

        case 'handverkere':
          uniqueProviders = await fetchHandymenProviders();
          break;

        case 'renhold':
          uniqueProviders = await fetchCleaningProviders();
          break;

        default:
          uniqueProviders = [];
      }
      
      setProviders(uniqueProviders);
      return uniqueProviders;
    } catch (error: any) {
      console.error('Error fetching providers:', error);
      return [];
    }
  }, []); // Empty dependency array since this function doesn't depend on any external values

  const fetchInsuranceProviders = async () => {
    const { data } = await supabase
      .from('insurance_plans')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `forsikring-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'forsikring'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchTVProviders = async () => {
    const { data } = await supabase
      .from('tv_packages')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `tv-pakker-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'tv-pakker'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchPowerProviders = async () => {
    const { data } = await supabase
      .from('power_deals')
      .select('supplier_name, logo_url')
      .not('supplier_name', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.supplier_name)) {
          providerMap.set(item.supplier_name, {
            id: `strom-${item.supplier_name}`,
            navn: item.supplier_name,
            logo_url: item.logo_url,
            kategori: 'strom'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchBankProviders = async () => {
    const { data } = await supabase
      .from('bank_plans')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `lan-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'lan'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchSecurityProviders = async () => {
    const { data } = await supabase
      .from('home_security_plans')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `boligalarm-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'boligalarm'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchHandymenProviders = async () => {
    const { data } = await supabase
      .from('handymen_services')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `handverkere-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'handverkere'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  const fetchCleaningProviders = async () => {
    const { data } = await supabase
      .from('cleaning_services')
      .select('provider, logo_url')
      .not('provider', 'is', null);
    
    if (data) {
      const providerMap = new Map();
      data.forEach((item: any) => {
        if (!providerMap.has(item.provider)) {
          providerMap.set(item.provider, {
            id: `renhold-${item.provider}`,
            navn: item.provider,
            logo_url: item.logo_url,
            kategori: 'renhold'
          });
        }
      });
      return Array.from(providerMap.values());
    }
    return [];
  };

  return { providers, fetchProviders };
};
