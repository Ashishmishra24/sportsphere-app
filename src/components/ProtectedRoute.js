import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ user, children, loading = false }) => {
  if (loading) {
    return <LoadingSpinner fullScreen={true} text="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
