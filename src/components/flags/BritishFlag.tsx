
import React from 'react';

const BritishFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`${className} rounded-full overflow-hidden shadow-md border-2 border-white/20 flex-shrink-0`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ colorScheme: 'light', imageRendering: 'auto' }}
      >
        <defs>
          <clipPath id="circle-clip-uk">
            <circle cx="12" cy="12" r="12" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#circle-clip-uk)">
          {/* Blue background */}
          <rect width="24" height="24" fill="#012169" />
          
          {/* White diagonal stripes */}
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#FFFFFF" strokeWidth="3"/>
          
          {/* White cross */}
          <path d="M12,0 V24 M0,12 H24" stroke="#FFFFFF" strokeWidth="4"/>
          
          {/* Red diagonal stripes */}
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" strokeWidth="1.8"/>
          
          {/* Red cross */}
          <path d="M12,0 V24 M0,12 H24" stroke="#C8102E" strokeWidth="2.5"/>
        </g>
      </svg>
    </div>
  );
};

export default BritishFlag;
