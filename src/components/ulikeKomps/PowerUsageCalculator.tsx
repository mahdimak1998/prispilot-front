import React, { useState } from 'react';
import { Calculator, Zap, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PowerUsageCalculator = () => {
  const [monthlyUsage, setMonthlyUsage] = useState<string>('1000');
  const [currentPrice, setCurrentPrice] = useState<string>('68');
  const [newPrice, setNewPrice] = useState<string>('45');

  const monthlyUsageNum = parseFloat(monthlyUsage) || 0;
  const currentPriceNum = parseFloat(currentPrice) || 0;
  const newPriceNum = parseFloat(newPrice) || 0;

  const currentMonthlyCost = (monthlyUsageNum * currentPriceNum) / 100;
  const newMonthlyCost = (monthlyUsageNum * newPriceNum) / 100;
  const monthlySavings = currentMonthlyCost - newMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = currentMonthlyCost > 0 ? ((monthlySavings / currentMonthlyCost) * 100) : 0;

  const usagePresets = [
    { label: 'Liten leilighet', value: '800', icon: Home },
    { label: 'Gjennomsnittlig hjem', value: '1200', icon: Home },
    { label: 'Stort hus', value: '2000', icon: Home },
    { label: 'Hytte', value: '500', icon: Home },
  ];

  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator size={20} className="text-primary" />
          Strømkalkulator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Beregn hvor mye du kan spare på å bytte strømavtale
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick presets */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            Velg hustype (valgfritt)
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {usagePresets.map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                onClick={() => setMonthlyUsage(preset.value)}
                className="flex flex-col gap-1 h-auto py-3 text-xs"
              >
                <preset.icon size={16} />
                <span>{preset.label}</span>
                <span className="text-muted-foreground">{preset.value} kWh</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Manual inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="monthly-usage" className="text-sm font-medium text-foreground">
              Månedlig forbruk (kWh)
            </Label>
            <Input
              id="monthly-usage"
              type="number"
              value={monthlyUsage}
              onChange={(e) => setMonthlyUsage(e.target.value)}
              placeholder="1000"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="current-price" className="text-sm font-medium text-foreground">
              Nåværende pris (øre/kWh)
            </Label>
            <Input
              id="current-price"
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="68"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="new-price" className="text-sm font-medium text-foreground">
              Ny pris (øre/kWh)
            </Label>
            <Input
              id="new-price"
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="45"
              className="mt-1"
            />
          </div>
        </div>

        {/* Results */}
        {monthlyUsageNum > 0 && currentPriceNum > 0 && newPriceNum > 0 && (
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              Ditt besparelsespotensial
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">Nåværende kostnad</div>
                <div className="text-lg font-bold text-foreground">
                  {currentMonthlyCost.toLocaleString('no-NO', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} kr
                </div>
                <div className="text-xs text-muted-foreground">per måned</div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">Ny kostnad</div>
                <div className="text-lg font-bold text-primary">
                  {newMonthlyCost.toLocaleString('no-NO', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} kr
                </div>
                <div className="text-xs text-muted-foreground">per måned</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-600 dark:text-green-400 mb-1">Månedlig besparelse</div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">
                  {monthlySavings.toLocaleString('no-NO', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} kr
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  ({savingsPercentage.toFixed(1)}% mindre)
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20">
                <div className="text-sm text-primary mb-1">Årlig besparelse</div>
                <div className="text-lg font-bold text-primary">
                  {annualSavings.toLocaleString('no-NO', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} kr
                </div>
                <div className="text-xs text-primary/80">totalt per år</div>
              </div>
            </div>

            {monthlySavings > 0 && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <Zap className="text-green-600 dark:text-green-400 mt-0.5" size={16} />
                  <div>
                    <div className="font-medium text-green-700 dark:text-green-300">
                      Du kan spare {annualSavings.toLocaleString('no-NO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kr årlig!
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Med ditt månedlige forbruk på {monthlyUsageNum.toLocaleString('no-NO')} kWh kan du spare betydelig på strømregningen.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PowerUsageCalculator;