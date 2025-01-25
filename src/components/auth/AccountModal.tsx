import { useState } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { useToast } from '@/hooks/use-toast';
    import { changePassword, updateUserPreferences } from '@/lib/auth';
    import { useAuth } from '@/lib/context/auth';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Camera } from 'lucide-react';

    interface AccountModalProps {
      isOpen: boolean;
      onClose: () => void;
    }

    export function AccountModal({ isOpen, onClose }: AccountModalProps) {
      const [currentPassword, setCurrentPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [address, setAddress] = useState('');
      const [postcode, setPostcode] = useState('');
      const { toast } = useToast();
      const { user, updateUser } = useAuth();
      const [profileImage, setProfileImage] = useState(user?.avatar || 'https://i.postimg.cc/j216481G/avatar.png');
      const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab');

      const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
          toast({
            title: "Error",
            description: "New passwords don't match",
            variant: "destructive"
          });
          return;
        }

        try {
          await changePassword(user!.id, currentPassword, newPassword);
          toast({
            title: "Success",
            description: "Password updated successfully"
          });
          onClose();
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update password",
            variant: "destructive"
          });
        }
      };

      const handleLocationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          // In a real app, we would geocode the address here
          const mockCoordinates = { lat: 51.5074, lng: -0.1278 }; // London coordinates
          
          const updatedUser = await updateUserPreferences(user!.id, {
            location: {
              address,
              postcode,
              coordinates: mockCoordinates
            }
          });

          updateUser(updatedUser);
          
          toast({
            title: "Success",
            description: "Location preferences updated successfully"
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update location preferences",
            variant: "destructive"
          });
        }
      };

      const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            setProfileImage(reader.result as string);
            if (user) {
              const updatedUser = await updateUserPreferences(user.id, { avatar: reader.result });
              updateUser(updatedUser);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      const handleBannerImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            setBannerImage(reader.result as string);
            if (user) {
              const updatedUser = await updateUserPreferences(user.id, { banner: reader.result });
              updateUser(updatedUser);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      const sampleAvatars = [
        'https://i.postimg.cc/j216481G/avatar.png',
        'https://i.postimg.cc/j216481G/avatar.png',
        'https://i.postimg.cc/j216481G/avatar.png',
        'https://i.postimg.cc/j216481G/avatar.png',
        'https://i.postimg.cc/j216481G/avatar.png',
      ];

      const sampleBanners = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
        'https://images.unsplash.com/photo-1573497620053-ea5300f94f21',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
        'https://images.unsplash.com/photo-1521791055366-0d553872125f',
      ];

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-navy-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Account Settings
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="password">
              <TabsList className="grid w-full grid-cols-3 bg-navy-800">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="bg-navy-800 border-gold-500/20 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="bg-navy-800 border-gold-500/20 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-navy-800 border-gold-500/20 text-black"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                    Update Password
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="location">
                <form onSubmit={handleLocationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Home/Office Address</Label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      required
                      className="bg-navy-800 border-gold-500/20 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="Enter your postcode"
                      required
                      className="bg-navy-800 border-gold-500/20 text-black"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                    Update Location
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="profile">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback style={{ backgroundColor: 'black', color: 'white' }}>{user?.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Label htmlFor="profile-image">Profile Image</Label>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="bg-navy-800 border-gold-500/20 text-black"
                      />
                      <div className="flex gap-2">
                        {sampleAvatars.map((avatar, index) => (
                          <button
                            key={index}
                            onClick={() => setProfileImage(avatar)}
                            className="w-10 h-10 rounded-full overflow-hidden border border-gold-500/20 hover:border-gold-500/50 transition-colors"
                          >
                            <img src={avatar} alt={`Sample Avatar ${index + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-full h-24 bg-navy-800 rounded-lg overflow-hidden">
                      <img
                        src={bannerImage}
                        alt="Banner"
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Label htmlFor="banner-image" className="text-center text-gray-400 cursor-pointer">
                          Change Banner
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="banner-image" className="sr-only">Banner Image</Label>
                      <Input
                        id="banner-image"
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageChange}
                        className="bg-navy-800 border-gold-500/20 text-black"
                      />
                      <div className="flex gap-2">
                        {sampleBanners.map((banner, index) => (
                          <button
                            key={index}
                            onClick={() => setBannerImage(banner)}
                            className="w-20 h-12 rounded-lg overflow-hidden border border-gold-500/20 hover:border-gold-500/50 transition-colors"
                          >
                            <img src={banner} alt={`Sample Banner ${index + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gold-500 text-navy-950 hover:bg-gold-600">
                    Save Profile
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      );
    }
