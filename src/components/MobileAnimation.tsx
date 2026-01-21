import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MobileAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Only show animation on homepage
    if (location.pathname !== '/') {
      return;
    }

    // Animation loop function
    const runAnimationLoop = () => {
      // 1.5 seconds pause before animation starts
      setTimeout(() => {
        setIsVisible(true);
        setAnimationClass('mobile-slide-in');
        
        // After 1 second (slide-in complete), wait 10 seconds
        setTimeout(() => {
          // Start slide-out
          setAnimationClass('mobile-slide-out');
          
          // Hide after slide-out is complete (1 second)
          setTimeout(() => {
            setIsVisible(false);
            setAnimationClass('');
          }, 1000);
        }, 11000); // 1s slide-in + 10s waiting
      }, 1500);
    };

    // Start first loop
    runAnimationLoop();
    
    // Set up repeating loop every 13.5 seconds
    const loopInterval = setInterval(runAnimationLoop, 13500);

    // Cleanup when component unmounts
    return () => {
      clearInterval(loopInterval);
    };
  }, [location.pathname]);

  if (!isVisible || location.pathname !== '/') {
    return null;
  }

  return (
    <img
      src="/webMobil.png"
      alt="Mobile animation"
      className={`mobile-animation ${animationClass}`}
    />
  );
};

export default MobileAnimation;