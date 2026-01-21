
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Simple image optimization for better logo display
export const optimizeLogoDisplay = (imgElement: HTMLImageElement): void => {
  // Add CSS classes for better logo rendering
  imgElement.style.filter = 'brightness(1.1) contrast(1.1)';
  imgElement.style.mixBlendMode = 'multiply';
  imgElement.style.backgroundColor = 'transparent';
};
