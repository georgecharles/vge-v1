import { Check } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { PropertyHero } from '@/components/PropertyHero';

    export function Subscription() {
      const plans = [
        {
          name: 'Free Tier',
          price: '£0',
          period: 'month',
          features: [
            'Basic property listings',
            'Basic portfolio tracking',
            'Limited market insights',
            'Community access'
          ]
        },
        {
          name: 'Pro Tier',
          price: '£15-30',
          period: 'month',
          features: [
            'Advanced property search',
            'Detailed market analysis',
            'Unlimited saved properties',
            'Investment predictions',
            'Priority support',
            'Property alerts',
            'ROI calculators',
            'Customizable dashboards'
          ],
          recommended: true
        },
        {
          name: 'Enterprise Tier',
          price: 'Custom',
          period: 'month',
          features: [
            'All Pro features',
            'API access',
            'Bulk data exports',
            'Dedicated account manager',
            'Team collaboration',
            'White-label options',
            'Custom integrations',
            'Priority support'
          ]
        }
      ];

      return (
        <div>
          <PropertyHero
            title="Upgrade Your Investment Journey"
            subtitle="Choose the perfect plan to unlock your property investment potential"
            imageUrl="https://images.unsplash.com/photo-1579621970795-87facc2f976d"
          >
            <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
          </PropertyHero>

          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-navy-800/50 rounded-lg p-8 border ${
                    plan.recommended
                      ? 'border-gold-500 ring-2 ring-gold-500/20'
                      : 'border-gold-500/20'
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-gold-500 text-navy-950 text-sm font-semibold px-3 py-1 rounded-full w-fit mb-4">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gold-400">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-gold-500 text-navy-950 hover:bg-gold-600'
                        : 'bg-navy-900 text-white hover:bg-navy-800'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
