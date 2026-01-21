import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

interface ThemeTogglerProps {
  showText?: boolean;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ showText = false }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getThemeText = () => {
    return theme === 'dark' ? 'Mørkt tema' : 'Lyst tema';
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 h-11 bg-white/60 dark:bg-white/5 text-foreground border border-border/30 hover:bg-white/80 dark:hover:bg-white/10 hover:text-foreground hover:border-border/50 backdrop-blur-sm shadow-lg transition-all duration-300 rounded-lg ${
        showText ? 'px-3' : 'justify-center w-10 px-3'
      }`}
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      {showText && <span className="text-sm font-medium">{getThemeText()}</span>}
    </button>
  );
};

export default ThemeToggler;