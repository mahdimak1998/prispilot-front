import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ZONES = ['NO1','NO2','NO3','NO4','NO5'] as const;
const ZONE_LABELS = {
  NO1: 'Øst',
  NO2: 'Sør',
  NO3: 'Midt',
  NO4: 'Nord',
  NO5: 'Vest',
};

const SpotPriceDisplay = () => {
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [zone, setZone] = useState<string>('NO1');

  useEffect(() => {
    const fetchSpotPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/strom-api/spotprice/dayprice/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error(`API returned ${response.status}: ${response.statusText}`);
        const data = await response.json();
        // Robust parsing: support both data.today.hourly and data.hourly
        const rawHourly = data?.today?.hourly || data?.hourly || [];
        // Normalize: hour = number (0-23), values in kr/kWh
        const hourlyData = rawHourly.map((h: any) => {
          let hour = typeof h.fromHour === 'number' ? h.fromHour : (h.fromTime ? new Date(h.fromTime).getHours() : undefined);
          if (typeof hour !== 'number' || hour < 0 || hour > 23) return null;
          let obj: any = { hour };
          ZONES.forEach(z => {
            let val = h[z];
            // Hvis verdien er i øre, konverter til kr
            if (typeof val === 'number' && val > 10 && val < 300) val = val / 100;
            obj[z] = typeof val === 'number' ? val : undefined;
          });
          return obj;
        }).filter(Boolean);
        setHourly(hourlyData);
        setLastUpdated(new Date().toLocaleString('no-NO'));
      } catch (error) {
        setError('Kunne ikke laste spotpriser fra API');
        setHourly([]);
        setLastUpdated(new Date().toLocaleString('no-NO'));
      } finally {
        setLoading(false);
      }
    };
    fetchSpotPrices();
    const interval = setInterval(fetchSpotPrices, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const fmtOre = (kr: number | undefined) => `${Math.round((kr ?? 0) * 100)} øre/kWh`;
  const fmtTime = (h: number) => `${String(h).padStart(2, '0')}:00`;
  const nowHour = new Date().getHours();
  const series = hourly.map(h => ({ hour: h.hour, value: h[zone] })).filter(p => typeof p.value === 'number' && isFinite(p.value));
  const avg = series.length ? series.reduce((s, d) => s + (d.value ?? 0), 0) / series.length : undefined;
  const low = series.length ? series.reduce((m, d) => d.value < m.value ? d : m, series[0]) : undefined;
  const high = series.length ? series.reduce((m, d) => d.value > m.value ? d : m, series[0]) : undefined;
  const now = series.find(d => d.hour === nowHour) ?? series.filter(d => d.hour < nowHour).slice(-1)[0] ?? series[0];
  const next = series.find(d => d.hour === ((nowHour + 1) % 24));

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Spotpris i dag</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner message="Laster spotpriser..." size="md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-8">
      <Card className="rounded-2xl ring-1 ring-black/5 shadow-sm p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">Spotpris i dag</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={zone} onValueChange={setZone} className="mb-4">
            <TabsList className="inline-flex gap-1">
              {ZONES.map(z => (
                <TabsTrigger key={z} value={z} aria-current={zone === z ? 'true' : undefined} className={zone === z ? 'font-bold' : ''}>
                  {ZONE_LABELS[z]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {/* Kun grafisk diagram med alle timepriser, ingen tabell eller tekst med timepriser */}
          <div className="w-full h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis dataKey="hour" tickFormatter={fmtTime} interval={2} />
                <YAxis tickFormatter={v => fmtOre(v)} width={60} />
                <Tooltip formatter={(v: number) => fmtOre(v)} labelFormatter={fmtTime} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <ReferenceLine x={nowHour} stroke="#2563eb" strokeDasharray="3 3" label={{ value: 'Nå', position: 'top', fill: '#2563eb', fontSize: 12 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-2 text-xs text-gray-400">
            Prisene er inkl. mva. med unntak av Nord-Norge, hvor strøm er unntatt momsplikt.<br />
            Prisene oppdateres hver time. Sist oppdatert {lastUpdated}.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpotPriceDisplay;
