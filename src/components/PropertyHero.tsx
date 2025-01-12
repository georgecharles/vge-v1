import { TrendingUp, PieChart, Calculator } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/context/auth';
import { motion } from 'framer-motion';
import { calculatePortfolioMetrics } from '@/lib/portfolio';

interface PropertyHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  children?: React.ReactNode;
}

export function PropertyHero({ title, subtitle, imageUrl, children }: PropertyHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useAuth();
  const [portfolioStats] = useState<ReturnType<typeof calculatePortfolioMetrics> | null>(null);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-navy-950 to-navy-900">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <motion.h1 
          className="text-5xl md:text-6xl font-light text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {user?.savedProperties.length > 0 && portfolioStats && (
          <motion.div
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="col-span-4 text-center mb-4">
              <h2 className="text-2xl font-light text-white">Your Current Portfolio Value</h2>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <Calculator className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-white">
                £{portfolioStats.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Portfolio Value</div>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-emerald-400">
                £{portfolioStats.potentialProfit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Potential Profit</div>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <PieChart className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-white">
                {portfolioStats.averageYield.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Average Yield</div>
            </div>
            <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
              <TrendingUp className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <div className="text-2xl font-light text-white">
                {portfolioStats.predictedGrowth.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Predicted Growth</div>
            </div>
          </motion.div>
        )}

        {children}
      </div>
    </div>
  );
}
