import { useEffect, useState, useRef, useCallback } from 'react';

const HeroFlagAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const animationLoopRef = useRef<NodeJS.Timeout | null>(null);
  const collisionCheckRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  // Check if user is at top of page (scrollY <= 10px)
  const isAtTop = useCallback(() => {
    return window.scrollY <= 10;
  }, []);

  // Check if mobile device
  const isMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  // Collision detection with homepage elements
  const checkCollisions = useCallback(() => {
    if (!containerRef.current) return false;
    
    const flagRect = containerRef.current.getBoundingClientRect();
    
    // Check collision with category cards, buttons, etc.
    const elements = document.querySelectorAll('.category-card, .btn-responsive, .hero-section button, .info-box, .provider-carousel');
    
    for (const element of elements) {
      const elementRect = element.getBoundingClientRect();
      
      // Check if elements overlap
      if (!(flagRect.right < elementRect.left || 
            flagRect.left > elementRect.right || 
            flagRect.bottom < elementRect.top || 
            flagRect.top > elementRect.bottom)) {
  // Removed console.log spam
        return true;
      }
    }
    
    return false;
  }, []);

  // Start the animation loop
  const startAnimationLoop = useCallback(() => {
    // Don't animate on mobile
    if (isMobile()) {
      // Removed console.log spam
      return;
    }

    // Prevent multiple simultaneous animations
    if (isAnimatingRef.current) {
      // Removed console.log spam
      return;
    }

    // Only start if at top of page
    if (!isAtTop()) {
      // Removed console.log spam
      return;
    }

    // Check for collisions
    if (checkCollisions()) {
      // Removed console.log spam
      return;
    }

  // Removed console.log spam
    isAnimatingRef.current = true;

    // Clear any existing timeouts
    if (animationLoopRef.current) {
      clearTimeout(animationLoopRef.current);
      animationLoopRef.current = null;
    }

    // Start slide-in
    setIsVisible(true);
    setAnimationClass('flag-slide-in');

    // After slide-in (1s) + visible time (10s), slide out
    setTimeout(() => {
      // Check if still at top before sliding out
      if (!isAtTop() || isMobile() || checkCollisions()) {
        // Removed console.log spam
        setIsVisible(false);
        setAnimationClass('');
        isAnimatingRef.current = false;
        return;
      }

  // Removed console.log spam
      setAnimationClass('flag-slide-out');

      // After slide-out (1s), hide and schedule next loop
      setTimeout(() => {
        setIsVisible(false);
        setAnimationClass('');
        isAnimatingRef.current = false;

        // Schedule next loop in 5 seconds, but only if conditions are still met
        animationLoopRef.current = setTimeout(() => {
          if (isAtTop() && !isMobile() && !checkCollisions()) {
            // console.log('Starting next animation loop...');
            startAnimationLoop();
          } else {
            // console.log('Conditions not met, stopping loop...');
          }
        }, 5000);
      }, 1000); // slide-out duration
    }, 11000); // slide-in (1s) + visible (10s)
  }, [isAtTop, isMobile, checkCollisions]);

  // Stop all animations
  const stopAnimationLoop = useCallback(() => {
  // Removed console.log spam
    isAnimatingRef.current = false;
    
    // Clear all timers
    if (animationLoopRef.current) {
      clearTimeout(animationLoopRef.current);
      animationLoopRef.current = null;
    }
    if (collisionCheckRef.current) {
      clearTimeout(collisionCheckRef.current);
      collisionCheckRef.current = null;
    }

    // Hide flag if visible
    if (isVisible) {
      setAnimationClass('flag-slide-out');
      setTimeout(() => {
        setIsVisible(false);
        setAnimationClass('');
      }, 1000);
    }
  }, [isVisible]);

  useEffect(() => {
    // Only work on homepage - check if we're on the root path
    if (window.location.pathname !== '/') {
      // Removed console.log spam
      return;
    }

    heroSectionRef.current = document.getElementById('hero');
    
    if (!heroSectionRef.current) {
      // console.log('Hero section not found!');
      return;
    }

    // console.log('Setting up flag animation listeners...');

    // Scroll handler - hide flag immediately when scrolling away from homepage
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // If user scrolls down more than 10px, hide flag immediately
      if (scrollY > 10) {
        // console.log('Scrolled down more than 10px, hiding flag...', scrollY);
        
        // Stop current animation and hide flag
        isAnimatingRef.current = false;
        if (animationLoopRef.current) {
          clearTimeout(animationLoopRef.current);
          animationLoopRef.current = null;
        }
        
        // Hide flag immediately if visible
        if (isVisible) {
          // console.log('Flag is visible, sliding out...');
          setAnimationClass('flag-slide-out');
          setTimeout(() => {
            setIsVisible(false);
            setAnimationClass('');
          }, 1000);
        }
      }
      
      // If user scrolls back to top (less than 10px), restart animations
      if (scrollY <= 10 && !isAnimatingRef.current && !isVisible) {
  // console.log('Scrolled back to top, restarting animations...', scrollY);
        setTimeout(() => {
          startAnimationLoop();
        }, 1000);
      }
    };

    // Intersection observer for initial start
    const observer = new IntersectionObserver(
      (entries) => {
        const heroEntry = entries[0];
        
        if (heroEntry.isIntersecting && isAtTop() && !isAnimatingRef.current) {
          // console.log('Hero section intersecting and at top, starting initial animation...');
          setTimeout(() => {
            startAnimationLoop();
          }, 2000); // Initial delay
        }
      },
      {
        threshold: [0.5],
        rootMargin: '0px'
      }
    );

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    observer.observe(heroSectionRef.current);

    // Start initial animation if at top of page
    if (isAtTop()) {
  // console.log('Page loaded at top, starting initial animation...');
      setTimeout(() => {
        startAnimationLoop();
      }, 2000);
    }

    return () => {
  // console.log('Cleaning up flag animation...');
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      isAnimatingRef.current = false;
      if (animationLoopRef.current) {
        clearTimeout(animationLoopRef.current);
      }
      if (collisionCheckRef.current) {
        clearTimeout(collisionCheckRef.current);
      }
    };
  }, []); // No dependencies - this should only run once

  if (!isVisible) {
    return null;
  }

  return (
    <div className="hero-animations-container">
      {/* Flag Animation - Slides from left like mobile animation */}
      <div ref={containerRef} className={`hero-flag-container ${animationClass}`}>
        {/* Flagpole */}
        <div className="hero-flag-pole">
          <div className="hero-pole-stick"></div>
          
          {/* Flag attached directly to pole */}
          <div className="hero-flag-wrapper">
            <div className="hero-flag-fabric">
              {/* Norwegian flag layers */}
              <div className="hero-flag-base hero-flag-red"></div>
              <div className="hero-flag-cross hero-flag-white-vertical"></div>
              <div className="hero-flag-cross hero-flag-white-horizontal"></div>
              <div className="hero-flag-cross hero-flag-blue-vertical"></div>
              <div className="hero-flag-cross hero-flag-blue-horizontal"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFlagAnimation;