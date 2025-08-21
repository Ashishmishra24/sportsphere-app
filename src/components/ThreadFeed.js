import React, { useState } from 'react';
import { FaHeart, FaComment, FaRetweet, FaShare, FaEllipsisV, FaGlobe, FaLock, FaUsers, FaClock } from 'react-icons/fa';
import { GiCricketBat, GiTennisRacket } from 'react-icons/gi';
import { MdSportsBasketball, MdSportsFootball } from 'react-icons/md';
import toast from 'react-hot-toast';

const ThreadFeed = ({ threads = [], onLike, onReply, onRepost, showHeader = true }) => {
  const [expandedThreads, setExpandedThreads] = useState(new Set());
  const [showReplies, setShowReplies] = useState(new Set());

  const getSportIcon = (sport) => {
    const icons = {
      cricket: GiCricketBat,
      tennis: GiTennisRacket,
      basketball: MdSportsBasketball,
      football: MdSportsFootball
    };
    return icons[sport] || GiCricketBat;
  };

  const getPrivacyIcon = (privacy) => {
    const icons = {
      public: FaGlobe,
      followers: FaUsers,
      private: FaLock
    };
    return icons[privacy] || FaGlobe;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return postTime.toLocaleDateString();
  };

  const handleLike = async (threadId) => {
    try {
      await onLike(threadId);
    } catch (error) {
      toast.error('Failed to like thread');
    }
  };

  const handleRepost = async (threadId) => {
    try {
      await onRepost(threadId);
      toast.success('Thread reposted!');
    } catch (error) {
      toast.error('Failed to repost thread');
    }
  };

  const toggleExpanded = (threadId) => {
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(threadId)) {
      newExpanded.delete(threadId);
    } else {
      newExpanded.add(threadId);
    }
    setExpandedThreads(newExpanded);
  };

  const toggleReplies = (threadId) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(threadId)) {
      newShowReplies.delete(threadId);
    } else {
      newShowReplies.add(threadId);
    }
    setShowReplies(newShowReplies);
  };

  if (!threads || threads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <GiCricketBat className="text-4xl mx-auto mb-2" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No threads yet</h3>
        <p className="text-gray-500">Follow some sports enthusiasts to see their threads here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Latest Threads</h2>
          <p className="text-sm text-gray-500">From people you follow</p>
        </div>
      )}

      {threads.map((thread) => {
        const isExpanded = expandedThreads.has(thread.id);
        const showThreadReplies = showReplies.has(thread.id);
        const PrivacyIcon = getPrivacyIcon(thread.privacy);
        const SportIcon = thread.sport ? getSportIcon(thread.sport) : null;
        
        return (
          <div key={thread.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            {/* Thread Header */}
            <div className="p-4 pb-2">
              <div className="flex items-start space-x-3">
                {/* Author Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {thread.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>

                {/* Thread Content */}
                <div className="flex-1 min-w-0">
                  {/* Author Info */}
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{thread.author.name}</h3>
                    <span className="text-gray-500 text-sm truncate">{thread.author.handle}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm flex items-center space-x-1">
                      <FaClock className="text-xs" />
                      <span>{formatTimestamp(thread.timestamp)}</span>
                    </span>
                    <PrivacyIcon className="text-gray-400 text-xs" />
                    {SportIcon && <SportIcon className="text-gray-400 text-sm" />}
                  </div>

                  {/* Thread Content */}
                  <div className="text-gray-900 leading-relaxed">
                    {thread.content.length > 200 && !isExpanded ? (
                      <>
                        {thread.content.substring(0, 200)}...
                        <button
                          onClick={() => toggleExpanded(thread.id)}
                          className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                        >
                          Show more
                        </button>
                      </>
                    ) : (
                      <>
                        {thread.content}
                        {thread.content.length > 200 && (
                          <button
                            onClick={() => toggleExpanded(thread.id)}
                            className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                          >
                            Show less
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Thread Media/Attachments */}
                  {thread.media && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={thread.media.url}
                        alt={thread.media.alt}
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Match Reference */}
                  {thread.matchReference && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <SportIcon className="text-blue-600" />
                        <span className="font-medium text-gray-900">{thread.matchReference.tournament}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {thread.matchReference.team1} vs {thread.matchReference.team2}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {thread.matchReference.status} • {thread.matchReference.venue}
                      </div>
                    </div>
                  )}
                </div>

                {/* Thread Actions Menu */}
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <FaEllipsisV className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thread Actions */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(thread.id)}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      thread.isLiked
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <FaHeart className={thread.isLiked ? 'fill-current' : ''} />
                    <span>{thread.likes}</span>
                  </button>

                  {/* Reply */}
                  <button
                    onClick={() => toggleReplies(thread.id)}
                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FaComment />
                    <span>{thread.replies}</span>
                  </button>

                  {/* Repost */}
                  <button
                    onClick={() => handleRepost(thread.id)}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      thread.isReposted
                        ? 'text-green-500 hover:text-green-600'
                        : 'text-gray-500 hover:text-green-500'
                    }`}
                  >
                    <FaRetweet />
                    <span>{thread.reposts}</span>
                  </button>

                  {/* Share */}
                  <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                    <FaShare />
                  </button>
                </div>

                {/* Thread Stats */}
                <div className="text-xs text-gray-400">
                  {thread.views && `${thread.views} views`}
                </div>
              </div>
            </div>

            {/* Replies Section */}
            {showThreadReplies && thread.replies > 0 && (
              <div className="border-t border-gray-100 bg-gray-50">
                <div className="p-4">
                  <div className="space-y-3">
                    {/* Mock replies - in real app, these would come from API */}
                    {Array.from({ length: Math.min(thread.replies, 3) }).map((_, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">U</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className="font-medium">User {index + 1}</span>
                            <span className="text-gray-500 ml-2">Great thread! 🏏</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">2h</div>
                        </div>
                      </div>
                    ))}
                    {thread.replies > 3 && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View {thread.replies - 3} more replies
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ThreadFeed;
