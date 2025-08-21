// src/components/Breadcrumbs.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationService } from '../services/navigationService';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const breadcrumbs = navigationService.getBreadcrumbTrail(location.pathname, location.state);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <div className="flex items-center space-x-2 px-4 py-2 bg-white border-b border-gray-200">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => navigate(crumb.path, { state: location.state })}
            className={`flex items-center space-x-1 text-sm ${
              index === breadcrumbs.length - 1 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {index === 0 && <FaHome className="text-xs" />}
            <span>{crumb.label}</span>
          </button>
          {index < breadcrumbs.length - 1 && (
            <FaChevronRight className="text-xs text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
