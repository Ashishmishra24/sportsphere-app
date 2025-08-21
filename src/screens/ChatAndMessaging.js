import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane, FaEllipsisV, FaCircle } from 'react-icons/fa';
import { handleError } from '../utils/errorHandler';

const ChatAndMessaging = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setChats([
        {
          id: 1,
          name: 'Team Mumbai',
          lastMessage: 'Great game today!',
          timestamp: '2 min ago',
          unread: 3,
          online: true,
          avatar: 'https://via.placeholder.com/40'
        },
        {
          id: 2,
          name: 'Cricket Club',
          lastMessage: 'Next match on Saturday',
          timestamp: '1 hour ago',
          unread: 0,
          online: false,
          avatar: 'https://via.placeholder.com/40'
        },
        {
          id: 3,
          name: 'John Smith',
          lastMessage: 'Are you free for a game?',
          timestamp: '3 hours ago',
          unread: 1,
          online: true,
          avatar: 'https://via.placeholder.com/40'
        }
      ]);
    } catch (error) {
      handleError(error, 'Chat and Messaging');
    } finally {
      setLoading(false);
    }
  };

  const handleChatPress = (chat) => {
    // In a real app, this would navigate to the chat conversation
    console.log('Opening chat with:', chat.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-500">Chat with your team</p>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="px-4 py-6">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleChatPress(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.online && (
                    <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-sm" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{chat.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {chats.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPaperPlane className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages</h3>
            <p className="text-gray-500">Start a conversation with your team!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAndMessaging;
