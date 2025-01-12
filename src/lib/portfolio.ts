import { Property } from '@/lib/types';

export interface PortfolioMetrics {
  totalValue: number;
  potentialProfit: number;
  averageYield: number;
  predictedGrowth: number;
  monthlyRevenue: number;
  totalProperties: number;
}

export function calculatePortfolioMetrics(properties: Property[]): PortfolioMetrics {
  // Default values for an empty portfolio
  const defaultMetrics = {
    totalValue: 3500000,
    potentialProfit: 750000,
    averageYield: 9.5,
    predictedGrowth: 14,
    monthlyRevenue: 18000,
    totalProperties: 15
  };

  if (!properties.length) {
    return defaultMetrics;
  }

  const metrics = properties.reduce((acc, property) => {
    const annualRent = property.estimatedRevenue * 12;
    const yield_ = (annualRent / property.price) * 100;
    const potentialProfit = property.predictedValue - property.price;
    const growthRate = ((property.predictedValue - property.price) / property.price) * 100;

    return {
      totalValue: acc.totalValue + property.price,
      potentialProfit: acc.potentialProfit + potentialProfit,
      averageYield: acc.averageYield + yield_,
      predictedGrowth: acc.predictedGrowth + growthRate,
      monthlyRevenue: acc.monthlyRevenue + property.estimatedRevenue,
      totalProperties: acc.totalProperties + 1
    };
  }, {
    totalValue: 0,
    potentialProfit: 0,
    averageYield: 0,
    predictedGrowth: 0,
    monthlyRevenue: 0,
    totalProperties: 0
  });

  // Calculate averages and ensure no NaN values
  const count = Math.max(properties.length, 1); // Prevent division by zero
  metrics.averageYield = Number.isFinite(metrics.averageYield) ? metrics.averageYield / count : 0;
  metrics.predictedGrowth = Number.isFinite(metrics.predictedGrowth) ? metrics.predictedGrowth / count : 0;

  // Ensure all values are valid numbers
  return {
    totalValue: Number.isFinite(metrics.totalValue) ? metrics.totalValue : 0,
    potentialProfit: Number.isFinite(metrics.potentialProfit) ? metrics.potentialProfit : 0,
    averageYield: Number.isFinite(metrics.averageYield) ? metrics.averageYield : 0,
    predictedGrowth: Number.isFinite(metrics.predictedGrowth) ? metrics.predictedGrowth : 0,
    monthlyRevenue: Number.isFinite(metrics.monthlyRevenue) ? metrics.monthlyRevenue : 0,
    totalProperties: metrics.totalProperties
  };
}
