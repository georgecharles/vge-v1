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

    export type { User, PropertyPriceAnalysis, PropertyTimeline, Property };
