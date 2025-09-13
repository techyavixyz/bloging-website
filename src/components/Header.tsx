import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, Home, User, BookOpen, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">BlogSpace</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/blog"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/blog') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </Link>
            
            {isAdminRoute && (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin')
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  to="/admin/settings"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin/settings')
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-3">
            {isAdminRoute && (
              <Link
                to="/admin/new-post"
                className="btn-primary flex items-center space-x-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;