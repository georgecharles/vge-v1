import { Calculator, TrendingUp, PieChart, Building2, PoundSterling, Home, Target } from 'lucide-react';
    import { useAuth } from '@/lib/context/auth';
    import { useState, useEffect } from 'react';
    import { generateMockProperties } from '@/lib/mockData';
    import { calculatePortfolioMetrics } from '@/lib/portfolio';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Progress } from '@/components/ui/progress';
    import { Label } from '@/components/ui/label';

    interface PortfolioTargets {
      totalValue: number;
      monthlyRevenue: number;
      averageYield: number;
      predictedGrowth: number;
      totalProperties: number;
    }

    interface PortfolioStatsProps {
      selectedProperties?: string[];
    }

    export function PortfolioStats({ selectedProperties }: PortfolioStatsProps) {
      const { user } = useAuth();
      const [portfolioMetrics, setPortfolioMetrics] = useState(() => 
        calculatePortfolioMetrics([])
      );
      const [isTargetsModalOpen, setIsTargetsModalOpen] = useState(false);
      const [targets, setTargets] = useState<PortfolioTargets>(() => {
        const saved = localStorage.getItem('portfolio_targets');
        return saved ? JSON.parse(saved) : {
          totalValue: 5000000,
          monthlyRevenue: 25000,
          averageYield: 12,
          predictedGrowth: 15,
          totalProperties: 20
        };
      });
      const [simulationResults, setSimulationResults] = useState<any>(null);

      const handleTargetChange = (key: keyof PortfolioTargets, value: string) => {
        const numValue = parseFloat(value) || 0;
        setTargets(prev => ({ ...prev, [key]: numValue }));
      };

      const handleSaveTargets = () => {
        localStorage.setItem('portfolio_targets', JSON.stringify(targets));
        setIsTargetsModalOpen(false);
      };

      const getMetricColor = (current: number, target: number) => {
        const percentage = (current / target) * 100;
        if (percentage >= 100) return 'text-emerald-400';
        if (percentage >= 75) return 'text-yellow-400';
        return 'text-red-400';
      };

      const getProgressValue = (current: number, target: number) => {
        return Math.min((current / target) * 100, 100);
      };

      useEffect(() => {
        const loadPortfolioStats = async () => {
          if (user?.savedProperties.length) {
            const allProperties = await generateMockProperties(20);
            const userSaved = allProperties.filter(p => 
              user.savedProperties.includes(p.id.toString())
            );
            setPortfolioMetrics(calculatePortfolioMetrics(userSaved));
          }
        };

        loadPortfolioStats();
      }, [user?.savedProperties]);

      const handleSimulate = async () => {
        if (selectedProperties && selectedProperties.length === 2) {
          const allProperties = await generateMockProperties(20);
          const selected = allProperties.filter(p => selectedProperties.includes(p.id.toString()));
          if (selected.length === 2) {
            const [propertyA, propertyB] = selected;
            const newTotalValue = portfolioMetrics.totalValue - propertyA.price + propertyB.price;
            const newPotentialProfit = portfolioMetrics.potentialProfit - (propertyA.analysis.marketTrends.priceGrowth - propertyA.price) + (propertyB.analysis.marketTrends.priceGrowth - propertyB.price);
            const newMonthlyRevenue = portfolioMetrics.monthlyRevenue - propertyA.estimatedRevenue + propertyB.estimatedRevenue;
            const newAverageYield = ((newMonthlyRevenue * 12) / newTotalValue) * 100;
            const newPredictedGrowth = ((newTotalValue - portfolioMetrics.totalValue) / portfolioMetrics.totalValue) * 100;

            setSimulationResults({
              newTotalValue,
              newPotentialProfit,
              newMonthlyRevenue,
              newAverageYield,
              newPredictedGrowth
            });
          }
        } else {
          setSimulationResults(null);
        }
      };

      return (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-light text-white">Portfolio Performance</h3>
              <Button 
                variant="outline" 
                className="border-gold-500/20"
                onClick={() => setIsTargetsModalOpen(true)}
              >
                <Target className="w-4 h-4 mr-2" />
                Set Targets
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <Calculator className="w-5 h-5 text-gold-400 mb-2" />
                <div className={`text-lg font-light ${getMetricColor(portfolioMetrics.totalValue, targets.totalValue)}`}>
                  £{portfolioMetrics.totalValue.toLocaleString()} 
                  <span className="text-sm text-gray-400">/ £{targets.totalValue.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-400">Portfolio Value</div>
                <Progress 
                  value={getProgressValue(portfolioMetrics.totalValue, targets.totalValue)} 
                  className="h-1 mt-2"
                />
              </div>
              
              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="text-lg font-light text-emerald-400">
                  £{portfolioMetrics.potentialProfit.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Potential Profit</div>
              </div>
              
              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <PieChart className="w-5 h-5 text-gold-400 mb-2" />
                <div className={`text-lg font-light ${getMetricColor(portfolioMetrics.averageYield, targets.averageYield)}`}>
                  {portfolioMetrics.averageYield.toFixed(1)}%
                  <span className="text-sm text-gray-400">/ {targets.averageYield}%</span>
                </div>
                <div className="text-sm text-gray-400">Average Yield</div>
                <Progress 
                  value={getProgressValue(portfolioMetrics.averageYield, targets.averageYield)} 
                  className="h-1 mt-2"
                />
              </div>
              
              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <Building2 className="w-5 h-5 text-gold-400 mb-2" />
                <div className={`text-lg font-light ${getMetricColor(portfolioMetrics.predictedGrowth, targets.predictedGrowth)}`}>
                  {portfolioMetrics.predictedGrowth.toFixed(1)}%
                  <span className="text-sm text-gray-400">/ {targets.predictedGrowth}%</span>
                </div>
                <div className="text-sm text-gray-400">Predicted Growth</div>
                <Progress 
                  value={getProgressValue(portfolioMetrics.predictedGrowth, targets.predictedGrowth)} 
                  className="h-1 mt-2"
                />
              </div>

              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <PoundSterling className="w-5 h-5 text-gold-400 mb-2" />
                <div className={`text-lg font-light ${getMetricColor(portfolioMetrics.monthlyRevenue, targets.monthlyRevenue)}`}>
                  £{portfolioMetrics.monthlyRevenue.toLocaleString()}
                  <span className="text-sm text-gray-400">/ £{targets.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-400">Monthly Revenue</div>
                <Progress 
                  value={getProgressValue(portfolioMetrics.monthlyRevenue, targets.monthlyRevenue)} 
                  className="h-1 mt-2"
                />
              </div>

              <div className="glass-card p-4 hover:scale-[1.02] transition-all duration-300">
                <Home className="w-5 h-5 text-gold-400 mb-2" />
                <div className="text-lg font-light text-white">
                  {portfolioMetrics.totalProperties} / {targets.totalProperties}
                </div>
                <div className="text-sm text-gray-400">Properties</div>
                <Progress 
                  value={getProgressValue(portfolioMetrics.totalProperties, targets.totalProperties)} 
                  className="h-1 mt-2"
                />
              </div>
            </div>
            
            {selectedProperties && selectedProperties.length === 2 && (
              <div className="flex justify-end mt-4">
                <Button onClick={handleSimulate} className="bg-gold-500 text-navy-950 hover:bg-gold-600">
                  Simulate
                </Button>
              </div>
            )}

            {simulationResults && (
              <div className="mt-8 bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
                <h4 className="text-lg font-light text-white mb-4">Simulation Results</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">New Portfolio Value</div>
                    <div className="text-xl font-light text-white">£{simulationResults.newTotalValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">New Potential Profit</div>
                    <div className="text-xl font-light text-white">£{simulationResults.newPotentialProfit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">New Monthly Revenue</div>
                    <div className="text-xl font-light text-white">£{simulationResults.newMonthlyRevenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">New Average Yield</div>
                    <div className="text-xl font-light text-white">{simulationResults.newAverageYield.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">New Predicted Growth</div>
                    <div className="text-xl font-light text-white">{simulationResults.newPredictedGrowth.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Dialog open={isTargetsModalOpen} onOpenChange={setIsTargetsModalOpen}>
            <DialogContent className="bg-navy-900 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-light">
                  <Target className="w-5 h-5 text-gold-400" />
                  Portfolio Targets
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Portfolio Value Target (£)</Label>
                  <Input
                    type="number"
                    value={targets.totalValue.toString()}
                    onChange={(e) => handleTargetChange('totalValue', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Monthly Revenue Target (£)</Label>
                  <Input
                    type="number"
                    value={targets.monthlyRevenue.toString()}
                    onChange={(e) => handleTargetChange('monthlyRevenue', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Average Yield Target (%)</Label>
                  <Input
                    type="number"
                    value={targets.averageYield.toString()}
                    onChange={(e) => handleTargetChange('averageYield', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Growth Target (%)</Label>
                  <Input
                    type="number"
                    value={targets.predictedGrowth.toString()}
                    onChange={(e) => handleTargetChange('predictedGrowth', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Total Properties Target</Label>
                  <Input
                    type="number"
                    value={targets.totalProperties.toString()}
                    onChange={(e) => handleTargetChange('totalProperties', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveTargets} className="bg-gold-500 text-navy-950 hover:bg-gold-600">
                  Save Targets
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    }
