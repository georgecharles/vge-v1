import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioStats } from '@/components/PortfolioStats';
import { useAuth } from '@/lib/context/auth';
import { Bell, Camera, Star, Newspaper, ChevronRight, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateMockProperties } from '@/lib/mockData';
import PropertyCard from '@/components/PropertyCard';
import type { Property } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ScrapedProperty {
  title: string;
  address: string;
  price: string;
  link: string;
  image: string;
}

export function Account() {
  const { user, unsaveProperty } = useAuth();
  const navigate = useNavigate();
  const [bannerImage] = useState<string | null>(null);
  const [] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    priceAlert: '0',
    marketKeywords: ''
  });
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [selectedProperties] = useState<string[]>([]);
  const [importedProperties, setImportedProperties] = useState<ScrapedProperty[]>(() => {
    const saved = localStorage.getItem('imported_properties');
    return saved ? JSON.parse(saved) : [];
  });

  const handlePropertyRemove = (propertyId: string) => {
    if (user) {
      unsaveProperty(propertyId);
      const updatedProperties = savedProperties.filter(p => p.id.toString() !== propertyId);
      setSavedProperties(updatedProperties);
    }
  };


  useEffect(() => {
    const loadSavedProperties = async () => {
      if (user?.savedProperties) {
        const allProperties = await generateMockProperties(20);
        const userSaved = allProperties.filter(p => 
          user.savedProperties.includes(p.id.toString())
        );
        setSavedProperties(userSaved);
      }
    };
    loadSavedProperties();
  }, [user?.savedProperties]);

  const favoriteWidgets = [
    { id: 'interest-rates', title: 'Interest Rate Forecast' },
    { id: 'price-trends', title: 'Price Trends' },
    { id: 'market-activity', title: 'Market Activity' }
  ];

  const alerts = [
    { id: 1, type: 'price', message: 'Property prices in Manchester have increased by 5.2%', date: '2 hours ago' },
    { id: 2, type: 'interest', message: 'Interest rates expected to decrease in Q2 2024', date: '1 day ago' },
    { id: 3, type: 'market', message: 'New investment opportunity in Leeds detected', date: '2 days ago' }
  ];

  const news = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      title: 'UK Property Market Update - Q1 2024',
      date: 'March 1, 2024',
      category: 'Market Analysis',
      aiSummary: 'AI analysis indicates strong market resilience with 5.2% average price growth across major UK cities. Key factors include limited supply and sustained demand in prime locations.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
      title: 'New Tax Regulations for Property Investors',
      date: 'February 28, 2024',
      category: 'Regulations',
      aiSummary: 'Recent tax changes introduce favorable conditions for green property investments while implementing stricter requirements for overseas investors.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      title: 'Emerging Property Hotspots in Northern England',
      date: 'February 25, 2024',
      category: 'Investment',
      aiSummary: 'Data analysis reveals emerging opportunities in Manchester, Leeds, and Newcastle, driven by infrastructure investments and growing tech sectors.'
    }
  ];


  const handleOpenTipsModal = () => {
    setIsTipsModalOpen(true);
  };

  const handleCloseTipsModal = () => {
    setIsTipsModalOpen(false);
  };

  return (
    <>
      <div className="relative h-48 bg-navy-950">
        <img
          src={bannerImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"}
          alt="Profile Banner"
          className="w-full h-full object-cover opacity-30"
        />
        <Button
          className="absolute bottom-4 right-4 bg-navy-800/90 hover:bg-navy-700 text-white"
          onClick={() => {
            // Handle banner image upload
          }}
        >
          <Camera className="w-4 h-4 mr-2" />
          Change Banner
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={user?.avatar}
            alt={user?.firstName}
            className="w-24 h-24 rounded-full border-4 border-navy-900 object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-light text-white">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-400 blur-[3px] hover:blur-none transition-all duration-300 select-none">
              {user?.email}
            </p>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-navy-800/50 border border-gold-500/10 p-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="investment" onClick={() => navigate('/investment')}>Investment</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Favorite Widgets */}
                <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light text-white">Favorite Widgets</h2>
                    <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                      <Star className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {favoriteWidgets.map(widget => (
                      <div
                        key={widget.id}
                        className="flex items-center justify-between p-4 bg-navy-900/30 rounded-lg border border-gold-500/5 hover:border-gold-500/20 transition-colors"
                      >
                        <span className="text-white">{widget.title}</span>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light text-white">Recent Alerts</h2>
                    <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                      <Bell className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {alerts.map(alert => (
                      <div
                        key={alert.id}
                        className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5"
                      >
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>{alert.type}</span>
                          <span>{alert.date}</span>
                        </div>
                        <p className="text-white">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <PortfolioStats selectedProperties={selectedProperties} />

              {/* Saved Properties Grid */}
              {savedProperties.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-light text-white mb-4">Your Portfolio</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {savedProperties.map((property) => (
                      <PropertyCard 
                        key={property.id} 
                        {...property} 
                        showDeleteButton={true}
                        onDelete={() => handlePropertyRemove(property.id.toString())} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Imported Properties Grid */}
              {importedProperties.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-light text-white mb-4">Imported Properties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {importedProperties.map((listing, index) => (
                      <div
                        key={index}
                        className="glass-card rounded-lg overflow-hidden group hover:scale-[1.02] transition-all duration-300 relative bg-black-800/50"
                      >
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2">{listing.title}</h3>
                              <p className="text-gray-400">{listing.address}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-white">{listing.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest News */}
              <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-light text-white">Latest News</h2>
                  <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                    <Newspaper className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {news.map(item => (
                    <div
                      key={item.id}
                      className="bg-navy-900/30 rounded-lg border border-gold-500/5 hover:border-gold-500/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                      <div className="aspect-video relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-gold-500 text-navy-950 px-2 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium mb-2 line-clamp-2">{item.title}</h3>
                        <div className="text-sm text-gray-400 mb-3">{item.date}</div>
                        <div className="bg-navy-800/50 rounded-lg p-3 border border-gold-500/10">
                          <div className="text-xs text-gold-400 mb-1">AI Summary</div>
                          <p className="text-sm text-gray-300 line-clamp-3">{item.aiSummary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HMRC's Tax Bands and Allowances */}
              <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
                <h2 className="text-xl font-light text-white mb-6">HMRC's Tax Bands and Allowances</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5">
                    <h3 className="text-lg text-white mb-2">Income Tax Bands</h3>
                    <p className="text-gray-400">Basic Rate: 20% on income up to £50,270</p>
                    <p className="text-gray-400">Higher Rate: 40% on income between £50,271 and £150,000</p>
                    <p className="text-gray-400">Additional Rate: 45% on income over £150,000</p>
                  </div>
                  <div className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5">
                    <h3 className="text-lg text-white mb-2">Capital Gains Tax Allowances</h3>
                    <p className="text-gray-400">Annual Exempt Amount: £12,300</p>
                    <p className="text-gray-400">Basic Rate: 18% on gains within the basic income tax band</p>
                    <p className="text-gray-400">Higher Rate: 28% on gains above the basic income tax band</p>
                  </div>
                  <div className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5">
                    <h3 className="text-lg text-white mb-2">Stamp Duty Land Tax (SDLT)</h3>
                    <p className="text-gray-400">0% on properties up to £125,000</p>
                    <p className="text-gray-400">2% on properties between £125,001 and £250,000</p>
                    <p className="text-gray-400">5% on properties between £250,001 and £925,000</p>
                    <p className="text-gray-400">10% on properties between £925,001 and £1.5 million</p>
                    <p className="text-gray-400">12% on properties over £1.5 million</p>
                  </div>
                </div>
              </div>

              {/* Regulatory Alerts */}
              <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
                <h2 className="text-xl font-light text-white mb-6">Regulatory Alerts</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5">
                    <h3 className="text-lg text-white mb-2">EPC Requirements</h3>
                    <p className="text-gray-400">All rental properties must have an Energy Performance Certificate (EPC) rating of E or above.</p>
                    <p className="text-gray-400">From 2025, new tenancies will require an EPC rating of C or above.</p>
                    <p className="text-gray-400">From 2028, all existing tenancies will require an EPC rating of C or above.</p>
                  </div>
                  <div className="p-4 bg-navy-900/30 rounded-lg border border-gold-500/5">
                    <h3 className="text-lg text-white mb-2">Section 24 Updates</h3>
                    <p className="text-gray-400">Mortgage interest relief is now restricted to the basic rate of income tax (20%).</p>
                    <p className="text-gray-400">Landlords can no longer deduct mortgage expenses from rental income to reduce tax bills.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ... other TabsContent components ... */}
        </Tabs>
        <div className="flex justify-center mt-8">
          <Button onClick={handleOpenTipsModal} className="bg-gold-500 text-navy-950 hover:bg-gold-600">
            <Lightbulb className="w-4 h-4 mr-2" />
            Tips on Investing
          </Button>
        </div>
      </div>

      <Dialog open={isTipsModalOpen} onOpenChange={handleCloseTipsModal}>
        <DialogContent className="max-w-3xl bg-navy-900 border-gold-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-white">Tips on Investing</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <h4 className="text-lg font-light text-white">Serviced Accommodation</h4>
            <p className="text-gray-400">
              Consider properties suitable for short-term rentals. Focus on locations with high tourist demand and amenities that attract travelers.
            </p>
            <h4 className="text-lg font-light text-white">Rent-to-Rent</h4>
            <p className="text-gray-400">
              Explore opportunities to rent properties and sublet them for a higher price. This strategy requires careful management and market analysis.
            </p>
            <h4 className="text-lg font-light text-white">BRRR Strategy</h4>
            <p className="text-gray-400">
              Buy properties that need renovation, refurbish them, refinance to pull out capital, and then rent them out. This strategy can create value and generate cash flow.
            </p>
            <h4 className="text-lg font-light text-white">HMOs</h4>
            <p className="text-gray-400">
              Look for properties that can be converted into Houses in Multiple Occupation (HMOs) to maximize rental income. Ensure compliance with local regulations.
            </p>
            <h4 className="text-lg font-light text-white">Location, Location, Location</h4>
            <p className="text-gray-400">
              Always prioritize locations with strong economic growth, good transport links, and high demand for rental properties.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
