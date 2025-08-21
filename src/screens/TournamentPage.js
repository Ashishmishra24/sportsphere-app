import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaTrophy, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaDollarSign,
  FaPlay,
  FaClock,
  FaStar,
  FaEye,
  FaShare,
  FaHeart,
  FaComment,
  FaFire,
  FaMedal,
  FaList,
  FaTable,
  FaInfoCircle,
  FaGamepad,
  FaChevronRight,
  FaChevronLeft,
  FaFutbol
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat, GiShuttlecock } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import { getTournamentById } from '../data/tournamentData';
import toast from 'react-hot-toast';
import { navigationService } from '../services/navigationService';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const TournamentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const loadTournament = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const tournamentData = getTournamentById(tournamentId);
        if (tournamentData) {
          setTournament(tournamentData);
        } else {
          toast.error('Tournament not found');
          navigate('/matches');
        }
      } catch (error) {
        toast.error('Failed to load tournament');
        navigate('/matches');
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [tournamentId, navigate]);

  const getSportIcon = (sport) => {
    switch (sport) {
      case 'cricket': return GiCricketBat;
      case 'football': return FaFutbol;
      case 'tennis': return GiTennisRacket;
      case 'basketball': return MdSportsBasketball;
      case 'badminton': return GiShuttlecock;
      default: return FaTrophy;
    }
  };

  const getSportColor = (sport) => {
    switch (sport) {
      case 'cricket': return 'text-green-600';
      case 'football': return 'text-purple-600';
      case 'tennis': return 'text-orange-600';
      case 'basketball': return 'text-red-600';
      case 'badminton': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed tournament' : 'Following tournament');
  };

  const handleShare = () => {
    navigator.share({
      title: tournament?.name,
      text: `Check out ${tournament?.name} on SportSphere!`,
      url: window.location.href
    }).catch(() => {
      toast.success('Link copied to clipboard');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tournament...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaTrophy className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tournament Not Found</h2>
          <p className="text-gray-600 mb-4">The tournament you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/matches')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Matches
          </button>
        </div>
      </div>
    );
  }

  const SportIcon = getSportIcon(tournament.sport);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${getSportColor(tournament.sport).replace('text-', 'bg-').replace('-600', '-100')} rounded-lg flex items-center justify-center`}>
                  <SportIcon className={`text-lg ${getSportColor(tournament.sport)}`} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 truncate">{tournament.name}</h1>
                  <p className="text-xs text-gray-500 capitalize">{tournament.sport}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaShare className="text-gray-600" />
              </button>
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isFollowing 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pb-3">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaEye className="text-sm" />
              <span className="text-sm font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'matches'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaPlay className="text-sm" />
              <span className="text-sm font-medium">Matches</span>
            </button>
            <button
              onClick={() => setActiveTab('standings')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'standings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaTable className="text-sm" />
              <span className="text-sm font-medium">Standings</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaInfoCircle className="text-sm" />
              <span className="text-sm font-medium">Rules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Tournament Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Tournament Info</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-sm font-medium text-gray-900">{tournament.venue}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Teams</p>
                    <p className="text-sm font-medium text-gray-900">{tournament.currentTeams}/{tournament.maxTeams}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Prize Pool</p>
                    <p className="text-sm font-medium text-gray-900">{tournament.prizePool}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{tournament.description}</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{tournament.matches?.length || 0}</div>
                  <div className="text-xs text-gray-500">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{tournament.currentTeams}</div>
                  <div className="text-xs text-gray-500">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{tournament.format}</div>
                  <div className="text-xs text-gray-500">Format</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Matches</h2>
              <span className="text-sm text-gray-500">{tournament.matches?.length || 0} matches</span>
            </div>
            
            {tournament.matches && tournament.matches.length > 0 ? (
              <div className="space-y-3">
                {tournament.matches.map((match) => (
                  <div key={match.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.status === 'live' ? 'bg-red-100 text-red-800' :
                          match.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">{match.date}</span>
                      </div>
                      <button 
                        onClick={() => {
                          const context = {
                            source: 'tournament',
                            tournamentId: tournamentId
                          };
                          navigationService.navigateWithContext(navigate, 'match', match.id, context);
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{match.team1.name}</p>
                          <p className="text-lg font-bold text-gray-900">{match.team1.score}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500">vs</p>
                        <p className="text-xs text-gray-500">{match.venue}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 text-right">{match.team2.name}</p>
                          <p className="text-lg font-bold text-gray-900 text-right">{match.team2.score}</p>
                        </div>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                        </div>
                      </div>
                    </div>
                    
                    {match.result && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">{match.result}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaGamepad className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Matches Yet</h3>
                <p className="text-gray-500">Matches will be scheduled soon.</p>
              </div>
            )}
          </div>
        )}

        {/* Standings Tab */}
        {activeTab === 'standings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Standings</h2>
              <span className="text-sm text-gray-500">{tournament.standings?.length || 0} teams</span>
            </div>
            
            {tournament.standings && tournament.standings.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                        {tournament.sport === 'football' && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                        )}
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tournament.standings.map((team, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {team.position <= 3 ? (
                                <FaMedal className={`text-sm ${
                                  team.position === 1 ? 'text-yellow-500' :
                                  team.position === 2 ? 'text-gray-400' :
                                  'text-orange-500'
                                }`} />
                              ) : (
                                <span className="text-sm font-medium text-gray-900">{team.position}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-bold text-gray-600">
                                  {team.team ? team.team.substring(0, 2).toUpperCase() : 
                                   team.player ? team.player.substring(0, 2).toUpperCase() : 'NA'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {team.team || team.player}
                                </div>
                                {team.country && (
                                  <div className="text-xs text-gray-500">{team.country}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{team.played}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{team.won}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{team.lost}</td>
                          {tournament.sport === 'football' && (
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{team.drawn}</td>
                          )}
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.points || team.winRate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaTable className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Standings Yet</h3>
                <p className="text-gray-500">Standings will be updated as matches progress.</p>
              </div>
            )}
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Tournament Rules</h2>
              <span className="text-sm text-gray-500">{tournament.rules?.length || 0} rules</span>
            </div>
            
            {tournament.rules && tournament.rules.length > 0 ? (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  {tournament.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaInfoCircle className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Rules Available</h3>
                <p className="text-gray-500">Tournament rules will be posted soon.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentPage;
