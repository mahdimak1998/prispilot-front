
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  size?: 'default' | 'large' | 'boligalarm';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '',
  fallbackSrc = '/placeholder.svg',
  size = 'default'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const getLogoSize = () => {
    switch (size) {
      case 'large':
        return 'h-16 w-auto max-w-full';
      case 'boligalarm':
        return 'h-12 w-auto max-w-full';
      default:
        return 'h-12 w-auto max-w-full';
    }
  };
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className || `${getLogoSize()} object-contain`}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
