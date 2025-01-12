import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map of path to display names
  const pathMap: { [key: string]: string } = {
    'properties': 'Properties',
    'property': 'Property Details',
    'market-insights': 'Market Insights',
    'calculators': 'Calculators',
    'research': 'Research',
    'blog': 'Blog',
    'account': 'Account',
    'portfolio': 'Portfolio',
    'help': 'Help',
    'investment': 'Investment'
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      <Link to="/" className="hover:text-gold-400 transition-colors">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={name} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
            {isLast ? (
              <span className="text-gold-400">{pathMap[name] || name}</span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-gold-400 transition-colors"
              >
                {pathMap[name] || name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
