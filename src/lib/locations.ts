import axios from 'axios';
import { propertyDataCache } from './cache';

const POSTCODES_API = 'https://api.postcodes.io/postcodes';

export const ukLocations = [
  // Major Cities
  "London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow", "Edinburgh",
  "Bristol", "Cardiff", "Newcastle upon Tyne", "Sheffield", "Belfast", "Nottingham",
  "Southampton", "Portsmouth", "Oxford", "Cambridge", "York", "Brighton", "Leicester",
  
  // Additional Cities
  "Aberdeen", "Bath", "Bournemouth", "Bradford", "Canterbury", "Carlisle", "Chester",
  "Chichester", "Colchester", "Coventry", "Derby", "Durham", "Exeter", "Gloucester",
  "Hull", "Ipswich", "Lancaster", "Lincoln", "Norwich", "Peterborough", "Plymouth",
  "Preston", "Reading", "Salford", "Salisbury", "Stoke-on-Trent", "Sunderland",
  "Swansea", "Wakefield", "Winchester", "Wolverhampton", "Worcester",
  
  // London Areas
  "Mayfair", "Knightsbridge", "Chelsea", "Kensington", "Notting Hill", "Richmond",
  "Hampstead", "Islington", "Shoreditch", "Canary Wharf", "Greenwich", "Wimbledon",
  "Fulham", "Clapham", "Battersea", "Camden", "Hackney", "Brixton"
];

interface PostcodeResult {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
}

interface AddressResult {
  address: string;
  postcode: string;
}

export async function searchPostcode(postcode: string): Promise<PostcodeResult | null> {
  const cacheKey = `postcode-${postcode}`;
  const cached = propertyDataCache.get(cacheKey) as PostcodeResult | null;
  if (cached) {
    return cached;
  }

  try {
    console.log("Fetching postcode data for:", postcode);
    const response = await axios.get(`${POSTCODES_API}/${encodeURIComponent(postcode)}`);
    console.log("Postcode API Response:", response);
    if (response.data.status === 200 && response.data.result) {
      const result = {
        postcode: response.data.result.postcode,
        latitude: response.data.result.latitude,
        longitude: response.data.result.longitude,
        admin_district: response.data.result.admin_district
      };
      propertyDataCache.set(cacheKey, result);
      return result;
    }
    return null;
  } catch (error) {
    // Don't log 404s as they're expected for invalid postcodes
    if (axios.isAxiosError(error) && error.response?.status !== 404) {
      console.error('Error fetching postcode data:', error.message);
    }
    return null;
  }
}

export async function autocompletePostcode(query: string): Promise<string[]> {
  if (query.length < 2) return [];

  const cacheKey = `postcode-autocomplete-${query.toLowerCase()}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${POSTCODES_API}/postcodes/${encodeURIComponent(query)}/autocomplete`);
     console.log("Autocomplete API Response:", response);
    if (response.data.status === 200) {
      const results = response.data.result || [];
      propertyDataCache.set(cacheKey, results);
      return results;
    }
    return [];
  } catch (error) {
    // Don't log 404s as they're expected for invalid postcodes
    if (axios.isAxiosError(error) && error.response?.status !== 404) {
      console.error('Error fetching postcode suggestions:', error.message);
    }
    return [];
  }
}

export async function searchLocations(query: string): Promise<string[]> {
  const trimmedQuery = query.trim().toLowerCase();
  
  try {
    // Check if it looks like a postcode
    if (/^[A-Z0-9]{2,4}\s?[0-9][A-Z]{2}$/i.test(trimmedQuery)) {
      const postcodeResult = await searchPostcode(trimmedQuery);
      if (postcodeResult) {
        // Fetch addresses for the postcode
        const addressResults = await fetchAddressesForPostcode(postcodeResult.postcode);
        return addressResults.map(addr => addr.address);
      }
    }
    
    // Search locations
    return ukLocations.filter(location =>
      location.toLowerCase().includes(trimmedQuery)
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching locations:', error.message);
    }
    return [];
  }
}

async function fetchAddressesForPostcode(postcode: string): Promise<AddressResult[]> {
  const cacheKey = `addresses-${postcode}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    console.log("Fetching addresses for postcode:", postcode);
    const response = await axios.get(`${POSTCODES_API}/${encodeURIComponent(postcode)}`);
    console.log("Addresses API Response:", response);
    if (response.data.status === 200 && response.data.result) {
      const addresses = response.data.result.addresses.map((addr: any) => {
        const addressString = [addr.line_1, addr.line_2, addr.line_3].filter(Boolean).join(', ');
        return {
          address: `${addressString}, ${addr.postcode}`,
          postcode: addr.postcode
        };
      });
      propertyDataCache.set(cacheKey, addresses);
      return addresses;
    }
    return [];
  } catch (error) {
    console.error('Error fetching addresses for postcode:', error);
    return [];
  }
}
