import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaVideo, FaCamera, FaPoll, FaGamepad, FaTimes, FaUser } from 'react-icons/fa';

const ThreadPost = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [poll, setPoll] = useState(null);
  const [referencedMatch, setReferencedMatch] = useState(null);
  const [showMatchSelector, setShowMatchSelector] = useState(false);

  const handlePost = () => {
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    const postData = {
      content: content.trim(),
      media,
      poll,
      referencedMatch,
      timestamp: new Date().toISOString()
    };

    onPost(postData);
    
    // Reset form
    setContent('');
    setMedia(null);
    setPoll(null);
    setReferencedMatch(null);
  };

  const handleAddMedia = (type) => {
    toast.success(`${type} upload feature coming soon!`);
  };

  const handleAddPoll = () => {
    setPoll({
      question: '',
      options: ['', ''],
      duration: '24h'
    });
  };

  const handlePollOptionChange = (index, value) => {
    setPoll(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const handleAddPollOption = () => {
    if (poll.options.length < 6) {
      setPoll(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const handleRemovePollOption = (index) => {
    if (poll.options.length > 2) {
      setPoll(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSelectMatch = (match) => {
    setReferencedMatch(match);
    setShowMatchSelector(false);
  };

  const handleRemoveMatchReference = () => {
    setReferencedMatch(null);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Create Thread</h3>
          <p className="text-sm text-gray-500">Share your thoughts about sports</p>
        </div>
      </div>

      {/* Content Input */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening in sports today?"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />

      {/* Referenced Match */}
      {referencedMatch && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Referencing:</span>
              <span className="text-sm text-gray-900">
                {referencedMatch.team1.name} vs {referencedMatch.team2.name}
              </span>
            </div>
            <button
              onClick={handleRemoveMatchReference}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Poll */}
      {poll && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <input
            type="text"
            value={poll.question}
            onChange={(e) => setPoll(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Ask a question..."
            className="w-full p-2 border border-blue-200 rounded mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="space-y-2">
            {poll.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {poll.options.length > 2 && (
                  <button
                    onClick={() => handleRemovePollOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}
              </div>
            ))}
            {poll.options.length < 6 && (
              <button
                onClick={handleAddPollOption}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Option
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAddMedia('image')}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaImage />
          </button>
          <button
            onClick={() => handleAddMedia('video')}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaVideo />
          </button>
          <button
            onClick={() => handleAddMedia('camera')}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaCamera />
          </button>
          <button
            onClick={handleAddPoll}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaPoll />
          </button>
          <button
            onClick={() => setShowMatchSelector(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaGamepad />
          </button>
        </div>
        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default ThreadPost;
