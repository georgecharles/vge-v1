import { useState } from 'react';
import { PropertyHero } from '@/components/PropertyHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketWidget } from '@/components/MarketWidget';
import { PortfolioStats } from '@/components/PortfolioStats';
import { useAuth } from '@/lib/context/auth';
import { Bell, Camera, Settings, Star, Newspaper, CreditCard, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab');
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    priceAlert: '0',
    marketKeywords: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [favoriteWidgets] = useState([
    { id: 'interest-rates', title: 'Interest Rate Forecast' },
    { id: 'price-trends', title: 'Price Trends' },
    { id: 'market-activity', title: 'Market Activity' }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'price',
      message: 'Property prices in Manchester have increased by 5.2%',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'interest',
      message: 'Interest rates expected to decrease in Q2 2024',
      date: '1 day ago'
    },
    {
      id: 3,
      type: 'market',
      message: 'New investment opportunity in Leeds detected',
      date: '2 days ago'
    }
  ]);

  const [news] = useState([
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
  ]);

  return (
    <div>
      <div className="relative h-48 bg-navy-950">
        <img
          src={bannerImage}
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
              <PortfolioStats />

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
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
              <h2 className="text-xl font-light text-white mb-6">Favorite Widgets</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {favoriteWidgets.map(widget => (
                  <MarketWidget key={widget.id} id={widget.id} title={widget.title}>
                    <div className="p-6 text-center text-gray-400">
                      Widget content here
                    </div>
                  </MarketWidget>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
              <h2 className="text-xl font-light text-white mb-6">Alert Settings</h2>
              <div className="space-y-6">
                <div>
                  <Label>Price Alerts</Label>
                  <Input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Enter price threshold"
                    className="bg-navy-900 border-gold-500/20"
                    value={formData.priceAlert}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      priceAlert: e.target.value || '0'
                    }))}
                  />
                </div>
                <div>
                  <Label>Market Updates</Label>
                  <Input
                    name="marketKeywords"
                    type="text"
                    placeholder="Enter keywords"
                    className="bg-navy-900 border-gold-500/20"
                    value={formData.marketKeywords}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light text-white">Current Plan</h2>
                  <p className="text-gray-400">Premium Investor</p>
                </div>
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                  <Link to="/subscription">Upgrade Plan</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-navy-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">API Usage</div>
                  <div className="text-2xl font-light text-white">2,450 / 5,000</div>
                  <div className="text-sm text-gray-400">API calls this month</div>
                </div>
                <div className="p-4 bg-navy-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Storage</div>
                  <div className="text-2xl font-light text-white">4.2 GB / 10 GB</div>
                  <div className="text-sm text-gray-400">Storage used</div>
                </div>
                <div className="p-4 bg-navy-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Next Billing</div>
                  <div className="text-2xl font-light text-white">March 15, 2024</div>
                  <div className="text-sm text-gray-400">£29.99/month</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-gold-500/10">
              <h2 className="text-xl font-light text-white mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-navy-900 border-gold-500/20"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-navy-900 border-gold-500/20"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-navy-900 border-gold-500/20"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-gold-500 text-navy-950 hover:bg-gold-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
