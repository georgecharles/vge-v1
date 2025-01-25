import { useState, useEffect } from 'react';
import { Heart, Edit, Copy, Bed, Bath, Square, TrendingUp, Clock, Building2, PoundSterling, HelpCircle, Check, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/context/auth';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { addToRecentlyViewed } from '@/lib/cookies';
import { Button } from '@/components/ui/button';

const GLOW_COLORS = {
  good: 'before:shadow-emerald-500/20 after:shadow-emerald-500/20 before:animate-border-glow-good after:animate-border-glow-good',
  bad: 'before:shadow-red-500/20 after:shadow-red-500/20 before:animate-border-glow-bad after:animate-border-glow-bad',
  average: 'before:shadow-gold-500/20 after:shadow-gold-500/20 before:animate-border-glow-neutral after:animate-border-glow-neutral'
};

interface PropertyCardProps extends Property {
  onUnsave?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  isEdited?: boolean;
  isSponsored?: boolean;
}

const heartVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.5, 0.8, 1.2, 1],
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const popVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.3 }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

function PropertyCard({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  images,
  isFixerUpper,
  estimatedRevenue,
  estimatedSaleDate,
  analysis,
  renovationCosts,
  leaseType,
  leaseYears,
  isMortgageable,
  location,
  onUnsave,
  onEdit,
  onDuplicate,
  isEdited = false,
  isSponsored = false,
}: PropertyCardProps) {
  const { user, saveProperty, unsaveProperty } = useAuth();
  const isSaved = user?.savedProperties.includes(id.toString());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const locationPath = useLocation();
  const showEditButtons = locationPath.pathname === '/account';

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      if (isSaved) {
        if (onUnsave) {
          onUnsave();
        } else {
          unsaveProperty(id.toString());
        }
      } else {
        saveProperty(id.toString());
      }
    }
  };

  useEffect(() => {
    if (id) {
      addToRecentlyViewed(id.toString());
    }
  }, [id]);

  const getInvestmentLabels = () => {
    const labels = [];
    
    // BRRR Strategy
    if (isFixerUpper) {
      labels.push({
        text: 'BRRR',
        tooltip: 'Buy, Refurbish, Refinance, Rent - Suitable for value-add strategy through renovation',
        color: 'bg-emerald-500'
      });
    }
    
    // HMO Potential
    if (estimatedRevenue > price * 0.008) {
      labels.push({
        text: 'HMO Potential',
        tooltip: 'High yield potential suitable for House in Multiple Occupation conversion',
        color: 'bg-blue-500'
      });
    }
    
    // Short-term Accommodation
    if (location?.coordinates?.lat > 51.5 && location?.coordinates?.lng < -0.1) {
      labels.push({
        text: 'SA Opportunity',
        tooltip: 'Prime location for Short-term Accommodation / Holiday Let strategy',
        color: 'bg-purple-500'
      });
    }

    // Rent to Rent Potential
    if (estimatedRevenue > price * 0.006 && !isFixerUpper) {
      labels.push({
        text: 'R2R',
        tooltip: 'Rent to Rent - Potential for subletting strategy with good rental margins',
        color: 'bg-orange-500'
      });
    }

    // Lease Type Label
    labels.push({
      text: leaseType.charAt(0).toUpperCase() + leaseType.slice(1),
      tooltip: `${leaseType === 'leasehold' ? `${leaseYears} years remaining` : 'Freehold property'}`,
      color: 'bg-gold-500'
    });

    // Mortgageability
    if (isMortgageable) {
      labels.push({
        text: 'Mortgageable',
        tooltip: 'Property meets standard lending criteria',
        color: 'bg-teal-500'
      });
    }

    return labels;
  };

  return (
    <Link to={`/property/${id}`} className="block">
      <div 
        className={cn(
          "glass-card rounded-lg overflow-hidden group hover:scale-[1.02] transition-all duration-300 relative bg-black-800/50",
          "relative before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r",
          isSponsored
            ? 'sponsored-gradient shadow-[0_0_30px_-5px] shadow-emerald-500/30'
            : analysis.priceRating === 'good' 
            ? 'before:from-emerald-500/30 before:to-emerald-500/0 shadow-[0_0_30px_-5px] shadow-emerald-500/20' 
            : analysis.priceRating === 'bad'
            ? 'before:from-red-500/30 before:to-red-500/0 shadow-[0_0_30px_-5px] shadow-red-500/20'
            : 'before:from-gold-500/30 before:to-gold-500/0 shadow-[0_0_30px_-5px] shadow-gold-500/20',
          "hover:before:opacity-100"
        )}
      >
        <div className="relative bg-navy-800/50 rounded-lg overflow-hidden z-10 transition-all duration-300">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-navy-900/80 text-white hover:bg-navy-900 transition-colors z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-navy-900/80 text-white hover:bg-navy-900 transition-colors z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            <button
              onClick={handleSave}
              className="absolute top-4 right-4 p-2 rounded-full glass-button text-white transition-all duration-300 hover:scale-110"
              aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
            >
              <motion.div
                variants={heartVariants}
                initial="initial"
                animate={isSaved ? "animate" : "initial"}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
              </motion.div>
              <AnimatePresence>
                {isSaved && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    variants={popVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
            </button>
            {showEditButtons && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  className="p-2 rounded-full glass-button text-white hover:bg-gold-500/20"
                  onClick={onUnsave}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  className="p-2 rounded-full glass-button text-white hover:bg-gold-500/20"
                  onClick={onEdit}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  className="p-2 rounded-full glass-button text-white hover:bg-gold-500/20"
                  onClick={onDuplicate}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <TooltipProvider>
                {getInvestmentLabels().map((label, index) => (
                  <Tooltip key={`${label.text}-${index}`} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Badge 
                        className={`${label.color} text-white hover:${label.color} flex items-center gap-1 cursor-help z-20`}
                      >
                        {label.text}
                        <HelpCircle className="w-3 h-3" />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="bg-black-900/95 backdrop-blur-md text-white border border-gold-500/20 max-w-xs z-[100] shadow-lg shadow-black/50"
                    >
                      <p className="max-w-xs">
                        {label.tooltip}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{address}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">£{price.toLocaleString()}</div>
                <div className="text-sm text-gray-400">£{Math.round(price/sqft).toLocaleString()}/sqft</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-2">
                        <Bed className="w-5 h-5 text-gold-400" />
                        {bedrooms >= 3 ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className="text-white">{bedrooms}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-black-900/95 backdrop-blur-md text-white border border-gold-500/20 shadow-lg shadow-black/50 z-[100]"
                  >
                    {bedrooms >= 3 
                      ? "Good number of bedrooms for rental potential"
                      : "Limited rental potential with fewer bedrooms"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-2">
                        <Bath className="w-5 h-5 text-gold-400" />
                        {bathrooms >= 2 ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className="text-white">{bathrooms}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-black-900/95 backdrop-blur-md text-white border border-gold-500/20 shadow-lg shadow-black/50 z-[100]"
                  >
                    {bathrooms >= 2 
                      ? "Good bathroom to bedroom ratio"
                      : "May need additional bathrooms for optimal rental"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-2">
                        <Square className="w-5 h-5 text-gold-400" />
                        {sqft >= 800 ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : sqft >= 600 ? (
                          <Check className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className="text-white">{sqft}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-black-900/95 backdrop-blur-md text-white border border-gold-500/20 shadow-lg shadow-black/50 z-[100]"
                  >
                    {sqft >= 800 
                      ? "Excellent size with good potential for value add"
                      : sqft >= 600
                      ? "Average size for the property type"
                      : "Below average size, limited potential"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-2 border-t border-gold-500/20 pt-4">
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <TrendingUp className="w-4 h-4 text-emerald-400 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Monthly Revenue
                </div>
                <div className="text-emerald-400">£{estimatedRevenue.toLocaleString()}</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 text-gold-400 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Est. Sale
                </div>
                <div className="text-white">{estimatedSaleDate}</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <PoundSterling className="w-4 h-4 text-gold-400 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Renovation Cost
                </div>
                <div className="text-white">
                  £{(renovationCosts?.total || 0).toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Building2 className="w-4 h-4 text-gold-400 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  AI Confidence
                </div>
                <div className="text-white">{analysis.confidence}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;