import axios from 'axios';
import { propertyDataCache } from './cache';

interface RightmoveProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  description: string;
  features: string[];
  floorArea?: number;
  propertyType: string;
  addedDate: string;
  analysis: {
    priceRating: 'good' | 'bad' | 'average';
    currentPrice: number;
    averagePrice: number;
    medianPrice: number;
    marketTrends: {
      priceGrowth: number;
      demandScore: number;
      investmentRating: number;
    };
    structuralIssues: boolean;
    outdatedInterior: boolean;
    exteriorDamage: boolean;
  };
}

export function scrapeRightmoveProperties(location: string = 'London'): RightmoveProperty[] {
  const cacheKey = `rightmove-${location}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  // Since we can't actually scrape in the browser, return 9 high-quality mock properties
  const mockProperties: RightmoveProperty[] = [
    // Good Investment Properties
    {
      id: "1234567",
      title: "4 Bedroom Victorian House",
      address: "Primrose Hill, London NW1",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
      ],
      description: "An exceptional Victorian property in prime Primrose Hill. Recently renovated to an impeccable standard with high rental demand and strong capital growth potential.",
      features: [
        "Period features",
        "High-end renovation",
        "South-facing garden",
        "Excellent location",
        "Strong rental demand"
      ],
      floorArea: 2200,
      propertyType: "HOUSE",
      addedDate: "Added today",
      analysis: {
        priceRating: 'good',
        currentPrice: 1250000,
        averagePrice: 1450000,
        medianPrice: 1400000,
        marketTrends: {
          priceGrowth: 8.5,
          demandScore: 9,
          investmentRating: 9
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false
      }
    },
    {
      id: "2345678",
      title: "2 Bedroom Warehouse Conversion",
      address: "Shoreditch, London E1",
      price: 750000,
      bedrooms: 2,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
      ],
      description: "Stunning warehouse conversion in trendy Shoreditch. High ceilings, original features, and excellent rental potential in this sought-after location.",
      features: [
        "Original features",
        "High ceilings",
        "Open-plan living",
        "Secure parking",
        "24/7 concierge"
      ],
      floorArea: 1100,
      propertyType: "APARTMENT",
      addedDate: "Added yesterday",
      analysis: {
        priceRating: 'good',
        currentPrice: 750000,
        averagePrice: 850000,
        medianPrice: 825000,
        marketTrends: {
          priceGrowth: 7.2,
          demandScore: 8,
          investmentRating: 8
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false
      }
    },
    {
      id: "3456789",
      title: "3 Bedroom Garden Flat",
      address: "Greenwich, London SE10",
      price: 625000,
      bedrooms: 3,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        "https://images.unsplash.com/photo-1600573472508-683c5f404e36?w=800&q=80",
        "https://images.unsplash.com/photo-1600566752229-250ed26502a1?w=800&q=80"
      ],
      description: "Beautifully presented garden flat in Greenwich. Recently refurbished with a private garden and excellent transport links.",
      features: [
        "Private garden",
        "Recent refurbishment",
        "Share of freehold",
        "Great transport links",
        "Conservation area"
      ],
      floorArea: 950,
      propertyType: "FLAT",
      addedDate: "Added 2 days ago",
      analysis: {
        priceRating: 'good',
        currentPrice: 625000,
        averagePrice: 695000,
        medianPrice: 675000,
        marketTrends: {
          priceGrowth: 6.8,
          demandScore: 8,
          investmentRating: 8
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false
      }
    },
    // Average Investment Properties
    {
      id: "4567890",
      title: "2 Bedroom Modern Flat",
      address: "Canary Wharf, London E14",
      price: 550000,
      bedrooms: 2,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80"
      ],
      description: "Modern apartment in Canary Wharf with good amenities. Market-standard specification with average rental yields.",
      features: [
        "Concierge service",
        "Balcony",
        "Gym access",
        "Parking available",
        "River views"
      ],
      floorArea: 750,
      propertyType: "FLAT",
      addedDate: "Added 3 days ago",
      analysis: {
        priceRating: 'average',
        currentPrice: 550000,
        averagePrice: 545000,
        medianPrice: 540000,
        marketTrends: {
          priceGrowth: 4.5,
          demandScore: 6,
          investmentRating: 5
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false
      }
    },
    {
      id: "5678901",
      title: "1 Bedroom Period Conversion",
      address: "Islington, London N1",
      price: 425000,
      bedrooms: 1,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
      ],
      description: "Charming one-bedroom conversion in a period building. Some updating required but generally well-maintained.",
      features: [
        "Period features",
        "High ceilings",
        "Communal garden",
        "Chain free",
        "Close to transport"
      ],
      floorArea: 500,
      propertyType: "FLAT",
      addedDate: "Added 4 days ago",
      analysis: {
        priceRating: 'average',
        currentPrice: 425000,
        averagePrice: 420000,
        medianPrice: 415000,
        marketTrends: {
          priceGrowth: 3.8,
          demandScore: 6,
          investmentRating: 5
        },
        structuralIssues: false,
        outdatedInterior: true,
        exteriorDamage: false
      }
    },
    {
      id: "6789012",
      title: "2 Bedroom Maisonette",
      address: "Lewisham, London SE13",
      price: 385000,
      bedrooms: 2,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
        "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80"
      ],
      description: "Two-bedroom maisonette in an improving area. Standard condition with potential for modest improvements.",
      features: [
        "Split level",
        "Private entrance",
        "Small garden",
        "Storage space",
        "Double glazing"
      ],
      floorArea: 700,
      propertyType: "MAISONETTE",
      addedDate: "Added 5 days ago",
      analysis: {
        priceRating: 'average',
        currentPrice: 385000,
        averagePrice: 380000,
        medianPrice: 375000,
        marketTrends: {
          priceGrowth: 3.2,
          demandScore: 5,
          investmentRating: 5
        },
        structuralIssues: false,
        outdatedInterior: true,
        exteriorDamage: false
      }
    },
    // Bad Investment Properties
    {
      id: "7654321",
      title: "3 Bedroom Ex-Council Flat",
      address: "Tower Block, East London E14",
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
      ],
      description: "A three bedroom ex-council flat in need of significant renovation. The property requires complete modernization including new heating system, rewiring, and structural repairs. Located in a high-rise block with known maintenance issues.",
      features: [
        "Needs full renovation",
        "Structural issues",
        "High service charges",
        "Lease concerns",
        "Limited parking"
      ],
      floorArea: 850,
      propertyType: "FLAT",
      addedDate: "Added today",
      analysis: {
        priceRating: 'bad',
        currentPrice: 450000,
        averagePrice: 380000,
        medianPrice: 375000,
        marketTrends: {
          priceGrowth: -2.5,
          demandScore: 4,
          investmentRating: 3
        },
        structuralIssues: true,
        outdatedInterior: true,
        exteriorDamage: true
      }
    },
    {
      id: "8901234",
      title: "2 Bedroom Commercial Conversion",
      address: "Industrial Estate, South London SE16",
      price: 525000,
      bedrooms: 2,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80"
      ],
      description: "A poorly executed commercial-to-residential conversion in a predominantly industrial area. The property suffers from poor sound insulation, inadequate natural light, and ongoing issues with the building management.",
      features: [
        "Poor sound insulation",
        "Limited natural light",
        "High service charges",
        "Management issues",
        "Industrial location"
      ],
      floorArea: 600,
      propertyType: "APARTMENT",
      addedDate: "Added yesterday",
      analysis: {
        priceRating: 'bad',
        currentPrice: 525000,
        averagePrice: 450000,
        medianPrice: 445000,
        marketTrends: {
          priceGrowth: -1.8,
          demandScore: 3,
          investmentRating: 2
        },
        structuralIssues: false,
        outdatedInterior: true,
        exteriorDamage: true
      }
    },
    {
      id: "9876543",
      title: "3 Bedroom New Build Flat",
      address: "Oversupplied Development, North London N17",
      price: 650000,
      bedrooms: 3,
      bathrooms: 3,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
        "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80"
      ],
      description: "A new build apartment in an oversaturated development area with declining values. The property is part of a large-scale development with hundreds of similar units, leading to increased competition and reduced rental demand.",
      features: [
        "Premium pricing",
        "Market oversupply",
        "High competition",
        "Declining area",
        "Investment risks"
      ],
      floorArea: 950,
      propertyType: "FLAT",
      addedDate: "Added 2 days ago",
      analysis: {
        priceRating: 'bad',
        currentPrice: 650000,
        averagePrice: 580000,
        medianPrice: 575000,
        marketTrends: {
          priceGrowth: -3.2,
          demandScore: 3,
          investmentRating: 2
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false
      }
    }
  ];

  propertyDataCache.set(cacheKey, mockProperties);
  return mockProperties;
}
