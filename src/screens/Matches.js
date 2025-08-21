import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaFire, 
  FaClock, 
  FaTrophy, 
  FaEye, 
  FaMapMarkerAlt, 
  FaSearch,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat, GiShuttlecock } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import { handleError } from '../utils/errorHandler';
import { getTournamentById } from '../data/tournamentData';
import { navigationService } from '../services/navigationService';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import MatchDetail from './MatchDetail';

const Matches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Get context from URL parameters
  const tournamentId = searchParams.get('tournament');
  const matchId = searchParams.get('match');
  const userId = searchParams.get('user');
  
  const [selectedSport, setSelectedSport] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [allMatches, setAllMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const sports = [
    { id: 'all', name: 'All', icon: FaTrophy, color: 'text-blue-600' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-green-600' },
    { id: 'football', name: 'Football', icon: FaTrophy, color: 'text-purple-600' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-orange-600' },
    { id: 'basketball', name: 'Basketball', icon: MdSportsBasketball, color: 'text-red-600' },
    { id: 'badminton', name: 'Badminton', icon: GiShuttlecock, color: 'text-blue-600' }
  ];

  useEffect(() => {
    fetchAllMatches();
  }, []);

  // Handle matchId from URL parameter to show detailed scorecard
  useEffect(() => {
    if (matchId && allMatches.length > 0) {
      const match = allMatches.find(m => m.id === parseInt(matchId));
      if (match) {
        setSelectedMatch(match);
      }
    }
  }, [matchId, allMatches]);

  const fetchAllMatches = async () => {
    try {
      setRefreshing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock comprehensive matches data with dates
      const matches = [
        // Live Matches (Today)
        {
          id: 1,
          sport: 'cricket',
          tournament: 'IPL 2024',
          tournamentId: 'ipl-2024',
          team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4', overs: '18.2' },
          team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8', overs: '20.0' },
          status: 'live',
          time: 'LIVE',
          date: 'Today',
          venue: 'Wankhede Stadium',
          highlights: ['Kohli 89*', 'Bumrah 3/25'],
          viewers: '2.4M'
        },
        {
          id: 2,
          sport: 'football',
          tournament: 'Premier League',
          tournamentId: 'premier-league-2024',
          team1: { name: 'Manchester United', logo: 'MU', score: '2' },
          team2: { name: 'Liverpool', logo: 'LIV', score: '1' },
          status: 'live',
          time: '78\'',
          date: 'Today',
          venue: 'Old Trafford',
          highlights: ['Rashford 23\'', 'Salah 45\'', 'Bruno 67\''],
          viewers: '1.8M'
        },
        {
          id: 3,
          sport: 'tennis',
          tournament: 'Wimbledon',
          tournamentId: 'wimbledon-2024',
          team1: { name: 'Djokovic', logo: 'DJ', score: '6-4, 7-6' },
          team2: { name: 'Nadal', logo: 'NA', score: '4-6, 6-7' },
          status: 'live',
          time: 'LIVE',
          date: 'Today',
          venue: 'Centre Court',
          highlights: ['Set 3: 2-1'],
          viewers: '890K'
        },
        {
          id: 4,
          sport: 'basketball',
          tournament: 'NBA Playoffs',
          tournamentId: 'nba-playoffs-2024',
          team1: { name: 'Lakers', logo: 'LAL', score: '108' },
          team2: { name: 'Warriors', logo: 'GSW', score: '102' },
          status: 'live',
          time: 'Q4 2:30',
          date: 'Today',
          venue: 'Crypto.com Arena',
          highlights: ['LeBron 32pts', 'Curry 28pts'],
          viewers: '3.2M'
        },
        {
          id: 5,
          sport: 'badminton',
          tournament: 'All England Open',
          tournamentId: 'all-england-2024',
          team1: { name: 'Viktor Axelsen', logo: 'VA', score: '21-18, 15-12' },
          team2: { name: 'Kento Momota', logo: 'KM', score: '18-21, 12-15' },
          status: 'live',
          time: 'LIVE',
          date: 'Today',
          venue: 'Utilita Arena Birmingham',
          highlights: ['Axelsen 8 smashes', 'Momota 15 drops'],
          viewers: '650K'
        },
        // Upcoming Matches (Today)
        {
          id: 6,
          sport: 'cricket',
          tournament: 'T20 World Cup',
          tournamentId: 't20-world-cup-2024',
          team1: { name: 'India', logo: 'IND' },
          team2: { name: 'Australia', logo: 'AUS' },
          status: 'upcoming',
          time: 'Today, 7:30 PM',
          date: 'Today',
          venue: 'MCG, Melbourne'
        },
        {
          id: 7,
          sport: 'football',
          tournament: 'Champions League',
          tournamentId: 'champions-league-2024',
          team1: { name: 'Real Madrid', logo: 'RMA' },
          team2: { name: 'Bayern Munich', logo: 'BAY' },
          status: 'upcoming',
          time: 'Today, 8:00 PM',
          date: 'Today',
          venue: 'Santiago Bernabéu'
        },
        // Upcoming Matches (Tomorrow)
        {
          id: 8,
          sport: 'tennis',
          tournament: 'US Open',
          team1: { name: 'Medvedev', logo: 'MED' },
          team2: { name: 'Zverev', logo: 'ZVE' },
          status: 'upcoming',
          time: 'Tomorrow, 3:00 PM',
          date: 'Tomorrow',
          venue: 'Arthur Ashe Stadium'
        },
        {
          id: 9,
          sport: 'basketball',
          tournament: 'NBA Finals',
          team1: { name: 'Celtics', logo: 'BOS' },
          team2: { name: 'Heat', logo: 'MIA' },
          status: 'upcoming',
          time: 'Tomorrow, 9:00 PM',
          date: 'Tomorrow',
          venue: 'TD Garden'
        },
        // Upcoming Matches (Friday)
        {
          id: 10,
          sport: 'cricket',
          tournament: 'IPL 2024',
          team1: { name: 'RCB', logo: 'RCB' },
          team2: { name: 'KKR', logo: 'KKR' },
          status: 'upcoming',
          time: 'Friday, 7:30 PM',
          date: 'Friday',
          venue: 'Chinnaswamy Stadium'
        },
        // Recent Results (Yesterday)
        {
          id: 11,
          sport: 'cricket',
          tournament: 'IPL 2024',
          team1: { name: 'RCB', logo: 'RCB', score: '185/6', overs: '20.0' },
          team2: { name: 'KKR', logo: 'KKR', score: '182/8', overs: '20.0' },
          status: 'finished',
          time: 'FINAL',
          date: 'Yesterday',
          venue: 'Chinnaswamy Stadium',
          highlights: ['Maxwell 89*', 'Russell 3/25'],
          viewers: '2.1M'
        },
        {
          id: 12,
          sport: 'football',
          tournament: 'La Liga',
          team1: { name: 'Barcelona', logo: 'BAR', score: '3' },
          team2: { name: 'Atletico Madrid', logo: 'ATM', score: '1' },
          status: 'finished',
          time: 'FINAL',
          date: 'Yesterday',
          venue: 'Camp Nou',
          highlights: ['Lewandowski 2 goals', 'Griezmann 1 goal'],
          viewers: '1.5M'
        },
        // Recent Results (2 days ago)
        {
          id: 13,
          sport: 'tennis',
          tournament: 'French Open',
          team1: { name: 'Alcaraz', logo: 'ALC', score: '6-3, 6-2, 6-1' },
          team2: { name: 'Tsitsipas', logo: 'TSI', score: '3-6, 2-6, 1-6' },
          status: 'finished',
          time: 'FINAL',
          date: '2 days ago',
          venue: 'Roland Garros',
          highlights: ['Alcaraz dominant win'],
          viewers: '1.2M'
        },
        {
          id: 14,
          sport: 'basketball',
          tournament: 'NBA Playoffs',
          team1: { name: 'Nuggets', logo: 'DEN', score: '115' },
          team2: { name: 'Suns', logo: 'PHX', score: '107' },
          status: 'finished',
          time: 'FINAL',
          date: '2 days ago',
          venue: 'Ball Arena',
          highlights: ['Jokic 32pts', 'Booker 28pts'],
          viewers: '2.8M'
        }
      ];
      
      setAllMatches(matches);
    } catch (error) {
      handleError(error, 'Matches');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchAllMatches();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-50 border-red-200';
      case 'finished': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSportIcon = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.icon : FaTrophy;
  };

  const getSportColor = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.color : 'text-gray-600';
  };

  // Sort matches in chronological timeline order
  const getSortedMatches = () => {
    let filtered = [...allMatches];
    
    if (selectedSport !== 'all') {
      filtered = filtered.filter(match => match.sport === selectedSport);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(match => 
        match.team1.name.toLowerCase().includes(query) ||
        match.team2.name.toLowerCase().includes(query) ||
        match.tournament.toLowerCase().includes(query) ||
        match.venue.toLowerCase().includes(query)
      );
    }
    
    // Sort: live matches first, then upcoming (future), then results (past)
    return filtered.sort((a, b) => {
      // Live matches always come first
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      
      // For non-live matches, sort by date (upcoming before results)
      if (a.status === 'upcoming' && b.status === 'finished') return -1;
      if (a.status === 'finished' && b.status === 'upcoming') return 1;
      
      // Within same status, sort by date (timeline order: past -> present -> future)
      const dateOrder = ['2 days ago', 'Yesterday', 'Today', 'Tomorrow', 'Friday'];
      const aIndex = dateOrder.indexOf(a.date);
      const bIndex = dateOrder.indexOf(b.date);
      
      if (aIndex !== bIndex) {
        return aIndex - bIndex; // Timeline order: past dates first (scroll up for older)
      }
      
      // If same date, sort by time
      return a.time.localeCompare(b.time);
    });
  };

  const sortedMatches = getSortedMatches();

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };

  // Handler to go back to matches list
  const handleBackToMatches = () => {
    setSelectedMatch(null);
    // Remove match parameter from URL
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete('match');
    const newUrl = `${location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
    navigate(newUrl, { replace: true });
  };

  // Show detailed scorecard if a match is selected
  if (selectedMatch) {
    return (
      <MatchDetail 
        matchId={selectedMatch.id}
        sport={selectedMatch.sport}
        onBack={handleBackToMatches}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Matches</h1>
                <p className="text-sm text-gray-500">All matches in chronological order</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaSearch className="text-gray-600" />
              </button>
              <button 
                onClick={handleRefresh}
                className={`text-sm font-medium ${refreshing ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'}`}
                disabled={refreshing}
              >
                {refreshing ? 'Updating...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search matches, teams, tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-10 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sport Categories */}
        <div className="px-4 pb-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {sports.map((sport) => {
              const Icon = sport.icon;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex flex-col items-center space-y-2 min-w-0 flex-shrink-0 transition-all duration-200 ${
                    selectedSport === sport.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    selectedSport === sport.id
                      ? 'bg-blue-100 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Icon className={`text-xl ${sport.color}`} />
                  </div>
                  <span className="text-xs font-medium">{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

             {/* Matches List with top padding for fixed header */}
       <div className="pt-48 px-4 pb-20">
         <div className="space-y-3">
           {sortedMatches.map((match) => {
             const SportIcon = getSportIcon(match.sport);
             const sportColor = getSportColor(match.sport);
             
             return (
               <div 
                 key={match.id} 
                 className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                 onClick={() => {
                   const context = {
                     source: 'matches',
                     tournamentId: match.tournamentId,
                     previousContext: location.state
                   };
                   navigationService.navigateWithContext(navigate, 'match', match.id, context);
                 }}
               >
                 {/* Match Header */}
                 <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                       <SportIcon className={`text-lg ${sportColor}`} />
                       <button 
                         onClick={(e) => {
                           e.stopPropagation(); // Prevent card click
                           const context = {
                             source: 'matches',
                             previousContext: location.state
                           };
                           navigationService.navigateToTournament(navigate, match.tournamentId, 'matches');
                         }}
                         className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline"
                       >
                         {match.tournament}
                       </button>
                     </div>
                     <div className="flex items-center space-x-2">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(match.status)}`}>
                         {match.time}
                       </span>
                       {match.viewers && (
                         <div className="flex items-center space-x-1 text-xs text-gray-500">
                           <FaEye className="text-xs" />
                           <span>{match.viewers}</span>
                         </div>
                       )}
                     </div>
                   </div>
                   {match.venue && (
                     <div className="flex items-center space-x-1 mt-1">
                       <FaMapMarkerAlt className="text-xs text-gray-400" />
                       <span className="text-xs text-gray-500">{match.venue}</span>
                     </div>
                   )}
                 </div>
                 
                 {/* Match Content */}
                 <div className="p-4">
                   <div className="flex items-center justify-between">
                     <div className="flex-1">
                       <div className="flex items-center space-x-2 mb-1">
                         <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                           <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                         </div>
                         <h3 className="font-semibold text-gray-900">{match.team1.name}</h3>
                       </div>
                       {match.team1.score && (
                         <>
                           <p className="text-2xl font-bold text-gray-900">{match.team1.score}</p>
                           {match.team1.overs && (
                             <p className="text-xs text-gray-500">{match.team1.overs} overs</p>
                           )}
                         </>
                       )}
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
                       {match.team2.score && (
                         <>
                           <p className="text-2xl font-bold text-gray-900">{match.team2.score}</p>
                           {match.team2.overs && (
                             <p className="text-xs text-gray-500">{match.team2.overs} overs</p>
                           )}
                         </>
                       )}
                     </div>
                   </div>

                   {/* Highlights */}
                   {match.highlights && match.highlights.length > 0 && (
                     <div className="mt-3 pt-3 border-t border-gray-100">
                       <div className="flex items-center space-x-2">
                         <FaFire className="text-xs text-red-500" />
                         <span className="text-xs font-medium text-gray-700">Highlights:</span>
                         <div className="flex space-x-2">
                           {match.highlights.map((highlight, index) => (
                             <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                               {highlight}
                             </span>
                           ))}
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             );
           })}
         </div>

        {/* Empty State */}
        {sortedMatches.length === 0 && (
          <div className="text-center py-8">
            {searchQuery ? (
              <>
                <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matches available</h3>
                <p className="text-gray-500">Check back later for upcoming matches!</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
