import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis, 
  FaVolleyballBall, 
  FaHockeyPuck, 
  FaTrophy, 
  FaClock, 
  FaMapMarkerAlt, 
  FaStar,
  FaPlus,
  FaSearch,
  FaUsers,
  FaComments,
  FaEllipsisH,
  FaHeart,
  FaShare
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';
import toast from 'react-hot-toast';

const Home = () => {
  const [selectedSport, setSelectedSport] = useState('all');

  // Sport selection data
  const sports = [
    { id: 'all', name: 'All', icon: FaTrophy, color: 'text-blue-600' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-red-600' },
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-green-600' },
    { id: 'badminton', name: 'Badminton', icon: FaTableTennis, color: 'text-purple-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-yellow-600' },
  ];

  // Live scores data
  const liveScores = [
    {
      id: 1,
      sport: 'cricket',
      team1: 'Tigers',
      team2: 'Lions',
      score1: '123/4',
      score2: '120/8',
      status: 'live',
      stage: 'Knockout Stage',
      time: 'LIVE'
    },
    {
      id: 2,
      sport: 'football',
      team1: 'City',
      team2: 'United',
      score1: '2',
      score2: '1',
      status: 'finished',
      stage: 'City Cup',
      time: 'FULL TIME'
    },
    {
      id: 3,
      sport: 'badminton',
      team1: 'Badminton',
      team2: 'Tennis',
      score1: '2',
      score2: '0',
      status: 'finished',
      stage: 'Amaekout Tournament',
      time: '15 min ago'
    }
  ];

  // Social feed data
  const socialFeed = [
    {
      id: 1,
      user: 'Alex',
      action: 'played a match',
      time: '2h ago',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      user: 'Ellen',
      action: 'shared photo',
      time: '5h ago',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop',
      likes: 18,
      comments: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-100';
      case 'finished': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getSportIcon = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.icon : FaTrophy;
  };

  const getSportColor = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.color : 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">SportSphere</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FaComments className="text-gray-600 text-sm" />
            </button>
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FaUsers className="text-gray-600 text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Sport Selection */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex space-x-4 overflow-x-auto">
          {sports.map((sport) => {
            const Icon = sport.icon;
            return (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 ${
                  selectedSport === sport.id
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedSport === sport.id
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`text-xl ${sport.color}`} />
                </div>
                <span className="text-xs font-medium">{sport.name}</span>
              </button>
            );
          })}
          <button className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 text-gray-500">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <FaPlus className="text-gray-400 text-lg" />
            </div>
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Live Scores Section */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {liveScores.map((match) => {
            const SportIcon = getSportIcon(match.sport);
            const sportColor = getSportColor(match.sport);
            
            return (
              <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <SportIcon className={`text-lg ${sportColor}`} />
                    <span className="text-sm font-medium text-gray-700">{match.stage}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                      {match.time}
                    </span>
                    <button className="text-blue-600 text-sm font-medium">
                      View match &gt;
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{match.team1}</h3>
                    <p className="text-2xl font-bold text-gray-900">{match.score1}</p>
                  </div>
                  <div className="mx-4 text-center">
                    <span className="text-gray-400 text-sm">vs</span>
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-gray-900">{match.team2}</h3>
                    <p className="text-2xl font-bold text-gray-900">{match.score2}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Feed Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Feed</h2>
          <button className="text-gray-500">
            <FaEllipsisH className="text-lg" />
          </button>
        </div>
        
        <div className="space-y-4">
          {socialFeed.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {post.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{post.user}</span>
                    <span className="text-gray-500">{post.action}</span>
                  </div>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center hidden">
                  <span className="text-gray-500">Image not available</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                    <FaHeart className="text-sm" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                    <FaComments className="text-sm" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-blue-500">
                  <FaShare className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-20 right-4">
        <button 
          onClick={() => toast.success('Create new match!')}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Home;
