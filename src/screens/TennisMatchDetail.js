import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaChartBar, FaClock, FaUsers, FaTrophy, FaUser, FaBolt } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import './SportMatchDetail.css';

const TennisMatchDetail = ({ matchId, onBack }) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced tennis match details with comprehensive data
        const tennisDetails = {
          sport: 'tennis',
          player1: 'Novak Djokovic',
          player2: 'Rafael Nadal',
          status: 'live',
          currentSet: 3,
          currentGame: '4-3',
          server: 'player1',
          surface: 'Clay',
          tournament: 'French Open',
          round: 'Final',
          venue: 'Court Philippe Chatrier',
          sets: [
            { player1: 6, player2: 4 },  // Set 1
            { player1: 7, player2: 6 },  // Set 2
            { player1: 4, player2: 3 }   // Set 3 (current)
          ],
          games: [
            // Current set games
            { game: 1, player1: 4, player2: 1, winner: 'player1' },
            { game: 2, player1: 2, player2: 4, winner: 'player2' },
            { game: 3, player1: 4, player2: 2, winner: 'player1' },
            { game: 4, player1: 1, player2: 4, winner: 'player2' },
            { game: 5, player1: 4, player2: 1, winner: 'player1' },
            { game: 6, player1: 3, player2: 4, winner: 'player2' },
            { game: 7, player1: 4, player2: 1, winner: 'player1' },
            { game: 8, player1: 2, player2: 3 } // Current game in progress
          ],
          currentScore: {
            player1: 30,
            player2: 40,
            advantage: null
          },
          statistics: {
            aces: { player1: 12, player2: 8 },
            doubleFaults: { player1: 2, player2: 4 },
            firstServePercentage: { player1: 68, player2: 72 },
            firstServePointsWon: { player1: 85, player2: 78 },
            secondServePointsWon: { player1: 58, player2: 65 },
            breakPointsConverted: { player1: '3/7', player2: '2/5' },
            totalPointsWon: { player1: 89, player2: 84 },
            winners: { player1: 28, player2: 22 },
            unforcedErrors: { player1: 18, player2: 25 },
            netApproaches: { player1: '8/12', player2: '5/9' }
          },
          matchHistory: [
            { tournament: 'Australian Open 2023', winner: 'Djokovic', score: '6-3, 6-2, 6-3' },
            { tournament: 'Wimbledon 2022', winner: 'Nadal', score: '6-4, 6-2, 6-3' },
            { tournament: 'US Open 2022', winner: 'Djokovic', score: '7-6, 6-4, 6-2' }
          ],
          recentPoints: [
            { point: 1, winner: 'player2', type: 'Winner', description: 'Forehand down the line' },
            { point: 2, winner: 'player1', type: 'Ace', description: 'Ace down the T' },
            { point: 3, winner: 'player2', type: 'Unforced Error', description: 'Djokovic backhand into net' },
            { point: 4, winner: 'player1', type: 'Winner', description: 'Backhand cross court' }
          ],
          playerInfo: {
            player1: {
              name: 'Novak Djokovic',
              country: 'Serbia',
              ranking: 1,
              age: 36,
              height: '1.88m',
              weight: '77kg',
              plays: 'Right-handed'
            },
            player2: {
              name: 'Rafael Nadal',
              country: 'Spain',
              ranking: 2,
              age: 37,
              height: '1.85m',
              weight: '85kg',
              plays: 'Left-handed'
            }
          }
        };
        setMatchDetails(tennisDetails);
      } catch (err) {
        setError('Failed to load match details');
        console.error('Error fetching match details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tennis match details...</p>
        </div>
      </div>
    );
  }

  if (error || !matchDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Match not found'}</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'text-red-600';
      case 'finished':
        return 'text-green-600';
      case 'upcoming':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getScoreDisplay = (score) => {
    if (score === 0) return '0';
    if (score === 15) return '15';
    if (score === 30) return '30';
    if (score === 40) return '40';
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <GiTennisRacket className="text-orange-600" />
              <span className={`text-sm font-medium ${getStatusColor(matchDetails.status)}`}>
                {matchDetails.status.toUpperCase()}
              </span>
              {matchDetails.status === 'live' && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{matchDetails.tournament} - {matchDetails.round}</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-xs" />
                <span>{matchDetails.venue}</span>
              </div>
              <span>•</span>
              <span>Surface: {matchDetails.surface}</span>
            </div>
          </div>

          {/* Current Score */}
          <div className="space-y-4">
            {/* Set Scores */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-orange-900">Set Scores</h3>
                <span className="text-xs text-orange-600">Best of 5 sets</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="text-center font-medium text-gray-600">Player</div>
                {[1, 2, 3].map(setNum => (
                  <div key={setNum} className="text-center font-medium text-gray-600">Set {setNum}</div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">🇷🇸</span>
                  </div>
                  <span className="text-sm font-medium">{matchDetails.player1}</span>
                  {matchDetails.server === 'player1' && <span className="text-xs">🎾</span>}
                </div>
                {matchDetails.sets.map((set, index) => (
                  <div key={index} className={`text-center p-2 rounded ${
                    index === matchDetails.currentSet - 1 ? 'bg-orange-200 font-bold' : 'bg-white'
                  }`}>
                    {set.player1}
                  </div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">🇪🇸</span>
                  </div>
                  <span className="text-sm font-medium">{matchDetails.player2}</span>
                  {matchDetails.server === 'player2' && <span className="text-xs">🎾</span>}
                </div>
                {matchDetails.sets.map((set, index) => (
                  <div key={index} className={`text-center p-2 rounded ${
                    index === matchDetails.currentSet - 1 ? 'bg-orange-200 font-bold' : 'bg-white'
                  }`}>
                    {set.player2}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Game Score */}
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <div className="text-center mb-3">
                <h3 className="font-bold text-gray-900">Current Game</h3>
                <p className="text-sm text-gray-500">Set {matchDetails.currentSet} - Games: {matchDetails.currentGame}</p>
              </div>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {getScoreDisplay(matchDetails.currentScore.player1)}
                  </div>
                  <p className="text-xs text-gray-500">{matchDetails.player1.split(' ')[1]}</p>
                </div>
                <div className="text-2xl text-gray-400">-</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {getScoreDisplay(matchDetails.currentScore.player2)}
                  </div>
                  <p className="text-xs text-gray-500">{matchDetails.player2.split(' ')[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Information */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h3 className="font-bold text-gray-900 mb-3">Player Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">{matchDetails.playerInfo.player1.name}</h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-600">Country:</span> {matchDetails.playerInfo.player1.country}</p>
                <p><span className="text-gray-600">Ranking:</span> #{matchDetails.playerInfo.player1.ranking}</p>
                <p><span className="text-gray-600">Age:</span> {matchDetails.playerInfo.player1.age}</p>
                <p><span className="text-gray-600">Plays:</span> {matchDetails.playerInfo.player1.plays}</p>
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">{matchDetails.playerInfo.player2.name}</h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-600">Country:</span> {matchDetails.playerInfo.player2.country}</p>
                <p><span className="text-gray-600">Ranking:</span> #{matchDetails.playerInfo.player2.ranking}</p>
                <p><span className="text-gray-600">Age:</span> {matchDetails.playerInfo.player2.age}</p>
                <p><span className="text-gray-600">Plays:</span> {matchDetails.playerInfo.player2.plays}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Statistics */}
      {matchDetails.statistics && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-2 mb-4">
              <FaChartBar className="text-orange-600" />
              <h3 className="font-bold text-gray-900">Match Statistics</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(matchDetails.statistics).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{value.player1}</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{value.player2}</span>
                  </div>
                  {typeof value.player1 === 'number' && typeof value.player2 === 'number' && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(value.player1 / (value.player1 + value.player2)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-300 h-2 rounded-full float-right"
                          style={{ width: `${(value.player2 / (value.player1 + value.player2)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Points */}
      {matchDetails.recentPoints && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Recent Points</h3>
            <div className="space-y-2">
              {matchDetails.recentPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded">
                      Point {point.point}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {point.winner === 'player1' ? matchDetails.player1.split(' ')[1] : matchDetails.player2.split(' ')[1]}
                      </span>
                      <p className="text-xs text-gray-500">{point.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${
                      point.type === 'Ace' ? 'bg-green-100 text-green-800' :
                      point.type === 'Winner' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {point.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Head-to-Head History */}
      {matchDetails.matchHistory && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Recent Head-to-Head</h3>
            <div className="space-y-2">
              {matchDetails.matchHistory.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{match.tournament}</span>
                    <p className="text-xs text-gray-500">{match.score}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-orange-600">
                      {match.winner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div className="bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaUser className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Tennis Match Chat</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm">Live tennis commentary and chat coming soon!</p>
            <p className="text-gray-400 text-xs mt-1">Discuss serves, rallies, and match strategies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisMatchDetail;
