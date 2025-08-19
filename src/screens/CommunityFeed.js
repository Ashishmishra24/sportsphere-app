import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaEllipsisH, 
  FaPlus,
  FaTrophy,
  FaPlay,
  FaUsers,
  FaFire,
  FaStar
} from 'react-icons/fa';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', image: null });

  useEffect(() => {
    // Mock data - in real app, this would come from Firebase
    setPosts([
      {
        id: 1,
        user: {
          name: 'Sarah Johnson',
          avatar: 'SJ',
          isVerified: true
        },
        content: 'Just won the basketball championship! 🏀🏆 Amazing game with incredible teamwork. Thanks to everyone who supported us!',
        image: null,
        type: 'achievement',
        sport: 'Basketball',
        likes: 24,
        comments: 8,
        shares: 3,
        timestamp: '2 hours ago',
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Mike Chen',
          avatar: 'MC',
          isVerified: false
        },
        content: 'Looking for players for tomorrow\'s soccer match at Central Park. Anyone interested? ⚽',
        image: null,
        type: 'recruitment',
        sport: 'Soccer',
        likes: 12,
        comments: 15,
        shares: 2,
        timestamp: '4 hours ago',
        isLiked: true
      },
      {
        id: 3,
        user: {
          name: 'Emma Davis',
          avatar: 'ED',
          isVerified: true
        },
        content: 'Check out this amazing tennis rally from today\'s match! Perfect form and incredible reflexes.',
        image: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Tennis+Match',
        type: 'highlight',
        sport: 'Tennis',
        likes: 45,
        comments: 12,
        shares: 7,
        timestamp: '6 hours ago',
        isLiked: false
      },
      {
        id: 4,
        user: {
          name: 'Alex Rodriguez',
          avatar: 'AR',
          isVerified: false
        },
        content: 'Tournament registration is now open! Join the Summer Basketball League and compete for the grand prize. DM for details.',
        image: null,
        type: 'tournament',
        sport: 'Basketball',
        likes: 18,
        comments: 6,
        shares: 4,
        timestamp: '1 day ago',
        isLiked: false
      }
    ]);
  }, []);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: Date.now(),
        user: {
          name: 'You',
          avatar: 'U',
          isVerified: false
        },
        content: newPost.content,
        image: newPost.image,
        type: 'post',
        sport: 'General',
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now',
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost({ content: '', image: null });
      setShowCreatePost(false);
    }
  };

  const getPostIcon = (type) => {
    switch (type) {
      case 'achievement': return <FaTrophy className="text-yellow-500" />;
      case 'recruitment': return <FaUsers className="text-blue-500" />;
      case 'highlight': return <FaPlay className="text-green-500" />;
      case 'tournament': return <FaStar className="text-purple-500" />;
      default: return <FaFire className="text-red-500" />;
    }
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Create Post
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          {[
            { key: 'all', label: 'All Posts' },
            { key: 'achievement', label: 'Achievements' },
            { key: 'highlight', label: 'Highlights' },
            { key: 'recruitment', label: 'Recruitment' },
            { key: 'tournament', label: 'Tournaments' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Post</h3>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="px-6 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        {post.user.isVerified && (
                          <span className="text-blue-500">✓</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          {getPostIcon(post.type)}
                          <span className="ml-1">{post.sport}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 mb-3">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full rounded-lg mb-3"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className={post.isLiked ? 'fill-current' : ''} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <FaComment />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                      <FaShare />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-4">
            {activeTab === 'all' 
              ? 'Be the first to share something with the community!'
              : `No ${activeTab} posts found.`
            }
          </p>
          {activeTab === 'all' && (
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Post
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
