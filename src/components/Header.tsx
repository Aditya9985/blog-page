import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-md border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <BookOpen className="h-10 w-10 text-primary-500 group-hover:text-accent-500 transition-colors duration-200" />
              <span className="ml-1 text-2xl font-serif font-extrabold bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text text-transparent drop-shadow">LC Corporate</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 btn-gradient shadow-md ${
                isActive('/') 
                  ? 'ring-2 ring-accent-400 scale-105' 
                  : 'opacity-90 hover:scale-105 hover:ring-2 hover:ring-primary-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/add" 
              className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 btn-gradient shadow-md ${
                isActive('/add') 
                  ? 'ring-2 ring-accent-400 scale-105' 
                  : 'opacity-90 hover:scale-105 hover:ring-2 hover:ring-primary-300'
              }`}
            >
              Add Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;