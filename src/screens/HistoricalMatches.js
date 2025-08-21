import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaTrophy, FaMapMarkerAlt } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const HistoricalMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoricalMatches();
  }, []);

  const fetchHistoricalMatches = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMatches([
        {
          id: 1,
          sport: 'cricket',
          tournament: 'IPL 2023',
          team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4' },
          team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8' },
          result: 'Mumbai Indians won by 14 runs',
          date: '2023-05-15',
          venue: 'Wankhede Stadium'
        },
        {
          id: 2,
          sport: 'football',
          tournament: 'Premier League 2023',
          team1: { name: 'Manchester United', logo: 'MU', score: '2' },
          team2: { name: 'Liverpool', logo: 'LIV', score: '1' },
          result: 'Manchester United won 2-1',
          date: '2023-04-20',
          venue: 'Old Trafford'
        }
      ]);
    } catch (error) {
      handleError(error, 'Historical Matches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading historical matches...</p>
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">Historical Matches</h1>
              <p className="text-sm text-gray-500">Past match results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FaTrophy className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{match.tournament}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FaCalendar className="text-xs" />
                  <span>{match.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{match.team1.name}</h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{match.team1.score}</p>
                </div>
                
                <div className="mx-4 text-center">
                  <span className="text-gray-400 text-sm font-medium">vs</span>
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{match.team2.name}</h3>
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{match.team2.score}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaMapMarkerAlt className="text-xs" />
                    <span>{match.venue}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">{match.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="text-center py-8">
            <FaCalendar className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Historical Matches</h3>
            <p className="text-gray-500">No past matches found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalMatches;
