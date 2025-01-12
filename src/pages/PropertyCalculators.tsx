import { useState } from 'react';
import { Calculator, PoundSterling, TrendingUp, Home } from 'lucide-react';
import { PropertyHero } from '@/components/PropertyHero';
import { MarketWidget } from '@/components/MarketWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PremiumLock } from '@/components/PremiumLock';
import { PortfolioStats } from '@/components/PortfolioStats';
import { useAuth } from '@/lib/context/auth';
import { calculateMortgage, calculateBTLReturns, calculateSAReturns } from '@/lib/calculators';

export function PropertyCalculators() {
  const [activeTab, setActiveTab] = useState('mortgage');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };
  
  // Mortgage Calculator State
  const [mortgageParams, setMortgageParams] = useState({
    propertyPrice: 250000,
    deposit: 50000,
    interestRate: 4.5,
    term: 25
  });

  // Style for input fields with better contrast
  const inputStyle = "bg-navy-900 border-gold-500/20 text-white placeholder:text-gray-500";
  const buttonStyle = "bg-gold-500 text-navy-950 hover:bg-gold-600 font-medium";
  const labelStyle = "text-gray-300";

  // BTL Calculator State
  const [btlParams, setBtlParams] = useState({
    propertyPrice: 250000,
    deposit: 50000,
    interestRate: 4.5,
    term: 25,
    monthlyRent: 1200,
    managementFee: 10,
    maintenanceCost: 1,
    insuranceCost: 30,
    voidPeriods: 1
  });

  // Calculate results
  const mortgageResults = calculateMortgage(mortgageParams);
  const btlResults = calculateBTLReturns(btlParams);

  return (
    <div>
      <PropertyHero
        title="Property Investment Calculators"
        subtitle="Make informed decisions with our comprehensive investment tools"
        imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c">
        <div className="mt-12">
          <PortfolioStats />
        </div>
      </PropertyHero>

      <div className={`max-w-7xl mx-auto px-4 py-16 ${isFullscreen ? 'fixed inset-0 bg-navy-950 z-50 overflow-auto' : ''}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-navy-800">
            <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
            <TabsTrigger value="btl">Buy-to-Let</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="mortgage" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <PremiumLock onAuthClick={handleAuthClick}>
                <MarketWidget id="mortgage-calculator" title="Mortgage Calculator">
                  <div className="p-6 space-y-4">
                    <div>
                      <Label>Property Price</Label>
                      <Input
                        type="number"
                        placeholder="Enter property price"
                        value={mortgageParams.propertyPrice}
                        onChange={(e) => setMortgageParams(prev => ({
                          ...prev,
                          propertyPrice: parseFloat(e.target.value)
                        }))}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <Label>Deposit</Label>
                      <Input
                        type="number"
                        placeholder="Enter deposit amount"
                        value={mortgageParams.deposit}
                        onChange={(e) => setMortgageParams(prev => ({
                          ...prev,
                          deposit: parseFloat(e.target.value)
                        }))}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <Label>Interest Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Enter interest rate"
                        value={mortgageParams.interestRate}
                        onChange={(e) => setMortgageParams(prev => ({
                          ...prev,
                          interestRate: parseFloat(e.target.value)
                        }))}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <Label>Term (years)</Label>
                      <Input
                        type="number"
                        placeholder="Enter term in years"
                        value={mortgageParams.term}
                        onChange={(e) => setMortgageParams(prev => ({
                          ...prev,
                          term: parseInt(e.target.value)
                        }))}
                        className={inputStyle}
                      />
                    </div>
                    <Button type="submit" className={buttonStyle}>
                      Calculate
                    </Button>
                  </div>
                </MarketWidget>
                </PremiumLock>

              <PremiumLock onAuthClick={handleAuthClick}>
                <MarketWidget id="mortgage-results" title="Results">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Monthly Payment</div>
                        <div className="text-xl font-semibold text-white">
                          £{mortgageResults.monthlyPayment.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Total Interest</div>
                        <div className="text-xl font-semibold text-white">
                          £{mortgageResults.totalInterest.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </MarketWidget>
              </PremiumLock>
            </div>
          </TabsContent>

          <TabsContent value="btl" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <PremiumLock onAuthClick={handleAuthClick}>
                <MarketWidget id="btl-calculator" title="Buy-to-Let Calculator">
                  <div className="p-6 space-y-4">
                    <div>
                      <Label>Property Price</Label>
                      <Input
                        type="number"
                        value={btlParams.propertyPrice}
                        onChange={(e) => setBtlParams(prev => ({
                          ...prev,
                          propertyPrice: parseFloat(e.target.value)
                        }))}
                        className="bg-navy-800 border-gold-500/20"
                      />
                    </div>
                    <div>
                      <Label>Monthly Rent</Label>
                      <Input
                        type="number"
                        value={btlParams.monthlyRent}
                        onChange={(e) => setBtlParams(prev => ({
                          ...prev,
                          monthlyRent: parseFloat(e.target.value)
                        }))}
                        className="bg-navy-800 border-gold-500/20"
                      />
                    </div>
                    <div>
                      <Label>Management Fee (%)</Label>
                      <Input
                        type="number"
                        value={btlParams.managementFee}
                        onChange={(e) => setBtlParams(prev => ({
                          ...prev,
                          managementFee: parseFloat(e.target.value)
                        }))}
                        className="bg-navy-800 border-gold-500/20"
                      />
                    </div>
                  </div>
                </MarketWidget>
                </PremiumLock>

              <PremiumLock onAuthClick={handleAuthClick}>
                <MarketWidget id="btl-results" title="Results">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Annual Income</div>
                        <div className="text-xl font-semibold text-white">
                          £{btlResults.annualIncome.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Net Yield</div>
                        <div className="text-xl font-semibold text-white">
                          {btlResults.yieldNet.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </MarketWidget>
              </PremiumLock>
            </div>
          </TabsContent>

          <TabsContent value="development" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <MarketWidget id="development-calculator" title="Development Calculator">
                <div className="p-6 text-center">
                  <p className="text-gray-400">Coming soon</p>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <div className="grid md:grid-cols-3 gap-8">
              <MarketWidget id="comparison-calculator" title="Investment Comparison">
                <div className="p-6 text-center">
                  <p className="text-gray-400">Coming soon</p>
                </div>
              </MarketWidget>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
