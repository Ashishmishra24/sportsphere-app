import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaArrowLeft, 
  FaFilter,
  FaFutbol,
  FaTrophy,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendar
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-red-600' },
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-green-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-yellow-600' },
  ];

  const searchResults = [
    {
      id: 1,
      type: 'match',
      title: 'Tigers vs Lions',
      sport: 'cricket',
      status: 'live',
      time: 'LIVE',
      venue: 'Central Stadium'
    },
    {
      id: 2,
      type: 'player',
      name: 'Alex Johnson',
      sport: 'football',
      location: 'New York',
      rating: 4.5
    },
    {
      id: 3,
      type: 'tournament',
      title: 'Summer League 2024',
      sport: 'tennis',
      date: 'June 15-30',
      participants: 32
    }
  ];

  const getSportIcon = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.icon : FaTrophy;
  };

  const getSportColor = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.color : 'text-gray-600';
  };

  const filteredResults = searchResults.filter(result => 
    result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Link to="/home" className="text-gray-600">
            <FaArrowLeft className="text-xl" />
          </Link>
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search matches, players, tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="text-gray-600 hover:text-blue-600">
            <FaFilter className="text-xl" />
          </button>
        </div>
      </div>

      {/* Search Tabs */}
      <div className="bg-white px-4 md:px-6 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'matches', label: 'Matches' },
            { key: 'players', label: 'Players' },
            { key: 'tournaments', label: 'Tournaments' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="px-4 md:px-6 py-4">
        {searchQuery ? (
          <div className="space-y-3">
            {filteredResults.map((result) => {
              const SportIcon = getSportIcon(result.sport);
              const sportColor = getSportColor(result.sport);

              return (
                <div key={result.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {result.type === 'match' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sportColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <SportIcon className={`text-lg ${sportColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {result.venue}
                            </span>
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {result.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.status === 'live' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
                      }`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {result.type === 'player' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {result.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <SportIcon className={`mr-1 ${sportColor}`} />
                              {result.sport}
                            </span>
                            <span className="flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {result.location}
                            </span>
                            <span className="flex items-center">
                              <FaTrophy className="mr-1" />
                              {result.rating}★
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {result.type === 'tournament' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sportColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <SportIcon className={`text-lg ${sportColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {result.date}
                            </span>
                            <span className="flex items-center">
                              <FaUsers className="mr-1" />
                              {result.participants} players
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search for anything</h3>
            <p className="text-gray-600">Find matches, players, tournaments, and more</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
