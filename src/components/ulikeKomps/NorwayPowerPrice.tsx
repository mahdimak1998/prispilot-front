import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface PowerPriceData {
  region: string;
  price: number;
  change: number;
  color: string;
  area: string;
}

interface APIResponse {
  NOK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
}

const NorwayPowerPriceDashboard = () => {
  const [averagePrices, setAveragePrices] = useState<{ [key: string]: number }>({});
  type HourlyPriceRow = { hour: string } & { [key: string]: number | undefined };
  const [hourlyPrices, setHourlyPrices] = useState<HourlyPriceRow[]>([]);
  const regions = [
    { name: 'Øst-Norge', code: 'NO1', color: 'text-green-500' },
    { name: 'Sør-Norge', code: 'NO2', color: 'text-red-500' },
    { name: 'Midt-Norge', code: 'NO3', color: 'text-purple-500' },
    { name: 'Nord-Norge', code: 'NO4', color: 'text-blue-500' },
    { name: 'Vest-Norge', code: 'NO5', color: 'text-yellow-500' },
  ];
  
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchPowerPrices = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/strom-api/spotprice/dayprice/?date=${today}`);
      if (!response.ok) throw new Error('Failed to fetch power prices');
      const data = await response.json();

      // API returns array of hourly prices for all regions
      // Example: [{NOK_per_kWh, time_start, time_end, area_code}, ...]
      // We'll group by hour and region
  const hourly: HourlyPriceRow[] = [];
      const regionSums: { [key: string]: number } = {};
      const regionCounts: { [key: string]: number } = {};

      data.forEach((item: any) => {
        const hour = item.time_start.slice(11, 16); // "HH:MM"
        const code = item.area || item.area_code || item.region || item.omrade || item.område;
        if (!code || !regions.find(r => r.code === code)) return;
        const price = Math.round(item.NOK_per_kWh * 100);
        // Find or create hour entry
        let hourEntry = hourly.find(h => h.hour === hour);
        if (!hourEntry) {
          hourEntry = { hour };
          hourly.push(hourEntry);
        }
        hourEntry[code] = price;
        // For average
        regionSums[code] = (regionSums[code] || 0) + price;
        regionCounts[code] = (regionCounts[code] || 0) + 1;
      });
      // Sort hourly by hour ascending (00:00 → 23:00)
      hourly.sort((a, b) => {
        const ah = parseInt(String(a.hour).slice(0,2), 10);
        const bh = parseInt(String(b.hour).slice(0,2), 10);
        return ah - bh;
      });
      // Calculate average for each region
      const averages: { [key: string]: number } = {};
      regions.forEach(r => {
        averages[r.code] = regionCounts[r.code] ? Math.round(regionSums[r.code] / regionCounts[r.code]) : 0;
      });
      setAveragePrices(averages);
      setHourlyPrices(hourly);
      setLastUpdated(new Date().toLocaleTimeString('no-NO'));
      toast({
        title: "Priser oppdatert",
        description: `Siste oppdatering: ${new Date().toLocaleTimeString('no-NO')}`,
      });
    } catch (error) {
      console.error('Error fetching power prices:', error);
      toast({
        variant: "destructive",
        title: "Feil ved henting av data",
        description: "Kunne ikke hente strømpriser. Prøv igjen senere.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPowerPrices();
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchPowerPrices, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Nord-Norge': return 'text-blue-500';
      case 'Midt-Norge': return 'text-purple-500';
      case 'Øst-Norge': return 'text-green-500';
      case 'Vest-Norge': return 'text-yellow-500';
      case 'Sør-Norge': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRegionBgColor = (region: string) => {
    switch (region) {
      case 'Nord-Norge': return 'bg-blue-500';
      case 'Midt-Norge': return 'bg-purple-500';
      case 'Øst-Norge': return 'bg-green-500';
      case 'Vest-Norge': return 'bg-yellow-500';
      case 'Sør-Norge': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Strømpriser Norge</CardTitle>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Sist oppdatert: {lastUpdated}
              </span>
            )}
            <Button
              onClick={fetchPowerPrices}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Oppdater
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Prisområder</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
            {regions.map(region => (
              <div key={region.code} className="flex flex-col items-center">
                <span className={`font-bold ${region.color}`}>{region.name}</span>
                <span className="text-xs text-muted-foreground">{region.code}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Dagens snittpris</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {regions.map(region => (
              <div key={region.code} className="flex flex-col items-center">
                <span className={`font-bold text-lg ${region.color}`}>{averagePrices[region.code] ?? '-'}</span>
                <span className="text-xs text-muted-foreground">øre/kWh</span>
              </div>
            ))}
          </div>
          {/* KPI-grid med live data for valgt region (NO1 som eksempel, kan utvides med sonevelger) */}
          {(() => {
            const regionCode = 'NO1'; // TODO: Bytt til valgt region hvis ønskelig
            const nowHour = new Date().getHours();
            const series = hourlyPrices.map(h => ({ hour: h.hour, value: h[regionCode] })).filter(p => typeof p.value === 'number');
            const avg = series.length ? Math.round(series.reduce((s, d) => s + (d.value ?? 0), 0) / series.length) : undefined;
            const low = series.length ? series.reduce((m, d) => d.value < m.value ? d : m, series[0]) : undefined;
            const high = series.length ? series.reduce((m, d) => d.value > m.value ? d : m, series[0]) : undefined;
            const now = series.find(d => parseInt(d.hour) === nowHour) ?? series.filter(d => parseInt(d.hour) < nowHour).slice(-1)[0] ?? series[0];
            const next = series.find(d => parseInt(d.hour) === ((nowHour + 1) % 24));
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-xl font-semibold">Nå</span>
                  <span className="text-2xl font-bold text-blue-700">{now?.value !== undefined ? `${now.value} øre/kWh` : '-'}</span>
                  <span className="text-xs text-gray-500">{now ? now.hour : '-'}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-xl font-semibold">Neste time</span>
                  <span className="text-2xl font-bold text-gray-700">{next?.value !== undefined ? `${next.value} øre/kWh` : '-'}</span>
                  <span className="text-xs text-gray-500">{next ? next.hour : '-'}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-xl font-semibold">24t snitt</span>
                  <span className="text-2xl font-bold text-green-700">{avg !== undefined ? `${avg} øre/kWh` : '-'}</span>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-xl font-semibold">Laveste</span>
                  <span className="text-2xl font-bold text-yellow-700">{low?.value !== undefined ? `${low.value} øre/kWh` : '-'}</span>
                  <span className="text-xs text-gray-500">{low ? low.hour : '-'}</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-xl font-semibold">Høyeste</span>
                  <span className="text-2xl font-bold text-red-700">{high?.value !== undefined ? `${high.value} øre/kWh` : '-'}</span>
                  <span className="text-xs text-gray-500">{high ? high.hour : '-'}</span>
                </div>
              </div>
            );
          })()}
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Data hentet fra Forbrukerrådet API • Oppdateres automatisk hver 30. minutt</p>
          <p className="mt-1">
            API kilde:
            <a
              href="/strom-api/spotprice/dayprice/"
              className="ml-1 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              strom-api.forbrukerradet.no
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NorwayPowerPriceDashboard;