import React, { useState, useEffect } from 'react';
import { 
  FaUserPlus, 
  FaUserMinus, 
  FaSearch, 
  FaTrophy, 
  FaChartLine,
  FaCalendar,
  FaMapMarkerAlt,
  FaFilter
} from 'react-icons/fa';

const FriendsAndRivals = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState({
    friends: [],
    rivals: []
  });

  useEffect(() => {
    // Mock data - in real app, this would come from Firebase
    setConnections({
      friends: [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: 'SJ',
          sport: 'Basketball',
          location: 'New York, NY',
          stats: { matches: 45, wins: 32, winRate: 71 },
          lastActive: '2 hours ago',
          isOnline: true
        },
        {
          id: 2,
          name: 'Mike Chen',
          avatar: 'MC',
          sport: 'Soccer',
          location: 'Los Angeles, CA',
          stats: { matches: 38, wins: 25, winRate: 66 },
          lastActive: '1 day ago',
          isOnline: false
        },
        {
          id: 3,
          name: 'Emma Davis',
          avatar: 'ED',
          sport: 'Tennis',
          location: 'Chicago, IL',
          stats: { matches: 52, wins: 41, winRate: 79 },
          lastActive: '30 min ago',
          isOnline: true
        }
      ],
      rivals: [
        {
          id: 4,
          name: 'Alex Rodriguez',
          avatar: 'AR',
          sport: 'Basketball',
          location: 'Miami, FL',
          stats: { matches: 42, wins: 28, winRate: 67 },
          lastActive: '5 hours ago',
          isOnline: false,
          headToHead: { wins: 3, losses: 5 }
        },
        {
          id: 5,
          name: 'Jessica Kim',
          avatar: 'JK',
          sport: 'Tennis',
          location: 'Seattle, WA',
          stats: { matches: 48, wins: 35, winRate: 73 },
          lastActive: '2 days ago',
          isOnline: false,
          headToHead: { wins: 2, losses: 4 }
        }
      ]
    });
  }, []);

  // TODO: Implement connection removal functionality
  // const handleRemoveConnection = (type, id) => {
  //   setConnections(prev => ({
  //     ...prev,
  //     [type]: prev[type].filter(connection => connection.id !== id)
  //   }));
  // };

  const filteredConnections = connections[activeTab].filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Friends & Rivals</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or sport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <FaFilter className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('friends')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'friends'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Friends ({connections.friends.length})
          </button>
          <button
            onClick={() => setActiveTab('rivals')}
            className={`py-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'rivals'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Rivals ({connections.rivals.length})
          </button>
        </div>
      </div>

      {/* Connections List */}
      <div className="px-6 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {filteredConnections.map((connection) => (
            <div key={connection.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {connection.avatar}
                      </div>
                      {connection.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaTrophy className="mr-1" />
                          {connection.sport}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {connection.location}
                        </span>
                        <span className="flex items-center">
                          <FaCalendar className="mr-1" />
                          {connection.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaUserMinus />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{connection.stats.matches}</div>
                    <div className="text-xs text-gray-500">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{connection.stats.wins}</div>
                    <div className="text-xs text-gray-500">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{connection.stats.winRate}%</div>
                    <div className="text-xs text-gray-500">Win Rate</div>
                  </div>
                </div>

                {/* Head to Head (for rivals) */}
                {activeTab === 'rivals' && connection.headToHead && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <h4 className="text-sm font-medium text-red-900 mb-2">Head to Head</h4>
                    <div className="flex items-center justify-center space-x-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{connection.headToHead.wins}</div>
                        <div className="text-xs text-gray-600">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600">{connection.headToHead.losses}</div>
                        <div className="text-xs text-gray-600">Losses</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-3">
                  <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FaChartLine className="mr-2" />
                    View Stats
                  </button>
                  <button className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <FaCalendar className="mr-2" />
                    Challenge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredConnections.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'friends' ? (
                <FaUserPlus className="text-gray-400 text-2xl" />
              ) : (
                <FaUserMinus className="text-gray-400 text-2xl" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'friends' 
                ? 'Start building your sports network by adding friends!'
                : 'Add rivals to track your competitive matchups!'
              }
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Find People
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsAndRivals;
