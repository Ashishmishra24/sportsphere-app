import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaChartBar, FaClock, FaUsers, FaTrophy, FaUser, FaBolt } from 'react-icons/fa';
import { GiShuttlecock } from 'react-icons/gi';
import './SportMatchDetail.css';

const BadmintonMatchDetail = ({ matchId, onBack }) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced badminton match details with comprehensive data
        const badmintonDetails = {
          sport: 'badminton',
          player1: 'Viktor Axelsen',
          player2: 'Kento Momota',
          status: 'live',
          currentGame: 2,
          currentScore: { player1: 15, player2: 12 },
          matchFormat: 'Best of 3 games',
          tournament: 'All England Open',
          category: 'Men\'s Singles',
          venue: 'Utilita Arena Birmingham',
          surface: 'Indoor Court',
          games: [
            { game: 1, player1: 21, player2: 18, winner: 'player1' },
            { game: 2, player1: 15, player2: 12, inProgress: true },
            { game: 3, player1: 0, player2: 0, notStarted: true }
          ],
          statistics: {
            smashes: { player1: 8, player2: 6 },
            drops: { player1: 12, player2: 15 },
            clears: { player1: 25, player2: 22 },
            netShots: { player1: 18, player2: 20 },
            serviceErrors: { player1: 3, player2: 5 },
            unforcedErrors: { player1: 7, player2: 9 },
            totalPoints: { player1: 36, player2: 30 },
            rallyLength: { player1: 8.5, player2: 7.2 },
            courtCoverage: { player1: 85, player2: 78 }
          },
          recentRallies: [
            { 
              rally: 1, 
              winner: 'player1', 
              type: 'Smashes', 
              duration: '12s',
              description: 'Powerful cross-court smash',
              score: '15-12'
            },
            { 
              rally: 2, 
              winner: 'player2', 
              type: 'Drops', 
              duration: '8s',
              description: 'Deceptive drop shot to the net',
              score: '15-11'
            },
            { 
              rally: 3, 
              winner: 'player1', 
              type: 'Clears', 
              duration: '15s',
              description: 'Long rally ending with clear winner',
              score: '16-11'
            },
            { 
              rally: 4, 
              winner: 'player2', 
              type: 'Net Shots', 
              duration: '6s',
              description: 'Quick net exchange won by Momota',
              score: '16-12'
            },
            { 
              rally: 5, 
              winner: 'player1', 
              type: 'Smashes', 
              duration: '10s',
              description: 'Axelsen smashes down the line',
              score: '17-12'
            }
          ],
          playerInfo: {
            player1: {
              name: 'Viktor Axelsen',
              country: 'Denmark',
              ranking: 1,
              age: 29,
              height: '1.94m',
              weight: '80kg',
              plays: 'Right-handed',
              worldRanking: 1,
              titles: 15,
              playingStyle: 'Aggressive, powerful smashes'
            },
            player2: {
              name: 'Kento Momota',
              country: 'Japan',
              ranking: 2,
              age: 28,
              height: '1.75m',
              weight: '70kg',
              plays: 'Left-handed',
              worldRanking: 2,
              titles: 12,
              playingStyle: 'Defensive, excellent footwork'
            }
          },
          matchHistory: [
            { tournament: 'World Championships 2023', winner: 'Axelsen', score: '21-18, 21-16' },
            { tournament: 'Malaysia Open 2023', winner: 'Momota', score: '21-19, 21-17' },
            { tournament: 'Denmark Open 2022', winner: 'Axelsen', score: '21-15, 21-12' }
          ],
          serving: {
            currentServer: 'player1',
            serviceCourt: 'right',
            serviceScore: { player1: 15, player2: 12 },
            serviceRules: 'Best of 21 points, must win by 2 points'
          },
          matchAnalysis: {
            longestRally: '23 seconds',
            fastestSmash: '408 km/h',
            totalRallies: 48,
            averageRallyLength: '8.2 seconds',
            mostUsedShot: 'Clears',
            momentum: 'player1' // who has momentum
          }
        };
        setMatchDetails(badmintonDetails);
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
          <p className="mt-4 text-gray-600">Loading badminton match details...</p>
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

  const getGameStatus = (game) => {
    if (game.inProgress) return 'bg-blue-200 font-bold';
    if (game.winner === 'player1') return 'bg-green-200';
    if (game.winner === 'player2') return 'bg-red-200';
    return 'bg-gray-100';
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
              <GiShuttlecock className="text-blue-600" />
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">{matchDetails.tournament}</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-xs" />
                <span>{matchDetails.venue}</span>
              </div>
              <span>•</span>
              <span>{matchDetails.category}</span>
              <span>•</span>
              <span>{matchDetails.surface}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{matchDetails.matchFormat}</p>
          </div>

          {/* Current Score */}
          <div className="space-y-4">
            {/* Game Scores */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-blue-900">Game Scores</h3>
                <span className="text-xs text-blue-600">Best of 3 games</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="text-center font-medium text-gray-600">Player</div>
                {[1, 2, 3].map(gameNum => (
                  <div key={gameNum} className="text-center font-medium text-gray-600">Game {gameNum}</div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">🇩🇰</span>
                  </div>
                  <span className="text-sm font-medium">{matchDetails.player1}</span>
                  {matchDetails.serving.currentServer === 'player1' && <span className="text-xs">🎾</span>}
                </div>
                {matchDetails.games.map((game, index) => (
                  <div key={index} className={`text-center p-2 rounded ${getGameStatus(game)}`}>
                    {game.inProgress ? `${game.player1}*` : game.player1}
                  </div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">🇯🇵</span>
                  </div>
                  <span className="text-sm font-medium">{matchDetails.player2}</span>
                  {matchDetails.serving.currentServer === 'player2' && <span className="text-xs">🎾</span>}
                </div>
                {matchDetails.games.map((game, index) => (
                  <div key={index} className={`text-center p-2 rounded ${getGameStatus(game)}`}>
                    {game.inProgress ? `${game.player2}*` : game.player2}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Game Score */}
            <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
              <div className="text-center mb-3">
                <h3 className="font-bold text-gray-900">Current Game</h3>
                <p className="text-sm text-gray-500">Game {matchDetails.currentGame} - {matchDetails.serving.serviceRules}</p>
              </div>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {matchDetails.currentScore.player1}
                  </div>
                  <p className="text-xs text-gray-500">{matchDetails.player1.split(' ')[1]}</p>
                </div>
                <div className="text-2xl text-gray-400">-</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {matchDetails.currentScore.player2}
                  </div>
                  <p className="text-xs text-gray-500">{matchDetails.player2.split(' ')[1]}</p>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">
                  Serving: {matchDetails.serving.currentServer === 'player1' ? matchDetails.player1.split(' ')[1] : matchDetails.player2.split(' ')[1]} 
                  ({matchDetails.serving.serviceCourt} court)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Information */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h3 className="font-bold text-gray-900 mb-3">Player Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">{matchDetails.playerInfo.player1.name}</h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-600">Country:</span> {matchDetails.playerInfo.player1.country}</p>
                <p><span className="text-gray-600">World Ranking:</span> #{matchDetails.playerInfo.player1.worldRanking}</p>
                <p><span className="text-gray-600">Age:</span> {matchDetails.playerInfo.player1.age}</p>
                <p><span className="text-gray-600">Style:</span> {matchDetails.playerInfo.player1.playingStyle}</p>
                <p><span className="text-gray-600">Titles:</span> {matchDetails.playerInfo.player1.titles}</p>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">{matchDetails.playerInfo.player2.name}</h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-gray-600">Country:</span> {matchDetails.playerInfo.player2.country}</p>
                <p><span className="text-gray-600">World Ranking:</span> #{matchDetails.playerInfo.player2.worldRanking}</p>
                <p><span className="text-gray-600">Age:</span> {matchDetails.playerInfo.player2.age}</p>
                <p><span className="text-gray-600">Style:</span> {matchDetails.playerInfo.player2.playingStyle}</p>
                <p><span className="text-gray-600">Titles:</span> {matchDetails.playerInfo.player2.titles}</p>
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
              <FaChartBar className="text-blue-600" />
              <h3 className="font-bold text-gray-900">Match Statistics</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(matchDetails.statistics).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{value.player1}</span>
                    <span className="text-xs text-gray-500 capitalize text-center flex-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{value.player2}</span>
                  </div>
                  {typeof value.player1 === 'number' && typeof value.player2 === 'number' && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(value.player1 / (value.player1 + value.player2)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full float-right"
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

      {/* Recent Rallies */}
      {matchDetails.recentRallies && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Recent Rallies</h3>
            <div className="space-y-2">
              {matchDetails.recentRallies.map((rally, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded min-w-[3rem] text-center">
                      Rally {rally.rally}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {rally.winner === 'player1' ? matchDetails.player1.split(' ')[1] : matchDetails.player2.split(' ')[1]}
                      </span>
                      <p className="text-xs text-gray-500">{rally.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${
                      rally.type === 'Smashes' ? 'bg-red-100 text-red-800' :
                      rally.type === 'Drops' ? 'bg-blue-100 text-blue-800' :
                      rally.type === 'Clears' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {rally.type}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{rally.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Match Analysis */}
      {matchDetails.matchAnalysis && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Match Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Key Stats</h4>
                <div className="space-y-1 text-xs">
                  <p><span className="text-gray-600">Longest Rally:</span> {matchDetails.matchAnalysis.longestRally}</p>
                  <p><span className="text-gray-600">Fastest Smash:</span> {matchDetails.matchAnalysis.fastestSmash}</p>
                  <p><span className="text-gray-600">Total Rallies:</span> {matchDetails.matchAnalysis.totalRallies}</p>
                  <p><span className="text-gray-600">Avg Rally:</span> {matchDetails.matchAnalysis.averageRallyLength}</p>
                </div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Match Insights</h4>
                <div className="space-y-1 text-xs">
                  <p><span className="text-gray-600">Most Used Shot:</span> {matchDetails.matchAnalysis.mostUsedShot}</p>
                  <p><span className="text-gray-600">Momentum:</span> {matchDetails.matchAnalysis.momentum === 'player1' ? matchDetails.player1.split(' ')[1] : matchDetails.player2.split(' ')[1]}</p>
                  <p><span className="text-gray-600">Service Court:</span> {matchDetails.serving.serviceCourt}</p>
                </div>
              </div>
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
                    <span className="text-sm font-medium text-blue-600">
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
            <FaUser className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Badminton Match Chat</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm">Live badminton commentary and chat coming soon!</p>
            <p className="text-gray-400 text-xs mt-1">Discuss rallies, smashes, and match strategies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadmintonMatchDetail;
