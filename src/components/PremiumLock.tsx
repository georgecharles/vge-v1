import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth';
import { Link } from 'react-router-dom';

interface PremiumLockProps {
  children: React.ReactNode;
  onAuthClick?: () => void;
}

export function PremiumLock({ children, onAuthClick }: PremiumLockProps) {
  const { user } = useAuth();

  if (user) return <>{children}</>;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-4">
        <Lock className="w-8 h-8 text-gold-400" />
        <div className="text-center px-6">
          <h3 className="text-xl font-light text-white mb-2">Premium Feature</h3>
          <p className="text-gray-400 mb-4">Sign in or upgrade to access this feature</p>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={onAuthClick}
              className="bg-gold-500 text-navy-950 hover:bg-gold-600"
            >
              Sign In
            </Button>
            <Button 
              asChild
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <Link to="/subscription">Join Investors</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="filter blur-sm">
        {children}
      </div>
    </div>
  );
}
