import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
    import { useState } from 'react';
    import { AnimatePresence, motion } from 'framer-motion';
    import { Header } from '@/components/Header';
    import { Footer } from '@/components/Footer';
    import { AuthModal } from '@/components/auth/AuthModal';
    import { BetaModal } from '@/components/BetaModal';
    import { Breadcrumbs } from '@/components/Breadcrumbs';
    import { AuthProvider, useAuth } from '@/lib/context/auth';
    import { LocationProvider } from '@/lib/context/location';
    import { ScrollToTop } from '@/components/ScrollToTop';
    import { Home } from '@/pages/Home';
    import { Properties } from '@/pages/Properties';
    import { PropertyDetails } from '@/pages/PropertyDetails';
    import { MarketInsights } from '@/pages/MarketInsights';
    import { PropertyCalculators } from '@/pages/PropertyCalculators';
    import { Research } from '@/pages/Research';
    import { ResearchPost } from '@/pages/ResearchPost';
    import { Blog } from '@/pages/Blog';
    import { Account } from '@/pages/Account';
    import { BlogPost } from '@/pages/BlogPost';
    import { Help } from '@/pages/Help';
    import { About } from '@/pages/About';
    import { Privacy } from '@/pages/Privacy';
    import { Terms } from '@/pages/Terms';
    import { Cookies } from '@/pages/Cookies';
    import { Investment } from '@/pages/Investment';
    import { Accessibility } from '@/pages/Accessibility';
    import { ModernSlavery } from '@/pages/ModernSlavery';
    import { Complaints } from '@/pages/Complaints';
    import { Subscription } from '@/pages/Subscription';
    import { LoginLanding } from '@/pages/LoginLanding';
    import { Admin } from '@/pages/Admin';

    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: "easeIn"
        }
      }
    };

    function PrivateRoute({ children }: { children: React.ReactNode }) {
      const { user, isLoading } = useAuth();
      const location = useLocation();
      const showHeaderFooter = location.pathname !== '/login';

      if (isLoading) {
        return <div>Loading...</div>;
      }

      if (!user) {
        return <Navigate to="/login" />;
      }

      return (
        <>
          {showHeaderFooter && <Header />}
          {showHeaderFooter && (
            <div className="max-w-7xl mx-auto px-4 py-4">
              <Breadcrumbs />
            </div>
          )}
          {children}
          {showHeaderFooter && <Footer />}
        </>
      );
    }

    function AdminRoute({ children }: { children: React.ReactNode }) {
      const { user, isLoading } = useAuth();
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
      }
    
      return <>{children}</>;
    }

    function PublicRoute({ children }: { children: React.ReactNode }) {
      const { user, isLoading } = useAuth();
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (user) {
        return <Navigate to="/" />;
      }
    
      return <>{children}</>;
    }

    export default function App() {
      const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

      return (
        <AuthProvider>
          <LocationProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-black-950">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={window.location.pathname}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <Routes>
                      <Route path="/login" element={<PublicRoute><LoginLanding /></PublicRoute>} />
                      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                      <Route path="/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
                      <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
                      <Route path="/market-insights" element={<PrivateRoute><MarketInsights /></PrivateRoute>} />
                      <Route path="/calculators" element={<PrivateRoute><PropertyCalculators /></PrivateRoute>} />
                      <Route path="/research" element={<PrivateRoute><Research /></PrivateRoute>} />
                      <Route path="/research/:id" element={<PrivateRoute><ResearchPost /></PrivateRoute>} />
                      <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
                      <Route path="/blog/:id" element={<PrivateRoute><BlogPost /></PrivateRoute>} />
                      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                      <Route path="/investment" element={<PrivateRoute><Investment /></PrivateRoute>} />
                      <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
                      <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                      <Route path="/privacy" element={<PrivateRoute><Privacy /></PrivateRoute>} />
                      <Route path="/terms" element={<PrivateRoute><Terms /></PrivateRoute>} />
                      <Route path="/cookies" element={<PrivateRoute><Cookies /></PrivateRoute>} />
                      <Route path="/accessibility" element={<PrivateRoute><Accessibility /></PrivateRoute>} />
                      <Route path="/modern-slavery" element={<PrivateRoute><ModernSlavery /></PrivateRoute>} />
                      <Route path="/complaints" element={<PrivateRoute><Complaints /></PrivateRoute>} />
                      <Route path="/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />
                      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>

                <AuthModal 
                  isOpen={isAuthModalOpen}
                  onClose={() => setIsAuthModalOpen(false)}
                  onSuccess={(user) => {
                    setIsAuthModalOpen(false);
                  }}
                />

                {/* BetaModal removed */}

              </div>
            </Router>
          </LocationProvider>
        </AuthProvider>
      );
    }
