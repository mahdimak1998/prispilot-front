import React, { useEffect, useState } from 'react';

interface InfoBoxProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }> | string;
  color: string;
  delay: number;
  startAnimation: boolean;
  duration?: number;
}

const InfoBox = ({ title, value, icon, color, delay, startAnimation, duration = 2000 }: InfoBoxProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!startAnimation) {
      // Start smooth exit animation
      if (isVisible) {
        setIsExiting(true);
        setTimeout(() => {
          setDisplayValue(0);
          setIsVisible(false);
          setIsExiting(false);
        }, 300); // Match the CSS transition duration
      }
      return;
    }

    // Apply staggered delay
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Start counting animation after the box appears
      setTimeout(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smoother animation
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          setDisplayValue(Math.floor(value * easedProgress));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, 300); // Small delay after box appears
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [startAnimation, value, delay, duration]);

  return (
    <div 
      className={`info-box ${isVisible ? 'info-box-visible' : ''} ${isExiting ? 'info-box-exiting' : ''}`}
      style={{ '--box-color': color } as React.CSSProperties}
    >
      <div className="info-box-content">
        <div className="info-box-icon">
          {typeof icon === 'string' ? (
            icon
          ) : (
            React.createElement(icon, { className: "w-6 h-6" })
          )}
        </div>
        <div className="info-box-text">
          <div className="info-box-value">
            {displayValue} kr
          </div>
          <div className="info-box-title">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;