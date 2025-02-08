import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { motion } from 'framer-motion';

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
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Very Good Estates</h1>
          <p className="text-gray-400 text-lg font-light">
            Welcome to Very Good Estates, your gateway to exclusive real estate investments.
          </p>
          <p className="text-gray-400 text-lg font-light">
            This platform is invite-only.
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
            Investor Login
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
