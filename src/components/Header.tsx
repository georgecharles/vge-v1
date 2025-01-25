import { useState } from 'react';
    import { Menu, X, Home, Building2, TrendingUp, HelpCircle, LogIn, UserCircle, LogOut, Calculator, FileText, BookOpen, Diamond, ShieldCheck } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useAuth } from '@/lib/context/auth';
    import { Link } from 'react-router-dom';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { AccountModal } from './auth/AccountModal';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

    export function Header({ onAuthClick }: { onAuthClick: () => void }) {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
      const { user, logout } = useAuth();

      return (
        <header className="fixed w-full z-50 py-4">
          {/* Gaussian blur background */}
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-xl" />
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-bold text-white tracking-tight">Very Good Estates</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link to="/properties" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <Building2 className="h-4 w-4" />
                  Properties
                </Link>
                <Link to="/market-insights" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <TrendingUp className="h-4 w-4" />
                  Market Insights
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
                </Link>
                <Link to="/calculators" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <Calculator className="h-4 w-4" />
                  Calculators
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
                </Link>
                <Link to="/research" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <FileText className="h-4 w-4" />
                  Research
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
                </Link>
                <Link to="/blog" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Blog
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
                </Link>
                <Link to="/help" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  Help
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
                </Link>
              </nav>

              {/* Auth Section */}
              <div className="hidden md:flex items-center gap-4">
                <Link to="/subscription" className="text-gold-400 hover:text-gold-500 flex items-center gap-2 font-light transition-colors whitespace-nowrap">
                  <Diamond className="w-4 h-4" />
                  {user ? 'Upgrade' : 'Join Investors'}
                </Link>
                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white font-light">
                          <Avatar className="mr-2">
                            <AvatarFallback style={{ backgroundColor: 'black', color: 'white' }}>{user.firstName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {user.firstName}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-navy-800/95 backdrop-blur-md border-gold-500/20">
                        <DropdownMenuItem asChild className="text-white hover:text-white hover:bg-navy-700">
                          <Link to="/account">
                            <UserCircle className="h-4 w-4 mr-2 text-white" />
                            My Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAccountModalOpen(true)} className="text-white hover:text-white hover:bg-navy-700">
                          <UserCircle className="h-4 w-4 mr-2 text-white" />
                          Manage Account
                        </DropdownMenuItem>
                        {user.role === 'admin' && (
                          <DropdownMenuItem asChild className="text-white hover:text-white hover:bg-navy-700">
                            <Link to="/admin">
                              <ShieldCheck className="h-4 w-4 mr-2 text-white" />
                              Admin Panel
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={logout} className="text-white hover:text-white hover:bg-navy-700">
                          <LogOut className="h-4 w-4 mr-2 text-white" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="text-white hover:text-gold-400 font-light transition-colors" onClick={onAuthClick}>
                      Sign In
                    </Button>
                    <Button
                      asChild
                      className="bg-emerald-500 text-white hover:bg-emerald-600 font-light transition-all duration-300"
                    >
                      <Link to="/subscription">Join Investors</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white hover:text-gold-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 relative mt-4">
                <nav className="flex flex-col gap-4">
                  <Link to="/subscription" className="text-gold-400 hover:text-gold-500 flex items-center gap-2 font-light transition-colors">
                    <img 
                      src="https://static.vecteezy.com/system/resources/thumbnails/008/513/899/small_2x/blue-diamond-illustration-png.png"
                      alt="Diamond" 
                      className="w-4 h-4"
                    />
                    {user ? 'Upgrade' : 'Join Investors'}
                  </Link>
                  <Link to="/" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link to="/properties" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <Building2 className="h-4 w-4" />
                    Properties
                  </Link>
                  <Link to="/market-insights" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    Market Insights
                  </Link>
                  <Link to="/calculators" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <Calculator className="h-4 w-4" />
                    Calculators
                  </Link>
                  <Link to="/research" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <FileText className="h-4 w-4" />
                    Research
                  </Link>
                  <Link to="/blog" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <BookOpen className="h-4 w-4" />
                    Blog
                  </Link>
                  <Link to="/help" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </Link>
                  {user ? (
                    <div className="flex flex-col gap-2 pt-4 border-t border-gold-500/20">
                      <Button variant="ghost" className="text-white justify-start font-light" onClick={() => setIsAccountModalOpen(true)}>
                        <img 
                          src="https://i.postimg.cc/j216481G/avatar.png"
                          alt={user.firstName}
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        Manage Account
                      </Button>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="text-white/80 hover:text-gold-400 flex items-center gap-2 font-light transition-colors">
                          <ShieldCheck className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      )}
                      <Button variant="ghost" className="text-white justify-start font-light" onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 pt-4 border-t border-gold-500/20">
                      <Button variant="ghost" className="text-white hover:text-gold-400 justify-start font-light transition-colors" onClick={onAuthClick}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                      <Button
                        asChild
                        className="bg-emerald-500 text-white hover:bg-emerald-600 font-light transition-all duration-300"
                      >
                        <Link to="/subscription">Join Investors</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>

          <AccountModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
          />
        </header>
      );
    }
