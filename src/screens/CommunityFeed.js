import React, { useState } from 'react';
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaEllipsisV, 
  FaImage,
  FaVideo,
  FaCamera,
  FaUser,
  FaPlay,
  FaArrowLeft,
  FaFutbol,
  FaTrophy,
  FaStar,
  FaGamepad
} from 'react-icons/fa';
import { GiTennisRacket, GiCricketBat, GiShuttlecock } from 'react-icons/gi';
import { MdSportsBasketball } from 'react-icons/md';
import toast from 'react-hot-toast';

const CommunityFeed = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', type: 'text', media: null });
  const [selectedThread, setSelectedThread] = useState(null);
  const [showThreadView, setShowThreadView] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // Sport selection data
  const sports = [
    { id: 'all', name: 'All', icon: FaTrophy, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'cricket', name: 'Cricket', icon: GiCricketBat, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'football', name: 'Football', icon: FaFutbol, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'tennis', name: 'Tennis', icon: GiTennisRacket, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: 'basketball', name: 'Basketball', icon: MdSportsBasketball, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 'badminton', name: 'Badminton', icon: GiShuttlecock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
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
      threadId: null,
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

  const getSportIcon = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.icon : FaTrophy;
  };

  const getSportColor = (sport) => {
    const sportData = sports.find(s => s.id === sport);
    return sportData ? sportData.color : 'text-gray-600';
  };

  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      toast.success('Post created successfully!');
      setNewPost({ content: '', type: 'text', media: null });
      setShowCreatePost(false);
    } else {
      toast.error('Please enter some content');
    }
  };

  const handleAddMedia = (type) => {
    toast.success(`${type} upload feature coming soon!`);
  };

  const handleAddMatchReference = () => {
    toast.success('Match reference feature coming soon!');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Community</h1>
                <p className="text-xs text-gray-500">Threads & Discussions</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              New Thread
            </button>
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
      </div>

      {/* Threads/X.com Style Community Section */}
      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Threads</h2>
        </div>

        {/* Threads-style Create Thread Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setShowCreatePost(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <span className="text-gray-500 text-lg">✕</span>
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">New Thread</h3>
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
              
              <div className="p-4">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 text-left">
                      <p className="font-semibold text-gray-900">You</p>
                      <p className="text-sm text-gray-500">@yourusername</p>
                    </div>
                    
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Start a thread... Use @ to reference matches"
                      className="w-full text-gray-900 placeholder-gray-400 border-none outline-none resize-none text-lg leading-6"
                      rows="5"
                      autoFocus
                    />
                    
                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleAddMedia('image')}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaImage className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleAddMedia('video')}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaVideo className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleAddMedia('camera')}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaCamera className="text-lg" />
                      </button>
                      <button 
                        onClick={() => handleAddMatchReference()}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaGamepad className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Threads Feed */}
        <div className="space-y-0 border border-gray-200 rounded-2xl overflow-hidden bg-white">
          {communityThreads
            .filter(thread => selectedSport === 'all' || thread.sport === selectedSport)
            .map((thread, index) => {
            const SportIcon = getSportIcon(thread.sport);
            const sportColor = getSportColor(thread.sport);
            const isLast = index === communityThreads.filter(t => selectedSport === 'all' || t.sport === selectedSport).length - 1;
            
            return (
              <div key={thread.id} className={`border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${!isLast ? 'border-b' : ''}`} onClick={() => handleOpenThread(thread)}>
                <div className="p-4">
                  <div className="flex space-x-3">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{thread.user.avatar}</span>
                      </div>
                    </div>
                    
                    {/* Thread Content */}
                    <div className="flex-1 min-w-0">
                      {/* User Info */}
                      <div className="flex items-center space-x-1 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{thread.user.name}</h3>
                        {thread.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        <span className="text-gray-500 text-sm">{thread.user.handle}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{thread.timestamp}</span>
                      </div>
                      
                      {/* Match Context */}
                      <div className="flex items-center space-x-2 mb-2">
                        <SportIcon className={`${sportColor} text-sm`} />
                        <span className="text-gray-600 text-sm font-medium">{thread.match}</span>
                      </div>
                      
                      {/* Thread Text */}
                      <p className="text-gray-900 text-sm leading-5 mb-3">{thread.content}</p>
                      
                      {/* Media */}
                      {thread.media && (
                        <div className="mb-3">
                          {thread.type === 'image' ? (
                            <img 
                              src={thread.media} 
                              alt="Thread media" 
                              className="w-full rounded-xl border border-gray-200"
                            />
                          ) : thread.type === 'video' ? (
                            <div className="relative w-full h-48 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                              <img 
                                src={thread.media} 
                                alt="Video thumbnail" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                  <FaPlay className="text-gray-800 text-lg ml-1" />
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                      
                      {/* Thread Actions */}
                      <div className="flex items-center space-x-6 mt-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleLikeThread(thread.id); }}
                          className={`flex items-center space-x-2 group ${
                            thread.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <div className={`p-2 rounded-full transition-colors ${
                            thread.isLiked ? 'bg-red-50' : 'group-hover:bg-red-50'
                          }`}>
                            <FaHeart className={`text-sm ${thread.isLiked ? 'fill-current' : ''}`} />
                          </div>
                          <span className="text-sm">{thread.likes}</span>
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenThread(thread); }}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group"
                        >
                          <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <FaComment className="text-sm" />
                          </div>
                          <span className="text-sm">{thread.replyCount}</span>
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRepost(thread.id); }}
                          className={`flex items-center space-x-2 group ${
                            thread.isReposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
                          }`}
                        >
                          <div className={`p-2 rounded-full transition-colors ${
                            thread.isReposted ? 'bg-green-50' : 'group-hover:bg-green-50'
                          }`}>
                            <FaShare className="text-sm" />
                          </div>
                          <span className="text-sm">{thread.reposts}</span>
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <FaEllipsisV className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State for Community */}
        {communityThreads.filter(thread => selectedSport === 'all' || thread.sport === selectedSport).length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedSport === 'all' ? 'No Community Threads' : `No ${sports.find(s => s.id === selectedSport)?.name} Community Threads`}
            </h3>
            <p className="text-gray-500">Be the first to start a thread!</p>
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
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{selectedThread.user.avatar}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <h3 className="font-semibold text-gray-900">{selectedThread.user.name}</h3>
                      {selectedThread.user.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
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
              
              {/* Replies */}
              <div>
                {selectedThread.replies.map((reply, index) => (
                  <div key={reply.id} className={`p-4 ${index !== selectedThread.replies.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{reply.user.avatar}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{reply.user.name}</h4>
                          {reply.user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          <span className="text-gray-500 text-sm">{reply.user.handle}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{reply.timestamp}</span>
                        </div>
                        <p className="text-gray-900 text-sm leading-5 mb-3">{reply.content}</p>
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 group">
                            <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                              <FaHeart className="text-xs" />
                            </div>
                            <span className="text-xs">{reply.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 group">
                            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                              <FaComment className="text-xs" />
                            </div>
                            <span className="text-xs">{reply.replies}</span>
                          </button>
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
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Reply to this thread..."
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
    </div>
  );
};

export default CommunityFeed;
