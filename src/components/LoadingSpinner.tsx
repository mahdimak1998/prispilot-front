
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Laster...", 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <Loader className={`${sizeClasses[size]} animate-spin text-blue-600`} />
        <p className={`${textSizeClasses[size]} text-gray-600 animate-pulse`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
