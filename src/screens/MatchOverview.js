import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaUsers, FaTrophy, FaChartBar } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const MatchOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching match data
    const fetchMatch = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock sport determination based on matchId
        const sportMap = {
          1: 'cricket',    // IPL match
          2: 'football',   // Premier League match
          3: 'tennis',     // Wimbledon match
          4: 'basketball', // NBA match
          5: 'badminton',  // Badminton match
          6: 'cricket',    // Another cricket match
          7: 'football',   // Another football match
          8: 'tennis',     // Another tennis match
          9: 'basketball', // Another basketball match
          10: 'badminton'  // Another badminton match
        };
        
        const determinedSport = sportMap[id] || 'cricket';
        
        // Mock match data based on sport
        const matchData = {
          cricket: {
            tournament: 'IPL 2024',
            team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4', overs: '18.2' },
            team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8', overs: '20.0' },
            venue: 'Wankhede Stadium',
            highlights: ['Kohli 89*', 'Bumrah 3/25'],
            description: 'High-stakes match between two top teams in the IPL 2024 season.'
          },
          football: {
            tournament: 'Premier League',
            team1: { name: 'Manchester United', logo: 'MU', score: '2' },
            team2: { name: 'Liverpool', logo: 'LIV', score: '1' },
            venue: 'Old Trafford',
            highlights: ['Rashford 23\'', 'Salah 45\'', 'Bruno 67\''],
            description: 'Classic rivalry match in the Premier League.'
          },
          tennis: {
            tournament: 'Wimbledon',
            team1: { name: 'Djokovic', logo: 'DJ', score: '6-4, 7-6' },
            team2: { name: 'Nadal', logo: 'NA', score: '4-6, 6-7' },
            venue: 'Centre Court',
            highlights: ['Set 3: 2-1'],
            description: 'Epic showdown between tennis legends.'
          },
          basketball: {
            tournament: 'NBA Playoffs',
            team1: { name: 'Lakers', logo: 'LAL', score: '108' },
            team2: { name: 'Warriors', logo: 'GSW', score: '102' },
            venue: 'Crypto.com Arena',
            highlights: ['LeBron 32pts', 'Curry 28pts'],
            description: 'Playoff battle between Western Conference giants.'
          },
          badminton: {
            tournament: 'All England Open',
            team1: { name: 'Viktor Axelsen', logo: 'VA', score: '21-18, 15-12' },
            team2: { name: 'Kento Momota', logo: 'KM', score: '18-21, 12-15' },
            venue: 'Utilita Arena Birmingham',
            highlights: ['Axelsen 8 smashes', 'Momota 15 drops'],
            description: 'World-class badminton action at the All England Open.'
          }
        };
        
        const sportData = matchData[determinedSport];
        
        setMatch({
          id: id,
          sport: determinedSport,
          tournament: sportData.tournament,
          team1: sportData.team1,
          team2: sportData.team2,
          status: 'live',
          time: 'LIVE',
          venue: sportData.venue,
          date: '2024-03-15',
          highlights: sportData.highlights,
          viewers: '2.4M',
          description: sportData.description
        });
      } catch (error) {
        handleError(error, 'Match Overview');
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Match not found</p>
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-gray-900">Match Overview</h1>
              <p className="text-sm text-gray-500">{match.tournament}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="px-4 py-6">
        {/* Match Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              match.status === 'live' 
                ? 'text-red-600 bg-red-50 border border-red-200' 
                : 'text-gray-600 bg-gray-50 border border-gray-200'
            }`}>
              {match.time}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FaUsers className="text-xs" />
              <span>{match.viewers}</span>
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-lg">{match.team1.logo}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{match.team1.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{match.team1.score}</p>
              {match.team1.overs && (
                <p className="text-sm text-gray-500">{match.team1.overs} overs</p>
              )}
            </div>
            
            <div className="mx-6 text-center">
              <span className="text-gray-400 text-lg font-medium">vs</span>
            </div>
            
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-red-600 font-bold text-lg">{match.team2.logo}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{match.team2.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{match.team2.score}</p>
              {match.team2.overs && (
                <p className="text-sm text-gray-500">{match.team2.overs} overs</p>
              )}
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Match Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="text-gray-700">{match.venue}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <FaClock className="text-gray-400" />
              <span className="text-gray-700">{match.date}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <FaTrophy className="text-gray-400" />
              <span className="text-gray-700">{match.tournament}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {match.description && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{match.description}</p>
          </div>
        )}

        {/* Highlights */}
        {match.highlights && match.highlights.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {match.highlights.map((highlight, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/match/${id}/detail`)}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FaChartBar />
            <span>View Detailed Scorecard</span>
          </button>
          
          <button
            onClick={() => navigate(`/match/${id}/scoring`)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FaChartBar />
            <span>View Scoring & Stats</span>
          </button>
          
          <button
            onClick={() => navigate(`/live-match/${id}`)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FaClock />
            <span>Go Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchOverview;
