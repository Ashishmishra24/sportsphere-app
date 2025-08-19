import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaFutbol, FaBasketballBall, FaTableTennis, FaVolleyballBall, FaHockeyPuck, FaTrophy, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat } from 'react-icons/gi';
import toast from 'react-hot-toast';

const LiveScores = () => {
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock API data - replace with actual API integration
  const mockScores = useMemo(() => ({
    football: [
      {
        id: 1,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        homeScore: 2,
        awayScore: 1,
        status: 'live',
        time: '67\'',
        league: 'Premier League',
        venue: 'Old Trafford',
        highlights: ['⚽ Rashford 23\'', '⚽ Salah 45\'', '⚽ Fernandes 67\'']
      },
      {
        id: 2,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        time: '20:45',
        league: 'Premier League',
        venue: 'Emirates Stadium',
        highlights: []
      },
      {
        id: 3,
        homeTeam: 'Barcelona',
        awayTeam: 'Real Madrid',
        homeScore: 3,
        awayScore: 2,
        status: 'finished',
        time: 'FT',
        league: 'La Liga',
        venue: 'Camp Nou',
        highlights: ['⚽ Messi 15\'', '⚽ Benzema 32\'', '⚽ Suarez 45\'', '⚽ Ronaldo 67\'', '⚽ Griezmann 89\'']
      }
    ],
    basketball: [
      {
        id: 4,
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        homeScore: 108,
        awayScore: 102,
        status: 'live',
        time: 'Q4 2:34',
        league: 'NBA',
        venue: 'Staples Center',
        highlights: ['🏀 James 25 pts', '🏀 Curry 28 pts', '🏀 Davis 22 pts']
      },
      {
        id: 5,
        homeTeam: 'Celtics',
        awayTeam: 'Heat',
        homeScore: 95,
        awayScore: 98,
        status: 'finished',
        time: 'FT',
        league: 'NBA',
        venue: 'TD Garden',
        highlights: ['🏀 Tatum 30 pts', '🏀 Butler 26 pts', '🏀 Brown 24 pts']
      }
    ],
    tennis: [
      {
        id: 6,
        homeTeam: 'Djokovic',
        awayTeam: 'Nadal',
        homeScore: 2,
        awayScore: 1,
        status: 'live',
        time: 'Set 3',
        league: 'Wimbledon',
        venue: 'Centre Court',
        highlights: ['🎾 Djokovic 6-4, 3-6, 4-2']
      }
    ],
         cricket: [
       {
         id: 7,
         homeTeam: 'India',
         awayTeam: 'Australia',
         homeScore: '285/6',
         awayScore: '180/4',
         status: 'live',
         time: '35.2 overs',
         league: 'Test Series',
         venue: 'MCG',
         highlights: ['🏏 Kohli 85 runs', '🏏 Smith 72 runs', '🏏 Bumrah 3 wickets']
       },
       {
         id: 8,
         homeTeam: 'England',
         awayTeam: 'South Africa',
         homeScore: '320/8',
         awayScore: '0/0',
         status: 'scheduled',
         time: '14:30',
         league: 'ODI Series',
         venue: 'Lords',
         highlights: []
       }
     ],
     'table-tennis': [
       {
         id: 9,
         homeTeam: 'Ma Long',
         awayTeam: 'Fan Zhendong',
         homeScore: 2,
         awayScore: 1,
         status: 'live',
         time: 'Set 4',
         league: 'World Championships',
         venue: 'Houston Convention Center',
         highlights: ['🏓 Ma Long 11-9, 9-11, 11-8, 8-6']
       }
     ],
     volleyball: [
       {
         id: 10,
         homeTeam: 'Brazil',
         awayTeam: 'USA',
         homeScore: 2,
         awayScore: 1,
         status: 'live',
         time: 'Set 4',
         league: 'World League',
         venue: 'Maracanãzinho',
         highlights: ['🏐 Bruno 15 kills', '🏐 Anderson 12 kills']
       }
     ],
     hockey: [
       {
         id: 11,
         homeTeam: 'Netherlands',
         awayTeam: 'Germany',
         homeScore: 3,
         awayScore: 2,
         status: 'finished',
         time: 'FT',
         league: 'European Championship',
         venue: 'Amsterdam Arena',
         highlights: ['🏑 Van der Weerden 2 goals', '🏑 Fuchs 1 goal']
       }
     ]
  }), []);

  const sports = [
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-green-600' },
    { id: 'basketball', name: 'Basketball', icon: FaBasketballBall, color: 'text-orange-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-yellow-600' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-red-600' },
    { id: 'table-tennis', name: 'Table Tennis', icon: FaTableTennis, color: 'text-blue-600' },
    { id: 'volleyball', name: 'Volleyball', icon: FaVolleyballBall, color: 'text-purple-600' },
    { id: 'hockey', name: 'Hockey', icon: FaHockeyPuck, color: 'text-gray-600' }
  ];

  const leagues = {
    football: ['All Leagues', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Champions League'],
    basketball: ['All Leagues', 'NBA', 'EuroLeague', 'CBA'],
    tennis: ['All Tournaments', 'Wimbledon', 'US Open', 'French Open', 'Australian Open'],
    cricket: ['All Series', 'Test Series', 'ODI Series', 'T20 Series', 'IPL'],
    'table-tennis': ['All Tournaments', 'World Championships', 'Olympics', 'Asian Games'],
    volleyball: ['All Leagues', 'World League', 'Olympics', 'European Championship'],
    hockey: ['All Leagues', 'European Championship', 'World Cup', 'Olympics']
  };

  // Fetch scores using local mock data for now
  const fetchScores = useCallback(async (sport, league) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredScores = mockScores[sport] || [];
      
      if (league && league !== 'all') {
        filteredScores = filteredScores.filter(match => match.league === league);
      }
      
      setScores(filteredScores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      toast.error('Failed to fetch live scores');
    } finally {
      setLoading(false);
    }
  }, [mockScores]);

  const refreshScores = async () => {
    setRefreshing(true);
    await fetchScores(selectedSport, selectedLeague);
    setRefreshing(false);
    toast.success('Scores refreshed!');
  };

  useEffect(() => {
    fetchScores(selectedSport, selectedLeague);
  }, [selectedSport, selectedLeague, fetchScores]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchScores(selectedSport, selectedLeague);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedSport, selectedLeague, loading, fetchScores]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'finished': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'live': return '🔴';
      case 'scheduled': return '⏰';
      case 'finished': return '✅';
      default: return '⏰';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/home" className="mr-4">
              <FaArrowLeft className="text-gray-600 text-xl" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Live Scores</h1>
              <p className="text-sm text-gray-600">Real-time sports updates</p>
            </div>
          </div>
          <button
            onClick={refreshScores}
            disabled={refreshing}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <FaClock className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Sports Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex space-x-1 overflow-x-auto">
            {sports.map((sport) => {
              const Icon = sport.icon;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedSport === sport.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`mr-2 ${sport.color}`} />
                  {sport.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* League Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">League:</span>
            {leagues[selectedSport]?.map((league) => (
              <button
                key={league}
                onClick={() => setSelectedLeague(league === 'All Leagues' || league === 'All Tournaments' || league === 'All Series' ? 'all' : league)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  (selectedLeague === 'all' && (league === 'All Leagues' || league === 'All Tournaments' || league === 'All Series')) ||
                  selectedLeague === league
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {league}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scores Content */}
      <div className="flex-1 px-6 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Loading live scores...</p>
            </div>
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-12">
            <FaTrophy className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">No live matches for the selected sport and league.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scores.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Match Header */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FaTrophy className="text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">{match.league}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                        {getStatusIcon(match.status)} {match.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{match.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <FaMapMarkerAlt className="text-gray-400 text-xs mr-1" />
                    <span className="text-xs text-gray-600">{match.venue}</span>
                  </div>
                </div>

                {/* Match Score */}
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <h3 className="font-semibold text-gray-900">{match.homeTeam}</h3>
                    </div>
                    <div className="mx-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      {match.status === 'live' && (
                        <div className="text-xs text-red-600 font-medium mt-1">LIVE</div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900">{match.awayTeam}</h3>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {match.highlights.length > 0 && (
                  <div className="px-4 py-3 bg-blue-50 border-t border-gray-200">
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-500 text-sm mr-2" />
                      <span className="text-sm font-medium text-gray-700">Key Moments</span>
                    </div>
                    <div className="space-y-1">
                      {match.highlights.map((highlight, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Match Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auto-refresh indicator */}
      <div className="fixed bottom-20 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Auto-refresh: 30s
        </div>
      </div>
    </div>
  );
};

export default LiveScores;
