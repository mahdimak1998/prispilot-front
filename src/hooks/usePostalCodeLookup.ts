
import { useState, useCallback } from 'react';

interface PostalCodeResult {
  postalCode: string;
  municipality: string;
  county: string;
}

// Cache for postal code lookups to avoid repeated API calls
const postalCodeCache = new Map<string, PostalCodeResult | null>();

export const usePostalCodeLookup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupPostalCode = useCallback(async (postalCode: string): Promise<PostalCodeResult | null> => {
    if (!postalCode || postalCode.length !== 4 || !/^\d{4}$/.test(postalCode)) {
      return null;
    }

    // Check cache first
    if (postalCodeCache.has(postalCode)) {
      const cached = postalCodeCache.get(postalCode);
      if (cached) {
        setError(null);
        return cached;
      }
    }

    setLoading(true);
    setError(null);

    try {
      // Try multiple APIs for better reliability
      let result: PostalCodeResult | null = null;

      // First try: Bring API with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const bringResponse = await fetch(
          `https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=prispilot.no&pnr=${postalCode}`,
          { 
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        clearTimeout(timeoutId);
        
        if (bringResponse.ok) {
          const bringData = await bringResponse.json();
          if (bringData.valid && bringData.result) {
            result = {
              postalCode: postalCode,
              municipality: bringData.result.city || bringData.result.municipalityName || '',
              county: bringData.result.county || ''
            };
          }
        }
      } catch (bringError) {
        console.warn('Bring API failed:', bringError);
      }

      // Fallback: Expanded static postal code mapping for Norwegian cities
      if (!result) {
        const postalCodeMapping: { [key: string]: { municipality: string; county: string } } = {
          // Oslo
          '0001': { municipality: 'Oslo', county: 'Oslo' },
          '0010': { municipality: 'Oslo', county: 'Oslo' },
          '0050': { municipality: 'Oslo', county: 'Oslo' },
          '0100': { municipality: 'Oslo', county: 'Oslo' },
          '0150': { municipality: 'Oslo', county: 'Oslo' },
          '0180': { municipality: 'Oslo', county: 'Oslo' },
          '0250': { municipality: 'Oslo', county: 'Oslo' },
          '0350': { municipality: 'Oslo', county: 'Oslo' },
          '0450': { municipality: 'Oslo', county: 'Oslo' },
          '0550': { municipality: 'Oslo', county: 'Oslo' },
          '0650': { municipality: 'Oslo', county: 'Oslo' },
          '0750': { municipality: 'Oslo', county: 'Oslo' },
          
          // Bergen
          '5000': { municipality: 'Bergen', county: 'Vestland' },
          '5003': { municipality: 'Bergen', county: 'Vestland' },
          '5007': { municipality: 'Bergen', county: 'Vestland' },
          '5009': { municipality: 'Bergen', county: 'Vestland' },
          '5010': { municipality: 'Bergen', county: 'Vestland' },
          '5011': { municipality: 'Bergen', county: 'Vestland' },
          '5014': { municipality: 'Bergen', county: 'Vestland' },
          '5015': { municipality: 'Bergen', county: 'Vestland' },
          '5018': { municipality: 'Bergen', county: 'Vestland' },
          '5020': { municipality: 'Bergen', county: 'Vestland' },
          '5021': { municipality: 'Bergen', county: 'Vestland' },
          '5022': { municipality: 'Bergen', county: 'Vestland' },
          '5031': { municipality: 'Bergen', county: 'Vestland' },
          '5032': { municipality: 'Bergen', county: 'Vestland' },
          '5033': { municipality: 'Bergen', county: 'Vestland' },
          '5034': { municipality: 'Bergen', county: 'Vestland' },
          '5037': { municipality: 'Bergen', county: 'Vestland' },
          '5039': { municipality: 'Bergen', county: 'Vestland' },
          '5041': { municipality: 'Bergen', county: 'Vestland' },
          '5042': { municipality: 'Bergen', county: 'Vestland' },
          '5045': { municipality: 'Bergen', county: 'Vestland' },
          '5047': { municipality: 'Bergen', county: 'Vestland' },
          '5050': { municipality: 'Bergen', county: 'Vestland' },
          '5051': { municipality: 'Bergen', county: 'Vestland' },
          '5052': { municipality: 'Bergen', county: 'Vestland' },
          '5053': { municipality: 'Bergen', county: 'Vestland' },
          '5058': { municipality: 'Bergen', county: 'Vestland' },
          '5059': { municipality: 'Bergen', county: 'Vestland' },
          '5063': { municipality: 'Bergen', county: 'Vestland' },
          '5067': { municipality: 'Bergen', county: 'Vestland' },
          '5068': { municipality: 'Bergen', county: 'Vestland' },
          '5072': { municipality: 'Bergen', county: 'Vestland' },
          '5073': { municipality: 'Bergen', county: 'Vestland' },
          '5081': { municipality: 'Bergen', county: 'Vestland' },
          '5082': { municipality: 'Bergen', county: 'Vestland' },
          '5089': { municipality: 'Bergen', county: 'Vestland' },
          '5093': { municipality: 'Bergen', county: 'Vestland' },
          '5096': { municipality: 'Bergen', county: 'Vestland' },
          '5098': { municipality: 'Bergen', county: 'Vestland' },
          '5109': { municipality: 'Osterøy', county: 'Vestland' },
          '5110': { municipality: 'Vaksdal', county: 'Vestland' },
          '5200': { municipality: 'Os', county: 'Vestland' },
          '5212': { municipality: 'Bjørnafjorden', county: 'Vestland' },
          '5230': { municipality: 'Austevoll', county: 'Vestland' },
          '5260': { municipality: 'Sund', county: 'Vestland' },
          '5300': { municipality: 'Askøy', county: 'Vestland' },
          '5310': { municipality: 'Øygarden', county: 'Vestland' },
          
          // Trondheim
          '7000': { municipality: 'Trondheim', county: 'Trøndelag' },
          '7010': { municipality: 'Trondheim', county: 'Trøndelag' },
          '7020': { municipality: 'Trondheim', county: 'Trøndelag' },
          '7030': { municipality: 'Trondheim', county: 'Trøndelag' },
          '7040': { municipality: 'Trondheim', county: 'Trøndelag' },
          '7050': { municipality: 'Trondheim', county: 'Trøndelag' },
          
          // Stavanger
          '4000': { municipality: 'Stavanger', county: 'Rogaland' },
          '4001': { municipality: 'Stavanger', county: 'Rogaland' },
          '4020': { municipality: 'Stavanger', county: 'Rogaland' },
          '4040': { municipality: 'Stavanger', county: 'Rogaland' },
          '4067': { municipality: 'Stavanger', county: 'Rogaland' },
          '4100': { municipality: 'Jørpeland', county: 'Rogaland' },
          '4200': { municipality: 'Sauda', county: 'Rogaland' },
          '5500': { municipality: 'Haugesund', county: 'Rogaland' },
          
          // Drammen og omegn
          '3000': { municipality: 'Drammen', county: 'Viken' },
          '3001': { municipality: 'Drammen', county: 'Viken' },
          '3020': { municipality: 'Drammen', county: 'Viken' },
          '3050': { municipality: 'Drammen', county: 'Viken' },
          
          // Viken fylke
          '1340': { municipality: 'Bærum', county: 'Viken' },
          '1400': { municipality: 'Ski', county: 'Viken' },
          '1450': { municipality: 'Nesodden', county: 'Viken' },
          '1500': { municipality: 'Moss', county: 'Viken' },
          '1600': { municipality: 'Fredrikstad', county: 'Viken' },
          '1700': { municipality: 'Sarpsborg', county: 'Viken' },
          '1800': { municipality: 'Askim', county: 'Viken' },
          '2000': { municipality: 'Lillestrøm', county: 'Viken' },
          '2100': { municipality: 'Skedsmo', county: 'Viken' },
          
          // Vestfold og Telemark
          '3100': { municipality: 'Tønsberg', county: 'Vestfold og Telemark' },
          '3200': { municipality: 'Sandefjord', county: 'Vestfold og Telemark' },
          
          // Innlandet
          '2200': { municipality: 'Kongsvinger', county: 'Innlandet' },
          '2300': { municipality: 'Hamar', county: 'Innlandet' },
          '2600': { municipality: 'Lillehammer', county: 'Innlandet' },
          
          // Kristiansand og Agder
          '4600': { municipality: 'Kristiansand', county: 'Agder' },
          '4630': { municipality: 'Kristiansand', county: 'Agder' },
          '4700': { municipality: 'Vennesla', county: 'Agder' },
          '4800': { municipality: 'Arendal', county: 'Agder' },
          
          // Møre og Romsdal
          '6000': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6001': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6002': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6003': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6004': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6005': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6006': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6007': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6008': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6009': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6010': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6011': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6012': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6013': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6014': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6015': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6016': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6018': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6019': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6020': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6021': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6022': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6025': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6026': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6030': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6040': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6050': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6060': { municipality: 'Ålesund', county: 'Møre og Romsdal' },
          '6065': { municipality: 'Ulstein', county: 'Møre og Romsdal' },
          '6100': { municipality: 'Volda', county: 'Møre og Romsdal' },
          '6150': { municipality: 'Ørsta', county: 'Møre og Romsdal' },
          '6200': { municipality: 'Stranda', county: 'Møre og Romsdal' },
          '6230': { municipality: 'Sykkylven', county: 'Møre og Romsdal' },
          '6250': { municipality: 'Skodje', county: 'Møre og Romsdal' },
          '6260': { municipality: 'Skodje', county: 'Møre og Romsdal' },
          '6280': { municipality: 'Sula', county: 'Møre og Romsdal' },
          '6300': { municipality: 'Åndalsnes', county: 'Møre og Romsdal' },
          '6390': { municipality: 'Vestnes', county: 'Møre og Romsdal' },
          '6400': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6401': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6402': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6403': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6404': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6405': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6407': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6408': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6409': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6410': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6411': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6412': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6413': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6414': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6415': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6416': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6418': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6419': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6421': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6422': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6426': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6430': { municipality: 'Molde', county: 'Møre og Romsdal' },
          '6440': { municipality: 'Elnesvågen', county: 'Møre og Romsdal' },
          '6450': { municipality: 'Fræna', county: 'Møre og Romsdal' },
          '6460': { municipality: 'Eide', county: 'Møre og Romsdal' },
          '6470': { municipality: 'Averøy', county: 'Møre og Romsdal' },
          '6480': { municipality: 'Averøy', county: 'Møre og Romsdal' },
          '6490': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6500': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6501': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6509': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6517': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6518': { municipality: 'Kristiansund', county: 'Møre og Romsdal' },
          '6600': { municipality: 'Sunndalsøra', county: 'Møre og Romsdal' },
          '6650': { municipality: 'Surnadal', county: 'Møre og Romsdal' },
          '6700': { municipality: 'Orkdal', county: 'Møre og Romsdal' },
          '6770': { municipality: 'Nordmøre', county: 'Møre og Romsdal' },
          
          // Nordland
          '8000': { municipality: 'Bodø', county: 'Nordland' },
          '8300': { municipality: 'Svolvær', county: 'Nordland' },
          
          // Tromsø og Finnmark
          '9000': { municipality: 'Tromsø', county: 'Troms og Finnmark' },
          '9170': { municipality: 'Longyearbyen', county: 'Svalbard' },
        };

        if (postalCodeMapping[postalCode]) {
          result = {
            postalCode: postalCode,
            municipality: postalCodeMapping[postalCode].municipality,
            county: postalCodeMapping[postalCode].county
          };
        }
      }

      if (!result) {
        setError('Kunne ikke finne postnummer');
      }

      // Cache the result (even if null)
      postalCodeCache.set(postalCode, result);
      return result;
      
    } catch (err) {
      console.error('Postal code lookup error:', err);
      setError('Kunne ikke slå opp postnummer');
      postalCodeCache.set(postalCode, null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookupPostalCode, loading, error };
};
