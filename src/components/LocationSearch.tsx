import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { searchLocations, searchPostcode } from "@/lib/locations";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RecentSearchesModal } from "@/components/RecentSearchesModal";
import { addToSearchHistory } from "@/lib/cookies";
import { scrapeGoogleListings } from "@/lib/scraper";

interface LocationSearchProps {
  onSearch: (location: string, coordinates?: { lat: number; lng: number }, listings?: any[]) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [radius, setRadius] = useState([5]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isRecentSearchesOpen, setIsRecentSearchesOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      if (value.length >= 1) {
        const results = await searchLocations(value);
        setSuggestions(results);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const timer = setTimeout(fetchLocations, 300);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddressSelect = async (address: string) => {
    setValue(address);
    const postcodeResult = await searchPostcode(address);
    if (postcodeResult) {
      const listings = await scrapeGoogleListings(address);
      onSearch(address, {
        lat: postcodeResult.latitude,
        lng: postcodeResult.longitude
      }, radius[0], listings);
    } else {
      onSearch(address, undefined, radius[0]);
    }
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      addToSearchHistory(value);
      if (/^https?:\/\/(?:www\.)?rightmove\.co\.uk\//i.test(value)) {
        const listings = await scrapeGoogleListings(value);
        onSearch(value, undefined, radius[0], listings);
        setShowDropdown(false);
      } else {
        const postcodeResult = await searchPostcode(value);
        if (postcodeResult) {
          const addressResults = await searchLocations(value);
          setSuggestions(addressResults);
          setShowDropdown(true);
        } else {
          const listings = await scrapeGoogleListings(value);
          onSearch(value, undefined, radius[0], listings);
          setShowDropdown(false);
        }
      }
    }
  };

  const filteredSuggestions = showDropdown
    ? suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    : [];


  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2 glass-panel p-2 rounded-lg relative">
          <Search className="text-gold-400 w-6 h-6 ml-2" />
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            placeholder="Enter location or postcode or Rightmove URL..."
            className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            className="text-gold-400 hover:text-gold-300"
            onClick={() => setIsRecentSearchesOpen(true)}
          >
            <History className="w-5 h-5" />
          </Button>
          <Button 
            type="submit"
            className="glass-button text-white hover:bg-gold-500/30"
          >
            Search
          </Button>
        </div>

        <div className="glass-panel p-4 rounded-lg hidden">
          <Label className="text-white mb-2 block">Search Radius: {radius[0]} miles</Label>
          <Slider
            value={radius}
            onValueChange={setRadius}
            max={50}
            min={1}
            step={1}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>1 mile</span>
            <span>50 miles</span>
          </div>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 w-full bg-navy-800 border border-gold-500/20 rounded-lg shadow-lg overflow-hidden z-50"
          style={{ top: '100%' }}
        >
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="w-full px-4 py-2 text-left text-white hover:bg-gold-500/20 transition-colors"
              onClick={() => handleAddressSelect(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <RecentSearchesModal
        isOpen={isRecentSearchesOpen}
        onClose={() => setIsRecentSearchesOpen(false)}
        onSearch={(location) => {
          setValue(location);
          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
        }}
      />
    </div>
  );
}
