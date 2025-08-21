import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const ScoringAndStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock stats data
        setStats({
          matchId: id,
          team1: {
            name: 'Mumbai Indians',
            score: '156/4',
            overs: '18.2',
            runRate: '8.52',
            players: [
              { name: 'Rohit Sharma', runs: 45, balls: 32, fours: 4, sixes: 2 },
              { name: 'Virat Kohli', runs: 89, balls: 56, fours: 8, sixes: 3 },
              { name: 'Hardik Pandya', runs: 22, balls: 12, fours: 2, sixes: 1 }
            ]
          },
          team2: {
            name: 'Chennai Super Kings',
            score: '142/8',
            overs: '20.0',
            runRate: '7.10',
            players: [
              { name: 'MS Dhoni', runs: 38, balls: 28, fours: 3, sixes: 1 },
              { name: 'Ravindra Jadeja', runs: 25, balls: 18, fours: 2, sixes: 0 },
              { name: 'Deepak Chahar', runs: 15, balls: 10, fours: 1, sixes: 0 }
            ]
          },
          bowling: {
            team1: [
              { name: 'Jasprit Bumrah', overs: '4.0', wickets: 3, runs: 25, economy: '6.25' },
              { name: 'Trent Boult', overs: '4.0', wickets: 2, runs: 32, economy: '8.00' }
            ],
            team2: [
              { name: 'Deepak Chahar', overs: '4.0', wickets: 2, runs: 28, economy: '7.00' },
              { name: 'Ravindra Jadeja', overs: '4.0', wickets: 1, runs: 35, economy: '8.75' }
            ]
          }
        });
      } catch (error) {
        handleError(error, 'Scoring and Stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Statistics not available</p>
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
              <h1 className="text-xl font-bold text-gray-900">Scoring & Statistics</h1>
              <p className="text-sm text-gray-500">Match #{id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Score Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Score Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="font-medium text-gray-700 mb-2">{stats.team1.name}</h4>
              <p className="text-2xl font-bold text-blue-600">{stats.team1.score}</p>
              <p className="text-sm text-gray-500">{stats.team1.overs} overs</p>
              <p className="text-xs text-gray-400">RR: {stats.team1.runRate}</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-700 mb-2">{stats.team2.name}</h4>
              <p className="text-2xl font-bold text-red-600">{stats.team2.score}</p>
              <p className="text-sm text-gray-500">{stats.team2.overs} overs</p>
              <p className="text-xs text-gray-400">RR: {stats.team2.runRate}</p>
            </div>
          </div>
        </div>

        {/* Batting Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Batting Statistics</h3>
          
          {/* Team 1 Batting */}
          <div className="mb-6">
            <h4 className="font-medium text-blue-600 mb-3">{stats.team1.name}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Batsman</th>
                    <th className="text-right py-2">R</th>
                    <th className="text-right py-2">B</th>
                    <th className="text-right py-2">4s</th>
                    <th className="text-right py-2">6s</th>
                    <th className="text-right py-2">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.team1.players.map((player, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{player.name}</td>
                      <td className="text-right py-2 font-medium">{player.runs}</td>
                      <td className="text-right py-2">{player.balls}</td>
                      <td className="text-right py-2">{player.fours}</td>
                      <td className="text-right py-2">{player.sixes}</td>
                      <td className="text-right py-2">{(player.runs / player.balls * 100).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team 2 Batting */}
          <div>
            <h4 className="font-medium text-red-600 mb-3">{stats.team2.name}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Batsman</th>
                    <th className="text-right py-2">R</th>
                    <th className="text-right py-2">B</th>
                    <th className="text-right py-2">4s</th>
                    <th className="text-right py-2">6s</th>
                    <th className="text-right py-2">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.team2.players.map((player, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{player.name}</td>
                      <td className="text-right py-2 font-medium">{player.runs}</td>
                      <td className="text-right py-2">{player.balls}</td>
                      <td className="text-right py-2">{player.fours}</td>
                      <td className="text-right py-2">{player.sixes}</td>
                      <td className="text-right py-2">{(player.runs / player.balls * 100).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bowling Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Bowling Statistics</h3>
          
          {/* Team 1 Bowling */}
          <div className="mb-6">
            <h4 className="font-medium text-blue-600 mb-3">{stats.team1.name} Bowling</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Bowler</th>
                    <th className="text-right py-2">O</th>
                    <th className="text-right py-2">W</th>
                    <th className="text-right py-2">R</th>
                    <th className="text-right py-2">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.bowling.team1.map((bowler, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{bowler.name}</td>
                      <td className="text-right py-2">{bowler.overs}</td>
                      <td className="text-right py-2 font-medium">{bowler.wickets}</td>
                      <td className="text-right py-2">{bowler.runs}</td>
                      <td className="text-right py-2">{bowler.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team 2 Bowling */}
          <div>
            <h4 className="font-medium text-red-600 mb-3">{stats.team2.name} Bowling</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Bowler</th>
                    <th className="text-right py-2">O</th>
                    <th className="text-right py-2">W</th>
                    <th className="text-right py-2">R</th>
                    <th className="text-right py-2">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.bowling.team2.map((bowler, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{bowler.name}</td>
                      <td className="text-right py-2">{bowler.overs}</td>
                      <td className="text-right py-2 font-medium">{bowler.wickets}</td>
                      <td className="text-right py-2">{bowler.runs}</td>
                      <td className="text-right py-2">{bowler.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoringAndStats;
