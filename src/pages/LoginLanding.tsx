import { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { AuthModal } from '@/components/auth/AuthModal';
    import { motion } from 'framer-motion';
    import { LogIn } from 'lucide-react';

    export function LoginLanding() {
      const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

      return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://res.cloudinary.com/dsk4t9q1s/video/upload/v1715877797/verygoodestates/pexels-engin-akyurt-11088547_1_vj7q9j.mp4"
          />
          <div className="text-center relative z-10">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
              <dotlottie-player 
                src="https://lottie.host/33f6f966-dec6-4644-9352-1332624ca281/Bb8pT0BiYr.lottie" 
                background="transparent" 
                speed="1" 
                style={{ width: '200px', height: '200px', margin: '0 auto' }}
                loop 
                autoplay
              ></dotlottie-player>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Very Good Estates</h1>
              <p className="text-gray-400 text-lg font-light">
                Exclusive access for invited investors
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-black-950 hover:bg-gold-500 hover:text-white font-medium mb-4"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => {
                  // Handle Google Sign In
                }}
                variant="outline"
                className="text-white border-gold-500/20 hover:bg-gold-500/10"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In with Google
              </Button>
            </motion.div>
            <AuthModal 
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
          </div>
        </div>
      );
    }
