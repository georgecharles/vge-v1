import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/auth';
import { useAuth } from '@/lib/context/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const { toast } = useToast();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password, activeTab === 'signup' ? firstName : undefined, activeTab === 'signup' ? lastName : undefined);
      authLogin(user);
      toast({
        title: "Success!",
        description: "Welcome back!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-navy-900 text-gray-10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gold-500">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 bg-navy-800">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900 text-gray-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900 text-gray-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-navy-800 border-gold-500/70 text-gray-200 focus-visible:ring-gold-500 placeholder:text-gray-500"
                  placeholder="Create a password"
                />
              </div>
              <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}