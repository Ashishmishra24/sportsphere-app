import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfileById } from '../data/userProfiles';
import toast from 'react-hot-toast';
import { 
  FaArrowLeft, FaTrophy, FaChartLine, FaCalendarAlt, FaClock, 
  FaCheck, FaTimes, FaHeart, FaFutbol, FaStar, FaCog,
  FaTimes as FaTimesIcon, FaUser, FaImage, FaVideo, FaCamera, 
  FaPoll, FaGamepad, FaComment, FaShare
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat, GiShuttlecock } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import { navigationService } from '../services/navigationService';
import Breadcrumbs from '../components/Breadcrumbs';
import ThreadPost from '../components/ThreadPost';
import ThreadFeed from '../components/ThreadFeed';
import { getUserThreads, getFollowedUsersThreads, addThread, likeThread, repostThread } from '../data/threadsData';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('stats');
  const [userStats, setUserStats] = useState(null);
  const [userThreads, setUserThreads] = useState([]);
  const [followedThreads, setFollowedThreads] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState(new Set());
  const [replyInputs, setReplyInputs] = useState({});
  const [newPost, setNewPost] = useState({ content: '', type: 'text', media: null, poll: null, referencedMatch: null });
  const [showMatchSelector, setShowMatchSelector] = useState(false);

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: 'basketball', name: 'Basketball', icon: MdSportsBasketball, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 'badminton', name: 'Badminton', icon: GiShuttlecock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  ];

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get user profile from data
      let userProfile = null;
      if (userId) {
        userProfile = getUserProfileById(userId);
      } else {
        // Default to current user (Alex Johnson)
        userProfile = getUserProfileById('alexjohnson');
        setIsCurrentUser(true);
      }
      
      if (!userProfile) {
        throw new Error('User not found');
      }
      
      // Check if this is the current user
      if (userProfile.id === 'alexjohnson') {
        setIsCurrentUser(true);
      }
      
      const stats = {
        user: {
          name: userProfile.name,
          avatar: userProfile.avatar,
          handle: userProfile.handle,
          bio: userProfile.bio,
          location: userProfile.location,
          joinedDate: userProfile.joinedDate,
          verified: userProfile.verified
        },
        overall: userProfile.overall,
        sportsStats: userProfile.sportsStats
      };

      // Get user's own threads and followed users' threads
      const currentUserId = isCurrentUser ? 'current-user' : userProfile.id;
      const threads = getUserThreads(currentUserId);
      const followedUsersThreads = getFollowedUsersThreads();

      const matches = [
        {
          id: 1,
          sport: 'cricket',
          tournament: 'Local League',
          team1: { name: 'Alex Johnson', logo: 'AJ', score: null },
          team2: { name: 'Mike Wilson', logo: 'MW', score: null },
          status: 'upcoming',
          time: 'Tomorrow, 2:00 PM',
          date: 'Tomorrow',
          venue: 'Central Park Cricket Ground'
        },
        {
          id: 2,
          sport: 'cricket',
          tournament: 'Weekend League',
          team1: { name: 'Alex Johnson', logo: 'AJ', score: '156/4' },
          team2: { name: 'David Brown', logo: 'DB', score: '142/8' },
          status: 'finished',
          time: 'FINAL',
          date: 'Yesterday',
          venue: 'Local Cricket Ground',
          result: 'Won',
          highlights: ['89* runs', '3 sixes', 'Man of the Match']
        }
      ];

      setUserStats(stats);
      setUserThreads(threads);
      setFollowedThreads(followedUsersThreads);
      setUserMatches(matches);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
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

  const getSportBgColor = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.bgColor : 'bg-gray-100';
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

  // Post creation functions
  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      toast.success('Post created successfully!');
      setNewPost({ content: '', type: 'text', media: null, poll: null, referencedMatch: null });
    } else {
      toast.error('Please enter some content');
    }
  };

  const handleAddMedia = (type) => {
    toast.success(`${type} upload feature coming soon!`);
  };

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

  // Poll-related functions
  const handleAddPoll = () => {
    setNewPost(prev => ({
      ...prev,
      poll: {
        question: '',
        options: ['', ''],
        duration: '24h'
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
    if (newPost.poll.options.length < 6) {
      setNewPost(prev => ({
        ...prev,
        poll: {
          ...prev.poll,
          options: [...prev.poll.options, '']
        }
      }));
    }
  };

  const handleRemovePollOption = (index) => {
    if (newPost.poll.options.length > 2) {
      setNewPost(prev => ({
        ...prev,
        poll: {
          ...prev.poll,
          options: prev.poll.options.filter((_, i) => i !== index)
        }
      }));
    }
  };

  // Thread handlers
  const handlePostThread = async (threadData) => {
    try {
      const newThread = addThread(threadData);
      setUserThreads(prev => [newThread, ...prev]);
      return newThread;
    } catch (error) {
      console.error('Error posting thread:', error);
      throw error;
    }
  };

  const handleLikeThread = async (threadId) => {
    try {
      const updatedThread = likeThread(threadId);
      setUserThreads(prev => 
        prev.map(thread => 
          thread.id === threadId ? updatedThread : thread
        )
      );
      setFollowedThreads(prev => 
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

  const handleRepostThread = async (threadId) => {
    try {
      const updatedThread = repostThread(threadId);
      setUserThreads(prev => 
        prev.map(thread => 
          thread.id === threadId ? updatedThread : thread
        )
      );
      setFollowedThreads(prev => 
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
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
                <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                <p className="text-sm text-gray-500">Your sports journey</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <FaCog className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{userStats.user.avatar}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{userStats.user.name}</h2>
              {userStats.user.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{userStats.user.handle}</p>
            <p className="text-gray-900 text-sm mb-2 text-left">{userStats.user.bio}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{userStats.user.location}</span>
              <span>•</span>
              <span>Joined {userStats.user.joinedDate}</span>
            </div>
        </div>
      </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{userStats.overall.totalMatches}</div>
            <div className="text-xs text-gray-500">Matches</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.overall.wins}</div>
            <div className="text-xs text-gray-500">Wins</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.overall.winRate}%</div>
            <div className="text-xs text-gray-500">Win Rate</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.overall.tournamentsWon}</div>
            <div className="text-xs text-gray-500">Titles</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Stats
          </button>
          <button
            onClick={() => setActiveTab('threads')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'threads'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaStar className="inline mr-2" />
            Threads
          </button>
          {isCurrentUser && (
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'feed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaHeart className="inline mr-2" />
              Feed
            </button>
          )}
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'matches'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaCalendarAlt className="inline mr-2" />
            Matches
          </button>
        </div>
          </div>

      {/* Tab Content */}
      <div className="px-4 py-6 pb-20">
        {/* Sports Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Overall Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaTrophy className="text-yellow-500 mr-2" />
                Overall Performance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{userStats.overall.totalPoints}</div>
                  <div className="text-sm text-blue-700">Total Points</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{userStats.overall.averageScore}</div>
                  <div className="text-sm text-green-700">Avg Score</div>
                </div>
              </div>
            </div>
            
            {/* Sport-wise Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Sport-wise Statistics</h3>
              {userStats.sportsStats.map((sportStat) => {
                const SportIcon = getSportIcon(sportStat.sport);
                const sportColor = getSportColor(sportStat.sport);
                const sportBgColor = getSportBgColor(sportStat.sport);
                
                return (
                  <div key={sportStat.sport} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${sportBgColor} rounded-xl flex items-center justify-center`}>
                          <SportIcon className={`text-xl ${sportColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">{sportStat.sport}</h4>
                          <p className="text-sm text-gray-500">{sportStat.matches} matches played</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{sportStat.winRate}%</div>
                        <div className="text-sm text-gray-500">Win Rate</div>
                      </div>
            </div>
            
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{sportStat.wins}</div>
                        <div className="text-xs text-gray-500">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{sportStat.highestScore}</div>
                        <div className="text-xs text-gray-500">Best Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{sportStat.tournamentsWon}</div>
                        <div className="text-xs text-gray-500">Titles</div>
            </div>
          </div>

                    {/* Sport-specific Detailed Statistics */}
                    {sportStat.sport === 'cricket' && sportStat.batting && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Cricket Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Batting</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Total Runs:</span>
                                <span className="font-medium">{sportStat.batting.totalRuns}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Centuries:</span>
                                <span className="font-medium">{sportStat.batting.centuries}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Half Centuries:</span>
                                <span className="font-medium">{sportStat.batting.halfCenturies}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Strike Rate:</span>
                                <span className="font-medium">{sportStat.batting.strikeRate}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Bowling</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Wickets:</span>
                                <span className="font-medium">{sportStat.bowling.wickets}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Best Bowling:</span>
                                <span className="font-medium">{sportStat.bowling.bestBowling}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>5-Wicket Hauls:</span>
                                <span className="font-medium">{sportStat.bowling.fiveWicketHauls}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Economy:</span>
                                <span className="font-medium">{sportStat.bowling.economyRate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {sportStat.sport === 'tennis' && sportStat.serving && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Tennis Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Serving</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Aces:</span>
                                <span className="font-medium">{sportStat.serving.aces}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>1st Serve %:</span>
                                <span className="font-medium">{sportStat.serving.firstServePercentage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Service Games Won:</span>
                                <span className="font-medium">{sportStat.serving.serviceGamesWon}%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Rally</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Winners:</span>
                                <span className="font-medium">{sportStat.rally.winners}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Net Points Won:</span>
                                <span className="font-medium">{sportStat.rally.netPointsWon}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Doubles Win Rate:</span>
                                <span className="font-medium">{sportStat.doubles.doublesWinRate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {sportStat.sport === 'football' && sportStat.attacking && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Football Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Attacking</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Goals:</span>
                                <span className="font-medium">{sportStat.attacking.goals}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Assists:</span>
                                <span className="font-medium">{sportStat.attacking.assists}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Conversion Rate:</span>
                                <span className="font-medium">{sportStat.attacking.conversionRate}%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Defending</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Tackles:</span>
                                <span className="font-medium">{sportStat.defending.tackles}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Interceptions:</span>
                                <span className="font-medium">{sportStat.defending.interceptions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duels Won:</span>
                                <span className="font-medium">{sportStat.defending.duelsWon}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {sportStat.sport === 'basketball' && sportStat.scoring && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Basketball Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Scoring</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Points:</span>
                                <span className="font-medium">{sportStat.scoring.points}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>FG %:</span>
                                <span className="font-medium">{sportStat.scoring.fieldGoalPercentage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>3PT %:</span>
                                <span className="font-medium">{sportStat.scoring.threePointPercentage}%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Other</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Rebounds:</span>
                                <span className="font-medium">{sportStat.rebounding.rebounds}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Assists:</span>
                                <span className="font-medium">{sportStat.playmaking.assists}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Steals:</span>
                                <span className="font-medium">{sportStat.defense.steals}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {sportStat.sport === 'badminton' && sportStat.serving && (
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Badminton Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Attacking</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Smashes:</span>
                                <span className="font-medium">{sportStat.attacking.smashes}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Smash Accuracy:</span>
                                <span className="font-medium">{sportStat.attacking.smashAccuracy}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Drops:</span>
                                <span className="font-medium">{sportStat.attacking.drops}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-600 mb-2">Defense</h6>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>Returns:</span>
                                <span className="font-medium">{sportStat.defense.returns}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Net Play:</span>
                                <span className="font-medium">{sportStat.defense.netPlay}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Doubles Win Rate:</span>
                                <span className="font-medium">{sportStat.doubles.doublesWinRate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Achievements</h5>
            <div className="flex flex-wrap gap-2">
                        {sportStat.achievements.map((achievement, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {achievement}
                </span>
              ))}
            </div>
          </div>
        </div>
                );
              })}
            </div>
          </div>
        )}

        {/* User Threads Tab */}
        {activeTab === 'threads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Threads</h3>
              <span className="text-sm text-gray-500">{userThreads.length} threads</span>
            </div>

            {/* Thread Post Component for current user */}
            {isCurrentUser && (
              <ThreadPost onPost={handlePostThread} />
            )}

            {/* Thread Feed Component showing user's threads */}
            <ThreadFeed 
              threads={userThreads} 
              onLike={handleLikeThread}
              onReply={() => {}}
              onRepost={handleRepostThread}
              showHeader={false}
            />

            {/* Old Reddit/Quora Style Post Creation Panel - Replaced by ThreadPost */}
            {false && isCurrentUser && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 text-left">
                        <p className="font-semibold text-gray-900">You</p>
                        <p className="text-sm text-gray-500">@yourusername</p>
                      </div>
                      
                      {/* Match Reference Section */}
                      {newPost.referencedMatch && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">
                                  {newPost.referencedMatch.team1.logo}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {newPost.referencedMatch.team1.name} vs {newPost.referencedMatch.team2.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {newPost.referencedMatch.tournament}
                              </span>
                            </div>
                            <button
                              onClick={handleRemoveMatchReference}
                              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <FaTimesIcon className="text-sm" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <textarea
                        value={newPost.content}
                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        placeholder="What's on your mind? Share your thoughts, questions, or sports insights... Use @ to reference matches"
                        className="w-full text-gray-900 placeholder-gray-400 border-none outline-none resize-none text-base leading-6"
                        rows="3"
                      />
                      
                      {/* Poll Creation UI */}
                      {newPost.poll && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="text"
                            value={newPost.poll.question}
                            onChange={(e) => setNewPost(prev => ({
                              ...prev,
                              poll: { ...prev.poll, question: e.target.value }
                            }))}
                            placeholder="Ask a question..."
                            className="w-full text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent text-sm font-medium mb-2"
                          />
                          <div className="space-y-2">
                            {newPost.poll.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                  className="flex-1 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                                />
                                {newPost.poll.options.length > 2 && (
                                  <button
                                    onClick={() => handleRemovePollOption(index)}
                                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                  >
                                    <FaTimesIcon className="text-xs" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {newPost.poll.options.length < 6 && (
                              <button
                                onClick={handleAddPollOption}
                                className="text-blue-600 text-sm font-medium hover:text-blue-700"
                              >
                                + Add option
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => handleAddMedia('image')}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Add Image"
                          >
                            <FaImage className="text-lg" />
                          </button>
                          <button 
                            onClick={() => handleAddMedia('video')}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Add Video"
                          >
                            <FaVideo className="text-lg" />
                          </button>
                          <button 
                            onClick={() => handleAddMedia('camera')}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Take Photo"
                          >
                            <FaCamera className="text-lg" />
                          </button>
                          <button 
                            onClick={handleAddPoll}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Add Poll"
                          >
                            <FaPoll className="text-lg" />
                          </button>
                          <button
                            onClick={() => setShowMatchSelector(true)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="Reference Match"
                          >
                            <FaGamepad className="text-lg" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-400">
                            {newPost.content.length}/280
                          </span>
                          <button 
                            onClick={handleCreatePost}
                            disabled={!newPost.content.trim()}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                              newPost.content.trim() 
                                ? 'bg-black text-white hover:bg-gray-800' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-0 bg-white">
              {userThreads.map((thread) => {
                const SportIcon = getSportIcon(thread.sport);
                const sportColor = getSportColor(thread.sport);
                
                return (
                  <div key={thread.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <div className="px-4 py-3">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{userStats.user.avatar}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1">
                            <h4 className="font-bold text-gray-900 text-base">{userStats.user.name}</h4>
                            <span className="text-gray-400 text-sm">·</span>
                            <span className="text-gray-500 text-sm">{thread.timestamp}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <SportIcon className={`${sportColor} text-sm`} />
                            <span className="text-gray-600 text-sm font-medium">{thread.match}</span>
                          </div>
                          
                          <p className="text-gray-900 text-base leading-6 mb-3 text-left">{thread.content}</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-8">
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleToggleThreadExpansion(thread.id); 
                                }}
                                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group"
                              >
                                <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                  <FaComment className="text-lg" />
                                </div>
                                <span className="text-sm">{thread.replyCount}</span>
                              </button>
                              
                              <div className="flex items-center space-x-2 text-gray-500">
                                <div className="p-2 rounded-full">
                                  <FaShare className="text-lg" />
                                </div>
                                <span className="text-sm">{thread.reposts}</span>
      </div>

                              <div className={`flex items-center space-x-2 ${thread.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                                <div className={`p-2 rounded-full ${thread.isLiked ? 'bg-red-50' : ''}`}>
                                  <FaHeart className={`text-lg ${thread.isLiked ? 'fill-current' : ''}`} />
                                </div>
                                <span className="text-sm">{thread.likes}</span>
                              </div>
                </div>
              </div>
          </div>
        </div>
      </div>

                    {/* Inline Replies Section */}
                    {expandedThreads.has(thread.id) && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        {/* Reply Input */}
                        <div className="px-4 py-3">
          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <FaUser className="text-white text-xs" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="mb-2 text-left">
                                <p className="font-semibold text-gray-900 text-sm">You</p>
                                <p className="text-xs text-gray-500">@yourusername</p>
                              </div>
                              <textarea
                                value={replyInputs[thread.id] || ''}
                                onChange={(e) => setReplyInputs(prev => ({ ...prev, [thread.id]: e.target.value }))}
                                placeholder="Reply to this thread... Use @ to reference matches"
                                className="w-full text-gray-900 placeholder-gray-400 border-none outline-none resize-none text-sm leading-5 bg-transparent"
                                rows="2"
                              />
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                  <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <FaImage className="text-xs" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <FaCamera className="text-xs" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <FaGamepad className="text-xs" />
                                  </button>
                                </div>
            <button
                                  onClick={() => handleReplyToThread(thread.id)}
                                  disabled={!replyInputs[thread.id]?.trim()}
                                  className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                                    replyInputs[thread.id]?.trim() 
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
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

        {/* User Feed Tab */}
        {activeTab === 'feed' && isCurrentUser && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Feed</h3>
              <span className="text-sm text-gray-500">From people you follow</span>
            </div>

            {/* Thread Feed Component showing followed users' threads */}
            <ThreadFeed 
              threads={followedThreads} 
              onLike={handleLikeThread}
              onReply={() => {}}
              onRepost={handleRepostThread}
              showHeader={false}
            />
          </div>
        )}

        {/* User Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Matches</h3>
              <span className="text-sm text-gray-500">{userMatches.length} matches</span>
            </div>
            
            <div className="space-y-4">
              {userMatches.map((match) => {
                const SportIcon = getSportIcon(match.sport);
                const sportColor = getSportColor(match.sport);
                
                return (
                  <div key={match.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <SportIcon className={`${sportColor} text-lg`} />
                        <button
                          onClick={() => {
                            const context = {
                              source: 'profile',
                              userId: userId
                            };
                            navigationService.navigateToTournament(navigate, match.tournamentId, 'profile');
                          }}
                          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
                        >
                          {match.tournament}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {match.status === 'upcoming' ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center">
                            <FaClock className="mr-1" />
                            {match.time}
                          </span>
                        ) : (
                          <span className={`px-2 py-1 text-xs rounded-full flex items-center ${
                            match.result === 'Won' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {match.result === 'Won' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                            {match.result}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                        </div>
                        <span className="font-medium text-gray-900">{match.team1.name}</span>
                        {match.team1.score && (
                          <span className="text-lg font-bold text-gray-900">{match.team1.score}</span>
                        )}
                      </div>
                      
                      <div className="text-gray-400 text-sm font-medium">vs</div>
                      
                      <div className="flex items-center space-x-3">
                        {match.team2.score && (
                          <span className="text-lg font-bold text-gray-900">{match.team2.score}</span>
                        )}
                        <span className="font-medium text-gray-900">{match.team2.name}</span>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">{match.team2.logo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{match.venue}</span>
                      <span>{match.date}</span>
                    </div>
                    
                    {match.highlights && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {match.highlights.map((highlight, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                    <FaTimesIcon className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {userMatches.map((match) => (
                    <button
                      key={match.id}
                      onClick={() => handleSelectMatch(match)}
                      className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{match.team1.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {match.team1.name} vs {match.team2.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{match.tournament}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
