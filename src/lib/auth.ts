import { v4 as uuidv4 } from 'uuid';

    const MOCK_USER = {
      id: '1',
      email: 'george.charles@bird.co.uk',
      password: 'test',
      firstName: 'George',
      lastName: 'Charles',
      avatar: 'https://i.postimg.cc/j216481G/avatar.png',
      banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      savedProperties: [],
      preferences: {
        location: {
          address: '123 Main St, London',
          postcode: 'SW1A 1AA',
          coordinates: {
            lat: 51.5074,
            lng: -0.1278
          }
        }
      },
      role: 'admin'
    };

    export async function login(email: string, password: string, firstName?: string, lastName?: string) {
      // In a real app, this would be an API call
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        return { ...MOCK_USER, role: 'admin' };
      }
      
      if (firstName && lastName) {
        const newUserId = uuidv4();
        return {
          id: newUserId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          avatar: 'https://i.postimg.cc/j216481G/avatar.png',
          banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
          savedProperties: [],
          preferences: {
            location: {
              address: '',
              postcode: '',
              coordinates: {
                lat: 0,
                lng: 0
              }
            }
          },
          role: 'user'
        };
      }
      
      throw new Error('Invalid credentials');
    }

    export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
      // In a real app, this would be an API call
      if (userId === MOCK_USER.id && currentPassword === MOCK_USER.password) {
        MOCK_USER.password = newPassword;
        return true;
      }
      throw new Error('Invalid current password');
    }

    export async function updateUserPreferences(userId: string, preferences: any) {
      // In a real app, this would be an API call
      if (userId === MOCK_USER.id) {
        MOCK_USER.preferences = {
          ...MOCK_USER.preferences,
          ...preferences
        };
        const { password: _, ...user } = MOCK_USER;
        
        // Supabase call removed for testing
        // try {
        //   await supabase
        //     .from('users')
        //     .update({
        //       avatar: preferences.avatar,
        //       banner: preferences.banner,
        //       preferences: MOCK_USER.preferences
        //     })
        //     .eq('id', userId);
        // } catch (error) {
        //   console.error('Error updating user in Supabase:', error);
        // }
        
        return user;
      }
      throw new Error('User not found');
    }
