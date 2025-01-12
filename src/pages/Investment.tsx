import { PropertyHero } from '@/components/PropertyHero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, TrendingUp, Users, Shield, ChevronRight, PieChart, Landmark, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const INVESTMENT_TIERS = [
  {
    name: 'Seed Round',
    minInvestment: '£50,000',
    equity: '0.5%',
    benefits: [
      'Priority access to future funding rounds',
      'Quarterly investor meetings',
      'Platform premium membership',
      'Early access to new features',
      'Investor dashboard access'
    ]
  },
  {
    name: 'Series A',
    minInvestment: '£250,000',
    equity: '2.5%',
    benefits: [
      'Board observer rights',
      'Monthly strategic meetings',
      'Revenue share options',
      'Custom API integration',
      'Dedicated account manager',
      'White-label options'
    ],
    featured: true
  },
  {
    name: 'Strategic Partner',
    minInvestment: '£1,000,000',
    equity: '10%',
    benefits: [
      'Board seat eligibility',
      'Strategic partnership opportunities',
      'Custom development priority',
      'Joint venture possibilities',
      'International expansion rights',
      'Full platform customization'
    ]
  }
];

export function Investment() {
  return (
    <div>
      <PropertyHero
        title="Invest in Very Good Estates"
        subtitle="Join us in revolutionizing property investment through AI and technology"
        imageUrl="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800"
      >
        <div className="mt-8 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
            <TrendingUp className="w-8 h-8 text-gold-400 mb-4" />
            <div className="text-2xl font-light text-white">127%</div>
            <div className="text-sm text-gray-400">YoY Growth</div>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
            <PieChart className="w-8 h-8 text-gold-400 mb-4" />
            <div className="text-2xl font-light text-white">£85M+</div>
            <div className="text-sm text-gray-400">AUM</div>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
            <Users className="w-8 h-8 text-gold-400 mb-4" />
            <div className="text-2xl font-light text-white">15,000+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
            <Landmark className="w-8 h-8 text-gold-400 mb-4" />
            <div className="text-2xl font-light text-white">£2.5B+</div>
            <div className="text-sm text-gray-400">Properties Analyzed</div>
          </div>
        </div>
      </PropertyHero>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Company Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Why Invest in Very Good Estates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <TrendingUp className="w-12 h-12 text-gold-400 mb-6" />
              <h3 className="text-xl font-light text-white mb-4">Market Growth</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• 127% year-over-year growth</li>
                <li>• £85M+ assets under management</li>
                <li>• 15,000+ active platform users</li>
                <li>• Expanding market presence</li>
              </ul>
            </div>
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <Building2 className="w-12 h-12 text-gold-400 mb-6" />
              <h3 className="text-xl font-light text-white mb-4">Technology Edge</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• AI-powered market analysis</li>
                <li>• Proprietary valuation models</li>
                <li>• Advanced data analytics</li>
                <li>• Blockchain integration planned</li>
              </ul>
            </div>
            <div className="bg-navy-800/50 p-8 rounded-lg border border-gold-500/20">
              <Shield className="w-12 h-12 text-gold-400 mb-6" />
              <h3 className="text-xl font-light text-white mb-4">Strong Foundation</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• FCA regulated platform</li>
                <li>• Experienced leadership team</li>
                <li>• Strategic partnerships</li>
                <li>• Clear expansion roadmap</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Tiers */}
        <div>
          <h2 className="text-3xl font-light text-white mb-8 text-center">Investment Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {INVESTMENT_TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`overflow-hidden bg-navy-800/50 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 ${
                  tier.featured ? 'ring-2 ring-gold-500' : ''
                }`}>
                  <div className="p-8">
                    {tier.featured && (
                      <div className="bg-gold-500 text-navy-950 text-sm font-semibold px-3 py-1 rounded-full w-fit mb-4">
                        Recommended
                      </div>
                    )}
                    <h3 className="text-2xl font-light text-white mb-2">{tier.name}</h3>
                    <div className="mb-6">
                      <div className="text-3xl font-light text-gold-400">{tier.minInvestment}</div>
                      <div className="text-sm text-gray-400">Minimum Investment</div>
                    </div>
                    <div className="mb-6">
                      <div className="text-xl font-light text-emerald-400">{tier.equity}</div>
                      <div className="text-sm text-gray-400">Equity Offered</div>
                    </div>
                    <div className="space-y-3 mb-8">
                      {tier.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-gray-300">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                      Request Information
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
