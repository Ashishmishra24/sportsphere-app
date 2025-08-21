import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const PerformanceAnalytics = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalytics({
        overallStats: {
          matchesPlayed: 45,
          wins: 32,
          losses: 13,
          winRate: 71.1,
          totalPoints: 1560
        },
        recentPerformance: [
          { date: '2024-03-15', result: 'W', score: '156/4 vs 142/8' },
          { date: '2024-03-10', result: 'L', score: '145/8 vs 148/6' },
          { date: '2024-03-05', result: 'W', score: '178/5 vs 165/9' },
          { date: '2024-02-28', result: 'W', score: '162/3 vs 158/7' },
          { date: '2024-02-20', result: 'L', score: '134/9 vs 138/5' }
        ],
        topPerformances: [
          { player: 'Virat Kohli', runs: 89, wickets: 0, match: 'vs CSK' },
          { player: 'Jasprit Bumrah', runs: 12, wickets: 3, match: 'vs MI' },
          { player: 'Rohit Sharma', runs: 67, wickets: 0, match: 'vs RCB' }
        ]
      });
    } catch (error) {
      handleError(error, 'Performance Analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Analytics not available</p>
          <button
            onClick={() => navigate(-1)}
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">Performance Analytics</h1>
              <p className="text-sm text-gray-500">Your performance insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Overall Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Overall Statistics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{analytics.overallStats.matchesPlayed}</div>
              <div className="text-sm text-gray-500">Matches Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{analytics.overallStats.wins}</div>
              <div className="text-sm text-gray-500">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{analytics.overallStats.losses}</div>
              <div className="text-sm text-gray-500">Losses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{analytics.overallStats.winRate}%</div>
              <div className="text-sm text-gray-500">Win Rate</div>
            </div>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Performance</h3>
          
          <div className="space-y-3">
            {analytics.recentPerformance.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    match.result === 'W' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {match.result}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{match.score}</div>
                    <div className="text-xs text-gray-500">{match.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {match.result === 'W' ? (
                    <FaArrowUp className="text-green-500" />
                  ) : (
                    <FaArrowDown className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performances */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Top Performances</h3>
          
          <div className="space-y-3">
            {analytics.topPerformances.map((performance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{performance.player}</div>
                    <div className="text-xs text-gray-500">{performance.match}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {performance.runs} runs, {performance.wickets} wkts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
