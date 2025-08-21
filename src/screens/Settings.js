import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell, FaShieldAlt, FaPalette, FaGlobe, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { mockAuth } from '../utils/mockAuth';
import { showSuccess, handleError } from '../utils/errorHandler';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    privacy: 'Public'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSignOut = async () => {
    try {
      await mockAuth.signOut();
      showSuccess('Signed out successfully');
      navigate('/');
    } catch (error) {
      handleError(error, 'Settings - Sign Out');
    }
  };

  const settingItems = [
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Push notifications for matches and updates',
      icon: FaBell,
      type: 'toggle',
      value: settings.notifications
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      subtitle: 'Switch to dark theme',
      icon: FaPalette,
      type: 'toggle',
      value: settings.darkMode
    },
    {
      id: 'language',
      title: 'Language',
      subtitle: 'Choose your preferred language',
      icon: FaGlobe,
      type: 'select',
      value: settings.language,
      options: ['English', 'Hindi', 'Spanish', 'French']
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Control your profile visibility',
      icon: FaShieldAlt,
      type: 'select',
      value: settings.privacy,
      options: ['Public', 'Friends Only', 'Private']
    }
  ];

  const actionItems = [
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: FaQuestionCircle,
      action: () => navigate('/support')
    },
    {
      title: 'Sign Out',
      subtitle: 'Sign out of your account',
      icon: FaSignOutAlt,
      action: handleSignOut,
      danger: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Preferences</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {settingItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    <div>
                      {item.type === 'toggle' ? (
                        <button
                          onClick={() => handleSettingChange(item.id, !item.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.value ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      ) : item.type === 'select' ? (
                        <select
                          value={item.value}
                          onChange={(e) => handleSettingChange(item.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {item.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Actions</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {actionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    item.danger ? 'hover:bg-red-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.danger ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={item.danger ? 'text-red-600' : 'text-gray-600'} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${item.danger ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
