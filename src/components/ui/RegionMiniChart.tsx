import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface RegionMiniChartProps {
  times: string[];
  prices: number[];
  color?: string;
  darkMode?: boolean;
}

const RegionMiniChart: React.FC<RegionMiniChartProps> = ({ times, prices, color = '#22c55e', darkMode }) => {
  // Use the region color for both border and fill, with opacity for fill
  let fillColor = color;
  if (color.startsWith('#')) {
    fillColor = darkMode ? color + '33' : color + '22';
  } else if (color.startsWith('rgb')) {
    fillColor = darkMode ? color.replace(')', ',0.2)') : color.replace(')', ',0.13)');
  }
  const data = {
    labels: times,
    datasets: [
      {
        label: 'Pris',
        data: prices,
        fill: true,
        backgroundColor: fillColor,
        borderColor: color,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: {
        display: true,
        ticks: { color: darkMode ? '#aaa' : '#444', font: { size: 10 } },
        grid: { display: false },
      },
      y: { display: false },
    },
    elements: { line: { borderWidth: 2 } },
    layout: { padding: { left: 0, right: 0, top: 8, bottom: 0 } },
  };
  return (
    <div style={{ height: 90, width: '100%', padding: '0 0.5rem' }}>
      <Line data={data} options={options} height={90} width={400} />
    </div>
  );
};

export default RegionMiniChart;
