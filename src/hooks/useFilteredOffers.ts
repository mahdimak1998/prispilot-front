import { useMemo } from 'react';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useFilteredOffers = (offers: any[], filters: { [key: string]: any }, sortBy: string, category: string, selectedCategory?: string | null) => {
  return useMemo(() => {
    let filtered = [...offers];

    // Skip filtering for boligalarm as it uses specialized useBoligalarmFilters hook
    if (category === 'boligalarm') {
      // Just apply sorting for boligalarm, filtering is handled elsewhere
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            const priceA = a.monthly_rate || a.price || a.monthly_price || a.monthly_premium || a.price_nok || 0;
            const priceB = b.monthly_rate || b.price || b.monthly_price || b.monthly_premium || b.price_nok || 0;
            return priceA - priceB;

          case 'price_desc':
            const priceDescA = a.monthly_rate || a.price || a.monthly_price || a.monthly_premium || a.price_nok || 0;
            const priceDescB = b.monthly_rate || b.price || b.monthly_price || b.monthly_premium || b.price_nok || 0;
            return priceDescB - priceDescA;

          case 'bestMatch':
          case 'random':
          default:
            return 0;
        }
      });

      if (sortBy === 'random' || sortBy === 'bestMatch') {
        filtered = shuffleArray(filtered);
      }

      return filtered;
    }

    // Apply category filtering first (for other categories except boligalarm)
    if (selectedCategory && category === 'forsikring') {
      filtered = filtered.filter(offer => {
        const insuranceType = typeof offer.insurance_type === 'string' ? offer.insurance_type.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'bolig':
            return insuranceType.includes('innbo') || 
                   insuranceType.includes('hus') || 
                   insuranceType.includes('villa') || 
                   insuranceType.includes('fritidsbolig') || 
                   insuranceType.includes('boligkjøper') || 
                   insuranceType.includes('utleie') ||
                   productName.includes('innbo') || 
                   productName.includes('hus') || 
                   productName.includes('villa') || 
                   productName.includes('fritidsbolig') || 
                   productName.includes('boligkjøper') || 
                   productName.includes('utleie');
          
          case 'kjoretoy':
            return insuranceType.includes('bil') || 
                   insuranceType.includes('mc') || 
                   insuranceType.includes('motorsykkel') || 
                   insuranceType.includes('båt') || 
                   insuranceType.includes('bobil') || 
                   insuranceType.includes('camping') || 
                   insuranceType.includes('elsykkel') || 
                   insuranceType.includes('scooter') ||
                   productName.includes('bil') || 
                   productName.includes('mc') || 
                   productName.includes('motorsykkel') || 
                   productName.includes('båt') || 
                   productName.includes('bobil') || 
                   productName.includes('camping') || 
                   productName.includes('elsykkel') || 
                   productName.includes('scooter');
          
          case 'person':
            return insuranceType.includes('reise') || 
                   insuranceType.includes('liv') || 
                   insuranceType.includes('ufør') || 
                   insuranceType.includes('barn') || 
                   insuranceType.includes('helse') || 
                   insuranceType.includes('kritisk') || 
                   insuranceType.includes('sykdom') || 
                   insuranceType.includes('ulykke') ||
                   productName.includes('reise') || 
                   productName.includes('liv') || 
                   productName.includes('ufør') || 
                   productName.includes('barn') || 
                   productName.includes('helse') || 
                   productName.includes('kritisk') || 
                   productName.includes('sykdom') || 
                   productName.includes('ulykke');
          
          case 'dyr_fritid':
            return insuranceType.includes('dyr') || 
                   insuranceType.includes('hund') || 
                   insuranceType.includes('katt') || 
                   insuranceType.includes('hest') || 
                   insuranceType.includes('verdi') || 
                   insuranceType.includes('gjenstand') || 
                   insuranceType.includes('utstyr') || 
                   insuranceType.includes('avbestilling') ||
                   productName.includes('dyr') || 
                   productName.includes('hund') || 
                   productName.includes('katt') || 
                   productName.includes('hest') || 
                   productName.includes('verdi') || 
                   productName.includes('gjenstand') || 
                   productName.includes('utstyr') || 
                   productName.includes('avbestilling');
          
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'tv-pakker') {
      filtered = filtered.filter(offer => {
        const packageName = typeof offer.package_name === 'string' ? offer.package_name.toLowerCase() : '';
        const provider = typeof offer.provider === 'string' ? offer.provider.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'standard':
            return packageName.includes('standard') || 
                   packageName.includes('basis') || 
                   packageName.includes('familie') ||
                   packageName.includes('rikspakken') ||
                   provider.includes('rikstv') ||
                   (provider.includes('altibox') && packageName.includes('standard')) ||
                   (provider.includes('telenor') && packageName.includes('standard')) ||
                   (provider.includes('telia') && (packageName.includes('basis') || packageName.includes('familie')));
          
          case 'streaming':
            return packageName.includes('stream') || 
                   packageName.includes('strømme') ||
                   (packageName.includes('play') && !packageName.includes('sport'));
          
          case 'sport':
            return packageName.includes('sport') || 
                   packageName.includes('sportspakken');
          
          case 'flexible':
            return packageName.includes('fleks') || 
                   packageName.includes('velg') || 
                   packageName.includes('poeng') ||
                   packageName.includes('selv');
          
          case 'cabin':
            return packageName.includes('hytte') || 
                   packageName.includes('sesong');
          
          case 'combo':
            return packageName.includes('fiber') || 
                   packageName.includes('bredbånd') ||
                   packageName.includes('internett');
          
          case 'extras':
            return packageName.includes('hbo') || 
                   packageName.includes('netflix') || 
                   packageName.includes('disney') ||
                   packageName.includes('viaplay') ||
                   packageName.includes('tillegg') ||
                   packageName.includes('ekstra');
          
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'mobil') {
      filtered = filtered.filter(offer => {
        const price = offer.monthly_rate || offer.price_nok || 0;
        const dataGb = offer.data_gb !== undefined ? offer.data_gb : 
                      offer.data_included_mb !== undefined ? offer.data_included_mb / 1000 : 0;
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'lavpris':
            return price < 300;
          case 'familie':
            return dataGb >= 5 && dataGb <= 20;
          case 'ubegrenset':
            return dataGb === 0 || dataGb === -1 || dataGb > 50 || 
                   productName.includes('ubegrenset') || productName.includes('unlimited');
          case 'bedrift':
            return productName.includes('bedrift') || productName.includes('business');
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'internett') {
      filtered = filtered.filter(offer => {
        const connectionType = offer.connection_type?.toLowerCase() || '';
        const speed = offer.speed || 0;
        const planName = typeof offer.plan === 'string' ? offer.plan.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        const provider = typeof offer.provider === 'string' ? offer.provider.toLowerCase() : '';
        
        console.log('Internet filtering - Category:', selectedCategory, 'Connection Type:', connectionType, 'Plan:', planName);
        
        // Primary filtering by connection_type
        switch (selectedCategory) {
          case 'fiber':
            return connectionType === 'fiber' || 
                   connectionType === 'fiberoptisk' ||
                   planName.includes('fiber') || 
                   productName.includes('fiber') ||
                   (speed >= 100 && !planName.includes('mobil') && !planName.includes('4g') && !planName.includes('5g'));
          case 'adsl':
            return connectionType === 'adsl' || 
                   connectionType === 'kobbertråd' ||
                   planName.includes('adsl') || 
                   planName.includes('kobbertråd') || 
                   productName.includes('adsl') || 
                   productName.includes('kobbertråd') ||
                   (speed < 100 && speed > 0 && !planName.includes('fiber') && !planName.includes('mobil'));
          case 'mobilt':
            return connectionType === 'mobilt' || 
                   connectionType === 'mobile' ||
                   connectionType === '4g' ||
                   connectionType === '5g' ||
                   planName.includes('mobilt') || 
                   planName.includes('4g') || 
                   planName.includes('5g') ||
                   planName.includes('mobil bredbånd') ||
                   productName.includes('mobilt') || 
                   productName.includes('4g') || 
                   productName.includes('5g');
          case 'bedrift':
            return connectionType === 'bedrift' || 
                   connectionType === 'business' ||
                   planName.includes('bedrift') || 
                   planName.includes('business') ||
                   productName.includes('bedrift') || 
                   productName.includes('business');
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'strom') {
      filtered = filtered.filter(offer => {
        const contractLength = typeof offer.contract_length === 'string' ? offer.contract_length.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        const supplierName = typeof offer.supplier_name === 'string' ? offer.supplier_name.toLowerCase() : '';
        const priceType = typeof offer.price_type === 'string' ? offer.price_type.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'spot':
            return contractLength.includes('spot') || productName.includes('spot') || priceType.includes('spot');
          case 'fast':
            return (contractLength !== 'spot' && !contractLength.includes('spot') && 
                   !productName.includes('spot') && !priceType.includes('spot') &&
                   (contractLength.includes('fast') || contractLength.includes('fixed') ||
                    productName.includes('fast') || productName.includes('fixed') ||
                    priceType.includes('fast') || priceType.includes('fixed'))) ||
                   (contractLength !== 'spot' && contractLength !== 'variabel' && 
                    !contractLength.includes('spot') && !contractLength.includes('variabel'));
          case 'variabel':
            return contractLength.includes('variabel') || productName.includes('variabel') ||
                   contractLength.includes('variable') || productName.includes('variable') ||
                   priceType.includes('variabel') || priceType.includes('variable');
          case 'gronn':
            return productName.includes('grønn') || productName.includes('fornybar') ||
                   productName.includes('miljø') || productName.includes('eco') ||
                   productName.includes('green') || supplierName.includes('grønn') ||
                   supplierName.includes('eco') || supplierName.includes('green');
          case 'bolig':
            return productName.includes('bolig') || productName.includes('hjem') ||
                   productName.includes('home') || productName.includes('privat') ||
                   (!productName.includes('hytte') && !productName.includes('fritid') && 
                    !productName.includes('cabin') && !productName.includes('bedrift'));
          case 'hytte':
            return productName.includes('hytte') || productName.includes('fritid') ||
                   productName.includes('ferie') || productName.includes('cabin') ||
                   productName.includes('second');
          case 'bedrift':
            return productName.includes('bedrift') || productName.includes('business') ||
                   productName.includes('commercial') || supplierName.includes('bedrift');
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'lan') {
      filtered = filtered.filter(offer => {
        const loanType = typeof offer.loan_type === 'string' ? offer.loan_type.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'forbrukslan':
            return loanType.includes('forbruk') || productName.includes('forbruk');
          case 'refinansiering':
            return loanType.includes('refinansier') || productName.includes('refinansier');
          case 'boliglan':
            return loanType.includes('bolig') || productName.includes('bolig');
          case 'billan':
            return loanType.includes('bil') || productName.includes('bil');
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'renhold') {
      filtered = filtered.filter(offer => {
        const serviceType = typeof offer.service_type === 'string' ? offer.service_type.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'bolig':
            return serviceType.includes('home') || serviceType.includes('hjemme') ||
                   serviceType.includes('residential') || serviceType.includes('bolig') ||
                   productName.includes('hjemme') || productName.includes('bolig') ||
                   productName.includes('hjem');
          case 'kontor':
            return serviceType.includes('office') || serviceType.includes('kontor') ||
                   serviceType.includes('commercial') || serviceType.includes('business') ||
                   productName.includes('kontor') || productName.includes('bedrift');
          case 'storrengjoring':
            return serviceType.includes('deep') || serviceType.includes('hovedrens') ||
                   serviceType.includes('thorough') || serviceType.includes('intensive') ||
                   productName.includes('hovedrens') || productName.includes('grundig') ||
                   productName.includes('storrengjøring');
          case 'fast_renhold':
            return serviceType.includes('regular') || serviceType.includes('fast') ||
                   serviceType.includes('recurring') || serviceType.includes('weekly') ||
                   productName.includes('fast') || productName.includes('regelmessig') ||
                   productName.includes('abonnement');
          case 'flytterengjoring':
            return serviceType.includes('moving') || serviceType.includes('flytte') ||
                   serviceType.includes('end-of-tenancy') || serviceType.includes('relocation') ||
                   productName.includes('flytte') || productName.includes('utflytting');
          default:
            return true;
        }
      });
    } else if (selectedCategory && category === 'handverkere') {
      filtered = filtered.filter(offer => {
        const serviceType = typeof offer.service_type === 'string' ? offer.service_type.toLowerCase() : '';
        const productName = typeof offer.product_name === 'string' ? offer.product_name.toLowerCase() : '';
        
        switch (selectedCategory) {
          case 'renovation':
            return serviceType.includes('renovation') || serviceType.includes('renovering') ||
                   serviceType.includes('remodeling') || serviceType.includes('construction') ||
                   productName.includes('renovering') || productName.includes('oppussing');
          case 'electrical':
            return serviceType.includes('electrical') || serviceType.includes('elektriker') ||
                   serviceType.includes('electrician') || serviceType.includes('wiring') ||
                   productName.includes('elektriker') || productName.includes('elektrisk');
          case 'plumbing':
            return serviceType.includes('plumbing') || serviceType.includes('rørlegger') ||
                   serviceType.includes('plumber') || serviceType.includes('vvs') ||
                   productName.includes('rørlegger') || productName.includes('vvs');
          case 'painting':
            return serviceType.includes('painting') || serviceType.includes('maler') ||
                   serviceType.includes('painter') || serviceType.includes('decorating') ||
                   productName.includes('maler') || productName.includes('maling');
          default:
            return true;
        }
      });
    }

    // Apply filters based on category and actual filter values (skip for boligalarm)
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value === 'all' || (Array.isArray(value) && value.length === 0)) return;

      switch (key) {
        case 'operator':
        case 'supplier_name':
        case 'provider':
          if (value !== 'all') {
            filtered = filtered.filter(offer => 
              offer[key] === value || 
              offer.operator === value || 
              offer.supplier_name === value || 
              offer.provider === value
            );
          }
          break;

        case 'municipality':
          if (value && value.trim()) {
            filtered = filtered.filter(offer => 
              offer.municipality_name && typeof offer.municipality_name === 'string' &&
              offer.municipality_name.toLowerCase().includes(value.toLowerCase())
            );
          }
          break;

        case 'price':
          if (Array.isArray(value) && value.length === 2) {
            filtered = filtered.filter(offer => {
              const price = offer.monthly_rate || offer.price || offer.monthly_price || offer.monthly_premium || offer.price_nok || 0;
              return price >= value[0] && price <= value[1];
            });
          }
          break;

        case 'speed':
          if (Array.isArray(value) && value.length === 2) {
            filtered = filtered.filter(offer => {
              const speed = offer.speed || 0;
              return speed >= value[0] && speed <= value[1];
            });
          }
          break;

        case 'effective_rate':
          if (Array.isArray(value) && value.length === 2) {
            filtered = filtered.filter(offer => {
              const rateString = typeof offer.effective_rate === 'string' ? offer.effective_rate.replace('%', '') : '0';
              const rate = parseFloat(rateString || '0');
              return rate >= value[0] && rate <= value[1];
            });
          }
          break;

        case 'data_category':
          if (value !== 'all') {
            filtered = filtered.filter(offer => {
              const dataGb = offer.data_gb !== undefined ? offer.data_gb : 
                           offer.data_included_mb !== undefined ? offer.data_included_mb / 1000 : 0;
              
              switch (value) {
                case 'small': return dataGb > 0 && dataGb < 5;
                case 'medium': return dataGb >= 5 && dataGb <= 20;
                case 'large': return dataGb > 20;
                case 'unlimited': return dataGb === 0 || dataGb === -1;
                default: return true;
              }
            });
          }
          break;

        case 'alarm_types':
        case 'service_type':
        case 'price_type':
        case 'energy_type':
        case 'usage_type':
        case 'insurance_type':
        case 'loan_type':
        case 'plan_type':
        case 'contract_length':
          if (value !== 'all') {
            filtered = filtered.filter(offer => {
              const offerValue = typeof offer[key] === 'string' ? offer[key].toLowerCase() : '';
              const filterValue = typeof value === 'string' ? value.toLowerCase() : value;
              
              // Handle special mappings for energy and usage types
              if (key === 'energy_type' && filterValue === 'green') {
                return offerValue.includes('green') || offerValue.includes('grønn') || 
                       offerValue.includes('renewable') || offerValue.includes('fornybar');
              }
              
              if (key === 'usage_type') {
                if (filterValue === 'residential') {
                  return offerValue.includes('residential') || offerValue.includes('home') || 
                         offerValue.includes('bolig') || offerValue.includes('privat');
                }
                if (filterValue === 'cabin') {
                  return offerValue.includes('cabin') || offerValue.includes('hytte') || 
                         offerValue.includes('fritid') || offerValue.includes('second');
                }
              }
              
              // Handle service type mappings for renhold
              if (key === 'service_type' && category === 'renhold') {
                if (filterValue === 'home') {
                  return offerValue.includes('home') || offerValue.includes('residential') || 
                         offerValue.includes('hjemme') || offerValue.includes('bolig');
                }
                if (filterValue === 'office') {
                  return offerValue.includes('office') || offerValue.includes('commercial') || 
                         offerValue.includes('kontor') || offerValue.includes('business');
                }
                if (filterValue === 'deep') {
                  return offerValue.includes('deep') || offerValue.includes('thorough') || 
                         offerValue.includes('hovedrens') || offerValue.includes('intensive');
                }
                if (filterValue === 'regular') {
                  return offerValue.includes('regular') || offerValue.includes('recurring') || 
                         offerValue.includes('fast') || offerValue.includes('weekly');
                }
                if (filterValue === 'moving') {
                  return offerValue.includes('moving') || offerValue.includes('relocation') || 
                         offerValue.includes('flytte') || offerValue.includes('end-of-tenancy');
                }
              }
              
              return offerValue === filterValue || offerValue.includes(filterValue);
            });
          }
          break;
      }
    });

    // Apply sorting (keep existing sorting logic)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          const priceA = a.monthly_rate || a.price || a.monthly_price || a.monthly_premium || a.price_nok || 0;
          const priceB = b.monthly_rate || b.price || b.monthly_price || b.monthly_premium || b.price_nok || 0;
          return priceA - priceB;

        case 'price_desc':
          const priceDescA = a.monthly_rate || a.price || a.monthly_price || a.monthly_premium || a.price_nok || 0;
          const priceDescB = b.monthly_rate || b.price || b.monthly_price || b.monthly_premium || b.price_nok || 0;
          return priceDescB - priceDescA;

        case 'data_desc':
          const getDataValue = (offer: any) => {
            const dataGb = offer.data_gb !== undefined ? offer.data_gb : 
                         offer.data_included_mb !== undefined ? offer.data_included_mb / 1000 : 0;
            return (dataGb === 0 || dataGb === -1) ? 999999 : dataGb;
          };
          return getDataValue(b) - getDataValue(a);

        case 'speed_desc':
          return (b.speed || 0) - (a.speed || 0);

        case 'rate_asc':
          const rateStringA = typeof a.effective_rate === 'string' ? a.effective_rate.replace('%', '') : '0';
          const rateStringB = typeof b.effective_rate === 'string' ? b.effective_rate.replace('%', '') : '0';
          const rateA = parseFloat(rateStringA || '0');
          const rateB = parseFloat(rateStringB || '0');
          return rateA - rateB;

        case 'rate_desc':
          const rateDescStringA = typeof a.effective_rate === 'string' ? a.effective_rate.replace('%', '') : '0';
          const rateDescStringB = typeof b.effective_rate === 'string' ? b.effective_rate.replace('%', '') : '0';
          const rateDescA = parseFloat(rateDescStringA || '0');
          const rateDescB = parseFloat(rateDescStringB || '0');
          return rateDescB - rateDescA;

        case 'bestMatch':
        case 'random':
          return 0;

        default:
          return 0;
      }
    });

    if (sortBy === 'random' || sortBy === 'bestMatch') {
      filtered = shuffleArray(filtered);
    }

    return filtered;
  }, [offers, filters, sortBy, category, selectedCategory]);
};
