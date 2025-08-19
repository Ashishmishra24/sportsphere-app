import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { mockAuth } from '../utils/mockAuth';
import { handleError, showSuccess } from '../utils/errorHandler';
import { 
  FaHome, 
  FaUser, 
  FaUsers, 
  FaTrophy, 
  FaComments, 
  FaMapMarkerAlt, 
  FaCog,
  FaPlus,
  FaSearch
} from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', icon: FaHome, label: 'Home' },
    { path: '/live-scores', icon: FaTrophy, label: 'Scores' },
    { path: '/create-match', icon: FaPlus, label: 'Create' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/community', icon: FaUsers, label: 'Community' },
  ];

  const handleSignOut = async () => {
    try {
      await mockAuth.signOut();
      showSuccess('Signed out successfully');
      navigate('/');
    } catch (error) {
      handleError(error, 'Navigation - Sign Out');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Quick Actions Menu */}
      <div className="absolute top-0 right-0 p-2">
        <div className="relative group">
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <FaCog className="text-lg" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
            <Link to="/venues" className="flex items-center p-3 hover:bg-gray-50 transition-colors">
              <FaMapMarkerAlt className="mr-2" />
              Venues
            </Link>
            <Link to="/chat" className="flex items-center p-3 hover:bg-gray-50 transition-colors">
              <FaComments className="mr-2" />
              Messages
            </Link>
            <Link to="/profile" className="flex items-center p-3 hover:bg-gray-50 transition-colors">
              <FaUser className="mr-2" />
              Profile
            </Link>
            <Link to="/settings" className="flex items-center p-3 hover:bg-gray-50 transition-colors">
              <FaCog className="mr-2" />
              Settings
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full text-left flex items-center p-3 hover:bg-gray-50 text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
