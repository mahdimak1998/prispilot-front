
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MobileCounters from './MobileCounters';

const MobileAnimationWithCounters = ({ isMobileMenuOpen }: { isMobileMenuOpen?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [showCounters, setShowCounters] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only show animation on homepage, if screen is >= 1400px, and mobile menu is not open
    if (location.pathname !== '/' || windowWidth < 1400 || isMobileMenuOpen) {
      // Hide animation immediately if mobile menu opens
      if (isMobileMenuOpen) {
        setIsVisible(false);
        setAnimationClass('');
        setShowCounters(false);
        setShowVideo(false);
      }
      return;
    }

    // Animation loop function
    const runAnimationLoop = () => {
      // 1.5 seconds pause before animation starts
      setTimeout(() => {
        setIsVisible(true);
        setAnimationClass('mobile-slide-in');
        
        // After slide-in completes (1s), start video and counter animations
        setTimeout(() => {
          // Show video and start from 3 seconds - ensure video is ready first
          setShowVideo(true);
          if (videoRef.current) {
            videoRef.current.pause(); // Ensure video is paused
            videoRef.current.currentTime = 3; // Set to 3 seconds
            // Wait a bit to ensure currentTime is set, then play
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }, 50);
          }
          setShowCounters(true);
          
          // Hold for 8 seconds (2s for counter animation + 6s display)
          setTimeout(() => {
            // Start slide-out
            setAnimationClass('mobile-slide-out');
            setShowCounters(false);
            setShowVideo(false);
            
            // Hide after slide-out is complete (1 second)
            setTimeout(() => {
              setIsVisible(false);
              setAnimationClass('');
              // Reset video
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }, 1000);
          }, 8000); // Reduced from 10s to account for counter animation time
        }, 1000); // Wait for slide-in to complete
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
  }, [location.pathname, windowWidth, isMobileMenuOpen]);

  if (!isVisible || location.pathname !== '/' || windowWidth < 1400) {
    return null;
  }

  return (
    <div className={`mobile-animation-container ${animationClass}`}>
      <img
        src="/webMobil.png"
        alt="Mobile animation"
        className="mobile-phone-frame"
      />
      <div className="mobile-screen-content">
        <video
          ref={videoRef}
          src="/monyfall.webm"
          loop
          muted
          playsInline
          className={`mobile-money-video ${showVideo ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            transform: 'scale(1.1)', 
            transformOrigin: 'center',
            transition: 'opacity 0.3s ease-in-out',
            background: 'transparent',
            backgroundColor: 'transparent'
          }}
          onTimeUpdate={(e) => {
            // Freeze video at 9 seconds
            if (e.currentTarget.currentTime >= 9) {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 9;
            }
          }}
          onLoadedData={() => {
            // Ensure video starts paused and ready
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        />
        <MobileCounters startAnimation={showCounters} />
      </div>
    </div>
  );
};

export default MobileAnimationWithCounters;
