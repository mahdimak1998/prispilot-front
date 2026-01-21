
import React from 'react';
import { Zap } from 'lucide-react';

interface PowerCalculatorHeaderProps {
  offersCount: number;
  selectedMunicipality: string;
  selectedCategory: string;
  hasSearched: boolean;
  loading: boolean;
}

const PowerCalculatorHeader: React.FC<PowerCalculatorHeaderProps> = ({
  offersCount,
  selectedMunicipality,
  selectedCategory,
  hasSearched,
  loading
}) => {
  return (
    <div>
      
    </div>
  );
};

export default PowerCalculatorHeader;
