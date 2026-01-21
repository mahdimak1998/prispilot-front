import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FlagAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'wind' | 'exit' | 'hidden'>('hidden');
  const location = useLocation();

  useEffect(() => {
    // Only show animation on homepage
    if (location.pathname !== '/') {
      return;
    }

    // Animation sequence function
    const runFlagAnimation = () => {
        // After 2 seconds (pole slide complete), start wind animation
        setTimeout(() => {
          setAnimationPhase('wind');
          
          // After 10 seconds of wind animation, start exit
          setTimeout(() => {
            setAnimationPhase('exit');

          }, 5000); // 10s wind animation
        }, 5000); // 2s pole slide
    };

    // Set up repeating animation every 16 seconds
    const loopInterval = setInterval(runFlagAnimation);

    // Cleanup when component unmounts
    return () => {
      clearInterval(loopInterval);
    };
  }, [location.pathname]);

  if (!isVisible || location.pathname !== '/') {
    return null;
  }

  const getAnimationClasses = () => {
    switch (animationPhase) {
      case 'enter':
        return 'flag-pole-rise';
      case 'wind':
        return 'flag-wind-animation';
      case 'exit':
        return 'flag-pole-descend';
      default:
        return '';
    }
  };

  return (
    <div className={`flag-animation-container ${getAnimationClasses()}`}>
      {/* Flagpole */}
      <div className="flag-pole">
        <div className="pole-stick"></div>
      </div>
      
      {/* Realistic Norwegian flag */}
      <div className="flag-wrapper">
        <div className="flag-fabric">
          {/* Red background */}
          <div className="flag-section flag-red"></div>
          {/* White cross */}
          <div className="flag-cross flag-white-vertical"></div>
          <div className="flag-cross flag-white-horizontal"></div>
          {/* Blue cross */}
          <div className="flag-cross flag-blue-vertical"></div>
          <div className="flag-cross flag-blue-horizontal"></div>
          {/* Flag shadow for depth */}
          <div className="flag-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default FlagAnimation;