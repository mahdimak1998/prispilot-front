import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // ms
  decimals?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 800, decimals = 2, className }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const startValue = useRef(value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (value === displayValue) return;
    const start = performance.now();
    const from = displayValue;
    const to = value;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + (to - from) * progress;
      setDisplayValue(current);
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(to);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [value]);

  return (
    <span className={className}>
      {displayValue.toLocaleString('nb-NO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace('.', ',')}
    </span>
  );
};

export default AnimatedCounter;
