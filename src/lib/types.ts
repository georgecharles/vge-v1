interface User {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
      banner?: string;
      savedProperties: string[];
      preferences: {
        location: {
          address: string;
          postcode: string;
          coordinates: {
            lat: number;
            lng: number;
          };
        };
      };
      role?: 'user' | 'admin';
    }

    interface Property {
      id: number;
      title: string;
      address: string;
      price: number;
      pricePerSqft: number;
      predictedValue: number;
      bedrooms: number;
      bathrooms: number;
      sqft: number;
      isFixerUpper: boolean;
      imageUrl: string;
      leaseType: 'freehold' | 'leasehold' | 'share of freehold';
      leaseYears?: number;
      isMortgageable: boolean;
      estimatedRevenue: number;
      estimatedSaleDate: string;
      renovationCosts: {
        total: number;
        structural: number;
        interior: number;
        exterior: number;
      };
      location: {
        coordinates: {
          lat: number;
          lng: number;
        };
        postcode: string;
      };
      analysis: {
        priceRating: 'good' | 'bad' | 'average';
        confidence: number;
        marketTrends: {
          priceGrowth: number;
          demandScore: number;
          investmentRating: number;
        };
        structuralIssues: boolean;
        outdatedInterior: boolean;
        exteriorDamage: boolean;
        similarProperties: {
          address: string;
          price: number;
          soldDate: string;
        }[];
      };
    }

    interface PropertyPriceAnalysis {
      priceRating: 'good' | 'bad' | 'average';
      currentPrice: number;
      averagePrice: number;
      medianPrice: number;
      legalCosts: {
        conveyancing: number;
        searches: number;
        landRegistry: number;
      };
      adminCosts: {
        agentFees: number;
        mortgageArrangement: number;
        insurance: number;
      };
      similarProperties: {
        address: string;
        price: number;
        soldDate: string;
      }[];
    }

    interface PropertyTimeline {
      year: number;
      value: number;
      event?: string;
    }

    export type { User, PropertyPriceAnalysis, PropertyTimeline, Property };
