import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaTrophy, 
  FaQrcode, 
  FaTimes,
  FaUsers,
  FaCalendarAlt
} from 'react-icons/fa';

const CreateJoinModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    onClose();
    navigate('/create-tournament');
  };

  const handleJoin = () => {
    onClose();
    navigate('/qr-scanner');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Create or Join</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="text-gray-600 text-sm" />
            </button>
          </div>

          {/* Options */}
          <div className="p-6 space-y-4">
            {/* Create Option */}
            <button
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl flex items-center space-x-4 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaPlus className="text-xl" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Create</h3>
                <p className="text-blue-100 text-sm">Start a new tournament or match</p>
              </div>
            </button>

            {/* Join Option */}
            <button
              onClick={handleJoin}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl flex items-center space-x-4 hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaQrcode className="text-xl" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Join</h3>
                <p className="text-green-100 text-sm">Scan QR code or enter key</p>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FaUsers className="text-gray-400" />
                <span>Connect with other players</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJoinModal;
