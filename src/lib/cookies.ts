import Cookies from 'js-cookie';
    import { supabase } from './supabaseClient';

    interface UserSettings {
      theme?: 'light' | 'dark';
      currency?: 'GBP' | 'USD' | 'EUR';
      searchHistory?: string[];
      recentlyViewed?: string[];
      filters?: {
        priceRange?: [number, number];
        bedrooms?: number;
        propertyType?: string;
        leaseType?: string;
        fixerUpperOnly?: boolean;
      };
    }

    const COOKIE_NAME = 'vge_settings';
    const COOKIE_EXPIRY = 365; // Days

    export async function saveUserSettings(settings: Partial<UserSettings>) {
      const currentSettings = await getUserSettings();
      const newSettings = { ...currentSettings, ...settings };
      Cookies.set(COOKIE_NAME, JSON.stringify(newSettings), { expires: COOKIE_EXPIRY });
    }

    export async function getUserSettings(): Promise<UserSettings> {
      const settings = Cookies.get(COOKIE_NAME);
      let parsedSettings: UserSettings = settings ? JSON.parse(settings) : {};
      return parsedSettings;
    }

    export async function addToSearchHistory(location: string, user: any) {
      const settings = await getUserSettings();
      const searchHistory = settings.searchHistory || [];
      
      // Remove if exists and add to front
      const newSearchHistory = [
        location,
        ...searchHistory.filter(l => l !== location)
      ].slice(0, 5); // Keep last 5
    
      saveUserSettings({ searchHistory: newSearchHistory });

      if (user) {
        try {
          await supabase
            .from('user_settings')
            .upsert([{
              user_id: user.id,
              settings: { ...settings, searchHistory: newSearchHistory }
            }], { onConflict: 'user_id' });
        } catch (error) {
          console.error('Error saving user settings to Supabase:', error);
        }
      }
    }

    export async function saveFilters(filters: UserSettings['filters']) {
          const settings = await getUserSettings();
          saveUserSettings({ filters: { ...settings.filters, ...filters } });
        }

    export function clearUserSettings() {
      Cookies.remove(COOKIE_NAME);
    }

    export async function addToRecentlyViewed(propertyId: string) {
      const settings = await getUserSettings();
      const recentlyViewed = settings.recentlyViewed || [];
      
      // Remove if exists and add to front
      const newRecentlyViewed = [
        propertyId,
        ...recentlyViewed.filter(id => id !== propertyId)
      ].slice(0, 10); // Keep last 10

      saveUserSettings({ recentlyViewed: newRecentlyViewed });
    }
