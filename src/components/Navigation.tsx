import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trophy, LogOut, User } from 'lucide-react';
import { logoutUser } from '../firebase';
import Profile from './Profile';
import logoImage from '../assests/logo.jpg';

interface NavigationProps {
  currentUser: any;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentUser, onLogout }) => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="p-1 rounded-lg overflow-hidden">
                <img src={logoImage} alt="She Can Foundation Logo" className="h-8 w-auto" />
              </div>
              <span className="text-xl font-bold text-gray-900">She Can Foundation</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/leaderboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/leaderboard')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
              </button>
              <button
                onClick={() => {
                  logoutUser().then(() => {
                    onLogout();
                  }).catch(error => {
                    console.error('Error logging out:', error);
                  });
                }}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-3">
          <div className="flex space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
                isActive('/dashboard')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/leaderboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
                isActive('/leaderboard')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <Profile currentUser={currentUser} onClose={() => setShowProfile(false)} />
      )}
    </nav>
  );
};

export default Navigation;