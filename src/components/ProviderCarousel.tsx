
import React, { useEffect, useState } from 'react';
import { useProviderData } from '@/hooks/category/useProviderData';

interface Provider {
  id: string;
  navn: string;
  logo_url: string | null;
  kategori: string;
}

interface ProviderCarouselProps {
  onProviderClick: (provider: Provider) => void;
}

const ProviderCarousel: React.FC<ProviderCarouselProps> = ({ onProviderClick }) => {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const { providers: categoryProviders, fetchProviders } = useProviderData();

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const combinedProviders: Provider[] = [];
        
        // Fetch from all categories
        const categories = ['lan', 'boligalarm', 'handverkere', 'renhold'];
        
        for (const category of categories) {
          await fetchProviders(category);
        }
        
        // Get providers from the hook's state
        if (categoryProviders.length > 0) {
          categoryProviders.forEach(provider => {
            combinedProviders.push({
              id: provider.id,
              navn: provider.navn,
              logo_url: provider.logo_url,
              kategori: provider.kategori
            });
          });
        }

        // Remove duplicates based on navn
        const uniqueProviders = combinedProviders.filter((provider, index, self) => 
          index === self.findIndex(p => p.navn === provider.navn)
        );

        setAllProviders(uniqueProviders);
      } catch (error) {
        console.error('Error loading providers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [fetchProviders]);

  // Update local state when categoryProviders changes
  useEffect(() => {
    if (categoryProviders.length > 0) {
      const uniqueProviders = categoryProviders.filter((provider, index, self) => 
        index === self.findIndex(p => p.navn === provider.navn)
      );
      setAllProviders(uniqueProviders);
      setLoading(false);
    }
  }, [categoryProviders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (allProviders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Ingen partnere funnet for øyeblikket.
      </div>
    );
  }

  // Triple providers for seamless continuous loop
  const tripleProviders = [...allProviders, ...allProviders, ...allProviders];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <style>
        {`
          @keyframes smoothScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .scroll-animation {
            animation: smoothScroll 60s linear infinite;
            will-change: transform;
          }
          .scroll-animation:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="flex scroll-animation">
        {tripleProviders.map((provider, index) => (
          <div
            key={`${provider.id}-${index}`}
            onClick={() => onProviderClick(provider)}
            className="flex-shrink-0 w-40 h-24 mx-3 md:w-48 md:h-28 md:mx-4 flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer group hover:scale-105 bg-white rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl hover:bg-white p-4"
          >
            {provider.logo_url ? (
              <img
                src={provider.logo_url}
                alt={provider.navn}
                className="max-w-full max-h-full object-contain transition-all duration-300 filter group-hover:brightness-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
            ) : (
              <img
                src={'/placeholder.svg'}
                alt={provider.navn}
                className="max-w-full max-h-full object-contain transition-all duration-300 filter group-hover:brightness-110"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderCarousel;
