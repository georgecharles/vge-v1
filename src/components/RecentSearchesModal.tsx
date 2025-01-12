import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { History, Search, Trash2 } from 'lucide-react';
import { getUserSettings, saveUserSettings } from '@/lib/cookies';

interface RecentSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (location: string) => void;
}

export function RecentSearchesModal({ isOpen, onClose, onSearch }: RecentSearchesModalProps) {
  const [searches, setSearches] = useState(() => {
    const settings = getUserSettings();
    return settings.searchHistory || [];
  });

  const handleSearch = (location: string) => {
    onSearch(location);
    onClose();
  };

  const clearHistory = () => {
    setSearches([]);
    saveUserSettings({ searchHistory: [] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-navy-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-light">
            <History className="w-5 h-5 text-gold-400" />
            Recent Searches
          </DialogTitle>
        </DialogHeader>

        {searches.length > 0 ? (
          <>
            <div className="space-y-2">
              {searches.map((search, index) => (
                <Button
                  key={`${search}-${index}`}
                  variant="outline"
                  className="w-full justify-start border-gold-500/20 hover:bg-navy-800"
                  onClick={() => handleSearch(search)}
                >
                  <Search className="w-4 h-4 mr-2 text-gold-400" />
                  {search}
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300"
                onClick={clearHistory}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No recent searches
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
