import axios from 'axios';

const username = "{georgecharles}";
const apiKey = "{4EAx68GNsvH0pNC3ApaKsYvMx}";
const apiEndPoint = "http://api.scraping-bot.io/scrape";
const auth = "Basic " + btoa(username + ":" + apiKey);

interface ScrapedProperty {
  title: string;
  address: string;
  price: string;
  link: string;
  image: string;
}

export async function scrapeGoogleListings(address: string): Promise<ScrapedProperty[]> {
  try {
    console.log("ScrapingBot API Request - URL:", address); // Log the URL being requested
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        "url": address,
        "options": {
          "premiumProxy": false,
          "useChrome": false,
          "proxyCountry": "GB",
          "proxyState": "ny",
          "waitForNetworkRequests": false,
        }
      })
    });

    console.log("ScrapingBot API Response Status:", response.status); // Log the status code
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, text: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();
    console.log("ScrapingBot API Response Data:", data); // Log the entire response data

    if (data && data.results) {
      // Extract the top 3 listings and create a new array with only cloneable properties
      const listings = data.results.slice(0, 3).map((item: any) => ({
        title: String(item.title),
        address: String(item.address),
        price: String(item.price),
        link: String(item.link),
        image: String(item.image)
      }));
      console.log("Scraped Listings (Parsed):", listings); // Log parsed listings
      return listings;
    }
    console.log("No results found in ScrapingBot API response (after parsing)");
    return [];
  } catch (error) {
    console.error('Error scraping Google listings:', error);
    return [];
  }
}
