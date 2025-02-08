import { imageAnalysisCache } from './cache';
    import { deepseekChat, deepseekVisionChat } from './deepseek';
    import { getMarketData, getNeighborhoodStats } from './marketData';

    interface RenovationEstimate {
      totalCost: number;
      breakdown: {
        structural: number;
        interior: number;
        exterior: number;
      };
    }

    interface PropertyAnalysis {
      isFixerUpper: boolean;
      confidence: number;
      details: {
        structuralIssues: boolean;
        outdatedInterior: boolean;
        exteriorDamage: boolean;
        potentialValue: number;
        renovationEstimate: RenovationEstimate;
      };
    }

    async function analyzeMultipleImages(imageUrls: string[]): Promise<{
      isFixerUpper: boolean;
      confidence: number;
      details: {
        structuralIssues: boolean;
        outdatedInterior: boolean;
        exteriorDamage: boolean;
        potentialValue: number;
      };
    }> {
      const cacheKey = `image-analysis-${imageUrls.join('-')}`;
      const cached = imageAnalysisCache.get(cacheKey);
      if (cached) {
        return cached;
      }

      const messages = imageUrls.map(url => ({
        role: 'user' as const,
        content: [
          { type: 'text', text: 'Analyze this property image for structural issues, outdated interior, and exterior damage. Provide a JSON response with boolean values for each.' },
          { type: 'image_url', image_url: { url } }
        ]
      }));

      const response = await deepseekVisionChat(messages, 'deepseek-vision');

      let analysis = {
        isFixerUpper: false,
        confidence: 70,
        details: {
          structuralIssues: false,
          outdatedInterior: false,
          exteriorDamage: false,
          potentialValue: 0
        }
      };

      if (response) {
        try {
          const parsedResponse = JSON.parse(response);
          analysis = {
            isFixerUpper: parsedResponse.structuralIssues || parsedResponse.outdatedInterior || parsedResponse.exteriorDamage,
            confidence: 85,
            details: {
              structuralIssues: parsedResponse.structuralIssues || false,
              outdatedInterior: parsedResponse.outdatedInterior || false,
              exteriorDamage: parsedResponse.exteriorDamage || false,
              potentialValue: 0
            }
          };
        } catch (e) {
          console.error('Error parsing DeepSeek response:', e);
        }
      }

      imageAnalysisCache.set(cacheKey, analysis);
      return analysis;
    }

    function calculateRenovationCosts(
      propertyPrice: number,
      analysis: {
        structuralIssues: boolean;
        outdatedInterior: boolean;
        exteriorDamage: boolean;
      }
    ): RenovationEstimate {
      const baseRate = propertyPrice * 0.15; // Base renovation rate is 15% of property value
      
      const structural = analysis.structuralIssues ? baseRate * 0.5 : 0;
      const interior = analysis.outdatedInterior ? baseRate * 0.3 : 0;
      const exterior = analysis.exteriorDamage ? baseRate * 0.2 : 0;
      
      return {
        totalCost: structural + interior + exterior,
        breakdown: {
          structural,
          interior,
          exterior
        }
      };
    }

    function calculateMarketAdjustedPotentialValue(
      potentialValue: number,
      marketData: any,
      neighborhoodStats: any,
      currentPrice: number
    ): number {
      // Placeholder for market adjustment logic
      return currentPrice * (1 + (marketData.priceGrowth / 100));
    }

    export async function analyzeProperty(
      imageUrls: string[],
      location: string,
      currentPrice: number
    ): Promise<PropertyAnalysis> {
      const imageAnalysis = await analyzeMultipleImages(imageUrls);
      const marketData = getMarketData(location);
      const neighborhoodStats = getNeighborhoodStats(location);

      const renovationEstimate = calculateRenovationCosts(currentPrice, imageAnalysis.details);

      return {
        ...imageAnalysis,
        details: {
          ...imageAnalysis.details,
          potentialValue: calculateMarketAdjustedPotentialValue(
            imageAnalysis.details.potentialValue,
            marketData,
            neighborhoodStats,
            currentPrice
          ),
          renovationEstimate
        },
      };
    }
