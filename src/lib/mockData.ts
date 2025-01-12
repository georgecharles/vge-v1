// Mock data constants
export const LOCATIONS = [
  "Mayfair",
  "Knightsbridge",
  "Chelsea",
  "Kensington",
  "Notting Hill",
  "Richmond",
  "Hampstead",
  "Islington",
  "Shoreditch",
  "Canary Wharf"
];

export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "penthouse",
  "maisonette",
  "townhouse"
];

export const LEASE_TYPES = [
  "freehold",
  "leasehold",
  "share of freehold"
];

export const FEATURES = [
  "Underfloor Heating",
  "Private Garden",
  "Roof Terrace",
  "Concierge Service",
  "Parking Space",
  "Lift Access",
  "Period Features",
  "Smart Home System",
  "Air Conditioning",
  "High Ceilings",
  "Open-Plan Living",
  "Balcony"
];

// High-quality property images from Unsplash
export const PROPERTY_IMAGES = [
  [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
  ]
];

// Generate mock properties
export function generateMockProperties(count: number = 10) {
  const londonProperties = [
    {
      id: "1234567",
      title: "4 Bedroom Victorian House",
      address: "Primrose Hill, London NW1",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
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
      propertyType: "HOUSE",
      leaseType: "freehold",
      isMortgageable: true,
      estimatedRevenue: 5000,
      estimatedSaleDate: "March 2024",
      renovationCosts: {
        total: 0,
        structural: 0,
        interior: 0,
        exterior: 0
      },
      location: {
        coordinates: { lat: 51.5074, lng: -0.1278 },
        postcode: "NW1 8XL"
      },
      analysis: {
        priceRating: 'good',
        confidence: 85,
        marketTrends: {
          priceGrowth: 8.5,
          demandScore: 9,
          investmentRating: 9
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false,
        similarProperties: [
          {
            address: "3 Bedroom House, Camden, NW1",
            price: 1150000,
            soldDate: "January 2024"
          },
          {
            address: "4 Bedroom House, Regent's Park, NW1",
            price: 1350000,
            soldDate: "December 2023"
          },
          {
            address: "5 Bedroom House, St John's Wood, NW8",
            price: 1450000,
            soldDate: "November 2023"
          }
        ]
      }
    },
    {
      id: "2345678",
      title: "2 Bedroom Warehouse Conversion",
      address: "Shoreditch, London E1",
      price: 750000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
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
      propertyType: "APARTMENT",
      leaseType: "leasehold",
      leaseYears: 125,
      isMortgageable: true,
      estimatedRevenue: 2800,
      estimatedSaleDate: "April 2024",
      renovationCosts: {
        total: 0,
        structural: 0,
        interior: 0,
        exterior: 0
      },
      location: {
        coordinates: { lat: 51.5232, lng: -0.0817 },
        postcode: "E1 6JE"
      },
      analysis: {
        priceRating: 'good',
        confidence: 82,
        marketTrends: {
          priceGrowth: 7.2,
          demandScore: 8,
          investmentRating: 8
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false,
        similarProperties: [
          {
            address: "2 Bedroom Apartment, Hoxton, E2",
            price: 725000,
            soldDate: "January 2024"
          },
          {
            address: "2 Bedroom Loft, Spitalfields, E1",
            price: 775000,
            soldDate: "December 2023"
          },
          {
            address: "2 Bedroom Conversion, Bethnal Green, E2",
            price: 695000,
            soldDate: "November 2023"
          }
        ]
      }
    },
    {
      id: "3456789",
      title: "3 Bedroom Ex-Council Flat",
      address: "Tower Block, East London E14",
      price: 450000,
      bedrooms: 3,
      bathrooms: 1,
      sqft: 850,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
      ],
      description: "A three bedroom ex-council flat in need of significant renovation. The property requires complete modernization including new heating system, rewiring, and structural repairs.",
      features: [
        "Needs full renovation",
        "Structural issues",
        "High service charges",
        "Lease concerns",
        "Limited parking"
      ],
      propertyType: "FLAT",
      leaseType: "leasehold",
      leaseYears: 75,
      isMortgageable: false,
      estimatedRevenue: 1500,
      estimatedSaleDate: "June 2024",
      renovationCosts: {
        total: 85000,
        structural: 35000,
        interior: 35000,
        exterior: 15000
      },
      location: {
        coordinates: { lat: 51.5074, lng: -0.0176 },
        postcode: "E14 3HY"
      },
      analysis: {
        priceRating: 'bad',
        confidence: 65,
        marketTrends: {
          priceGrowth: -2.5,
          demandScore: 4,
          investmentRating: 3
        },
        structuralIssues: true,
        outdatedInterior: true,
        exteriorDamage: true,
        similarProperties: [
          {
            address: "3 Bedroom Flat, Poplar, E14",
            price: 425000,
            soldDate: "January 2024"
          },
          {
            address: "3 Bedroom Flat, Isle of Dogs, E14",
            price: 475000,
            soldDate: "December 2023"
          },
          {
            address: "2 Bedroom Flat, Canary Wharf, E14",
            price: 495000,
            soldDate: "November 2023"
          }
        ]
      }
    }
  ];

  const manchesterProperties = [
    {
      id: "7891011",
      title: "3 Bedroom Penthouse",
      address: "Deansgate, Manchester M3",
      price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
      ],
      description: "Stunning penthouse apartment in the heart of Manchester with panoramic city views.",
      features: [
        "Panoramic views",
        "Private terrace",
        "Concierge service",
        "Secure parking",
        "High-end appliances"
      ],
      propertyType: "APARTMENT",
      leaseType: "leasehold",
      leaseYears: 150,
      isMortgageable: true,
      estimatedRevenue: 3500,
      estimatedSaleDate: "April 2024",
      renovationCosts: {
        total: 0,
        structural: 0,
        interior: 0,
        exterior: 0
      },
      location: {
        coordinates: { lat: 53.4808, lng: -2.2426 },
        postcode: "M3 3EH"
      },
      analysis: {
        priceRating: 'good',
        confidence: 82,
        marketTrends: {
          priceGrowth: 7.2,
          demandScore: 8,
          investmentRating: 8
        },
        structuralIssues: false,
        outdatedInterior: false,
        exteriorDamage: false,
        similarProperties: [
          {
            address: "2 Bedroom Penthouse, Spinningfields",
            price: 750000,
            soldDate: "January 2024"
          },
          {
            address: "3 Bedroom Apartment, Northern Quarter",
            price: 825000,
            soldDate: "December 2023"
          },
          {
            address: "3 Bedroom Penthouse, Castlefield",
            price: 895000,
            soldDate: "November 2023"
          }
        ]
      }
    }
  ];

  const essexProperties = [
    {
      id: "1213141",
      title: "4 Bedroom Detached House",
      address: "Chelmsford, Essex CM1",
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2000,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
      ],
      description: "Spacious family home in need of modernization. Excellent potential for value increase through renovation.",
      features: [
        "Large garden",
        "Double garage",
        "Potential for extension",
        "Good schools nearby",
        "Transport links"
      ],
      propertyType: "HOUSE",
      leaseType: "freehold",
      isMortgageable: true,
      estimatedRevenue: 2200,
      estimatedSaleDate: "May 2024",
      renovationCosts: {
        total: 75000,
        structural: 15000,
        interior: 45000,
        exterior: 15000
      },
      location: {
        coordinates: { lat: 51.7361, lng: 0.4798 },
        postcode: "CM1 1QR"
      },
      analysis: {
        priceRating: 'bad',
        confidence: 75,
        marketTrends: {
          priceGrowth: -2.1,
          demandScore: 5,
          investmentRating: 4
        },
        structuralIssues: true,
        outdatedInterior: true,
        exteriorDamage: true,
        similarProperties: [
          {
            address: "4 Bedroom House, Chelmsford",
            price: 625000,
            soldDate: "January 2024"
          },
          {
            address: "4 Bedroom House, Brentwood",
            price: 675000,
            soldDate: "December 2023"
          },
          {
            address: "3 Bedroom House, Chelmsford",
            price: 595000,
            soldDate: "November 2023"
          }
        ]
      }
    }
  ];

  // Combine all properties
  const allProperties = [...londonProperties, ...manchesterProperties, ...essexProperties];

  // Return the requested number of properties, cycling through the templates if needed
  return allProperties.slice(0, count).map((property, index) => ({
    ...property,
    id: (index + 1).toString()
  }));
}
