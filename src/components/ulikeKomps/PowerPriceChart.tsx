import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceData {
  time: string;
  price: number;
}

const PowerPriceChart = () => {
  // Sample 24-hour price data
  const priceData: PriceData[] = [
    { time: '00:00', price: 45 },
    { time: '01:00', price: 42 },
    { time: '02:00', price: 38 },
    { time: '03:00', price: 35 },
    { time: '04:00', price: 33 },
    { time: '05:00', price: 36 },
    { time: '06:00', price: 48 },
    { time: '07:00', price: 62 },
    { time: '08:00', price: 71 },
    { time: '09:00', price: 68 },
    { time: '10:00', price: 65 },
    { time: '11:00', price: 58 },
    { time: '12:00', price: 55 },
    { time: '13:00', price: 52 },
    { time: '14:00', price: 48 },
    { time: '15:00', price: 46 },
    { time: '16:00', price: 51 },
    { time: '17:00', price: 68 },
    { time: '18:00', price: 82 },
    { time: '19:00', price: 95 },
    { time: '20:00', price: 87 },
    { time: '21:00', price: 74 },
    { time: '22:00', price: 62 },
    { time: '23:00', price: 52 },
  ];

  const maxPrice = Math.max(...priceData.map(d => d.price));
  const minPrice = Math.min(...priceData.map(d => d.price));
  const currentPrice = priceData[new Date().getHours()]?.price || priceData[0].price;
  const previousPrice = priceData[new Date().getHours() - 1]?.price || priceData[23].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(1);

  // Generate SVG path for the price curve
  const svgWidth = 600;
  const svgHeight = 200;
  const padding = 40;

  const pathPoints = priceData.map((point, index) => {
    const x = padding + (index / (priceData.length - 1)) * (svgWidth - 2 * padding);
    const y = svgHeight - padding - ((point.price - minPrice) / (maxPrice - minPrice)) * (svgHeight - 2 * padding);
    return `${x},${y}`;
  }).join(' L ');

  const pathData = `M ${pathPoints}`;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Spotpris i dag</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">
              {currentPrice} øre/kWh
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
              priceChange >= 0 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {priceChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{priceChange >= 0 ? '+' : ''}{priceChangePercent}%</span>
            </div>
          </div>
        </div>
        
        <div className="text-right mt-4 sm:mt-0">
          <div className="text-sm text-muted-foreground">24t gjennomsnitt</div>
          <div className="text-lg font-semibold text-foreground">
            {Math.round(priceData.reduce((sum, d) => sum + d.price, 0) / priceData.length)} øre/kWh
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="relative">
        <svg 
          width="100%" 
          height="200" 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price area under curve */}
          <path
            d={`${pathData} L ${svgWidth - padding},${svgHeight - padding} L ${padding},${svgHeight - padding} Z`}
            fill="url(#priceGradient)"
            opacity="0.2"
          />
          
          {/* Price line */}
          <path
            d={pathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Current time indicator */}
          {(() => {
            const currentHour = new Date().getHours();
            const currentX = padding + (currentHour / (priceData.length - 1)) * (svgWidth - 2 * padding);
            const currentY = svgHeight - padding - ((currentPrice - minPrice) / (maxPrice - minPrice)) * (svgHeight - 2 * padding);
            
            return (
              <g>
                <line 
                  x1={currentX} 
                  y1={padding} 
                  x2={currentX} 
                  y2={svgHeight - padding} 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                <circle 
                  cx={currentX} 
                  cy={currentY} 
                  r="4" 
                  fill="hsl(var(--primary))" 
                  stroke="hsl(var(--background))" 
                  strokeWidth="2"
                />
              </g>
            );
          })()}
        </svg>
        
        {/* Time labels */}
        <div className="flex justify-between mt-2 px-10 text-xs text-muted-foreground">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* Key insights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Laveste</div>
          <div className="font-semibold text-green-600 dark:text-green-400">{minPrice} øre</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Høyeste</div>
          <div className="font-semibold text-red-600 dark:text-red-400">{maxPrice} øre</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Nå</div>
          <div className="font-semibold text-foreground">{currentPrice} øre</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Neste time</div>
          <div className="font-semibold text-foreground">
            {priceData[(new Date().getHours() + 1) % 24]?.price || priceData[0].price} øre
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerPriceChart;