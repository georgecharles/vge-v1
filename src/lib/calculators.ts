interface MortgageParams {
      propertyPrice: number;
      deposit: number;
      interestRate: number;
      term: number;
    }

    interface BTLParams extends MortgageParams {
      monthlyRent: number;
      managementFee?: number;
      maintenanceCost?: number;
      insuranceCost?: number;
      voidPeriods?: number;
    }

    interface SAParams extends BTLParams {
      nightlyRate: number;
      occupancyRate: number;
      cleaningCost: number;
      platformFees: number;
    }

    interface DevelopmentParams {
      purchasePrice: number;
      renovationCost: number;
      otherCosts: number;
      expectedSalePrice: number;
    }

    interface ComparisonParams {
      propertyA: {
        price: number;
        monthlyRent: number;
        managementFee: number;
      };
      propertyB: {
        price: number;
        monthlyRent: number;
        managementFee: number;
      };
    }

    export function calculateMortgage({
      propertyPrice,
      deposit,
      interestRate,
      term
    }: MortgageParams) {
      const loanAmount = propertyPrice - deposit;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = term * 12;

      const monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      return {
        monthlyPayment,
        totalPayable: monthlyPayment * numberOfPayments,
        totalInterest: (monthlyPayment * numberOfPayments) - loanAmount
      };
    }

    export function calculateBTLReturns({
      propertyPrice,
      deposit,
      interestRate,
      term,
      monthlyRent,
      managementFee = 10,
      maintenanceCost = 1,
      insuranceCost = 30,
      voidPeriods = 4
    }: BTLParams) {
      const mortgage = calculateMortgage({ propertyPrice, deposit, interestRate, term });
      
      // Annual calculations
      const annualRent = monthlyRent * (12 - voidPeriods);
      const annualManagementFee = (managementFee / 100) * annualRent;
      const annualMaintenance = (maintenanceCost / 100) * propertyPrice;
      const annualInsurance = insuranceCost * 12;
      const annualMortgage = mortgage.monthlyPayment * 12;

      const netIncome = annualRent - annualManagementFee - annualMaintenance - annualInsurance - annualMortgage;
      const roi = (netIncome / deposit) * 100;
      const yieldGross = (annualRent / propertyPrice) * 100;
      const yieldNet = (netIncome / propertyPrice) * 100;

      return {
        monthlyMortgage: mortgage.monthlyPayment,
        annualIncome: annualRent,
        annualCosts: annualManagementFee + annualMaintenance + annualInsurance + annualMortgage,
        netIncome,
        roi,
        yieldGross,
        yieldNet
      };
    }

    export function calculateSAReturns({
      propertyPrice,
      deposit,
      interestRate,
      term,
      nightlyRate,
      occupancyRate,
      cleaningCost,
      platformFees,
      ...btlParams
    }: SAParams) {
      // Calculate base BTL metrics
      const btlReturns = calculateBTLReturns({
        propertyPrice,
        deposit,
        interestRate,
        term,
        ...btlParams
      });

      // Calculate SA specific metrics
      const annualNights = Math.floor(365 * (occupancyRate / 100));
      const annualRevenue = nightlyRate * annualNights;
      const annualCleaning = cleaningCost * annualNights;
      const annualPlatformFees = (platformFees / 100) * annualRevenue;

      const netIncome = annualRevenue - annualCleaning - annualPlatformFees - btlReturns.annualCosts;
      const roi = (netIncome / deposit) * 100;
      const yieldGross = (annualRevenue / propertyPrice) * 100;
      const yieldNet = (netIncome / propertyPrice) * 100;

      return {
        ...btlReturns,
        annualRevenue,
        annualCleaning,
        annualPlatformFees,
        netIncome,
        roi,
        yieldGross,
        yieldNet,
        potentialUplift: ((netIncome - btlReturns.netIncome) / btlReturns.netIncome) * 100
      };
    }

    export function calculateDevelopment({
      purchasePrice,
      renovationCost,
      otherCosts,
      expectedSalePrice
    }: DevelopmentParams) {
      const totalCost = purchasePrice + renovationCost + otherCosts;
      const profit = expectedSalePrice - totalCost;
      const roi = (profit / totalCost) * 100;

      return {
        totalCost,
        profit,
        roi
      };
    }

    export function compareInvestments({
      propertyA,
      propertyB
    }: ComparisonParams) {
      const propertyANetIncome = propertyA.monthlyRent * 12 * (1 - (propertyA.managementFee / 100));
      const propertyBNetIncome = propertyB.monthlyRent * 12 * (1 - (propertyB.managementFee / 100));

      const propertyAYield = (propertyANetIncome / propertyA.price) * 100;
      const propertyBYield = (propertyBNetIncome / propertyB.price) * 100;

      return {
        propertyA: {
          netIncome: propertyANetIncome,
          yield: propertyAYield
        },
        propertyB: {
          netIncome: propertyBNetIncome,
          yield: propertyBYield
        }
      };
    }

    export function calculateStampDuty(propertyPrice: number): number {
      let stampDuty = 0;
      if (propertyPrice <= 250000) {
        stampDuty = 0;
      } else if (propertyPrice <= 925000) {
        stampDuty = (propertyPrice - 250000) * 0.05;
      } else if (propertyPrice <= 1500000) {
        stampDuty = (propertyPrice - 925000) * 0.1 + 33750;
      } else {
        stampDuty = (propertyPrice - 1500000) * 0.12 + 91250;
      }
      return stampDuty;
    }

    export function calculateRentalYield(propertyPrice: number, monthlyRent: number): { grossYield: number, netYield: number } {
      const annualRent = monthlyRent * 12;
      const grossYield = (annualRent / propertyPrice) * 100;
      const netYield = grossYield * 0.8; // Assuming 20% expenses
      return { grossYield, netYield };
    }

    export function calculateROI(propertyPrice: number, deposit: number, profit: number): number {
      const investment = propertyPrice - deposit;
      return (profit / investment) * 100;
    }
