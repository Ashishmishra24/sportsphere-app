import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { 
  FaArrowLeft, 
  FaQrcode, 
  FaKey, 
  FaCamera, 
  FaTimes,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import { handleError, showSuccess } from '../utils/errorHandler';

const QRCodeScanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [tournamentKey, setTournamentKey] = useState('');
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, []);

  const startScanner = () => {
    setScanning(true);
    setManualEntry(false);
    setScannedData(null);

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    scanner.render((decodedText, decodedResult) => {
      handleQRCodeSuccess(decodedText);
      scanner.clear();
    }, (error) => {
      // Handle scan error silently
    });

    html5QrcodeScannerRef.current = scanner;
  };

  const stopScanner = () => {
    setScanning(false);
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
  };

  const handleQRCodeSuccess = (decodedText) => {
    setScannedData(decodedText);
    setScanning(false);
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
    }
  };

  const handleManualEntry = () => {
    setManualEntry(true);
    setScanning(false);
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
    }
  };

  const handleJoinTournament = async () => {
    const key = manualEntry ? tournamentKey : scannedData;
    
    if (!key || key.trim() === '') {
      handleError(new Error('Please enter a valid tournament key'), 'QR Code Scanner');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call to join tournament
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - in real app, this would validate with backend
      if (key.length < 6) {
        throw new Error('Invalid tournament key format');
      }

      showSuccess('Successfully joined tournament!');
      navigate('/matches'); // Navigate to matches to see the joined tournament
    } catch (error) {
      handleError(error, 'QR Code Scanner');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScanning(false);
    setManualEntry(false);
    setScannedData(null);
    setTournamentKey('');
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">Join Tournament</h1>
                <p className="text-sm text-gray-500">Scan QR code or enter key manually</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Action Buttons */}
        {!scanning && !manualEntry && !scannedData && (
          <div className="space-y-4 mb-6">
            <button
              onClick={startScanner}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-blue-700 transition-colors"
            >
              <FaCamera className="text-xl" />
              <span className="text-lg font-medium">Scan QR Code</span>
            </button>
            
            <button
              onClick={handleManualEntry}
              className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-200 transition-colors"
            >
              <FaKey className="text-xl" />
              <span className="text-lg font-medium">Enter Key Manually</span>
            </button>
          </div>
        )}

        {/* QR Code Scanner */}
        {scanning && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FaQrcode className="text-blue-600" />
                  <span>Scan QR Code</span>
                </h3>
                <button
                  onClick={stopScanner}
                  className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <FaTimes className="text-red-600 text-sm" />
                </button>
              </div>
              <div id="qr-reader" className="w-full"></div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Position the QR code within the frame to scan
              </p>
            </div>
          </div>
        )}

        {/* Manual Entry */}
        {manualEntry && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FaKey className="text-blue-600" />
                  <span>Enter Tournament Key</span>
                </h3>
                <button
                  onClick={resetScanner}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <FaTimes className="text-gray-600 text-sm" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tournament/Match Key
                  </label>
                  <input
                    type="text"
                    value={tournamentKey}
                    onChange={(e) => setTournamentKey(e.target.value)}
                    placeholder="Enter the tournament or match key"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={20}
                  />
                </div>
                
                <button
                  onClick={handleJoinTournament}
                  disabled={!tournamentKey.trim() || loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck className="text-sm" />
                      <span>Join Tournament</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scanned Result */}
        {scannedData && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FaQrcode className="text-green-600" />
                  <span>QR Code Scanned</span>
                </h3>
                <button
                  onClick={resetScanner}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <FaTimes className="text-gray-600 text-sm" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Scanned Data:</p>
                  <p className="text-lg font-mono text-gray-900 break-all">{scannedData}</p>
                </div>
                
                <button
                  onClick={handleJoinTournament}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck className="text-sm" />
                      <span>Join Tournament</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">How to join a tournament</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ask the tournament organizer for the QR code or key</li>
                <li>• Scan the QR code using your camera</li>
                <li>• Or enter the tournament key manually</li>
                <li>• You'll be automatically added to the tournament</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
