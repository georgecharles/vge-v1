import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyTimeline } from '@/components/PropertyTimeline';
import { PriceAnalysis } from '@/components/PriceAnalysis';
import { EnvironmentData } from '@/components/EnvironmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bed, Bath, Square, TrendingUp, Clock, Home, MapPin, Phone, Mail, Calculator, ExternalLink, Brain } from 'lucide-react';
import type { Property } from '@/lib/types';
import { generateMockProperties } from '@/lib/mockData';
import { addToRecentlyViewed } from '@/lib/cookies';
import { useAuth } from '@/lib/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyHero } from '@/components/PropertyHero';
import { InterestRateTracker } from '@/components/InterestRateTracker';
import { MarketWidget } from '@/components/MarketWidget';
import { MapModal } from '@/components/MapModal';
import { PremiumLock } from '@/components/PremiumLock';
import { useLocation } from '@/lib/context/location';
import { AuthModal } from '@/components/auth/AuthModal';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d.toFixed(1);
}

export function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { user, saveProperty, unsaveProperty } = useAuth();
  const { userLocation } = useLocation();
  const isSaved = user?.savedProperties.includes(id || '');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  // Ensure we have default values for similar properties
  const similarProperties = property?.analysis?.similarProperties || [];

  useEffect(() => {
    const loadProperty = async () => {
      // In a real app, this would be an API call
      const mockProperties = await generateMockProperties(1);
      setProperty(mockProperties[0]);

      if (id) {
        addToRecentlyViewed(id);
      }

      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    };

    loadProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  // Calculate distance if user has set their location
  const distance = userLocation ? calculateDistance(
    userLocation.lat,
    userLocation.lng,
    property.location.coordinates.lat,
    property.location.coordinates.lng
  ) : null;

  const handleSave = () => {
    if (!user || !id) return;
    if (isSaved) {
      unsaveProperty(id);
    } else {
      saveProperty(id);
    }
  };

  return (
    <div>
      <PropertyHero
        title={property.title}
        subtitle={property.address}
        imageUrl={property.images[0]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 bg-navy-950">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Main Content - 3 cols */}
          <div className="md:col-span-3">
            <div className="bg-navy-800/50 rounded-2xl p-6 border border-gold-500/10 mb-8">
              <PropertyGallery images={property.images} title={property.title} />
            </div>

            {/* Floor Plan Section */}
            <div className="bg-navy-800/50 rounded-2xl p-6 border border-gold-500/10 mb-8">
              <h3 className="text-xl font-light text-white mb-4">Floor Plan</h3>
              <div className="aspect-[16/9] relative bg-navy-900/50 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://cedreo.com/wp-content/uploads/cloudinary/US_LivingRoom_05_3D_554px_teiisy.png')] bg-contain bg-center bg-no-repeat">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 bg-navy-900/90 rounded-lg text-white hover:bg-navy-800 transition-colors">
                        <span className="block text-lg font-light">Living Room</span>
                        <span className="text-sm text-gray-400">24.5 m²</span>
                      </button>
                      <button className="p-4 bg-navy-900/90 rounded-lg text-white hover:bg-navy-800 transition-colors">
                        <span className="block text-lg font-light">Kitchen</span>
                        <span className="text-sm text-gray-400">18.2 m²</span>
                      </button>
                      <button className="p-4 bg-navy-900/90 rounded-lg text-white hover:bg-navy-800 transition-colors">
                        <span className="block text-lg font-light">Master Bedroom</span>
                        <span className="text-sm text-gray-400">21.8 m²</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className={`bg-navy-800/50 rounded-2xl p-6 border transition-all duration-300 col-span-full ${
              isAnalyzing ? 'border-emerald-500/50 shadow-[0_0_30px_-5px] shadow-emerald-500/30' : 'border-gold-500/10'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Brain className="w-8 h-8 text-gold-400" />
                  <AnimatePresence>
                    {isAnalyzing && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-emerald-400 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light text-white">AI Market Analysis</h3>
                  <p className="text-gray-400">
                    {isAnalyzing ? 'Analyzing market data...' : 'Analysis complete'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-gold-500/20"
                  onClick={() => {
                    setIsAnalyzing(true);
                    setTimeout(() => setIsAnalyzing(false), 2000);
                  }}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Refresh Analysis
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="h-4 bg-navy-900/50 rounded animate-pulse" />
                    <div className="h-4 bg-navy-900/50 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-navy-900/50 rounded animate-pulse w-1/2" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-6 w-full"
                  >
                    <div>
                      <h4 className="text-lg font-light text-white mb-4">Market Position</h4>
                      <p className="text-gray-400 mb-4">
                        Based on our analysis of recent sales data and market trends, this property is currently 
                        {property.price < property.predictedValue ? ' undervalued ' : ' priced at market value '} 
                        for its location and specifications. The area has shown consistent growth over the past 12 months, 
                        with an average appreciation rate of {property.analysis.marketTrends.priceGrowth}%.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-light text-emerald-400">
                          {property.analysis.confidence}%
                        </div>
                        <div className="text-gray-400">Confidence Score</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-white mb-4">Investment Potential</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li>• Strong rental demand in the area</li>
                        <li>• Above average capital growth potential</li>
                        <li>• Good transport links and amenities</li>
                        <li>• High tenant retention rate</li>
                        <li>• Favorable price per square foot ratio</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legal and Admin Costs */}
              {!isAnalyzing && (
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">Legal Costs</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-400">
                        <span>Conveyancing</span>
                        <span>£1,500</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Searches</span>
                        <span>£350</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Land Registry</span>
                        <span>£250</span>
                      </div>
                      <div className="flex justify-between text-white font-medium pt-2 border-t border-gold-500/10">
                        <span>Total Legal Costs</span>
                        <span>£2,100</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">Admin Fees</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-400">
                        <span>Agent Fees</span>
                        <span>£3,500</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Mortgage Arrangement</span>
                        <span>£999</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Insurance</span>
                        <span>£450</span>
                      </div>
                      <div className="flex justify-between text-white font-medium pt-2 border-t border-gold-500/10">
                        <span>Total Admin Fees</span>
                        <span>£4,949</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - 2 cols */}
          <div className="md:col-span-2 space-y-6">
            {/* Key Details Card */}
            <div className="bg-navy-800/50 rounded-2xl p-6 border border-gold-500/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-light text-white">£{property.price.toLocaleString()}</h2>
                  <p className="text-gray-400">{property.address}</p>
                </div>
                <Button 
                  onClick={handleSave}
                  className="bg-gold-500 text-navy-950 hover:bg-gold-600"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-navy-900/50 p-4 rounded-xl text-center">
                  <Bed className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{property.bedrooms}</div>
                  <div className="text-sm text-gray-400">Beds</div>
                </div>
                <div className="bg-navy-900/50 p-4 rounded-xl text-center">
                  <Bath className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{property.bathrooms}</div>
                  <div className="text-sm text-gray-400">Baths</div>
                </div>
                <div className="bg-navy-900/50 p-4 rounded-xl text-center">
                  <Square className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{property.sqft}</div>
                  <div className="text-sm text-gray-400">Sq Ft</div>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full border-gold-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  Request Viewing
                </Button>
                <Button variant="outline" className="w-full border-gold-500/20">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Agent
                </Button>
                {distance && (
                  <Button 
                    variant="outline" 
                    className="w-full border-gold-500/20"
                    onClick={() => setIsMapOpen(true)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions ({distance} miles)
                  </Button>
                )}
              </div>
            </div>

            {/* Investment Calculator Card */}
            <div className="bg-navy-800/50 rounded-2xl p-6 border border-gold-500/10">
              <h3 className="text-xl font-light text-white mb-4">Investment Calculator</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Mortgage Term</div>
                  <div className="text-xl font-light text-white">15 years</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Interest Rate</div>
                  <div className="text-xl font-light text-white">Fixed @ 3%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Down Payment</div>
                  <div className="text-xl font-light text-white">£{(property.price * 0.2).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Monthly Payment</div>
                  <div className="text-xl font-light text-white">£1,664.30</div>
                </div>
                <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                  <Calculator className="w-4 h-4 mr-2" />
                  Customize Calculation
                </Button>
              </div>
            </div>

            {/* Similar Properties Card */}
            <div className="bg-navy-800/50 rounded-2xl p-6 border border-gold-500/10">
              <h3 className="text-xl font-light text-white mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {similarProperties.map((similar, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-navy-900/50 rounded-xl">
                    <div className="w-16 h-16 bg-navy-800 rounded-lg overflow-hidden">
                      <img 
                        src={property.images[index % property.images.length]} 
                        alt={similar.address}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{similar.address}</div>
                      <div className="text-sm text-gray-400">Sold {similar.soldDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">£{similar.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-navy-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="market">Market Trends</TabsTrigger>
              <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <EnvironmentData
                lat={property.location.coordinates.lat}
                lng={property.location.coordinates.lng}
              />

              <div className="bg-navy-800/50 p-6 rounded-2xl border border-gold-500/10">
                <h3 className="text-xl font-light text-white mb-4">Description</h3>
                <p className="text-gray-400">{property.description}</p>
              </div>

              <PropertyTimeline data={[
                { year: 2020, value: property.price * 0.8 },
                { year: 2024, value: property.price },
                { year: 2028, value: property.predictedValue }
              ]} />
            </TabsContent>

            <TabsContent value="features">
              <div className="bg-navy-800/50 p-6 rounded-2xl border border-gold-500/10 mt-6">
                <h3 className="text-xl font-light text-white mb-4">Property Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.features.map((feature: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <div key={index} className="flex items-center gap-2 text-gray-400">
                      <Home className="w-4 h-4 text-gold-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="market">
              <div className="space-y-6 mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <MarketWidget id="interest-rates" title="Interest Rate Forecast">
                    <InterestRateTracker />
                  </MarketWidget>
                </PremiumLock>
              </div>
            </TabsContent>

            <TabsContent value="predictions">
              <div className="space-y-6 mt-6">
                <PremiumLock onAuthClick={handleAuthClick}>
                  <div className="bg-navy-800/50 p-6 rounded-2xl border border-gold-500/10">
                    <h3 className="text-xl font-light text-white mb-4">AI Value Predictions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">1 Year Forecast</div>
                      <div className="text-2xl font-bold text-emerald-400">
                        £{(property.price * 1.05).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">5 Year Forecast</div>
                      <div className="text-2xl font-bold text-emerald-400">
                        £{(property.price * 1.25).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  </div>
                </PremiumLock>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {property && (
          <MapModal
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            destination={{
              lat: property.location.coordinates.lat,
              lng: property.location.coordinates.lng,
              address: property.address
            }}
          />
        )}

        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default PropertyDetails;
