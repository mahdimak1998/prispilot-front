import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader } from 'lucide-react';
import { usePostalCodeLookup } from '@/hooks/usePostalCodeLookup';
import { cn } from '@/lib/utils';

interface MunicipalitySearchProps {
  municipalities: string[];
  selectedMunicipality: string;
  onMunicipalitySelect: (municipality: string) => void;
  placeholder?: string;
  className?: string;
}

const MunicipalitySearch: React.FC<MunicipalitySearchProps> = ({
  municipalities,
  selectedMunicipality,
  onMunicipalitySelect,
  placeholder = "Søk kommune eller postnummer...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedMunicipality || '');
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lookupPostalCode, loading: isPostalCodeLoading } = usePostalCodeLookup();
  const [isPostalCode, setIsPostalCode] = useState(false);

  // Filter municipalities based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMunicipalities([]);
      setShowDropdown(false);
      setIsPostalCode(false);
      return;
    }

    // If the search term matches the selected municipality exactly, do not show dropdown
    if (searchTerm.trim().toLowerCase() === selectedMunicipality.trim().toLowerCase()) {
      setShowDropdown(false);
      setFilteredMunicipalities([]);
      return;
    }

    // Check if search term is a postal code (4 digits)
    const isPostalCodeSearch = /^\d{4}$/.test(searchTerm.trim());
    
    if (isPostalCodeSearch) {
      setIsPostalCode(true);
      handlePostalCodeLookup(searchTerm.trim());
    } else {
      setIsPostalCode(false);
      const filtered = municipalities.filter(municipality =>
        municipality.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10); // Limit to 10 results
      setFilteredMunicipalities(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchTerm, municipalities, selectedMunicipality]);

  // Update search term when selectedMunicipality changes externally
  useEffect(() => {
    setSearchTerm(selectedMunicipality || '');
  }, [selectedMunicipality]);

  const handlePostalCodeLookup = async (postalCode: string) => {
    try {
      const result = await lookupPostalCode(postalCode);
      if (result && result.municipality) {
        // Try to find a matching municipality from our list
        const matchingMunicipality = municipalities.find(municipality => {
          const cleanMunicipality = municipality.toLowerCase().trim();
          const cleanResult = result.municipality.toLowerCase().trim();
          
          // Direct match
          if (cleanMunicipality === cleanResult) return true;
          
          // Check if municipality name is contained in result or vice versa
          if (cleanMunicipality.includes(cleanResult) || cleanResult.includes(cleanMunicipality)) {
            return true;
          }
          
          // Handle compound names (like "Municipality - OtherName")
          const municipalityParts = cleanMunicipality.split(/[-–—]/);
          const resultParts = cleanResult.split(/[-–—]/);
          
          return municipalityParts.some(part => 
            resultParts.some(resultPart => 
              part.trim().includes(resultPart.trim()) || 
              resultPart.trim().includes(part.trim())
            )
          );
        });

        if (matchingMunicipality) {
          setFilteredMunicipalities([matchingMunicipality]);
          setShowDropdown(true);
        } else {
          setFilteredMunicipalities([]);
          setShowDropdown(false);
        }
      } else {
        setFilteredMunicipalities([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Error looking up postal code:', error);
      setFilteredMunicipalities([]);
      setShowDropdown(false);
    }
  };


  const handleMunicipalityClick = (municipality: string) => {
    setSearchTerm(municipality);
    setShowDropdown(false);
    setFilteredMunicipalities([]);
    onMunicipalitySelect(municipality);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim()) {
      // Only show dropdown if there are results
      setShowDropdown(filteredMunicipalities.length > 0);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay to allow click event on dropdown items
    setTimeout(() => {
      setShowDropdown(false);
      setFilteredMunicipalities([]);
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear selection if user modifies the input
    if (value !== selectedMunicipality) {
      onMunicipalitySelect('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      setFilteredMunicipalities([]);
    } else if (e.key === 'Enter' && filteredMunicipalities.length === 1) {
      handleMunicipalityClick(filteredMunicipalities[0]);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setFilteredMunicipalities([]);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-4 w-4 text-muted-foreground" />
          </span>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className="pl-10 pr-2"
          />
          {isPostalCodeLoading && (
            <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="px-4 shadow-md"
          onClick={() => {
            if (filteredMunicipalities.length === 1) {
              handleMunicipalityClick(filteredMunicipalities[0]);
            } else if (searchTerm && municipalities.includes(searchTerm)) {
              handleMunicipalityClick(searchTerm);
            }
          }}
          disabled={isPostalCodeLoading || !searchTerm.trim()}
        >
          <Search className="w-4 h-4 mr-1" />
          <span className="font-semibold tracking-wide">Søk</span>
        </Button>
      </div>

      {showDropdown && filteredMunicipalities.length > 0 && (
        <div className="absolute z-[100] w-full mt-1 bg-background border border-border rounded-md shadow-xl max-h-60 overflow-y-auto backdrop-blur-sm">
          {filteredMunicipalities.map((municipality, index) => (
            <button
              key={index}
              className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 transition-colors text-foreground border-b border-border last:border-b-0 first:rounded-t-md last:rounded-b-md"
              onClick={() => handleMunicipalityClick(municipality)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{municipality}</span>
              {isPostalCode && (
                <span className="text-sm text-muted-foreground ml-auto">
                  ({searchTerm})
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MunicipalitySearch;