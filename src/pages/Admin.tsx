import { PropertyHero } from '@/components/PropertyHero';

    export function Admin() {
      return (
        <div>
          <PropertyHero
            title="Admin Panel"
            subtitle="Manage users and settings"
            imageUrl="https://images.unsplash.com/photo-1551836022-4c4c79ecde51"
          />

          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-light text-white mb-8">User Management</h2>
            <p className="text-gray-400">
              This page will eventually allow you to manage user settings and data.
            </p>
          </div>
        </div>
      );
    }
