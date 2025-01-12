import { useState, useRef, useEffect } from 'react';
import { GripVertical, Maximize2, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

interface MarketWidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onMove?: (id: string, x: number, y: number) => void;
  initialPosition?: { x: number; y: number };
  expandedContent?: React.ReactNode;
}

const GRID_SIZE = 20; // Size of grid cells in pixels

export function MarketWidget({ 
  id, 
  title, 
  children, 
  onMove, 
  initialPosition,
  expandedContent 
}: MarketWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(Cookies.get('vge_favorite_widgets') || '[]');
    return favorites.includes(id);
  });

  const handleFavorite = () => {
    if (!user) return;
    const favorites = JSON.parse(Cookies.get('vge_favorite_widgets') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: string) => fav !== id);
      Cookies.set('vge_favorite_widgets', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      Cookies.set('vge_favorite_widgets', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === dragRef.current) {
      setIsDragging(true);
      startPosRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = snapToGrid(e.clientX - startPosRef.current.x);
      const newY = snapToGrid(e.clientY - startPosRef.current.y);
      setPosition({ x: newX, y: newY });
      onMove?.(id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div
        className={`glass-card ${isDragging ? 'cursor-grabbing z-50' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s'
        }}
      >
        <div
          ref={dragRef}
          className="flex items-center justify-between p-4 cursor-grab border-b border-gold-500/10"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <GripVertical className="w-5 h-5 text-gold-400" />
            <h3 className="text-xl font-light text-white">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavorite}
                className={`text-gold-400 hover:text-gold-500 ${isFavorite ? 'bg-gold-500/10' : ''}`}
              >
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </motion.div>
                </AnimatePresence>
              </Button>
            )}
            {expandedContent && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(true)}
                className="text-gold-400 hover:text-gold-500"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl bg-navy-900 border-gold-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-white">{title}</DialogTitle>
          </DialogHeader>
          {expandedContent}
        </DialogContent>
      </Dialog>
    </>
  );
}
