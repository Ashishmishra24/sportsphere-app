import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFire, FaClock, FaTrophy, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import { handleError } from '../utils/errorHandler';

const LiveScores = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [scores, setScores] = useState([]);

  const sports = [
    { id: 'all', name: 'All', icon: FaTrophy, color: 'text-blue-600' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-green-600' },
    { id: 'football', name: 'Football', icon: FaTrophy, color: 'text-purple-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-orange-600' },
    { id: 'basketball', name: 'Basketball', icon: MdSportsBasketball, color: 'text-red-600' }
  ];

  useEffect(() => {
    fetchLiveScores();
  }, []);

  const fetchLiveScores = async () => {
    try {
      setRefreshing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock live scores data
      setScores([
        {
          id: 1,
          sport: 'cricket',
          tournament: 'IPL 2024',
          team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4', overs: '18.2' },
          team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8', overs: '20.0' },
          status: 'live',
          time: 'LIVE',
          venue: 'Wankhede Stadium',
          highlights: ['Kohli 89*', 'Bumrah 3/25'],
          viewers: '2.4M'
        },
        {
          id: 2,
          sport: 'football',
          tournament: 'Premier League',
          team1: { name: 'Manchester United', logo: 'MU', score: '2' },
          team2: { name: 'Liverpool', logo: 'LIV', score: '1' },
          status: 'live',
          time: '78\'',
          venue: 'Old Trafford',
          highlights: ['Rashford 23\'', 'Salah 45\'', 'Bruno 67\''],
          viewers: '1.8M'
        },
        {
          id: 3,
          sport: 'tennis',
          tournament: 'Wimbledon',
          team1: { name: 'Djokovic', logo: 'DJ', score: '6-4, 7-6' },
          team2: { name: 'Nadal', logo: 'NA', score: '4-6, 6-7' },
          status: 'live',
          time: 'LIVE',
          venue: 'Centre Court',
          highlights: ['Set 3: 2-1'],
          viewers: '890K'
        }
      ]);
    } catch (error) {
      handleError(error, 'Live Scores');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchLiveScores();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-50 border-red-200';
      case 'finished': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  const filteredScores = selectedSport === 'all' 
    ? scores 
    : scores.filter(score => score.sport === selectedSport);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Live Scores</h1>
                <p className="text-sm text-gray-500">Real-time updates</p>
              </div>
            </div>
            <button 
              onClick={handleRefresh}
              className={`text-sm font-medium ${refreshing ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'}`}
              disabled={refreshing}
            >
              {refreshing ? 'Updating...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Sport Categories */}
        <div className="px-4 pb-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {sports.map((sport) => {
              const Icon = sport.icon;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 transition-all duration-200 ${
                    selectedSport === sport.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    selectedSport === sport.id
                      ? 'bg-blue-100 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Icon className={`text-xl ${sport.color}`} />
                  </div>
                  <span className="text-xs font-medium">{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Scores */}
      <div className="px-4 py-6">
        <div className="space-y-3">
          {filteredScores.map((score) => {
            const SportIcon = getSportIcon(score.sport);
            const sportColor = getSportColor(score.sport);
            
            return (
              <div 
                key={score.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate(`/match/${score.id}`)}
              >
                {/* Match Header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <SportIcon className={`text-lg ${sportColor}`} />
                      <span className="text-sm font-medium text-gray-700">{score.tournament}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(score.status)}`}>
                        {score.time}
                      </span>
                      {score.viewers && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <FaEye className="text-xs" />
                          <span>{score.viewers}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {score.venue && (
                    <div className="flex items-center space-x-1 mt-1">
                      <FaMapMarkerAlt className="text-xs text-gray-400" />
                      <span className="text-xs text-gray-500">{score.venue}</span>
                    </div>
                  )}
                </div>
                
                {/* Match Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{score.team1.logo}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{score.team1.name}</h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{score.team1.score}</p>
                      {score.team1.overs && (
                        <p className="text-xs text-gray-500">{score.team1.overs} overs</p>
                      )}
                    </div>
                    
                    <div className="mx-4 text-center">
                      <span className="text-gray-400 text-sm font-medium">vs</span>
                    </div>
                    
                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{score.team2.name}</h3>
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">{score.team2.logo}</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{score.team2.score}</p>
                      {score.team2.overs && (
                        <p className="text-xs text-gray-500">{score.team2.overs} overs</p>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  {score.highlights && score.highlights.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <FaFire className="text-xs text-red-500" />
                        <span className="text-xs font-medium text-gray-700">Highlights:</span>
                        <div className="flex space-x-2">
                          {score.highlights.map((highlight, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredScores.length === 0 && (
          <div className="text-center py-8">
            <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Live Matches</h3>
            <p className="text-gray-500">Check back later for live action!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
