import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaTrophy, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const results = [
        {
          id: 1,
          type: 'match',
          title: 'Mumbai Indians vs Chennai Super Kings',
          subtitle: 'IPL 2024 Match',
          icon: FaTrophy,
          color: 'text-blue-600'
        },
        {
          id: 2,
          type: 'player',
          title: 'Virat Kohli',
          subtitle: 'Cricket Player',
          icon: FaUsers,
          color: 'text-green-600'
        },
        {
          id: 3,
          type: 'venue',
          title: 'Wankhede Stadium',
          subtitle: 'Mumbai, Maharashtra',
          icon: FaMapMarkerAlt,
          color: 'text-purple-600'
        }
      ];
      
      setSearchResults(results);
    } catch (error) {
      handleError(error, 'Search');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleResultPress = (result) => {
    // In a real app, this would navigate to the appropriate screen
    console.log('Selected result:', result);
  };

  const filteredResults = activeTab === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search matches, players, venues..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Tabs */}
        <div className="px-4 pb-3">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'match', label: 'Matches' },
              { id: 'player', label: 'Players' },
              { id: 'venue', label: 'Venues' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="px-4 py-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : searchQuery.trim() ? (
          <div className="space-y-3">
            {filteredResults.map((result) => {
              const Icon = result.icon;
              return (
                <div 
                  key={result.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => handleResultPress(result)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className={`text-lg ${result.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredResults.length === 0 && (
              <div className="text-center py-8">
                <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search SportSphere</h3>
            <p className="text-gray-500">Find matches, players, venues, and more</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
