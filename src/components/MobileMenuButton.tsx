
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center h-10 w-10 px-3 bg-card text-card-foreground border border-border hover:bg-accent hover:text-primary hover:border-primary transition-all duration-300 rounded-lg"
      aria-label="Toggle menu"
    >
      {isOpen ? 
        <X className="w-4 h-4" /> : 
        <Menu className="w-4 h-4" />
      }
    </button>
  );
};

export default MobileMenuButton;
