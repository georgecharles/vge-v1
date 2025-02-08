import { useState, useEffect } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle } from 'lucide-react';
    import Cookies from 'js-cookie';
    import { useAuth } from '@/lib/context/auth';

    export function BetaModal() {
      const [isOpen, setIsOpen] = useState(false);
      const { user } = useAuth();

      useEffect(() => {
        if (user) {
          const hasSeenAlpha = Cookies.get('vge_alpha_notice');
          if (!hasSeenAlpha) {
            setIsOpen(true);
            Cookies.set('vge_alpha_notice', 'true', { expires: 7 }); // Cookie expires in 7 days
          }
        }
      }, [user]);

      if (!user) return null;

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px] bg-navy-900 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl font-light text-white">
                <AlertTriangle className="w-6 h-6 text-gold-400" />
                Alpha Version
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-gray-400">
                Welcome to the Very Good Estates alpha! This is an early access version of our platform, and you may encounter:
              </p>
              
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  • Occasional system instability
                </li>
                <li className="flex items-center gap-2">
                  • Features that are still in development
                </li>
                <li className="flex items-center gap-2">
                  • Limited data availability
                </li>
                <li className="flex items-center gap-2">
                  • Performance optimizations in progress
                </li>
              </ul>

              <p className="text-gray-400">
                We appreciate your feedback and patience as we continue to improve the platform.
              </p>

              <Button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600"
              >
                I Understand
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
