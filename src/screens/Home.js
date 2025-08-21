import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaFutbol, 
  FaTrophy, 
  FaPlus,
  FaBell,
  FaSearch,
  FaFire,
  FaClock,
  FaMapMarkerAlt,
  FaEye,
  FaChevronRight,
  FaTimes,
  FaArrowLeft,
  FaPlay,
  FaHeart,
  FaComment,
  FaShare,
  FaUser,
  FaImage,
  FaCamera,
  FaGamepad,
  FaUsers
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat, GiShuttlecock } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import toast from 'react-hot-toast';
import MatchDetail from './MatchDetail';
import ThreadPost from '../components/ThreadPost';
import ThreadFeed from '../components/ThreadFeed';
import { navigationService } from '../services/navigationService';
import { getFollowedUsersThreads, addThread, likeThread, repostThread } from '../data/threadsData';

const Home = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('all');
  const [activeTab, setActiveTab] = useState('live');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', type: 'text', media: null, poll: null, referencedMatch: null });
  const [showMatchSelector, setShowMatchSelector] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showThreadView, setShowThreadView] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState(new Set());
  const [replyInputs, setReplyInputs] = useState({});
  const [threads, setThreads] = useState(getFollowedUsersThreads());

  // Enhanced sport selection data
  const sports = [
    { id: 'all', name: 'All', icon: FaTrophy, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: 'basketball', name: 'Basketball', icon: MdSportsBasketball, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 'badminton', name: 'Badminton', icon: GiShuttlecock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  ];

  // Enhanced live scores data with more details
  const liveScores = [
    {
      id: 1,
      sport: 'cricket',
      tournament: 'IPL 2024',
      tournamentId: 'ipl-2024',
      team1: { name: 'Mumbai Indians', logo: 'MI', score: '156/4', overs: '18.2' },
      team2: { name: 'Chennai Super Kings', logo: 'CSK', score: '142/8', overs: '20.0' },
      status: 'live',
      time: 'LIVE',
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
      status: 'finished',
      time: 'FINAL',
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
      venue: 'Utilita Arena Birmingham',
      highlights: ['Axelsen 8 smashes', 'Momota 15 drops'],
      viewers: '650K'
    }
  ];

  // Upcoming matches
  const upcomingMatches = [
    {
      id: 5,
      sport: 'cricket',
      tournament: 'T20 World Cup',
      team1: { name: 'India', logo: 'IND' },
      team2: { name: 'Australia', logo: 'AUS' },
      time: 'Today, 7:30 PM',
      venue: 'MCG, Melbourne'
    },
    {
      id: 6,
      sport: 'football',
      tournament: 'Champions League',
      team1: { name: 'Real Madrid', logo: 'RMA' },
      team2: { name: 'Bayern Munich', logo: 'BAY' },
      time: 'Tomorrow, 8:00 PM',
      venue: 'Santiago Bernabéu'
    }
  ];

  // Quick stats
  const quickStats = [
    { label: 'Live Matches', value: '12', icon: FaFire, color: 'text-red-500' },
    { label: 'Upcoming', value: '8', icon: FaClock, color: 'text-blue-500' },
    { label: 'Venues', value: '24', icon: FaMapMarkerAlt, color: 'text-green-500' },
    { label: 'Tournaments', value: '15', icon: FaTrophy, color: 'text-purple-500' }
  ];

  // Community threads data (Threads/X.com style)
  const communityThreads = [
    {
      id: 1,
      user: {
        name: 'Cricket Fanatic',
        avatar: 'CF',
        verified: true,
        handle: '@cricketfanatic'
      },
      sport: 'cricket',
      match: 'MI vs CSK',
      content: "What an incredible finish! Kohli's 89* was pure class. The way he handled pressure in the final overs was masterful. #IPL2024 #Cricket",
      type: 'text',
      media: null,
      likes: 234,
      replyCount: 45,
      reposts: 12,
      timestamp: '2 hours ago',
      isLiked: false,
      isReposted: false,
      threadId: null, // Original thread
      replies: [
        {
          id: 11,
          user: {
            name: 'MI Supporter',
            avatar: 'MS',
            verified: false,
            handle: '@misupporter'
          },
          content: "Absolutely! That last over was nerve-wracking. Kohli showed why he's the best in pressure situations!",
          timestamp: '1 hour ago',
          likes: 23,
          replies: 5,
          isLiked: false
        },
        {
          id: 12,
          user: {
            name: 'Cricket Analyst',
            avatar: 'CA',
            verified: true,
            handle: '@cricketanalyst'
          },
          content: "The way he rotated strike and found boundaries at the right moments was textbook finishing. Masterclass!",
          timestamp: '45 min ago',
          likes: 18,
          replies: 3,
          isLiked: true
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Football Forever',
        avatar: 'FF',
        verified: false,
        handle: '@footballforever'
      },
      sport: 'football',
      match: 'MU vs LIV',
      content: "Rashford's goal was absolutely brilliant! The build-up play was perfect. Here's the moment that changed the game.",
      type: 'image',
      media: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Goal+Highlight',
      likes: 156,
      replyCount: 23,
      reposts: 8,
      timestamp: '4 hours ago',
      isLiked: true,
      isReposted: false,
      threadId: null,
       replies: [
        {
          id: 21,
          user: {
            name: 'Red Devils',
            avatar: 'RD',
            verified: false,
            handle: '@reddevils'
          },
          content: "That assist from Bruno was perfect! The chemistry between them is incredible.",
          timestamp: '3 hours ago',
          likes: 12,
          replies: 2,
          isLiked: false
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Tennis Pro',
        avatar: 'TP',
        verified: true,
        handle: '@tennispro'
      },
      sport: 'tennis',
      match: 'Djokovic vs Nadal',
      content: 'The intensity in this match is unreal! Both players are giving it their all. This is what tennis is all about.',
      type: 'video',
      media: 'https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Tennis+Match',
      likes: 89,
      replyCount: 15,
      reposts: 5,
      timestamp: '6 hours ago',
      isLiked: false,
      isReposted: false,
      threadId: null,
       replies: []
    },
    {
      id: 4,
      user: {
        name: 'Basketball Lover',
        avatar: 'BL',
        verified: false,
        handle: '@basketballlover'
      },
      sport: 'basketball',
      match: 'Lakers vs Warriors',
      content: "LeBron's performance tonight was legendary! 32 points, 8 assists, and that clutch three-pointer. GOAT! 🐐",
      type: 'text',
      media: null,
      likes: 312,
      replyCount: 67,
      reposts: 23,
      timestamp: '1 day ago',
      isLiked: true,
      isReposted: true,
      threadId: null,
      replies: [
        {
          id: 41,
          user: {
            name: 'Lakers Nation',
            avatar: 'LN',
            verified: true,
            handle: '@lakersnation'
          },
          content: "The way he took over in the 4th quarter was vintage LeBron! That step-back three was the dagger!",
          timestamp: '23 hours ago',
          likes: 45,
          replies: 8,
          isLiked: true
        },
        {
          id: 42,
          user: {
            name: 'Warriors Fan',
            avatar: 'WF',
            verified: false,
            handle: '@warriorsfan'
          },
          content: "Credit where it's due. LeBron was unstoppable tonight. But we'll be back stronger! 💪",
          timestamp: '22 hours ago',
          likes: 23,
          replies: 4,
          isLiked: false
        }
      ]
    },
    {
      id: 5,
      user: {
        name: 'Badminton Champ',
        avatar: 'BC',
        verified: true,
        handle: '@badmintonchamp'
      },
      sport: 'badminton',
      match: 'Axelsen vs Momota',
      content: "The skill level in this match is incredible. Axelsen's smashes are just unstoppable!",
      type: 'image',
      media: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=Badminton+Action',
      likes: 78,
      replyCount: 12,
      reposts: 4,
      timestamp: '2 days ago',
      isLiked: false,
      isReposted: false,
      threadId: null,
       replies: []
    }
  ];

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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Scores updated!');
    }, 1000);
  };

  // Enhanced match press handler with context
  const handleMatchPress = (match) => {
    // Navigate to match overview page
    navigate(`/match/${match.id}`);
  };

  // Enhanced tournament navigation
  const handleTournamentPress = (tournamentId, source = 'home') => {
    navigationService.navigateToTournament(navigate, tournamentId, source);
  };

  // Enhanced profile navigation from threads
  const handleProfilePress = (userId, source = 'thread') => {
    navigationService.navigateToProfile(navigate, userId, source);
  };

  const handleBackToHome = () => {
    setSelectedMatch(null);
  };



  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      toast.success('Post created successfully!');
      setNewPost({ content: '', type: 'text', media: null, poll: null });
      setShowCreatePost(false);
    } else {
      toast.error('Please enter some content');
    }
  };

  const handleAddMedia = (type) => {
    toast.success(`${type} upload feature coming soon!`);
  };

  const handleOpenThread = (thread) => {
    setSelectedThread(thread);
    setShowThreadView(true);
  };

  const handleCloseThread = () => {
    setShowThreadView(false);
    setSelectedThread(null);
    setReplyContent('');
  };

  const handleToggleThreadExpansion = (threadId) => {
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(threadId)) {
      newExpanded.delete(threadId);
    } else {
      newExpanded.add(threadId);
    }
    setExpandedThreads(newExpanded);
  };

  const handleReplyToThread = (threadId) => {
    if (replyInputs[threadId]?.trim()) {
      toast.success('Reply posted successfully!');
      setReplyInputs(prev => ({ ...prev, [threadId]: '' }));
    } else {
      toast.error('Please enter a reply');
    }
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      toast.success('Reply posted successfully!');
      setReplyContent('');
    } else {
      toast.error('Please enter a reply');
    }
  };

  const handleRepost = (threadId) => {
    toast.success('Thread reposted!');
  };

  const handleLikeThread = (threadId) => {
    toast.success('Thread liked!');
  };

  const handleCreateTournament = () => {
    toast.success('Create Tournament feature coming soon!');
    setShowCreateOptions(false);
  };

  const handleCreateMatch = () => {
    toast.success('Create Match feature coming soon!');
    setShowCreateOptions(false);
  };

  const handleJoinTournament = () => {
    toast.success('Join Tournament feature coming soon!');
    setShowCreateOptions(false);
  };

  const handleJoinMatch = () => {
    toast.success('Join Match feature coming soon!');
    setShowCreateOptions(false);
  };

  // Thread handlers
  const handlePostThread = async (threadData) => {
    try {
      const newThread = addThread(threadData);
      setThreads(prev => [newThread, ...prev]);
      return newThread;
    } catch (error) {
      console.error('Error posting thread:', error);
      throw error;
    }
  };

  const handleLikeThreadAction = async (threadId) => {
    try {
      const updatedThread = likeThread(threadId);
      setThreads(prev => 
        prev.map(thread => 
          thread.id === threadId ? updatedThread : thread
        )
      );
      return updatedThread;
    } catch (error) {
      console.error('Error liking thread:', error);
      throw error;
    }
  };

  const handleRepostThreadAction = async (threadId) => {
    try {
      const updatedThread = repostThread(threadId);
      setThreads(prev => 
        prev.map(thread => 
          thread.id === threadId ? updatedThread : thread
        )
      );
      return updatedThread;
    } catch (error) {
      console.error('Error reposting thread:', error);
      throw error;
    }
  };

  // Poll-related functions
  const handleAddPoll = () => {
    setNewPost(prev => ({
      ...prev,
      poll: {
        question: '',
        options: ['', '']
      }
    }));
  };

  const handlePollOptionChange = (index, value) => {
    setNewPost(prev => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: prev.poll.options.map((option, i) => i === index ? value : option)
      }
    }));
  };

  const handleAddPollOption = () => {
    setNewPost(prev => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: [...prev.poll.options, '']
      }
    }));
  };

  const handleRemovePollOption = (index) => {
    setNewPost(prev => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: prev.poll.options.filter((_, i) => i !== index)
      }
    }));
  };

  // Match reference functions
  const handleSelectMatch = (match) => {
    setNewPost(prev => ({
      ...prev,
      referencedMatch: match
    }));
    setShowMatchSelector(false);
  };

  const handleRemoveMatchReference = () => {
    setNewPost(prev => ({
      ...prev,
      referencedMatch: null
    }));
  };

  // Show MatchDetail if a match is selected
  if (selectedMatch) {
    console.log('Rendering MatchDetail with:', selectedMatch);
    return <MatchDetail matchId={selectedMatch.id} sport={selectedMatch.sport} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SportSphere</h1>
                <p className="text-xs text-gray-500">Live Sports & Scores</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center relative">
                <FaBell className="text-gray-600 text-sm" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <FaSearch className="text-gray-600 text-sm" />
              </button>
            </div>
          </div>
        </div>

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
                      ? 'bg-blue-100 shadow-md ring-2 ring-blue-200'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Icon className={`text-xl ${selectedSport === sport.id ? 'text-blue-600' : sport.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${selectedSport === sport.id ? 'text-blue-600' : ''}`}>{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pb-3">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'live', label: 'Live', icon: FaFire },
              { id: 'upcoming', label: 'Upcoming', icon: FaClock },
              { id: 'finished', label: 'Results', icon: FaTrophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      



            {/* Live Matches Horizontal Panel */}
      {activeTab === 'live' && (
        <div className="px-4 py-3 bg-white border-b border-gray-200">
                     <div className="flex items-center justify-between mb-3">
             <h2 className="text-lg font-semibold text-gray-900">
               {selectedSport === 'all' ? 'Live Matches' : `${sports.find(s => s.id === selectedSport)?.name} Live Matches`}
             </h2>
             <button 
               onClick={() => navigate('/matches')}
               className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
             >
               View All <FaChevronRight className="text-sm ml-1" />
             </button>
           </div>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {liveScores
              .filter(match => match.status === 'live')
              .filter(match => selectedSport === 'all' || match.sport === selectedSport)
              .slice(0, 5)
              .map((match) => {
                const SportIcon = getSportIcon(match.sport);
                const sportColor = getSportColor(match.sport);
                return (
                  <div 
                    key={match.id} 
                    className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm border border-gray-200 min-w-[280px] cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => handleMatchPress(match)}
                  >
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <SportIcon className={`text-sm ${sportColor}`} />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/tournament/${match.tournamentId}`);
                          }}
                          className="text-xs font-medium text-gray-600 hover:text-blue-600 hover:underline"
                        >
                          {match.tournament}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
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
                    
                    {/* Teams and Scores */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team1.name}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{match.team1.score}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team2.name}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{match.team2.score}</span>
                      </div>
                    </div>
                    
                    {/* Venue */}
                    {match.venue && (
                      <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-gray-100">
                        <FaMapMarkerAlt className="text-xs text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            
                         {/* More matches indicator */}
             {liveScores.filter(match => match.status === 'live').filter(match => selectedSport === 'all' || match.sport === selectedSport).length > 5 && (
               <div 
                 className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200 min-w-[120px] cursor-pointer hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
                 onClick={() => navigate('/matches')}
               >
                <div className="text-center">
                  <FaChevronRight className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-600">More</p>
                  <p className="text-xs text-blue-500">
                    {liveScores.filter(match => match.status === 'live').filter(match => selectedSport === 'all' || match.sport === selectedSport).length - 5} more
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Empty State */}
          {liveScores.filter(match => match.status === 'live').filter(match => selectedSport === 'all' || match.sport === selectedSport).length === 0 && (
            <div className="text-center py-8">
              <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedSport === 'all' ? 'No Live Matches' : `No Live ${sports.find(s => s.id === selectedSport)?.name} Matches`}
              </h3>
              <p className="text-gray-500">
                {selectedSport === 'all' ? 'Check back later for live action!' : `No live ${sports.find(s => s.id === selectedSport)?.name.toLowerCase()} matches at the moment.`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Upcoming Matches Horizontal Panel */}
      {activeTab === 'upcoming' && (
        <div className="px-4 py-3 bg-white border-b border-gray-200">
                     <div className="flex items-center justify-between mb-3">
             <h2 className="text-lg font-semibold text-gray-900">
               {selectedSport === 'all' ? 'Upcoming Matches' : `${sports.find(s => s.id === selectedSport)?.name} Upcoming Matches`}
             </h2>
             <button 
               onClick={() => navigate('/matches')}
               className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
             >
               View All <FaChevronRight className="text-sm ml-1" />
             </button>
           </div>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {upcomingMatches
              .filter(match => selectedSport === 'all' || match.sport === selectedSport)
              .slice(0, 5)
              .map((match) => {
                const SportIcon = getSportIcon(match.sport);
                const sportColor = getSportColor(match.sport);
                return (
                  <div 
                    key={match.id} 
                    className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm border border-gray-200 min-w-[280px] cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => handleMatchPress(match)}
                  >
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <SportIcon className={`text-sm ${sportColor}`} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTournamentPress(match.tournamentId, 'home');
                          }}
                          className="text-xs font-medium text-gray-600 hover:text-blue-600 hover:underline"
                        >
                          {match.tournament}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                          {match.time}
                        </span>
                      </div>
                    </div>
                    
                    {/* Teams */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team1.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team2.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Venue */}
                    {match.venue && (
                      <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-gray-100">
                        <FaMapMarkerAlt className="text-xs text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            
                         {/* More matches indicator */}
             {upcomingMatches.filter(match => selectedSport === 'all' || match.sport === selectedSport).length > 5 && (
               <div 
                 className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200 min-w-[120px] cursor-pointer hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
                 onClick={() => navigate('/matches')}
               >
                <div className="text-center">
                  <FaChevronRight className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-600">More</p>
                  <p className="text-xs text-blue-500">
                    {upcomingMatches.filter(match => selectedSport === 'all' || match.sport === selectedSport).length - 5} more
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Empty State */}
          {upcomingMatches.filter(match => selectedSport === 'all' || match.sport === selectedSport).length === 0 && (
            <div className="text-center py-8">
              <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedSport === 'all' ? 'No Upcoming Matches' : `No Upcoming ${sports.find(s => s.id === selectedSport)?.name} Matches`}
              </h3>
              <p className="text-gray-500">
                {selectedSport === 'all' ? 'Check back later for upcoming matches!' : `No upcoming ${sports.find(s => s.id === selectedSport)?.name.toLowerCase()} matches at the moment.`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recent Results Horizontal Panel */}
      {activeTab === 'finished' && (
        <div className="px-4 py-3 bg-white border-b border-gray-200">
                     <div className="flex items-center justify-between mb-3">
             <h2 className="text-lg font-semibold text-gray-900">
               {selectedSport === 'all' ? 'Recent Results' : `${sports.find(s => s.id === selectedSport)?.name} Results`}
             </h2>
             <button 
               onClick={() => navigate('/matches')}
               className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
             >
               View All <FaChevronRight className="text-sm ml-1" />
             </button>
           </div>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {liveScores
              .filter(match => match.status === 'finished')
              .filter(match => selectedSport === 'all' || match.sport === selectedSport)
              .slice(0, 5)
              .map((match) => {
                const SportIcon = getSportIcon(match.sport);
                const sportColor = getSportColor(match.sport);
                return (
                  <div 
                    key={match.id} 
                    className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm border border-gray-200 min-w-[280px] cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => handleMatchPress(match)}
                  >
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <SportIcon className={`text-sm ${sportColor}`} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTournamentPress(match.tournamentId, 'home');
                          }}
                          className="text-xs font-medium text-gray-600 hover:text-blue-600 hover:underline"
                        >
                          {match.tournament}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
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
                    
                    {/* Teams and Scores */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team1.name}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{match.team1.score}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{match.team2.name}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{match.team2.score}</span>
                      </div>
                    </div>
                    
                    {/* Venue */}
                    {match.venue && (
                      <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-gray-100">
                        <FaMapMarkerAlt className="text-xs text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            
                         {/* More matches indicator */}
             {liveScores.filter(match => match.status === 'finished').filter(match => selectedSport === 'all' || match.sport === selectedSport).length > 5 && (
               <div 
                 className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200 min-w-[120px] cursor-pointer hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
                 onClick={() => navigate('/matches')}
               >
                <div className="text-center">
                  <FaChevronRight className="text-2xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-600">More</p>
                  <p className="text-xs text-blue-500">
                    {liveScores.filter(match => match.status === 'finished').filter(match => selectedSport === 'all' || match.sport === selectedSport).length - 5} more
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Empty State */}
          {liveScores.filter(match => match.status === 'finished').filter(match => selectedSport === 'all' || match.sport === selectedSport).length === 0 && (
            <div className="text-center py-8">
              <FaTrophy className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedSport === 'all' ? 'No Recent Results' : `No Recent ${sports.find(s => s.id === selectedSport)?.name} Results`}
              </h3>
              <p className="text-gray-500">
                {selectedSport === 'all' ? 'Check back later for match results!' : `No recent ${sports.find(s => s.id === selectedSport)?.name.toLowerCase()} results at the moment.`}
              </p>
            </div>
          )}
        </div>
      )}

               {/* Threads/X.com Style Community Section */}
        <div className="px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sports Threads</h2>
          </div>

          {/* Thread Post Component */}
          <ThreadPost onPost={handlePostThread} />

          {/* Thread Feed Component */}
          <ThreadFeed 
            threads={threads.filter(thread => selectedSport === 'all' || thread.sport === selectedSport)} 
            onLike={handleLikeThreadAction}
            onReply={() => {}}
            onRepost={handleRepostThreadAction}
            showHeader={false}
          />



          {/* Match Selector Modal */}
          {showMatchSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Reference a Match</h3>
                    <button 
                      onClick={() => setShowMatchSelector(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {liveScores.map((match) => (
                      <button
                        key={match.id}
                        onClick={() => handleSelectMatch(match)}
                        className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {match.team1.name} vs {match.team2.name}
                              </p>
                              <p className="text-xs text-gray-500">{match.tournament}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{match.status}</p>
                            <p className="text-xs text-gray-500">{match.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

                                                           
        </div>

                 {/* Threads-style Thread View Modal */}
         {showThreadView && selectedThread && (
           <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
             <div className="h-full flex flex-col bg-white max-w-2xl mx-auto">
               {/* Header */}
               <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
                 <div className="flex items-center space-x-4">
                   <button 
                     onClick={handleCloseThread}
                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                   >
                     <FaArrowLeft className="text-gray-700" />
                   </button>
                   <h3 className="text-lg font-semibold text-gray-900">Thread</h3>
                 </div>
               </div>
               
               {/* Content */}
               <div className="flex-1 overflow-y-auto">
                 {/* Original Thread */}
                 <div className="p-4 border-b border-gray-200 text-left">
                   <div className="flex space-x-3">
                     <div className="flex-shrink-0">
                       <button
                         onClick={() => {
                           const userId = selectedThread.user.handle.replace('@', '');
                           navigate(`/profile/${userId}`);
                         }}
                         className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                       >
                         <span className="text-white font-bold">{selectedThread.user.avatar}</span>
                       </button>
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center space-x-1 mb-1">
                         <button
                           onClick={() => {
                             const userId = selectedThread.user.handle.replace('@', '');
                             navigate(`/profile/${userId}`);
                           }}
                           className="flex items-center space-x-1 hover:underline"
                         >
                           <h3 className="font-semibold text-gray-900 hover:text-blue-600">{selectedThread.user.name}</h3>
                           {selectedThread.user.verified && (
                             <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                               <span className="text-white text-xs">✓</span>
                             </div>
                           )}
                         </button>
                       </div>
                       <p className="text-gray-500 mb-3">{selectedThread.user.handle} • {selectedThread.timestamp}</p>
                       <p className="text-gray-900 text-lg leading-6 mb-4 text-left">{selectedThread.content}</p>
                       
                       {selectedThread.media && (
                         <div className="mb-4">
                           {selectedThread.type === 'image' ? (
                             <img 
                               src={selectedThread.media} 
                               alt="Thread media" 
                               className="w-full rounded-2xl border border-gray-200"
                             />
                           ) : selectedThread.type === 'video' ? (
                             <div className="relative w-full h-64 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
                               <img 
                                 src={selectedThread.media} 
                                 alt="Video thumbnail" 
                                 className="w-full h-full object-cover"
                               />
                               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                   <FaPlay className="text-gray-800 text-xl ml-1" />
                                 </div>
                               </div>
                             </div>
                           ) : null}
                         </div>
                       )}
                       
                       <div className="flex items-center space-x-6 py-3 border-y border-gray-100 text-gray-500">
                         <span className="text-sm">{selectedThread.likes} likes</span>
                         <span className="text-sm">{selectedThread.replyCount} replies</span>
                         <span className="text-sm">{selectedThread.reposts} reposts</span>
                       </div>
                       
                       {/* Thread Actions */}
                       <div className="flex items-center justify-around py-3">
                         <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 group">
                           <div className="p-3 rounded-full group-hover:bg-red-50 transition-colors">
                             <FaHeart className="text-lg" />
                           </div>
                         </button>
                         <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
                           <div className="p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                             <FaComment className="text-lg" />
                           </div>
                         </button>
                         <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group">
                           <div className="p-3 rounded-full group-hover:bg-green-50 transition-colors">
                             <FaShare className="text-lg" />
                           </div>
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Replies - X.com/Reddit Style */}
                 <div>
                   {selectedThread.replies.map((reply, index) => (
                     <div key={reply.id} className={`border-b border-gray-100 ${index === selectedThread.replies.length - 1 ? 'border-b-0' : ''}`}>
                       <div className="px-4 py-3">
                         <div className="flex">
                           <div className="flex-shrink-0 mr-3">
                             <button
                               onClick={() => {
                                 const userId = reply.user.handle.replace('@', '');
                                 navigate(`/profile/${userId}`);
                               }}
                               className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                             >
                               <span className="text-white font-bold">{reply.user.avatar}</span>
                             </button>
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center space-x-1 mb-1">
                               <button
                                 onClick={() => {
                                   const userId = reply.user.handle.replace('@', '');
                                   navigate(`/profile/${userId}`);
                                 }}
                                 className="flex items-center space-x-1 hover:underline"
                               >
                                 <h4 className="font-bold text-gray-900 text-base hover:text-blue-600">{reply.user.name}</h4>
                                 {reply.user.verified && (
                                   <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                     <span className="text-white text-xs">✓</span>
                                   </div>
                                 )}
                                 <span className="text-gray-500 text-sm">{reply.user.handle}</span>
                               </button>
                               <span className="text-gray-400 text-sm">·</span>
                               <span className="text-gray-500 text-sm">{reply.timestamp}</span>
                             </div>
                             <p className="text-gray-900 text-base leading-6 mb-3 text-left">{reply.content}</p>
                             <div className="flex items-center justify-between mt-4">
                               <div className="flex items-center space-x-8">
                                 <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
                                   <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                     <FaComment className="text-lg" />
                                   </div>
                                   <span className="text-sm">{reply.replies}</span>
                                 </button>
                                 
                                 <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group">
                                   <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                                     <FaShare className="text-lg" />
                                   </div>
                                 </button>
                                 
                                 <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 group">
                                   <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                                     <FaHeart className="text-lg" />
                                   </div>
                                   <span className="text-sm">{reply.likes}</span>
                                 </button>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               
               {/* Reply Input */}
               <div className="border-t border-gray-200 p-4 bg-white">
                 <div className="flex space-x-3">
                   <div className="flex-shrink-0">
                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                       <FaUser className="text-white text-sm" />
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="mb-2 text-left">
                       <p className="font-semibold text-gray-900 text-sm">You</p>
                       <p className="text-xs text-gray-500">@yourusername</p>
                     </div>
                     <textarea
                       value={replyContent}
                       onChange={(e) => setReplyContent(e.target.value)}
                       placeholder="Reply to this thread... Use @ to reference matches"
                       className="w-full text-gray-900 placeholder-gray-400 border-none outline-none resize-none text-sm leading-5"
                       rows="3"
                     />
                     <div className="flex justify-between items-center mt-3">
                       <div className="flex space-x-3">
                         <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                           <FaImage className="text-sm" />
                         </button>
                         <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                           <FaCamera className="text-sm" />
                         </button>
                         <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                           <FaGamepad className="text-sm" />
                         </button>
                       </div>
                       <button 
                         onClick={handleReply}
                         disabled={!replyContent.trim()}
                         className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                           replyContent.trim() 
                             ? 'bg-black text-white hover:bg-gray-800' 
                             : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                         }`}
                       >
                         Reply
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}

       {/* Floating Action Button with Create Options */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Create Options Menu */}
        {showCreateOptions && (
          <div className="absolute bottom-16 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-48">
            <div className="py-2">
              <button
                onClick={handleCreateTournament}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaTrophy className="text-purple-600 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Create Tournament</p>
                  <p className="text-xs text-gray-500">Organize a new tournament</p>
                </div>
              </button>
              
              <button
                onClick={handleCreateMatch}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaGamepad className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Create Match</p>
                  <p className="text-xs text-gray-500">Start a new match</p>
                </div>
              </button>
              
              <button
                onClick={handleJoinTournament}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Join Tournament</p>
                  <p className="text-xs text-gray-500">Participate in tournaments</p>
                </div>
              </button>
              
              <button
                onClick={handleJoinMatch}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaPlay className="text-orange-600 text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Join Match</p>
                  <p className="text-xs text-gray-500">Join existing matches</p>
                </div>
              </button>
            </div>
          </div>
        )}
        
        {/* Main FAB Button */}
        <button 
          onClick={() => setShowCreateOptions(!showCreateOptions)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <FaPlus className={`text-white text-xl transition-transform duration-200 ${showCreateOptions ? 'rotate-45' : ''}`} />
        </button>
      </div>
      
      {/* Backdrop to close menu when clicking outside */}
      {showCreateOptions && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowCreateOptions(false)}
        />
      )}
    </div>
  );
};

export default Home;