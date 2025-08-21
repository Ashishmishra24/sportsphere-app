import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaChartBar, FaClock, FaUsers, FaFutbol, FaTrophy, FaUser, FaBolt } from 'react-icons/fa';
import { GiSoccerKick } from 'react-icons/gi';
import './SportMatchDetail.css';

const FootballMatchDetail = ({ matchId, onBack }) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced football match details with comprehensive data
        const footballDetails = {
          sport: 'football',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: 2,
          awayScore: 1,
          status: 'live',
          time: '78\'',
          league: 'Premier League',
          venue: 'Old Trafford',
          attendance: '74,310',
          referee: 'Michael Oliver',
          halfTimeScore: { home: 1, away: 0 },
          statistics: {
            possession: { home: 45, away: 55 },
            shots: { home: 12, away: 16 },
            shotsOnTarget: { home: 5, away: 6 },
            corners: { home: 4, away: 7 },
            fouls: { home: 11, away: 8 },
            yellowCards: { home: 2, away: 3 },
            redCards: { home: 0, away: 0 },
            offsides: { home: 2, away: 4 },
            passes: { home: 387, away: 445 },
            passAccuracy: { home: 87, away: 91 }
          },
          events: [
            { 
              time: '23\'', 
              type: 'goal', 
              player: 'Marcus Rashford', 
              team: 'home',
              assist: 'Bruno Fernandes',
              icon: '⚽'
            },
            { 
              time: '45\'', 
              type: 'goal', 
              player: 'Mohamed Salah', 
              team: 'away',
              assist: 'Sadio Mané',
              icon: '⚽'
            },
            { 
              time: '67\'', 
              type: 'goal', 
              player: 'Bruno Fernandes', 
              team: 'home',
              assist: 'Paul Pogba',
              icon: '⚽'
            },
            { 
              time: '32\'', 
              type: 'yellow_card', 
              player: 'Casemiro', 
              team: 'home',
              reason: 'Rough tackle',
              icon: '🟨'
            },
            { 
              time: '58\'', 
              type: 'yellow_card', 
              player: 'Jordan Henderson', 
              team: 'away',
              reason: 'Dissent',
              icon: '🟨'
            },
            { 
              time: '71\'', 
              type: 'substitution', 
              playerOut: 'Marcus Rashford', 
              playerIn: 'Antony',
              team: 'home',
              icon: '🔄'
            }
          ],
          lineups: {
            home: {
              formation: '4-2-3-1',
              players: [
                { position: 'GK', name: 'David de Gea', number: 1 },
                { position: 'RB', name: 'Diogo Dalot', number: 20 },
                { position: 'CB', name: 'Raphael Varane', number: 19 },
                { position: 'CB', name: 'Lisandro Martinez', number: 6 },
                { position: 'LB', name: 'Luke Shaw', number: 23 },
                { position: 'CDM', name: 'Casemiro', number: 18 },
                { position: 'CDM', name: 'Christian Eriksen', number: 14 },
                { position: 'RW', name: 'Antony', number: 21 },
                { position: 'CAM', name: 'Bruno Fernandes', number: 8 },
                { position: 'LW', name: 'Marcus Rashford', number: 10 },
                { position: 'ST', name: 'Wout Weghorst', number: 27 }
              ]
            },
            away: {
              formation: '4-3-3',
              players: [
                { position: 'GK', name: 'Alisson', number: 1 },
                { position: 'RB', name: 'Trent Alexander-Arnold', number: 66 },
                { position: 'CB', name: 'Virgil van Dijk', number: 4 },
                { position: 'CB', name: 'Joel Matip', number: 32 },
                { position: 'LB', name: 'Andrew Robertson', number: 26 },
                { position: 'CM', name: 'Jordan Henderson', number: 14 },
                { position: 'CM', name: 'Fabinho', number: 3 },
                { position: 'CM', name: 'Thiago', number: 6 },
                { position: 'RW', name: 'Mohamed Salah', number: 11 },
                { position: 'ST', name: 'Darwin Núñez', number: 27 },
                { position: 'LW', name: 'Luis Díaz', number: 23 }
              ]
            }
          }
        };
        setMatchDetails(footballDetails);
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
          <p className="mt-4 text-gray-600">Loading football match details...</p>
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
              <FaFutbol className="text-purple-600" />
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">{matchDetails.league}</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-xs" />
                <span>{matchDetails.venue}</span>
              </div>
              <span>•</span>
              <span>Attendance: {matchDetails.attendance}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Referee: {matchDetails.referee}</p>
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xl">
                  {matchDetails.homeTeam.split(' ').map(word => word.charAt(0)).join('')}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{matchDetails.homeTeam}</h3>
              <p className="text-xs text-gray-500">Home</p>
            </div>

            <div className="text-center px-6">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {matchDetails.homeScore} - {matchDetails.awayScore}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {matchDetails.status === 'live' ? `${matchDetails.time} min` : matchDetails.status}
              </div>
              {matchDetails.halfTimeScore && (
                <div className="text-xs text-gray-400">
                  HT: {matchDetails.halfTimeScore.home}-{matchDetails.halfTimeScore.away}
                </div>
              )}
            </div>

            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xl">
                  {matchDetails.awayTeam.split(' ').map(word => word.charAt(0)).join('')}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{matchDetails.awayTeam}</h3>
              <p className="text-xs text-gray-500">Away</p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Statistics */}
      {matchDetails.statistics && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-2 mb-4">
              <FaChartBar className="text-purple-600" />
              <h3 className="font-bold text-gray-900">Match Statistics</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(matchDetails.statistics).map(([key, value]) => {
                // Skip non-percentage stats for the progress bar
                const isPercentage = ['possession', 'passAccuracy'].includes(key);
                
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{value.home}</span>
                      <span className="text-xs text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{value.away}</span>
                    </div>
                    {isPercentage && (
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${value.home}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full float-right"
                            style={{ width: `${value.away}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Match Events */}
      {matchDetails.events && matchDetails.events.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Match Events</h3>
            <div className="space-y-3">
              {matchDetails.events.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded min-w-[3rem] text-center">
                      {event.time}
                    </span>
                    <span className="text-lg">{event.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.type === 'substitution' ? `${event.playerOut} → ${event.playerIn}` : event.player}
                      </div>
                      {event.assist && (
                        <div className="text-xs text-gray-500">Assist: {event.assist}</div>
                      )}
                      {event.reason && (
                        <div className="text-xs text-gray-500">{event.reason}</div>
                      )}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    event.team === 'home' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Lineups */}
      {matchDetails.lineups && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Team Lineups</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-red-800 mb-2 text-center">
                  {matchDetails.homeTeam} ({matchDetails.lineups.home.formation})
                </h4>
                <div className="space-y-1">
                  {matchDetails.lineups.home.players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2 bg-red-50 rounded">
                      <span className="font-medium">{player.number}</span>
                      <span className="flex-1 text-center">{player.name}</span>
                      <span className="text-gray-500">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2 text-center">
                  {matchDetails.awayTeam} ({matchDetails.lineups.away.formation})
                </h4>
                <div className="space-y-1">
                  {matchDetails.lineups.away.players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2 bg-blue-50 rounded">
                      <span className="font-medium">{player.number}</span>
                      <span className="flex-1 text-center">{player.name}</span>
                      <span className="text-gray-500">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div className="bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaUser className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Football Match Chat</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm">Live football commentary and chat coming soon!</p>
            <p className="text-gray-400 text-xs mt-1">Discuss tactics, goals, and match analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballMatchDetail;
