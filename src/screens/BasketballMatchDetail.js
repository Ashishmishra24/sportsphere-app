import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaChartBar, FaClock, FaUsers, FaTrophy, FaUser, FaBolt } from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';
import './SportMatchDetail.css';

const BasketballMatchDetail = ({ matchId, onBack }) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced basketball match details with comprehensive data
        const basketballDetails = {
          sport: 'basketball',
          homeTeam: 'Los Angeles Lakers',
          awayTeam: 'Golden State Warriors',
          homeScore: 118,
          awayScore: 112,
          status: 'finished',
          quarter: 4,
          timeRemaining: '0:00',
          league: 'NBA Playoffs',
          venue: 'Crypto.com Arena',
          attendance: '20,000',
          quarterScores: [
            { quarter: 1, home: 28, away: 32 },
            { quarter: 2, home: 30, away: 25 },
            { quarter: 3, home: 32, away: 28 },
            { quarter: 4, home: 28, away: 27 }
          ],
          topPerformers: {
            home: [
              { name: 'LeBron James', points: 32, rebounds: 8, assists: 6, steals: 2, blocks: 1, fieldGoals: '12/20', threePointers: '4/8', freeThrows: '4/5' },
              { name: 'Anthony Davis', points: 28, rebounds: 12, assists: 3, steals: 1, blocks: 3, fieldGoals: '11/18', threePointers: '2/4', freeThrows: '4/6' },
              { name: 'Russell Westbrook', points: 18, rebounds: 5, assists: 11, steals: 3, blocks: 0, fieldGoals: '7/15', threePointers: '2/6', freeThrows: '2/2' }
            ],
            away: [
              { name: 'Stephen Curry', points: 35, rebounds: 4, assists: 8, steals: 2, blocks: 0, fieldGoals: '12/22', threePointers: '8/15', freeThrows: '3/3' },
              { name: 'Klay Thompson', points: 24, rebounds: 3, assists: 2, steals: 1, blocks: 1, fieldGoals: '9/16', threePointers: '6/11', freeThrows: '0/0' },
              { name: 'Draymond Green', points: 12, rebounds: 11, assists: 9, steals: 2, blocks: 2, fieldGoals: '4/8', threePointers: '1/3', freeThrows: '3/4' }
            ]
          },
          teamStatistics: {
            fieldGoalPercentage: { home: 47.8, away: 45.2 },
            threePointPercentage: { home: 38.5, away: 42.3 },
            freeThrowPercentage: { home: 82.4, away: 87.5 },
            totalRebounds: { home: 45, away: 38 },
            assists: { home: 28, away: 24 },
            steals: { home: 8, away: 6 },
            blocks: { home: 5, away: 4 },
            turnovers: { home: 12, away: 15 },
            personalFouls: { home: 18, away: 22 },
            fastBreakPoints: { home: 16, away: 12 },
            pointsInPaint: { home: 52, away: 38 },
            secondChancePoints: { home: 14, away: 8 }
          },
          playByPlay: [
            { quarter: 4, time: '2:45', team: 'home', player: 'LeBron James', action: 'Made 3-pointer', points: 3, score: '115-109' },
            { quarter: 4, time: '3:12', team: 'away', player: 'Stephen Curry', action: 'Made 3-pointer', points: 3, score: '112-109' },
            { quarter: 4, time: '3:38', team: 'home', player: 'Anthony Davis', action: 'Made dunk', points: 2, score: '112-106' },
            { quarter: 4, time: '4:15', team: 'away', player: 'Klay Thompson', action: 'Made 3-pointer', points: 3, score: '110-106' },
            { quarter: 4, time: '4:52', team: 'home', player: 'Russell Westbrook', action: 'Made layup', points: 2, score: '110-103' }
          ],
          injuries: [
            { team: 'home', player: 'Austin Reaves', status: 'Questionable', injury: 'Ankle sprain' },
            { team: 'away', player: 'Andrew Wiggins', status: 'Out', injury: 'Knee injury' }
          ],
          coaches: {
            home: 'Darvin Ham',
            away: 'Steve Kerr'
          },
          referees: ['Tony Brown', 'David Guthrie', 'Phenizee Ransom'],
          series: {
            description: 'Western Conference Semifinals',
            record: 'Lakers lead 3-2',
            nextGame: 'Game 6 - Friday at Golden State'
          }
        };
        setMatchDetails(basketballDetails);
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
          <p className="mt-4 text-gray-600">Loading basketball match details...</p>
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
              <MdSportsBasketball className="text-red-600" />
              <span className={`text-sm font-medium ${getStatusColor(matchDetails.status)}`}>
                {matchDetails.status === 'finished' ? 'FINAL' : matchDetails.status.toUpperCase()}
              </span>
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
            {matchDetails.series && (
              <p className="text-xs text-gray-500 mt-1">{matchDetails.series.description} - {matchDetails.series.record}</p>
            )}
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xl">LAL</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{matchDetails.homeTeam}</h3>
              <p className="text-xs text-gray-500">Home</p>
            </div>

            <div className="text-center px-6">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {matchDetails.homeScore} - {matchDetails.awayScore}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {matchDetails.status === 'live' ? 
                  `Q${matchDetails.quarter} ${matchDetails.timeRemaining}` : 
                  'FINAL'
                }
              </div>
            </div>

            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xl">GSW</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{matchDetails.awayTeam}</h3>
              <p className="text-xs text-gray-500">Away</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quarter Scores */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h3 className="font-bold text-gray-900 mb-3">Quarter Scores</h3>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div className="text-center font-medium text-gray-600">Team</div>
            {[1, 2, 3, 4].map(quarter => (
              <div key={quarter} className="text-center font-medium text-gray-600">Q{quarter}</div>
            ))}
            
            <div className="text-left font-medium">{matchDetails.homeTeam}</div>
            {matchDetails.quarterScores.map((quarter, index) => (
              <div key={index} className="text-center p-2 bg-purple-50 rounded">
                {quarter.home}
              </div>
            ))}
            
            <div className="text-left font-medium">{matchDetails.awayTeam}</div>
            {matchDetails.quarterScores.map((quarter, index) => (
              <div key={index} className="text-center p-2 bg-blue-50 rounded">
                {quarter.away}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h3 className="font-bold text-gray-900 mb-3">Top Performers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-purple-800 mb-2">{matchDetails.homeTeam}</h4>
              <div className="space-y-2">
                {matchDetails.topPerformers.home.map((player, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-purple-900">{player.name}</span>
                      <span className="text-lg font-bold text-purple-800">{player.points} PTS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-purple-700">
                      <span>{player.rebounds} REB</span>
                      <span>{player.assists} AST</span>
                      <span>FG: {player.fieldGoals}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-purple-600 mt-1">
                      <span>3PT: {player.threePointers}</span>
                      <span>FT: {player.freeThrows}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">{matchDetails.awayTeam}</h4>
              <div className="space-y-2">
                {matchDetails.topPerformers.away.map((player, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-blue-900">{player.name}</span>
                      <span className="text-lg font-bold text-blue-800">{player.points} PTS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
                      <span>{player.rebounds} REB</span>
                      <span>{player.assists} AST</span>
                      <span>FG: {player.fieldGoals}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-blue-600 mt-1">
                      <span>3PT: {player.threePointers}</span>
                      <span>FT: {player.freeThrows}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      {matchDetails.teamStatistics && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-2 mb-4">
              <FaChartBar className="text-red-600" />
              <h3 className="font-bold text-gray-900">Team Statistics</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(matchDetails.teamStatistics).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{value.home}{typeof value.home === 'number' && value.home < 10 ? '' : '%'}</span>
                    <span className="text-xs text-gray-500 capitalize text-center flex-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{value.away}{typeof value.away === 'number' && value.away < 10 ? '' : '%'}</span>
                  </div>
                  {(typeof value.home === 'number' && value.home <= 100) && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(value.home / Math.max(value.home, value.away)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full float-right"
                          style={{ width: `${(value.away / Math.max(value.home, value.away)) * 100}%` }}
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

      {/* Recent Play-by-Play */}
      {matchDetails.playByPlay && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Recent Plays</h3>
            <div className="space-y-2">
              {matchDetails.playByPlay.map((play, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded min-w-[3rem] text-center">
                      {play.time}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {play.player} - {play.action}
                      </span>
                      <p className="text-xs text-gray-500">Score: {play.score}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    play.team === 'home' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Series Information */}
      {matchDetails.series && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <h3 className="font-bold text-gray-900 mb-3">Series Information</h3>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="font-medium text-red-900">{matchDetails.series.description}</p>
              <p className="text-sm text-red-700 mt-1">{matchDetails.series.record}</p>
              <p className="text-xs text-red-600 mt-1">{matchDetails.series.nextGame}</p>
            </div>
          </div>
        </div>
      )}

      {/* Officials and Injuries */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Officials</h3>
              <div className="space-y-1">
                {matchDetails.referees.map((ref, index) => (
                  <p key={index} className="text-sm text-gray-600">{ref}</p>
                ))}
              </div>
              <h4 className="font-medium text-gray-800 mt-3 mb-1">Coaches</h4>
              <p className="text-sm text-gray-600">{matchDetails.homeTeam}: {matchDetails.coaches.home}</p>
              <p className="text-sm text-gray-600">{matchDetails.awayTeam}: {matchDetails.coaches.away}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Injury Report</h3>
              <div className="space-y-2">
                {matchDetails.injuries.map((injury, index) => (
                  <div key={index} className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-800">{injury.player}</p>
                    <p className="text-xs text-yellow-600">{injury.injury} - {injury.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaUser className="text-red-600" />
            <h3 className="font-bold text-gray-900">Basketball Match Chat</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm">Live basketball commentary and chat coming soon!</p>
            <p className="text-gray-400 text-xs mt-1">Discuss plays, stats, and game analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketballMatchDetail;
