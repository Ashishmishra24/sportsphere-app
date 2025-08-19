import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChartLine } from 'react-icons/fa';

const PerformanceAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/home" className="mr-4">
            <FaArrowLeft className="text-gray-600 text-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        </div>
      </div>
      
      <div className="px-6 py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaChartLine className="text-green-600 text-2xl" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h2>
        <p className="text-gray-600 mb-4">
          Deep insights into your performance with charts and metrics.
        </p>
        <p className="text-sm text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
