import { LocationSearch } from '@/components/LocationSearch';
import { PropertyFilters, type PropertyFilters as Filters } from '@/components/PropertyFilters';
import { PropertySort } from '@/components/PropertySort';
import PropertyCard from '@/components/PropertyCard';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Property } from '@/lib/types';

export function Home() {
  const [properties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const resultsRef = useRef<HTMLDivElement>(null);
  const [] = useState(false);

  const handleSort = (props: Property[], sort: string) => {
    const sorted = [...props].sort((a, b) => {
      switch (sort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    setFilteredProperties(sorted);
  };

  const handleFilterChange = (filters: Filters) => {
    const filtered = properties.filter(property => {
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) {
        return false;
      }

      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }

      if (filters.leaseType !== 'all' && property.leaseType !== filters.leaseType) {
        return false;
      }

      if (filters.fixerUpperOnly && !property.isFixerUpper) {
        return false;
      }

      if (filters.mortgageableOnly && !property.isMortgageable) {
        return false;
      }

      if (filters.maxRenovationCost && property.renovationCosts?.total > filters.maxRenovationCost) {
        return false;
      }

      if (filters.minYield) {
        const rentalYield = (property.estimatedRevenue * 12 / property.price) * 100;
        if (rentalYield < filters.minYield) {
          return false;
        }
      }

      return true;
    });

    handleSort(filtered, sortBy);
  };

  useEffect(() => {
    if (properties.length > 0) {
      handleSort(properties, sortBy);
    }
  }, [sortBy]);

  function handleSearch(_location: string, _coordinates?: { lat: number; lng: number; } | undefined, _radius?: number | undefined): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-navy-950 to-navy-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your Next <span className="text-gold-400">Investment</span> Property
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover high-potential properties with AI-powered market analysis and predictive valuations
          </motion.p>
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <LocationSearch onSearch={handleSearch} />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-navy-900/50 border-y border-gold-500/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-light text-gold-400 mb-2">£2.5B+</div>
              <div className="text-gray-200">Properties Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gold-400 mb-2">15K+</div>
              <div className="text-gray-200">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gold-400 mb-2">95%</div>
              <div className="text-gray-200">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gold-400 mb-2">24/7</div>
              <div className="text-gray-200">Market Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {properties.length > 0 && (
        <div ref={resultsRef} className="max-w-7xl mx-auto px-4 py-16">
          <PropertyFilters onFilterChange={handleFilterChange} />

          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-400">
              {filteredProperties.length} properties found
            </div>
            <PropertySort value={sortBy} onChange={setSortBy} />
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <PropertyCard {...property} isSponsored={property.isSponsored} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
