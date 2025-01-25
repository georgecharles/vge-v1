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
    import { calculateMortgage, calculateBTLReturns, calculateSAReturns, calculateDevelopment, compareInvestments, calculateStampDuty, calculateRentalYield, calculateROI } from '@/lib/calculators';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";

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
      const inputStyle = "bg-black-900 border-gold-500/20 text-white placeholder:text-gray-400";
      const buttonStyle = "w-full bg-gold-500 text-black-950 hover:bg-gold-600 font-medium";
      const labelStyle = "text-white mb-2 block";

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

      // Development Calculator State
      const [devParams, setDevParams] = useState({
        purchasePrice: 300000,
        renovationCost: 100000,
        otherCosts: 20000,
        expectedSalePrice: 500000
      });

      // Investment Comparison State
      const [comparisonParams, setComparisonParams] = useState({
        propertyA: {
          price: 250000,
          monthlyRent: 1200,
          managementFee: 10
        },
        propertyB: {
          price: 300000,
          monthlyRent: 1500,
          managementFee: 10
        }
      });

      // Stamp Duty Calculator State
      const [stampDutyPrice, setStampDutyPrice] = useState(250000);

      // Rental Yield Calculator State
      const [rentalYieldParams, setRentalYieldParams] = useState({
        propertyPrice: 250000,
        monthlyRent: 1200
      });

      // ROI Calculator State
      const [roiParams, setRoiParams] = useState({
        propertyPrice: 250000,
        deposit: 50000,
        profit: 50000
      });

      // Calculate results
      const mortgageResults = calculateMortgage(mortgageParams);
      const btlResults = calculateBTLReturns(btlParams);
      const saResults = calculateSAReturns({
        ...btlParams,
        nightlyRate: 100,
        occupancyRate: 70,
        cleaningCost: 20,
        platformFees: 15
      });
      const devResults = calculateDevelopment(devParams);
      const comparisonResults = compareInvestments(comparisonParams);
      const stampDuty = calculateStampDuty(stampDutyPrice);
      const rentalYield = calculateRentalYield(rentalYieldParams.propertyPrice, rentalYieldParams.monthlyRent);
      const roi = calculateROI(roiParams.propertyPrice, roiParams.deposit, roiParams.profit);

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
                <TabsTrigger value="stampduty">Stamp Duty</TabsTrigger>
                <TabsTrigger value="yield">Rental Yield</TabsTrigger>
                <TabsTrigger value="roi">Return on Investment</TabsTrigger>
              </TabsList>

              <TabsContent value="mortgage" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <PremiumLock onAuthClick={handleAuthClick}>
                    <MarketWidget id="mortgage-calculator" title="Mortgage Calculator">
                      <div className="p-6 space-y-4">
                        <div>
                          <Label className={labelStyle}>Property Price</Label>
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
                          <Label className={labelStyle}>Deposit</Label>
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
                          <Label className={labelStyle}>Interest Rate (%)</Label>
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
                          <Label className={labelStyle}>Term (years)</Label>
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
                              £{mortgageResults?.monthlyPayment?.toFixed(2) || '0.00'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Total Interest</div>
                            <div className="text-xl font-semibold text-white">
                              £{mortgageResults?.totalInterest?.toFixed(2) || '0.00'}
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
                          <Label className={labelStyle}>Property Price</Label>
                          <Input
                            type="number"
                            placeholder="Enter property price"
                            value={btlParams.propertyPrice}
                            onChange={(e) => setBtlParams(prev => ({
                              ...prev,
                              propertyPrice: parseFloat(e.target.value)
                            }))}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <Label className={labelStyle}>Monthly Rent</Label>
                          <Input
                            type="number"
                            placeholder="Enter monthly rent"
                            value={btlParams.monthlyRent}
                            onChange={(e) => setBtlParams(prev => ({
                              ...prev,
                              monthlyRent: parseFloat(e.target.value)
                            }))}
                            className={inputStyle}
                          />
                        </div>
                        <div>
                          <Label className={labelStyle}>Management Fee (%)</Label>
                          <Input
                            type="number"
                            placeholder="Enter management fee"
                            value={btlParams.managementFee}
                            onChange={(e) => setBtlParams(prev => ({
                              ...prev,
                              managementFee: parseFloat(e.target.value)
                            }))}
                            className={inputStyle}
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
                              £{btlResults?.annualIncome?.toFixed(2) || '0.00'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Net Yield</div>
                            <div className="text-xl font-semibold text-white">
                              {btlResults?.yieldNet?.toFixed(2) || '0.00'}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </MarketWidget>
                  </PremiumLock>
                </div>
              </TabsContent>

              <TabsContent value="development" className="mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="development-calculator" title="Development Calculator">
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className={labelStyle}>Purchase Price</Label>
                        <Input
                          type="number"
                          placeholder="Enter purchase price"
                          value={devParams.purchasePrice}
                          onChange={(e) => setDevParams(prev => ({
                            ...prev,
                            purchasePrice: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Renovation Cost</Label>
                        <Input
                          type="number"
                          placeholder="Enter renovation cost"
                          value={devParams.renovationCost}
                          onChange={(e) => setDevParams(prev => ({
                            ...prev,
                            renovationCost: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Other Costs</Label>
                        <Input
                          type="number"
                          placeholder="Enter other costs"
                          value={devParams.otherCosts}
                          onChange={(e) => setDevParams(prev => ({
                            ...prev,
                            otherCosts: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Expected Sale Price</Label>
                        <Input
                          type="number"
                          placeholder="Enter expected sale price"
                          value={devParams.expectedSalePrice}
                          onChange={(e) => setDevParams(prev => ({
                            ...prev,
                            expectedSalePrice: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Total Cost</div>
                        <div className="text-xl font-semibold text-white">
                          £{devResults?.totalCost?.toLocaleString() || '0'}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Profit</div>
                        <div className="text-xl font-semibold text-white">
                          £{devResults?.profit?.toLocaleString() || '0'}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">ROI</div>
                        <div className="text-xl font-semibold text-white">
                          {devResults?.roi?.toFixed(2) || '0'}%
                        </div>
                      </div>
                    </div>
                  </MarketWidget>
                </PremiumLock>
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="comparison-calculator" title="Investment Comparison">
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-lg font-light text-white mb-4">Property A</h4>
                        <div className="space-y-2">
                          <Label className={labelStyle}>Price</Label>
                          <Input
                            type="number"
                            placeholder="Enter property price"
                            value={comparisonParams.propertyA.price}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyA: {
                                ...prev.propertyA,
                                price: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                          <Label className={labelStyle}>Monthly Rent</Label>
                          <Input
                            type="number"
                            placeholder="Enter monthly rent"
                            value={comparisonParams.propertyA.monthlyRent}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyA: {
                                ...prev.propertyA,
                                monthlyRent: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                          <Label className={labelStyle}>Management Fee (%)</Label>
                          <Input
                            type="number"
                            placeholder="Enter management fee"
                            value={comparisonParams.propertyA.managementFee}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyA: {
                                ...prev.propertyA,
                                managementFee: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-light text-white mb-4">Property B</h4>
                        <div className="space-y-2">
                          <Label className={labelStyle}>Price</Label>
                          <Input
                            type="number"
                            placeholder="Enter property price"
                            value={comparisonParams.propertyB.price}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyB: {
                                ...prev.propertyB,
                                price: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                          <Label className={labelStyle}>Monthly Rent</Label>
                          <Input
                            type="number"
                            placeholder="Enter monthly rent"
                            value={comparisonParams.propertyB.monthlyRent}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyB: {
                                ...prev.propertyB,
                                monthlyRent: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                          <Label className={labelStyle}>Management Fee (%)</Label>
                          <Input
                            type="number"
                            placeholder="Enter management fee"
                            value={comparisonParams.propertyB.managementFee}
                            onChange={(e) => setComparisonParams(prev => ({
                              ...prev,
                              propertyB: {
                                ...prev.propertyB,
                                managementFee: parseFloat(e.target.value)
                              }
                            }))}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Property A Net Income</div>
                        <div className="text-xl font-semibold text-white">
                          £{comparisonResults?.propertyA?.netIncome?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Property A Yield</div>
                        <div className="text-xl font-semibold text-white">
                          {comparisonResults?.propertyA?.yield?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Property B Net Income</div>
                        <div className="text-xl font-semibold text-white">
                          £{comparisonResults?.propertyB?.netIncome?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Property B Yield</div>
                        <div className="text-xl font-semibold text-white">
                          {comparisonResults?.propertyB?.yield?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                    </div>
                  </MarketWidget>
                </PremiumLock>
              </TabsContent>

              <TabsContent value="stampduty" className="mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="stampduty-calculator" title="Stamp Duty Calculator">
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className={labelStyle}>Property Price</Label>
                        <Input
                          type="number"
                          placeholder="Enter property price"
                          value={stampDutyPrice}
                          onChange={(e) => setStampDutyPrice(parseFloat(e.target.value))}
                          className={inputStyle}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Stamp Duty</div>
                        <div className="text-xl font-semibold text-white">
                          £{stampDuty.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </MarketWidget>
                </PremiumLock>
              </TabsContent>

              <TabsContent value="yield" className="mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="yield-calculator" title="Rental Yield Calculator">
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className={labelStyle}>Property Price</Label>
                        <Input
                          type="number"
                          placeholder="Enter property price"
                          value={rentalYieldParams.propertyPrice}
                          onChange={(e) => setRentalYieldParams(prev => ({
                            ...prev,
                            propertyPrice: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Monthly Rent</Label>
                        <Input
                          type="number"
                          placeholder="Enter monthly rent"
                          value={rentalYieldParams.monthlyRent}
                          onChange={(e) => setRentalYieldParams(prev => ({
                            ...prev,
                            monthlyRent: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Gross Yield</div>
                        <div className="text-xl font-semibold text-white">
                          {rentalYield?.grossYield?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Net Yield</div>
                        <div className="text-xl font-semibold text-white">
                          {rentalYield?.netYield?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                    </div>
                  </MarketWidget>
                </PremiumLock>
              </TabsContent>

              <TabsContent value="roi" className="mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="roi-calculator" title="Return on Investment Calculator">
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className={labelStyle}>Property Price</Label>
                        <Input
                          type="number"
                          placeholder="Enter property price"
                          value={roiParams.propertyPrice}
                          onChange={(e) => setRoiParams(prev => ({
                            ...prev,
                            propertyPrice: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Deposit</Label>
                        <Input
                          type="number"
                          placeholder="Enter deposit amount"
                          value={roiParams.deposit}
                          onChange={(e) => setRoiParams(prev => ({
                            ...prev,
                            deposit: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <Label className={labelStyle}>Profit</Label>
                        <Input
                          type="number"
                          placeholder="Enter profit"
                          value={roiParams.profit}
                          onChange={(e) => setRoiParams(prev => ({
                            ...prev,
                            profit: parseFloat(e.target.value)
                          }))}
                          className={inputStyle}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-400">Return on Investment</div>
                        <div className="text-xl font-semibold text-white">
                          {roi?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                    </div>
                  </MarketWidget>
                </PremiumLock>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      );
    }
