import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTrophy, FaUsers, FaVideo, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Track Your Matches",
      description: "Create and manage matches with real-time scoring and statistics. Keep track of your performance and progress.",
      icon: FaPlay,
      color: "from-blue-500 to-blue-600",
      image: "🏆"
    },
    {
      title: "Organize Tournaments",
      description: "Set up tournaments with brackets, schedules, and participant management. Everything you need to run successful events.",
      icon: FaTrophy,
      color: "from-purple-500 to-purple-600",
      image: "🎯"
    },
    {
      title: "Watch Live Streams",
      description: "Stream your matches live or watch others. Share your sports moments with the community in real-time.",
      icon: FaVideo,
      color: "from-red-500 to-red-600",
      image: "📺"
    },
    {
      title: "Connect Socially",
      description: "Build your sports network. Add friends, rivals, and join communities. Share highlights and celebrate together.",
      icon: FaUsers,
      color: "from-green-500 to-green-600",
      image: "🤝"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Link to="/signup" className="text-sm text-blue-600 hover:underline">
            Skip
          </Link>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Step Content */}
        <div className="text-center max-w-md">
          {/* Icon/Image */}
          <div className={`w-32 h-32 bg-gradient-to-br ${currentStepData.color} rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg`}>
            <span className="text-6xl">{currentStepData.image}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentStepData.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          {/* Feature List */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">What you can do:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              {currentStep === 0 && (
                <>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Create matches with custom rules
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Track real-time scores and stats
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    View match history and analytics
                  </li>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Set up single or double elimination
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Manage participant registration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Generate automatic brackets
                  </li>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Stream matches live to followers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Watch live matches from others
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Record and share highlights
                  </li>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Add friends and rivals
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Join sports communities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Share achievements and moments
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white px-6 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <Link
              to="/signup"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
              <FaArrowRight className="ml-2" />
            </Link>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
