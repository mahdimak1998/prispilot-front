
import React from 'react';

const NorwegianFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`${className} rounded-full overflow-hidden shadow-lg border border-white/30 flex-shrink-0 bg-white`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 22 16" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ colorScheme: 'light', imageRendering: 'crisp-edges' }}
      >
        <defs>
          <clipPath id="circle-clip-no">
            <circle cx="11" cy="8" r="8" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#circle-clip-no)">
          {/* Red background */}
          <rect width="22" height="16" fill="#EF2B2D" />
          
          {/* White cross - proper proportions */}
          <rect x="6" y="0" width="4" height="16" fill="#FFFFFF" />
          <rect x="0" y="6" width="22" height="4" fill="#FFFFFF" />
          
          {/* Blue cross - proper proportions */}
          <rect x="7" y="0" width="2" height="16" fill="#002868" />
          <rect x="0" y="7" width="22" height="2" fill="#002868" />
        </g>
      </svg>
    </div>
  );
};

export default NorwegianFlag;
